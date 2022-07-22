let colors = document.querySelectorAll(".week-table .cell .colors span");
let colorsWithoutOne = document.querySelectorAll(".week-table .cell:not(:first-of-type)");
let cells = document.querySelectorAll(".week-table .cell");
let texts = document.querySelectorAll(".week-table .cell .text");
let colorChecked = document.querySelectorAll(".week-table .cell .text .color");
let greenText = document.querySelector(".green-text");
let yellowText = document.querySelector(".yellow-text");
let redText = document.querySelector(".red-text");
let spans = document.querySelectorAll(".text span:nth-child(1)");
let colorsInside = document.querySelectorAll(".text .color");
let hours = document.querySelector(".timer .hours");
let minutes = document.querySelector(".timer .minutes");
let seconds = document.querySelector(".timer .seconds");
let timer = document.querySelectorAll(".timer span")
let timerDiv = document.querySelector(".timer");
let money = document.querySelector(".money span");
let reset = document.querySelector("button");
let arr = [];

// functions

function counter() {
    let counter = setInterval(function () {
        let time = new Date();
        console.log(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`)
        if (`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}` == "2:0:0") {
            readyOrNot.innerText = "Ready!"
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
        } else {
            readyOrNot.innerText = "It's Not 8 Yet!"
        }
    }, 1000)
}

function counting() {
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
}

// disabling all the choices and show Ready!
cells.forEach(color => color.style.cssText = "pointer-events: none");
let readyOrNot = document.createElement("span");
readyOrNot.innerHTML = "It's Not 8 Yet!"
readyOrNot.style.cssText = "position: absolute;left: 50%;transform: translate(-50%, -250%);font-size: 20px;color: rgb(244, 0, 0);"


// applying localStorage Items
if (localStorage.length != 0) {
    let re = /rgb\(\d{1,}, \d{1,}, \d{1,}\)/ig;
    let theNewArr = localStorage.getItem("colors").match(re);
    for (let i = 0; i < theNewArr.length; i++) {
        colorsInside[i].style.backgroundColor = theNewArr[i];
    }
    counter();
    counting()
} else {
    readyOrNot.innerText = "Ready!"
    cells[0].style.cssText = "";
}
document.querySelector(".timer").after(readyOrNot)

colors.forEach(function (color) {
    color.addEventListener("click", function () {
        color.parentElement.nextElementSibling.children[0].style.backgroundColor = window.getComputedStyle(color).getPropertyValue("background-color")
        // storing in localStorage
        arr.push(window.getComputedStyle(color).getPropertyValue("background-color"));
        localStorage.setItem("colors", JSON.stringify(arr));
        // counting colors
        counting();
        // disable current element
        color.parentElement.parentElement.style.cssText = "pointer-events: none";
        // making colors darker
        for (let i = 0; i < cells.length; i++) {
            cells[i].children[0].children[0].style.backgroundColor = "rgb(4, 163, 4)"
            cells[i].children[0].children[1].style.backgroundColor = "rgb(202, 202, 4)"
            cells[i].children[0].children[2].style.backgroundColor = "rgb(192, 7, 7)"
        }
        counter();
    })
})

reset.addEventListener("click", function () {
    colorsInside.forEach(color => color.style.backgroundColor = "rgba(0, 0, 0, 0)");
    localStorage.clear();
    greenText.innerHTML = 0;
    yellowText.innerHTML = 0;
    redText.innerHTML = 0;
    money.innerHTML = 0
    window.location.reload();
})
