// ELments
const landing = document.querySelector(".landing"),
header = document.querySelector(".header-area"),
headerUl = document.querySelector(".header-area ul"),
headerUlLi = document.querySelectorAll(".header-area ul li"),
settingsBox = document.querySelector(".settings-box"),
settingsIcon = document.querySelector(".fa-gear");

const backArray = [`imgs/01.jpg`, `imgs/02.jpg`, `imgs/03.jpg`, `imgs/04.jpg`];

let randomIndex = Math.floor(Math.random() * backArray.length);
let currentIndex = 0,
intervalid;

function autoSlideBackgrounds() {
    intervalid = setInterval(() => {
        if (randomIndex == 3) {
            randomIndex = -1;
        }
        randomIndex++
        console.log(randomIndex);
        landing.style = `background:url("${backArray[randomIndex]}");`
        header.style = `color:black !important;`
        console.log(header)
    }, 10000);
}

landing.style = `background:url("${backArray[randomIndex]}");`
autoSlideBackgrounds()


// Settings Box Html File
settingsIcon.addEventListener("click", (e) => {
    settingsBox.classList.toggle("open");
})
// Settings Box Html File End