//Sum of numbers alignment
const countSum = document.getElementById("countSum");
const resultInvalid = "Недопустимый формат";

countSum.addEventListener("click", () => {
    const numberInput1 = document.getElementById("number1");
    const numberInput2 = document.getElementById("number2");
    const result = document.getElementById("result");
    const regExp = /^[-]*[\d]+$/;
    if (!isValidInput(regExp, numberInput1)
        || !isValidInput(regExp, numberInput2)) {
        result.innerText = resultInvalid;
        return;
    }
    const number1 = +numberInput1.value;
    const number2 = +numberInput2.value;
    if (number1 >= number2 || number1 < -1000 || number2 > 1000) {
        result.innerText = "Проверьте диапазон";
        return;
    }
    let sum = 0;
    let i;
    let lastNumber;
    for (i = number1; i <= number2; i++) {
        lastNumber = Math.abs(i % 10);
        if (lastNumber === 2
            || lastNumber === 3
                || lastNumber === 7) {
            sum += i;
        }
    }
    result.innerText = sum + "";
});


//Time converter alignment
const secConvertToTime = document.getElementById("secConvertToTime");
secConvertToTime.addEventListener("click", () => {
    const timeSecInput = document.getElementById("timeSec");
    const result1 = document.getElementById("result1");
    const secInMinute = 60;
    const pattern = 10;
    if (!isValidInput(/^[-]*[\d]+$/, timeSecInput)) {
        result1.innerText = resultInvalid;
        return;
    }
    let sec = +timeSecInput.value;
    let h, m, s;
    s = sec % secInMinute;
    sec = Math.floor(sec / secInMinute);
    m = sec % secInMinute;
    sec = Math.floor(sec / secInMinute);
    h = sec;
    if (s < pattern) {
        s = "0" + s;
    }
    if (m < pattern) {
        m = "0" + m;
    }
    if (h < pattern) {
        h = "0" + h;
    }
    result1.innerText = h + ":" + m + ":" + s;
});

const timeConvertToSec = document.getElementById("timeConvertToSec");
timeConvertToSec.addEventListener("click", () => {
    const result2 = document.getElementById("result2");
    const timeInput = document.getElementById("time");
    if (!isValidInput(/^\d*:[0-5]\d:[0-5]\d$/, timeInput)) {
        result2.innerText = resultInvalid;
        return;
    }
    const t = timeInput.value.split(":");
    result2.innerText = (+t[0]) * 3600
                       + (+t[1]) * 60
                        + (+t[2]);
});

//Time between 2 dates alignment
const tripLength = document.getElementById("tripLength");
const result3 = document.getElementById("result3");
tripLength.addEventListener("click", () => {
    const depDate = document.getElementById("depDate").value;
    const arrDate = document.getElementById("arrDate").value;
    const date1 = new Date(depDate);
    const date2 = new Date(arrDate);
    if (date1 > date2){
        result3.innerText = resultInvalid;
        return;
    }
    const dateArray1 = getDateArray(date1);
    const dateArray2 = getDateArray(date2);
    let timeBetweenDates = new Array(dateArray1.length).fill(0);
    const dayPerMonth = 30;
    const monthPerYear = 12;
    const hourPerDay = 24;
    const minPerHour = 60;
    const secPerMinute = 60;
    for (let i = 0; i < dateArray1.length; i++) {
        let difference = dateArray2[i] - dateArray1[i] + timeBetweenDates[i];
        if (difference < 0) {
            switch (i) {
                case 0: {
                    difference += secPerMinute ;
                    break;
                }case 1: {
                    difference += minPerHour ;
                    break;
                }case 2: {
                    difference += hourPerDay;
                    break;
                }case 3: {
                    difference += dayPerMonth;
                    break;
                }case 4: {
                    difference += monthPerYear;
                    break;
                }
            }
            timeBetweenDates[i+1]--;
        }
        timeBetweenDates[i] = difference;
    }
    result3.innerText = timeBetweenDates[5] + " year(s), "
                          + timeBetweenDates[4] + " month(s), "
                           + timeBetweenDates[3] + " day(s), "
                            + timeBetweenDates[2] + " hour(s), "
                             + timeBetweenDates[1] + " minute(s), "
                              + timeBetweenDates[0] + " second(s).";
});

/**
 * Converting date object to array
 * @param date date object
 * @returns {array}
 */
function getDateArray(date){
    return [date.getSeconds(), date.getMinutes(), date.getHours(),
        date.getDate(), date.getMonth(), date.getFullYear()];
}

//Chessboard alignment
const result4 = document.getElementById("result4");
const chessContainer = document.getElementById("chessContainer");

document.getElementById("clearBoard").addEventListener("click", () => {
    result4.innerHTML = "";
});

document.getElementById("drawBoard").addEventListener("click", () => {
    result4.innerText = "";
    const sizeInput = document.getElementById("chessSize");
    if (!isValidInput(/^\d+[XxХх]\d+$/, sizeInput)) {
        result4.innerText = resultInvalid;
        return;
    }
    const dimensions = sizeInput.value.split(/[XxХх]/);
    const chessWidth = dimensions[0];
    const chessHeight = dimensions[1];
    const fragment = document.createDocumentFragment();
     chessContainer.style.width = chessWidth * 22 + "px";
    for (let i = 0; i < chessHeight; i++) {
        for (let j = 0; j < chessWidth; j++) {
            let block = document.createElement("div");
            block.className = i % 2 === j % 2 ? "chessBlockWhite" : "chessBlockBlack";
            fragment.appendChild(block);
        }
    }
    result4.appendChild(fragment);
});


//Textarea alignment
const textarea = document.getElementById("textarea");
const result5 =  document.getElementById("result5");
textarea.addEventListener("focusout", () => {
    if (textarea.value === ""){
        result5.innerText = "Вы не ввели строку";
        return;
    }
    textarea.background = "";
    let string = textarea.value;
    let links = string.match(/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/g);
    let iPs = string.match(/(\d{1,3}\.){3}\d{1,3}/g);
    links.push.apply(links, iPs);
    result5.innerText = "";
    let linkContainer = [];
    links.forEach((each) => {
        let link = document.createElement("a");
        link.setAttribute("href", /https?:\/\//.test(each) ? each : "//" + each);
        link.setAttribute("target", "_blank");
        link.innerText = each.replace(/https?:\/\//, "");
        linkContainer.push(link);
    });
    linkContainer.sort(compareByLinkName);
    linkContainer.forEach((link) => result5.appendChild(link));
});
/* Here some testing input for textarea:
 255.212.4, 255.555.999.8,  https://google.com, http://www.abc.in, www.tv.pb,
 zooby.in, UKR>NET, ukr.net, cbc.com, www.audit.ua, 127.0.128.255, 123256123789,
 209.185.108.135, 216.58.193.78
*/


//Textarea with RegExp
const textInput = document.getElementById("reg-textarea");
const regexInput = document.getElementById("reg-input");
const regButton = document.getElementById("reg-button");
regButton.addEventListener("click", () => {
    let userText = textInput.value;
    const userInput = regexInput.value;
    const userRegex = new RegExp(userInput, "gi");
    document.getElementById("result6").innerHTML = userText.replace(userRegex,"<mark>$&</mark>");
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
        input.className = "";
        return true;
    }
    input.className = "invalid";
    return false;
}

/**Comparing link by it names to show method sort() how to sort it
 * @param a link
 * @param b link
 * @returns {number}
 */
function compareByLinkName(a,b) {
    if (a.innerText > b.innerText) {
    return 1;
}
    return -1;
}