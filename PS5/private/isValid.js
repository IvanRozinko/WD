$(document).ready(function () {
    $('form').on('submit', (event) => {
        event.preventDefault();
        const name = $('#name');
        const pass = $('#pass');

        const isValidName = isValid(name, /^\w{1,20}$/);
        const isValidPass = isValid(pass,/^\w{8,16}$/);

        if (isValidName && isValidPass) {
            login(name, pass);
         }
    })
});

function isValid(input, regExp) {
    if (regExp.test(input.val())) {
        input.removeClass('invalid');   //TODO: show validation error, name on chat page, config.php, 
        return true;
    }
    input.addClass('invalid');
    return false;
}

function login(name, pass) {
    $.ajax({
        url: '../private/src/login.php',
        type: 'POST',
        data: {
            name: name.val(),
            pass: pass.val(),
        },
        success: function (msg) {
            if (msg === 'new' || msg === 'exist') {
                window.location = '../private/src/chat.php'
            }
        }
    });
}