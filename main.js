let colors = document.querySelectorAll(".week-table .cell .colors span");
let colorsWithoutOne = document.querySelectorAll(".week-table .cell:not(:first-of-type)")
let cells = document.querySelectorAll(".week-table .cell")
let texts = document.querySelectorAll(".week-table .cell .text")
let colorChecked = document.querySelectorAll(".week-table .cell .text .color")
let greenText = document.querySelector(".green-text")
let yellowText = document.querySelector(".yellow-text")
let redText = document.querySelector(".red-text")
let spans = document.querySelectorAll(".text span:nth-child(1)")
let colorsInside = document.querySelectorAll(".text .color");
let hours = document.querySelector(".timer .hours");
let minutes = document.querySelector(".timer .minutes");
let seconds = document.querySelector(".timer .seconds");
let timer = document.querySelectorAll(".timer span")
let timerDiv = document.querySelector(".timer")
let money = document.querySelector(".money span")
let reset = document.querySelector("button");


colorsWithoutOne.forEach(color => color.style.cssText = "pointer-events: none");
let spanBeginning = document.createElement("span");
spanBeginning.innerHTML = "Ready!"
spanBeginning.style.cssText = "position: absolute;left: 50%;transform: translate(-50%, -250%);font-size: 20px;color: rgb(244, 0, 0);"
document.querySelector(".timer").after(spanBeginning)

colors.forEach(function (color) {
    color.addEventListener("click", function () {
        spanBeginning.remove()
        if (timerDiv.nextElementSibling.tagName == "SPAN") {
            timerDiv.nextElementSibling.remove()
        }
        color.parentElement.nextElementSibling.children[0].style.backgroundColor = window.getComputedStyle(color).getPropertyValue("background-color")
        // counting colors
        let arrRed = []
        let arrGreen = []
        let arrYellow = []
        for (let i = 0; i < colorsInside.length; i++) {
            if (getComputedStyle(colorsInside[i]).getPropertyValue("background-color") == "rgb(4, 235, 4)") {
                arrGreen.push(i)
            } else if (getComputedStyle(colorsInside[i]).getPropertyValue("background-color") == "rgb(241, 241, 3)") {
                arrYellow.push(i)
            } else if (getComputedStyle(colorsInside[i]).getPropertyValue("background-color") == "rgb(255, 0, 0)") {
                arrRed.push(i)
            }
        }
        greenText.innerHTML = arrGreen.length;
        yellowText.innerHTML = arrYellow.length;
        redText.innerHTML = arrRed.length;
        money.innerHTML = +redText.innerHTML * 5
        // disable current element
        color.parentElement.parentElement.style.cssText = "pointer-events: none";
        // making colors darker
        for (let i = 0; i < cells.length; i++) {
            cells[i].children[0].children[0].style.backgroundColor = "rgb(4, 163, 4)"
            cells[i].children[0].children[1].style.backgroundColor = "rgb(202, 202, 4)"
            cells[i].children[0].children[2].style.backgroundColor = "rgb(192, 7, 7)"
        }
        // hours.innerHTML = 23;
        // minutes.innerHTML = 59;
        seconds.innerHTML = 10;
        let counter = setInterval(function () {
            if (+hours.innerHTML <= 10) {
                if (+minutes.innerHTML == 0 && +seconds.innerHTML == 0 && +hours.innerHTML != 0) {
                    hours.innerHTML = `0${hours.innerHTML - 1}`;
                    minutes.innerHTML = 59;
                    seconds.innerHTML = 60;
                }
            } else if (+hours.innerHTML > 9) {
                if (+minutes.innerHTML == 0 && +seconds.innerHTML == 0 && +hours.innerHTML != 0) {
                    hours.innerHTML = hours.innerHTML - 1;
                    minutes.innerHTML = 59;
                    seconds.innerHTML = 60;
                }
            }
            if (+minutes.innerHTML <= 10) {
                if (+seconds.innerHTML == 0 && +minutes.innerHTML != 0) {
                    minutes.innerHTML = `0${minutes.innerHTML - 1}`;
                    seconds.innerHTML = 60;
                }
            } else if (+minutes.innerHTML > 9) {
                if (+seconds.innerHTML == 0 && +minutes.innerHTML != 0) {
                    minutes.innerHTML = minutes.innerHTML - 1;
                    seconds.innerHTML = 60;
                }
            }
            if (+seconds.innerHTML <= 10 && +seconds.innerHTML != 0) {
                seconds.innerHTML = `0${seconds.innerHTML - 1}`
            } else if (+seconds.innerHTML > 9 && +seconds.innerHTML != 0) {
                seconds.innerHTML = seconds.innerHTML - 1
            }
            let time = "";
            for (let i = 0; i < timer.length; i++) {
                time += timer[i].innerHTML
            }
            if (time === "00:00:00") {
                let span = document.createElement("span");
                span.innerHTML = "Ready!"
                span.style.cssText = "position: absolute;left: 50%;transform: translate(-50%, -250%);font-size: 20px;color: rgb(244, 0, 0);"
                document.querySelector(".timer").after(span)
                for (let i = 0; i < cells.length; i++) {
                    if (getComputedStyle(colorChecked[i]).getPropertyValue("background-color") === "rgba(0, 0, 0, 0)") {
                        colorChecked[i].parentElement.parentElement.style.cssText = ""
                        colorChecked[i].parentElement.parentElement.children[0].children[0].style.backgroundColor = "rgb(4, 235, 4)";
                        colorChecked[i].parentElement.parentElement.children[0].children[1].style.backgroundColor = "rgb(241, 241, 3)";
                        colorChecked[i].parentElement.parentElement.children[0].children[2].style.backgroundColor = "rgb(255, 0, 0)";
                        break;
                    }
                }
                clearInterval(counter)
            }
        }, 1000);
    })
})

reset.addEventListener("click", function () {
    colorsInside.forEach(color => color.style.backgroundColor = "rgba(0, 0, 0, 0)");
    hours.innerHTML = "00"
    minutes.innerHTML = "00"
    seconds.innerHTML = "00"
    greenText.innerHTML = 0;
    yellowText.innerHTML = 0;
    redText.innerHTML = 0;
    money.innerHTML = 0
})