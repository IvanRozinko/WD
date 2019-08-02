$(() => {
    $('form').on('submit', (event) => {

        event.preventDefault();
        const $name = $('#name');
        const $pass = $('#pass');
        clearErrors();
        const isValidName = validate($name, /^[A-Za-z]{1,20}$/, $('#name_error'));
        const isValidPass = validate($pass, /^\w{8,16}$/, $('#pass_error'));

        if (isValidName && isValidPass) {
            login($name, $pass);
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
    $.ajax({
        url: 'router.php',
        type: 'POST',
        data: {
            name: name.val(),
            pass: pass.val(),
            route: 'login'
        },
        success:  data => {
            if (data === 'exist' || data === 'new_user') {
                window.location = 'chat.php';
            } else {
                const errors = JSON.parse(data);
                $('#wrong_pass').text(errors.name_error);
                $('#name_error').text(errors.pass_error);
                $('#pass_error').text(errors.wrong_pass);
            }
        }
    });
}

/**
 * Clearing all error fields
 */
function clearErrors() {
    $('#wrong_pass').text();
    $('#name_error').text();
    $('#pass_error').text();

}