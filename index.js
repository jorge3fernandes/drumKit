var buttons = document.querySelectorAll(".drum")

for (var index = 0; index < buttons.length; index++)
    buttons[index].addEventListener("click", function () {

        var buttonInnerHTML = this.innerHTML;
        playSound(buttonInnerHTML)
        buttonAnimation(buttonInnerHTML)

    })

document.addEventListener("keydown", function (event) {

    var key = event.key
    playSound(key)
    buttonAnimation(key)

})

var themeToggleInput = document.getElementById("theme-toggle")
var THEME_STORAGE_KEY = "drumkit-theme"
var Theme = {
    LIGHT: "light",
    DARK: "dark"
}

if (themeToggleInput) {
    applyTheme(getInitialTheme())

    themeToggleInput.addEventListener("change", function (event) {
        applyTheme(event.target.checked ? Theme.LIGHT : Theme.DARK)
    })
}

function getInitialTheme() {
    var storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    if (storedTheme === Theme.LIGHT || storedTheme === Theme.DARK)
        return storedTheme

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches)
        return Theme.LIGHT

    return Theme.DARK
}

function applyTheme(theme) {
    var isLightTheme = theme === Theme.LIGHT
    var nextTheme = isLightTheme ? Theme.DARK : Theme.LIGHT

    document.body.classList.toggle("light-theme", isLightTheme)
    themeToggleInput.checked = isLightTheme
    themeToggleInput.setAttribute("aria-label", "Switch to " + nextTheme + " mode")
    themeToggleInput.setAttribute("aria-checked", String(isLightTheme))
    localStorage.setItem(THEME_STORAGE_KEY, theme)
}

function playSound(buttonInnerHTML){

    switch (buttonInnerHTML) {
        case "w":
            var tom1 = new Audio('sounds/tom-1.mp3');
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio('sounds/tom-2.mp3');
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio('sounds/tom-3.mp3');
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio('sounds/tom-4.mp3');
            tom4.play();
            break;
        case "j":
            var snare = new Audio('sounds/snare.mp3');
            snare.play();
            break;
        case "k":
            var crash = new Audio('sounds/crash.mp3');
            crash.play();
            break;
        case "l":
            var kick = new Audio('sounds/kick-bass.mp3');
            kick.play();
            break;

        default:
            console.log(buttonInnerHTML);
    }

}

function buttonAnimation(currentKey){
    var keyElement = document.querySelector("."+currentKey);

    if(!keyElement)
        return

    keyElement.classList.add("pressed");

    setTimeout( function(){
        keyElement.classList.remove("pressed");
    }, 100);
};
