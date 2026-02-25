// Pobranie elementów z DOM
const startGameBtn = document.querySelector(".start-game-btn");
const container = document.querySelector(".container");
const square = document.querySelector(".square");
const points = document.querySelector(".points");
const time = document.querySelector(".time");
const endGameScreen = document.querySelector(".end-game-screen");
const totalScore = document.querySelector(".total-score");
const restartGameBtn = document.querySelector(".restart-game-btn");
const timeInputs = document.querySelectorAll(".time-mode-inputs input");
const endInfinityGameBtn = document.querySelector(".end-game-btn");

// Utworzenie obiektów audio (muzyka tła, dźwięk kliknięcia i koniec gry)
const backgroundMusic = new Audio("./audio/HeadEmpty.mp3");
const clickSound = new Audio("./audio/Click.wav");
const endGameSound = new Audio("./audio/EndGame.wav");

// Zmienne sterujące stanem gry
let pointsNumber = 0; // aktualna liczba punktów gracza
let allTime; // czas gry w sekundach
let checkedElem; // zaznaczony input
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const SQUARE_MOVE_INTERVAL = 800;
let timeInterval;
let randomPosition;
endInfinityGameBtn.style.display = "none";

const stopAudio = (audioName) => {
    audioName.pause();
    audioName.currentTime = 0;
};

const endGame = () => {
    endInfinityGameBtn.style.display = "none";
    container.classList.remove("in-game");
    container.classList.add("end-game");
    clearInterval(timeInterval);
    clearInterval(randomPosition);
    stopAudio(backgroundMusic);
    endGameSound.play();
    allTime === "infinity"
        ? (totalScore.innerText =
              "Zdobyłeś " +
              pointsNumber +
              " punktów w " +
              "nieskończonym czasie")
        : (totalScore.innerText =
              "Zdobyłeś " + pointsNumber + " punktów w " + allTime + " sekund");
    pointsNumber = 0;
};

// Obsługa kliknięcia przycisku startu gry
startGameBtn.addEventListener("click", () => {
    timeInputs.forEach((element) => {
        element.checked ? (allTime = element.id) : [];
        console.log(allTime);
    });
    // Ustawienie początkowych wartości na ekranie
    points.innerText = pointsNumber;
    time.innerText = allTime;
    backgroundMusic.loop = true;

    // Konfiguracja i uruchomienie muzyki tła
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();

    // Przełączenie widoku na ekran gry
    container.classList.add("in-game");

    // Interwał odpowiedzialny za losowe przemieszczanie kwadratu
    randomPosition = setInterval(() => {
        // Losowa pozycja pozioma (oś X)
        let leftDistance =
            Math.floor(Math.random() * (GAME_WIDTH - 0 + 1)) + 0 + "px";
        square.style.left = leftDistance;

        // Losowa pozycja pionowa (oś Y)
        let topDistance =
            Math.floor(Math.random() * (GAME_HEIGHT - 0 + 1)) + 0 + "px";
        square.style.top = topDistance;

        // Odblokowanie możliwości zdobycia punktu w nowej pozycji
        canClickFlag = 0;
    }, SQUARE_MOVE_INTERVAL);

    let timeNumber = allTime; // pozostały czas gry
    console.log(timeNumber, allTime, time);
    if (allTime === "infinity") {
        time.innerText = "Nieskończony czas";
        endInfinityGameBtn.style.display = "block";
    } else {
        // Interwał odliczający czas gry
        timeInterval = setInterval(() => {
            // Zmniejszenie czasu o 1 sekundę
            timeNumber--;
            time.innerText = timeNumber;

            // Zakończenie gry po upływie czasu
            if (timeNumber === 0) {
                endGame();
            }
        }, 1000);
    }
});

// Obsługa kliknięcia w kwadrat
square.addEventListener("click", () => {
    stopAudio(clickSound);
    // Odtworzenie efektu dźwiękowego
    clickSound.play();

    // Zwiększenie liczby punktów i aktualizacja widoku
    pointsNumber++;
    points.innerText = pointsNumber;
});

restartGameBtn.addEventListener("click", () => {
    container.classList.remove("end-game");
});

endInfinityGameBtn.addEventListener("click", () => {
    endGame();
});
