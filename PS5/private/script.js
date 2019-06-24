$(document).ready(function () {
    const msg_input = $('#msg_input');

    $('#btn_send').bind('click', (event) => {
        event.preventDefault();
        const input = msg_input.val();
        const sendTime = msgTime();
        sendMessages(sendTime[0], sendTime[1], input);
        msg_input.val('');
    });
});

const $chat_window = $('#chat_window');

uploadChatHistory(true);
// upload chat history every 1 sec
setInterval(function () {
    uploadChatHistory(false)
}, 1000);

/**
 * Returning current time in format hh:mm:ss
 * @returns {string}
 */
function msgTime() {
    const today = new Date();
    const time = formatT(today.getHours()) + ':'
                   + formatT(today.getMinutes()) + ':'
                      + formatT(today.getSeconds());
    const date = today.getDate() + '-'
                    + (today.getMonth() + 1) + '-'
                        + today.getFullYear();
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
        url: 'sendMsg.php',
        type: 'POST',
        data: {
                  send_date: date,
                  send_time: time,
                  input: input,
               },

        success: function (newMsg) {
            if (newMsg === '') {
                return;
            }
            const msg = formatMsg(JSON.parse(newMsg));
            $chat_window.append('<p>' + msg + '</p>');
            scrollTextWindow($chat_window);
        }
    });
}

/**
 * Uploading history of chat using ajax request
 * @param scroll
 */
function uploadChatHistory(scroll) {

    $.ajax({
        url: 'uploadChatHistory.php',
        type: 'POST',
        success: function (history) {
            if (history === '') {
                return;
            }
            //clear chat window
            $chat_window.empty();
            const json_history = JSON.parse(history);
            for (const key of Object.keys(json_history)) {
                $chat_window.append('<p>' + formatMsg(json_history[key]) + '</p>');
            }
            if (scroll) {
                scrollTextWindow($chat_window);
            }
        }
    })
}

/**
 * Replace ':)'  and ':(' inside user messages with smiley pictures
 * @param msg
 * @returns string
 */
function insertSmiles(msg) {
    const smiles = {
        ':\\)': '<img alt=happy.png src=../../public/img/happy.png class=smile>',
        ':\\(': '<img alt=sad.png src=../../public/img/sad.png class=smile>'
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
    return value > 9 ? value : '0' + value;
}

/**
 * Formatting user message
 * @param obj
 * @returns {string}
 */
function formatMsg(obj) {
    return '[' + obj.time + '] ' + '<strong>' + obj.from + '</strong>' + insertSmiles(obj.input);
}

/**
 * Scrolling chat window at the bottom
 * @param element
 */
function scrollTextWindow(element) {
    element.scrollTop(element.prop('scrollHeight') - element.height());
}


