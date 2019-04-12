//Sum of numbers alignment
const countSum = document.getElementById("countSum");
countSum.addEventListener("click", () => {
    const numberInput1 = document.getElementById("number1");
    const numberInput2 = document.getElementById("number2");
    if (!isValidInput(/^[-]*[\d]+$/, numberInput1)
        || !isValidInput(/^[-]*[\d]+$/, numberInput2)) {
        document.getElementById("result").innerHTML = "Недопустимый формат";
    } else {
        const number1 = +numberInput1.value;
        const number2 = +numberInput2.value;
        if (number1 >= number2 || number1 < -100 || number2 > 100) {
            alert("Проверьте диапазон")
        } else {
            let result = 0;
            for (let i = number1; i <= number2; i++) {
                if (i % 10 === 2 || i % 10 === 3 || i % 10 === 7) {
                    result += i;
                }
            }
            document.getElementById("result").innerHTML = result.toString();
        }
    }
});

/**
 * Checking is parameter input matches to parameter regExp, and if not - changing
 * input border colour to red
 * @param regExp
 * @param input
 * @returns {boolean}
 */

function isValidInput(regExp, input) {
    const isValidInput = regExp.test(input.value);
    if (isValidInput) {
        input.style.borderColor = "";
        return true;
    }
    input.style.borderColor = "red";
    return false;
}

//Time converter alignment
const secConvertToTime = document.getElementById("secConvertToTime");
secConvertToTime.addEventListener("click", () => {
    const timeSecInput = document.getElementById("timeSec");
    if (!isValidInput(/^[-]*[\d]+$/, timeSecInput)) {
        document.getElementById("result1").innerHTML = "Недопустимый формат";
    } else {
        let sec = +timeSecInput.value;
        let h, m, s;
        s = sec % 60;
        sec = Math.floor(sec / 60);
        m = sec % 60;
        sec = Math.floor(sec / 60);
        h = sec % 60;
        if (s < 10) {
            s = "0" + s;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (h < 10) {
            h = "0" + h;
        }
        document.getElementById("result1").innerHTML = h + ":" + m + ":" + s;
    }
});

const timeConvertToSec = document.getElementById("timeConvertToSec");
timeConvertToSec.addEventListener("click", () => {
    const timeInput = document.getElementById("time");
    if (!isValidInput(/^\d*:[0-5]\d:[0-5]\d$/, timeInput)) {
        document.getElementById("result2").innerHTML = "Недопустимый формат";
    } else {
        const t = timeInput.value.split(":");
        document.getElementById("result2").innerHTML = (+t[0]) * 3600
            + (+t[1]) * 60
            + (+t[2]);
    }
});

//Time between 2 dates alignment
const tripLength = document.getElementById("tripLength");
tripLength.addEventListener("click", () => {
    const depDate = document.getElementById("depDate").value;
    const arrDate = document.getElementById("arrDate").value;
    const date1 = new Date(depDate);
    const date2 = new Date(arrDate);
    const sec = (date2.getSeconds() - date1.getSeconds());
    const min = (date2.getMinutes() - date1.getMinutes());
    const hour = (date2.getHours() - date1.getHours());
    const day = (date2.getDay() - date1.getDay());
    const month = (date2.getMonth() - date1.getMonth());
    const year = (date2.getFullYear() - date1.getFullYear());
    document.getElementById("result3").innerHTML = year + " year(s), "
        + month + " month(s), "
        + day + " day(s), "
        + hour + " hour(s), "
        + min + " minute(s), "
        + sec + " second(s).";
});


//Chessboard alignment
const table = document.getElementById("chessBoard");
const chessContainer = document.getElementById("chessContainer");

document.getElementById("clearBoard").addEventListener("click", () => {
    table.innerHTML = "";
});

document.getElementById("drawBoard").addEventListener("click", () => {
    table.innerHTML = "";
    const sizeInput = document.getElementById("chessSize");

    if (!isValidInput(/^\d+[XxХх]\d+$/, sizeInput)) {
        table.innerHTML = "Недопустимый формат";
    } else {
        const dimensions = sizeInput.value.split(/[XxХх]/);
        const chessWidth = dimensions[0];
        const chessHeight = dimensions[1];
        chessContainer.style.width = chessWidth * 22 + "px";
        for (let i = 0; i < chessHeight; i++) {
            for (let j = 0; j < chessWidth; j++) {
                let block = document.createElement("div");
                if (i % 2 === j % 2) {
                    table.appendChild(block);
                    block.className = "chessBlockWhite";
                } else {
                    table.appendChild(block);
                    block.className = "chessBlockBlack";
                }
            }
        }
    }
});


//Textarea alignment
const textarea = document.getElementById("textarea");
textarea.addEventListener("focusin", (event) => {
    event.target.style.background = "#95afc0";
});
textarea.addEventListener("focusout", (event) => {
    if (textarea.value === "") {
        alert("Вы не ввели данные");
    }
    event.target.style.background = "";
    let string = textarea.value;
    let links = string.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g);
    let iPs = string.match(/(\d{1,3}\.){3}\d{1,3}/g);
    links.push.apply(links, iPs);
    const linksIPs = links.map((each) => each.replace(/https?:\/\//, ""));
    linksIPs.sort();
    document.getElementById("links").innerHTML = "";
    linksIPs.forEach((each) => {
        let link = document.createElement("a");
        link.setAttribute("href", each);
        link.innerHTML = each;
        document.getElementById("links").appendChild(link);
    });
});
/* Here some testing input for textarea:
 255.212.4, 255.555.999.8,  https://google.com, http://www.abc.in, www.tv.pb,
 zooby.in, UKR>NET, Uuk.net, cbc.com, www.audit.ua, 127.0.128.255, 123256123789,
*/


//Textarea with RegExp
const textInput = document.getElementById("reg-textarea");
const regexInput = document.getElementById("reg-input");
const regButton = document.getElementById("reg-button");
regButton.addEventListener("click", () => {
    let userText = textInput.value;
    const userInput = regexInput.value;
    let userRegex = new RegExp(userInput, "g");
    document.getElementById("reg-markedText").innerHTML = userText.replace(userRegex, (str) => {
        return "<mark>" + str + "</mark>"
    });
});
