const startGameBtn = document.querySelector(".start-game-btn");
const container = document.querySelector(".container");
const square = document.querySelector(".square");
const points = document.querySelector(".points");
const time = document.querySelector(".time");
const endGameScreen = document.querySelector(".end-game-screen");
const audio = new Audio("./audio/HeadEmpty.mp3");
let pointsNumber = 0;
let oneClick = 0;
let timeNumber = 30;

points.innerText = "0";
time.innerText = "30";

startGameBtn.addEventListener("click", () => {
    audio.volume = 0.6;
    audio.play();
    container.classList.add("in-game");
    square.addEventListener("click", () => {
        if (oneClick === 0) {
            pointsNumber++;
            points.innerText = pointsNumber;
            oneClick++;
        }
    });
    const randomPositionInterval = setInterval(() => {
        let leftDistance = Math.floor(Math.random() * (600 - 0 + 1)) + 0 + "px";
        square.style.left = leftDistance;
        let topDistance = Math.floor(Math.random() * (400 - 0 + 1)) + 0 + "px";
        square.style.top = topDistance;
        oneClick = 0;
    }, 800);
    const timeInterval = setInterval(() => {
        timeNumber--;
        time.innerText = timeNumber;
        if (timeNumber === 0) {
            clearInterval(timeInterval);
            clearInterval(randomPositionInterval);
            audio.pause();
        }
    }, 1000);
});

//# sourceMappingURL=main.js.map
