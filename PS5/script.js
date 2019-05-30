$(document).ready(function () {
    const msg_input = $("#msg_input");
    const msg_history = $("#msg_history");



    $("#btn_send").bind("click", (event) => {
        event.preventDefault();
        const date_time = getDateTime();
        const msg = "[" + date_time + "] " + msg_input.val();

        console.log(msg);
        $.ajax({
            url: "msg.php",
            type: "POST",
            data: "msg=" + msg,
            success: function (file_content) {
                msg_history.val(file_content);

                //maybe not necessary every click upload all file, but somehow just last string
            }
        });

        msg_input.val("");


    });


});

function getDateTime() {
    const today = new Date();
    const date = today.getFullYear() + "/"
                 + (today.getMonth() + 1) + "/"
                    + today.getDate();
    const time = today.getHours() + ":"
                + today.getMinutes() + ":"
                  +today.getSeconds();
    return date + " " + time;
}


