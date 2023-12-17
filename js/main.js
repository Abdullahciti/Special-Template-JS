// ELments
const landing = document.querySelector(".landing"),
header = document.querySelector(".header-area"),
headerUl = document.querySelector(".header-area ul"),
headerUlLi = document.querySelectorAll(".header-area ul li"),
settingsBox = document.querySelector(".settings-box"),
gearIconBox = document.querySelector(".gear-icon"),
settingsIcon = document.querySelector(".fa-gear"),
settingsContainer = document.querySelector(".settings-container"),
colorsLi = document.querySelectorAll(".colors-list li")

const backArray = [`imgs/01.jpg`, `imgs/02.jpg`, `imgs/03.jpg`, `imgs/04.jpg`];

let randomIndex = Math.floor(Math.random() * backArray.length);
let intervalid;

function autoSlideBackgrounds() {
    intervalid = setInterval(() => {
        if (randomIndex == 3) {
            randomIndex = -1;
        }
        randomIndex++
        landing.style = `background:url("${backArray[randomIndex]}");`
    }, 10000);
}


autoSlideBackgrounds()


// Settings Box Html File
gearIconBox.addEventListener("click", (e) => {
    settingsBox.classList.toggle("open");
    settingsIcon.classList.toggle("fa-spin");
});

let mainColor = localStorage.getItem("color");

if(mainColor !== null) {

    colorsLi.forEach((e) => e.classList.remove("active"));

    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"));

    localStorage.setItem('color', localStorage.getItem("color"));

    document.querySelector(`[data-color="${localStorage.getItem("color")}"]`).classList.add("active");

}
// Colors Options

colorsLi.forEach((li, index) => {
    colorsLi[index].style = `background-color:${colorsLi[index].dataset.color}`;
    li.addEventListener("click", (color) => {
        colorsLi.forEach((e) => e.classList.remove("active"));
        li.classList.add("active");
        document.documentElement.style.setProperty(`--main-color`, color.target.dataset.color);
        window.localStorage.setItem("color", color.target.dataset.color);
    })
})

// Backgrounds Options
let onOff = document.querySelectorAll(".answers-list li");

onOff.forEach((li, index) => {
    li.addEventListener("click", () => {
        onOff.forEach(li => li.classList.remove("active"));
        li.classList.add("active");
    })
});

let autoSlideOption = localStorage.getItem("autoSlide");

if (autoSlideOption){
    
    onOff.forEach(li => li.classList.remove("active"));

    if (autoSlideOption == "no") {
        clearInterval(intervalid);
        onOff[0].classList.add("active");
    }else{
        onOff[1].classList.add("active");
        autoSlideBackgrounds()
    }
}
if (autoSlideOption == "no") {
    clearInterval(intervalid);
    onOff[0].classList.add("active");
}
onOff[0].addEventListener("click", () => {
    clearInterval(intervalid);
    localStorage.setItem("autoSlide", "no");
})
onOff[1].addEventListener("click", () => {
    localStorage.setItem("autoSlide", "yes");
    autoSlideBackgrounds();
})
// background-options
let backgroundImg = document.querySelectorAll(".background-options li img");

if (localStorage.getItem("background")){
    backgroundImg.forEach(e => e.classList.remove("active"));

    localStorage.setItem("background", `${localStorage.getItem("background")}`)

    document.querySelector(`[data-background="${localStorage.getItem("background")}"]`).classList.add("active");

    landing.style = `background-image:url(${localStorage.getItem("background")});`
}

backgroundImg.forEach((img, index) => {
    img.addEventListener("click", el => {
        backgroundImg.forEach(e => e.classList.remove("active"));
        img.classList.add("active");
        localStorage.setItem("background", `${backArray[index]}`);
        landing.style = `background-image:url(${localStorage.getItem("background")});`
    })
})
// Settings Box Html File => END

// Start Skills 
let skills = document.querySelector(".skills")
let skillProgress = document.querySelectorAll(".skill-progress span");
let started = false;
//  Start Loader - Btn Go Up
let loader = document.querySelector(".loader");
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

let btnGoUp = document.querySelector(".go-up");

window.onscroll = () => {
    

    // Loader Start
    let scrollTop = document.documentElement.scrollTop
    if (window.scrollY){
        loader.style.width = `${(scrollTop / height) * 100}%`
    }
    // Loader End

    // Button Start
    if (window.scrollY > 500) {
        btnGoUp.style.display = "block"
    }else{
        btnGoUp.style.display = "none"
    }
    if (window.scrollY > 550) {
        btnGoUp.style.opacity = "1"
    }else{
        btnGoUp.style.opacity = "0"
    }
    btnGoUp.onclick = () => {
        window.scrollTo({
            top: 0, 
            behavior: "smooth",
        })
    }

    // Button End
    //  End Loader - Btn Go Up

    // Start Skills Interval by scrolling
    if (window.scrollY > (skills.offsetTop)) {
        if (!started){
            skillProgress.forEach((skill) => {
                startFindSkills(skill)
            })
            started = true;
        }
    }
    // End Skills Interval by scrolling
}
function startFindSkills(el){
    let skillGoal = el.dataset.progress;
    let currentnumber = 0;
    let countSkill = setInterval(() => {
        el.style = `width: ${currentnumber++}%`
        if (currentnumber >= parseInt(skillGoal)){
            clearInterval(countSkill);
        };
    }, 2000 / skillGoal);
}
// End Skills 

// Gallery Start
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", event => {
        let overlay = document.createElement("div");

        overlay.className = `popup-overlay`;


        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");

        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            let imgHeading = document.createElement("h3");

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        }

        let popupImage = document.createElement("img")

        popupImage.src = img.src;

            popupBox.appendChild(popupImage);
            
            let closeButton = document.createElement("span");
            
            let closeButtonText = document.createTextNode("X");
            
            closeButton.append(closeButtonText);
            
            closeButton.className = 'close-button';
            
            popupBox.appendChild(closeButton);
            
            document.body.appendChild(popupBox);

    })
})

document.addEventListener("click", e => {
    if(e.target.className == "close-button"){
        
        e.target.parentNode.remove()

        document.querySelector(".popup-overlay").remove();
    }
    
})

// Gallery End 