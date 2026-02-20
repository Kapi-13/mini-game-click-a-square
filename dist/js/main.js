const startGameBtn = document.querySelector(".start-game-btn");
const container = document.querySelector(".container");
const square = document.querySelector(".square");
const points = document.querySelector(".points");
const sound = new Audio(
    "https://pixabay.com/sound-effects/technology-mouse-clicks-6849/",
);

let pointsNumber = 0;
let leftDistance;
let topDistance;
let oneClick = 0;

startGameBtn.addEventListener("click", () => {
    sound.play();
    container.classList.add("in-game");
    square.addEventListener("click", () => {
        if (oneClick === 0) {
            pointsNumber++;
            points.innerText = pointsNumber;
            oneClick++;
        }
    });
    setInterval(() => {
        leftDistance = Math.floor(Math.random() * (600 - 0 + 1)) + 0 + "px";
        square.style.left = leftDistance;
        topDistance = Math.floor(Math.random() * (400 - 0 + 1)) + 0 + "px";
        square.style.top = topDistance;
        oneClick = 0;
    }, 800);
});

//# sourceMappingURL=main.js.map
