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

// Utworzenie obiektów audio (muzyka tła, dźwięk kliknięcia i koniec gry)
const backgroundMusic = new Audio("./audio/HeadEmpty.mp3");
const clickSound = new Audio("./audio/Click.wav");
const endGameSound = new Audio("./audio/EndGame.wav");

// Zmienne sterujące stanem gry
let pointsNumber = 0; // aktualna liczba punktów gracza
let canClickFlag = true; // blokada wielokrotnego kliknięcia w jednym cyklu
let allTime = 30; // czas gry w sekundach
let canClick = false;
let checkedElem; // zaznaczony input
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const SQUARE_MOVE_INTERVAL = 800;

const stopAudio = (audioName) => {
    audioName.pause();
    audioName.currentTime = 0;
};

// Obsługa kliknięcia przycisku startu gry
startGameBtn.addEventListener("click", () => {
    timeInputs.forEach((element) => {
        // element.addEventListener("click", () => {
        element.checked ? (checkedElem = element.id) : [];
        console.log(checkedElem);
        // });
    });
    // Ustawienie początkowych wartości na ekranie
    points.innerText = pointsNumber;
    time.innerText = allTime;

    // Konfiguracja i uruchomienie muzyki tła
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();

    // Przełączenie widoku na ekran gry
    container.classList.add("in-game");

    // Interwał odpowiedzialny za losowe przemieszczanie kwadratu
    const randomPosition = setInterval(() => {
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

    // Interwał odliczający czas gry
    const timeInterval = setInterval(() => {
        // Zmniejszenie czasu o 1 sekundę
        timeNumber--;
        time.innerText = timeNumber;

        // Zakończenie gry po upływie czasu
        if (timeNumber === 0) {
            container.classList.remove("in-game");
            container.classList.add("end-game");
            clearInterval(timeInterval);
            clearInterval(randomPosition);
            stopAudio(backgroundMusic);
            endGameSound.play();
            totalScore.innerText =
                "Zdobyłeś " +
                pointsNumber +
                " punktów w " +
                allTime +
                " sekund";
            pointsNumber = 0;
        }
    }, 1000);
});

// Obsługa kliknięcia w kwadrat
square.addEventListener("click", () => {
    stopAudio(clickSound);
    // Obsługa wyłączania blokady wielokrotnego kliknięcia
    if (canClick) {
        // Punkt można zdobyć tylko raz zanim kwadrat zmieni pozycję
        if (canClickFlag) {
            // Odtworzenie efektu dźwiękowego
            clickSound.play();

            // Zwiększenie liczby punktów i aktualizacja widoku
            pointsNumber++;
            points.innerText = pointsNumber;

            // Zablokowanie kolejnych kliknięć do czasu zmiany pozycji
            canClickFlag = false;
        }
    } else {
        // Odtworzenie efektu dźwiękowego
        clickSound.play();

        // Zwiększenie liczby punktów i aktualizacja widoku
        pointsNumber++;
        points.innerText = pointsNumber;
    }
});

restartGameBtn.addEventListener("click", () => {
    container.classList.remove("end-game");
});

//# sourceMappingURL=main.js.map
