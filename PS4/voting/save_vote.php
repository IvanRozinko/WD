<?php
session_start();

if (isset($_POST["submit"]) && isset($_POST["breed"])) {
    $hasVote = hasNotVoted(session_id());
    if ($hasVote) {
        $_SESSION['counted'] = " Your vote counted!";
        writeToJSOn($_POST["breed"]);
        header('Location: result.php');
    } else {
        $_SESSION['vote_error'] = 'You can vote only once';
        header("Location: index.php");
    }
}
/**
 * Opens json file, converting it's data to array than adding user vote to this array and,
 * saving result back same file
 * @param $breed - value of user input
 */
function writeToJSON($breed)
{
    $file = 'json/results.json';

    if (!file_exists($file)) {
        file_put_contents($file, json_encode(array($breed => 1), JSON_NUMERIC_CHECK));
        return;
    }
    $json_object = file_get_contents($file);
    $data = json_decode($json_object, true);

    if ($data == null) {
        $data = [];
    }

    if (array_key_exists($breed, $data)) {
        $data[$breed]++;
    } else {
        $data[$breed] = 1;
    }
    $json_object = json_encode($data, JSON_NUMERIC_CHECK);
    file_put_contents($file, $json_object);
}

/**Checking has user with this session id already gave his vote, if not than saving
 * session id to json file
 * @param $id - of current session
 * @return bool
 */
function hasNotVoted($id)
{
    $file = 'json/voted.json';

    if (!file_exists($file)) {
        file_put_contents($file, json_encode([$id]));
        return true;
    }
    $json_object = file_get_contents($file);
    $IDs = json_decode($json_object, true);

    if (in_array($id, $IDs)) {
        return false;
    }

    $IDs[] = $id;
    file_put_contents($file, json_encode($IDs));
    return true;
}


