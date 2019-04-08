//Sum of numbers alignment
const countSum = document.getElementById("countSum");
countSum.addEventListener("click", () => {
    const number1 = parseInt(document.getElementById("number1").value);
    const number2 = parseInt(document.getElementById("number2").value);
    if (number1 >= number2) {
        alert("Проверьте диапазон")
    } else {
        let result = 0;
        let i;
        for (i = number1; i <= number2; i++) {
            if (i % 10 === 2 || i % 10 === 3 || i % 10 === 7) {
                result += i;
            }
        }
        document.getElementById("result").innerHTML = result;
    }
});

//Time converter alignment
const secConvertToTime = document.getElementById("secConvertToTime");
secConvertToTime.addEventListener("click", () => {
    let sec = parseInt(document.getElementById("timeSec").value);
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
});

const timeConvertToSec = document.getElementById("timeConvertToSec");
timeConvertToSec.addEventListener("click", () => {
    const time = document.getElementById("time").value;
    const t = time.split(":");
    document.getElementById("result2").innerHTML = (+t[0]) * 3600 + (+t[1]) * 60 + (+t[2]);
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
    document.getElementById("chessBoard").innerHTML = "";
});

document.getElementById("drawBoard").addEventListener("click", () => {
    const dimension = (document.getElementById("chessSize").value).split("x");
    const chessWidth = dimension[0];
    const chessHeight = dimension[1];
    chessContainer.style.width = chessWidth * 22 + "px";
    for (let i = 0; i < chessHeight; i++) {
        for (let j = 0; j < chessWidth; j++) {
            if (i % 2 === j % 2) {
                let block = document.createElement("div");
                table.appendChild(block);
                block.className = "chessBlockWhite";
            } else {
                let block1 = document.createElement("div");
                table.appendChild(block1);
                block1.style.color = "black";
                block1.className = "chessBlockBlack";
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
    let length = links.length;
    for (let i = 0; i < length; i++) {
        links[i] = links[i].replace(/https?:\/\//, "");
    }
    links.sort();
    document.getElementById("links").innerHTML = "";
    for (let i = 0; i < links.length; i++) {
        let link = document.createElement("a");
        link.setAttribute("href", "_blank");
        link.innerHTML = links[i];
        document.getElementById("links").appendChild(link);
    }
    textarea.value = links.sort();
});
/* Here some testing input for textarea:
 255.212.4, 255.555.999.8,  https://google.com, http://www.abc.in, www.tv.pb,
 zooby.in, UKR>NET, Uuk.net, cbc.com, www.audit.ua, 127.0.128.255, 123256123789,
*/


//Textarea with RegExp
let textInput = document.getElementById("reg-textarea");
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
