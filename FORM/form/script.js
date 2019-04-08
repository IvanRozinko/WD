//email validation
const email = document.getElementById("email");
email.addEventListener("focusout", () => {
    if (!isEmailValid(email)) {
        email.style.borderBottomColor = "red";
        email.removeEventListener("focusout", () => {
        });
    }
    email.addEventListener(("keyup"), () => {
        if (!isEmailValid(email)) {
            email.style.borderBottomColor = "red";
        } else {
            email.style.borderBottomColor = "";
        }
    });
});

function isEmailValid(email) {
    return /.+@.+\..+/.test(email.value);
}

//pass validation
const pass = document.getElementById("pass");
pass.addEventListener("focusout", () => {
    if (!isPassValid(pass)) {
        pass.style.borderBottomColor = "red";
        pass.removeEventListener("focusout", () => {
        });
    }
    pass.addEventListener(("keyup"), () => {
        if (!isPassValid(pass)) {
            pass.style.borderBottomColor = "red";
        } else {
            pass.style.borderBottomColor = "";
        }
    });
});

function isPassValid(pass) {
    return pass.value.length <= 8 && pass.value.length >= 6
}

//checkbox validation
const isAgree = document.getElementById("agree");

//submit form
function continueOrNot() {
    if (isEmailValid(email) && isPassValid(pass) && isAgree.checked) {
        return true;
    } else {
        alert("Please fill the form");
        return false;
    }
}

//validate name
const name = document.getElementById("name");
name.addEventListener("focusout", () => {
    if (!isNameValid(name)) {
        name.style.borderBottomColor = "red";
        name.removeEventListener("focusout", () => {
        });
    }
    name.addEventListener("keyup", () => {
        if (!isNameValid(name)) {
            name.style.borderBottomColor = "red";
        } else {
            name.style.borderBottomColor = "";
        }
    });
});

function isNameValid(name) {
    return /^[A-Za-z]+$/.test(name.value);
}

//validate age
const age = document.getElementById("age");
age.addEventListener("focusout", () => {
    if (!isAgeValid(age)) {
        age.style.borderBottomColor = "red";
        age.removeEventListener("focusout", () => {
        });
    }
    age.addEventListener("keyup", () => {
        if (!isAgeValid(age)) {
            age.style.borderBottomColor = "red";
        } else {
            age.style.borderBottomColor = "";
        }
    });
});

function isAgeValid(age) {
    return /^\d{0,2}$/.test(age.value);
}