const startGameBtn = document.querySelector(".start-game-btn");
const container = document.querySelector(".container");
const square = document.querySelector(".square");
const points = document.querySelector(".points");

let pointsNumber = 0;
let leftDistance;

startGameBtn.addEventListener("click", () => {
    container.classList.add("in-game");
    square.addEventListener("click", () => {
        pointsNumber++;
        points.innerText = pointsNumber;
    });
    setInterval(() => {
        leftDistance = Math.floor(Math.random() * (600 - 0 + 1)) + 0 + "px";
        square.style.left = leftDistance;
    }, 800);
});

// container.classList.add("in-game");
