$(document).ready(function () {
    $('form').on('submit', (event) => {
        event.preventDefault();
        const name = $('name');
        const pass = $('pass');

        if (isValid(name) && isValid(pass)) {
            $.ajax({
                url: 'private/src/login.php',
                type: 'POST',
                data: {
                    name: name,
                    pass: pass,
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
    })

})

function isValid(input, regExp) {
    if (regExp.test(input.val())) {
        input.removeClass('invalid');
        return true;
    }
    input.addClass('invalid');
    return false;
}