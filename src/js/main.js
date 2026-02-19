const startGameBtn = document.querySelector(".start-game-btn");
const container = document.querySelector(".container");
const square = document.querySelector(".square");
startGameBtn.addEventListener("click", () => {
    container.classList.add("in-game");
});
setInterval(() => {
    square.style.left = Math.floor(Math.random() * (600 - 0 + 1)) + 0 + "px";
}, 1000);
// container.classList.add("in-game");
