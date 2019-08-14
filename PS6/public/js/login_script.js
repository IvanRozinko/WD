const nameErrorSelect = '#name_error';
const passErrorSelect = '#pass_error';
const wrongPassSelect = '#wrong_pass';

$(() => {
    $('form').on('submit', (event) => {

        event.preventDefault();
        const $name = $('#name');
        const $pass = $('#pass');
        clearErrors();
        const isValidName = validate($name, /^[A-Za-z]{1,20}$/, $(nameErrorSelect));
        const isValidPass = validate($pass, /^\w{8,16}$/, $(passErrorSelect));

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
        dataType: 'json',
        type: 'POST',
        data: {
            name: name.val(),
            pass: pass.val(),
            route: 'login'
        },
        success: errors => {
            console.log(errors);
            if (isEmpty(errors)) {
                window.location = 'chat.php';
            } else {
                $(wrongPassSelect).text(errors.pass_error);
                $(nameErrorSelect).text(errors.name_error);
                $(passErrorSelect).text(errors.wrong_pass);
            }
        },
        error: () => {
            $(wrongPassSelect).text("Request failed, try again later");
        },
    });
}

/**
 * Checking if object is empty
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Clearing all error fields
 */
function clearErrors() {
    $(wrongPassSelect).text();
    $(nameErrorSelect).text();
    $(passErrorSelect).text();

}