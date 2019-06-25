$(document).ready(function () {
    $('form').on('submit', (event) => {

        event.preventDefault();
        const name = $('#name');
        const pass = $('#pass');
        clearErrors();
        const isValidName = validate(name, /^[A-Za-z]{1,20}$/, $('#name_error'));
        const isValidPass = validate(pass, /^\w{8,16}$/, $('#pass_error'));

        if (isValidName && isValidPass) {
            login(name, pass);
        }
    })
});

/**
 * Checking is input value passing to regExp
 * @param input
 * @param regExp
 * @param error
 * @returns {boolean}
 */
function validate(input, regExp, error) {
    if (regExp.test(input.val())) {
        input.removeClass('invalid_input');
        return true;
    }
    input.addClass('invalid_input');
    error.show();
    return false;
}

/**
 * Checking is it new user -> saving his name and password in file and redirecting to chat.php
 *        if existing user -> checking password if it correct redirecting to chat.php
 *       if  existing user and password wrong -> showing error to user
 * @param name
 * @param pass
 */
function login(name, pass) {
    console.log("yes");
    $.ajax({
        url: '../private/src/login.php',
        type: 'POST',
        data: {
            name: name.val(),
            pass: pass.val(),
        },
        success: function (msg) {
            console.log(msg);
            if (msg === 'new' || msg === 'exist') {
                window.location = '../private/src/chat.php' //TODO: put to constants
            } else {
                $('#wrong_pass').show();
            }
        }
    });
}

/**
 * Clearing all error fields
 */
function clearErrors() {
    $('#wrong_pass').hide();
    $('#name_error').hide();
    $('#pass_error').hide();

}