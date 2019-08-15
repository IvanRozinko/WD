
const MESSAGE_MAX_LENGTH = 100; //message longer then 100 characters sends automatically


$(() => {
    const $msg_input = $('#msg_input');
    $('form').bind('submit', event => {
        event.preventDefault();
        sendMessage($msg_input.val());
        $msg_input.val('');
    });


    $msg_input.on('keypress', () => {
        if ($msg_input.val().length > MESSAGE_MAX_LENGTH) {
            sendMessage($msg_input.val());
            $msg_input.val('');
        }
    });

    $('#btn_logout').on('click', () => {
        logout();
    });
});



uploadChatHistory(true);
// upload chat history every 1 sec
setInterval(() => {
    uploadChatHistory(false)
}, 1000);


/**
 * Logging out current user
 */
function logout() {
    $.ajax({
        url: 'router.php',
        type: 'POST',
        data: {
            route: 'logout'
        }
    });
}

/**
 * Sending message to database, using ajax request
 * @param input
 */
function sendMessage(input) {
    $.ajax({
        url: 'router.php',
        type: 'POST',
        data: {
            input: input,
            route: 'send_message'
        }
    });
}

/**
 * Uploading history of chat using ajax request
 * @param scroll
 */
function uploadChatHistory(scroll) {
    const $chat_window = $('#chat_window');
    $.ajax({
        url: 'router.php',
        type: 'POST',
        dataType: 'json',
        data: {
            route: 'upload_chat_history'
        },
        success: history => {

            if (history.length === 0) {
                return;
            }
            //clear chat window
            $chat_window.empty();
            $.each(history, (key, element) => {
                $chat_window.append('<p>' + formatMsg(element) + '</p>');
            });
            if (scroll) {
                scrollTextWindow($chat_window);
            }
        },
        error: () => {
            $('#con_error').text("Request failed, try again later");
        },
    })
}

/**
 * Replace ':)'  and ':(' inside user messages with smiley pictures
 * @param msg
 * @returns string
 */
function insertSmiles(msg) {
    const smiles = {
        ':\\)': '<img alt=happy.png src=img/happy.png class=smile>',
        ':\\(': '<img alt=sad.png src=img/sad.png class=smile>'
    };
    for (let key in smiles) {
        msg = msg.replace(new RegExp(key, 'g'), smiles[key]);
    }
    return msg;
}



/**
 * Formatting user message
 * @param obj
 * @returns {string}
 */
function formatMsg(obj) {
    return '[' + obj.time + '] ' + '<strong>' + obj.msg_from + '</strong>' + insertSmiles(obj.input);
}

/**
 * Scrolling chat window at the bottom
 * @param element
 */
function scrollTextWindow(element) {
    element.scrollTop(element.prop('scrollHeight') - element.height());
}


