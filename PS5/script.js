$(document).ready(function () {
    const msg_input = $("#msg_input");

    // setInterval(uploadChatHistory, 1000);
    uploadChatHistory();

    $("#btn_send").bind("click", (event) => {
        event.preventDefault();
        const time = getTime();
        const input = msg_input.val();
        sendMessages(time, input);
        msg_input.val("");
    });
});

function getTime() {
    const today = new Date();
    return formatT(today.getHours()) + ":"
                + formatT(today.getMinutes()) + ":"
                  + formatT(today.getSeconds());
}


function sendMessages(time, input) {
    $.ajax({
        url: "sendMsg.php",
        type: "POST",
        data: {date: time, input: input},
        success: function (newMsg) {
            const $chat_window = $("#chat_window");
            newMsg = insertSmiles(newMsg);
            $chat_window.append(newMsg);
            $chat_window.scrollTop($chat_window.prop("scrollHeight") - $chat_window.height());
        }
    });
}

function uploadChatHistory() {
    $.ajax({
        url: "uploadChatHistory.php",
        type: "POST",
        data: "time="+ getTime(),
        success: function(history) {
            const $chat_window = $("#chat_window");
            history = insertSmiles(history);
            $chat_window.append(history);
            $chat_window.scrollTop($chat_window.prop("scrollHeight") - $chat_window.height());
        }
    })
}

function insertSmiles(msg) {
    const smiles = {
        ":\\)": "<img alt='happy.png' src='img/happy.png' class='smile'>",
        ":\\(": "<img alt='sad.png' src='img/sad.png' class='smile'>"
    };
   for (let key in smiles) {
      msg = msg.replace(new RegExp(key, "g"), smiles[key]);
   }
   return msg;
}

function formatT(value) {
    return value > 9 ? value : "0" + value;
}


