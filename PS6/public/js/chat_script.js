$(() => {
    const $msg_input = $('#msg_input');
    $('#btn_send').bind('click', event => {
        event.preventDefault();
        const input = $msg_input.val();
        const sendTime = msgTime();
        sendMessages(sendTime[0], sendTime[1], input);
        $msg_input.val('');
    });
});

const $chat_window = $('#chat_window');

uploadChatHistory(true);
// upload chat history every 1 sec
setInterval(() => {
    uploadChatHistory(false)
}, 1000);

/**
 * Returning array with current date and time in format  [yyyy-mm-dd, hh:mm:ss]
 * @returns array : [date, time]
 */
function msgTime() {
    const today = new Date();
    const time = formatT(today.getHours()) + ':'
        + formatT(today.getMinutes()) + ':'
        + formatT(today.getSeconds());
    const date = today.getFullYear() + '-'
        + (today.getMonth() + 1) + '-'
        + today.getDate();
    return [date, time];
}

/**
 * Sending message to database, using ajax request
 * @param date
 * @param time
 * @param input
 */
function sendMessages(date, time, input) {
    $.ajax({
        url: 'router.php',
        type: 'POST',
        // dataType: 'json',
        data: {
            input: input,
            route: 'send_message'
        },

        // success: newMsg => {
        //     if (newMsg === '') {
        //         return;
        //     }
        //     const msg = formatMsg(newMsg);
        //     $chat_window.append('<p>' + msg + '</p>');
        //     scrollTextWindow($chat_window);
        // }
    });
}

/**
 * Uploading history of chat using ajax request
 * @param scroll
 */
function uploadChatHistory(scroll) {

    $.ajax({
        url: 'router.php',
        type: 'POST',
        dataType: 'json',
        data: {
            route: 'upload_chat_history'
        },
        success: history => {
            //clear chat window
            if (history.length === 0) {
                return;
            }
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
 * Formatting time output to get correct hh:mm:ss
 * @param value
 * @returns {string}
 */
function formatT(value) {
    return value.toString().padStart(2, '0');
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


