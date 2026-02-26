// Pobranie elementów z DOM
const startGameBtn = document.querySelector('.start-game-btn');
const container = document.querySelector('.container');
const square = document.querySelector('.square');
const points = document.querySelector('.points');
const time = document.querySelector('.time');
const endGameScreen = document.querySelector('.end-game-screen');
const totalScore = document.querySelector('.total-score');
const restartGameBtn = document.querySelector('.restart-game-btn');
const timeInputs = document.querySelectorAll('.time-mode-inputs input');
const squareMoveInputs = document.querySelectorAll('.square-move-inputs input');
const endInfinityGameBtn = document.querySelector('.end-game-btn');

// Utworzenie obiektów audio (muzyka tła, dźwięk kliknięcia i koniec gry)
const backgroundMusic = new Audio('./audio/HeadEmpty.mp3');
const clickSound = new Audio('./audio/Click.wav');
const endGameSound = new Audio('./audio/EndGame.wav');

// Zmienne sterujące stanem gry
let pointsNumber = 0; // aktualna liczba punktów gracza
let allTime; // czas gry w sekundach
let faster; // przyśpieszenie gry
let checkedElem; // zaznaczony input
const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
let SQUARE_MOVE_INTERVAL;
let timeInterval;
let randomPosition;
endInfinityGameBtn.style.display = 'none';

const stopAudio = (audioName) => {
    audioName.pause();
    audioName.currentTime = 0;
};

const endGame = () => {
    endInfinityGameBtn.style.display = 'none';
    container.classList.remove('in-game');
    container.classList.add('end-game');
    clearInterval(timeInterval);
    clearInterval(randomPosition);
    stopAudio(backgroundMusic);
    endGameSound.play();
    allTime === 'infinity'
        ? (totalScore.innerText = `Zdobyłeś ${pointsNumber} punktów w nieskończonym czasie i zmianie pozycji co ${SQUARE_MOVE_INTERVAL} ms`)
        : (totalScore.innerText = `Zdobyłeś ${pointsNumber} punktów w ${allTime} sekund i zmianie pozycji co ${SQUARE_MOVE_INTERVAL} ms`);
    pointsNumber = 0;
};

// Obsługa kliknięcia przycisku startu gry
startGameBtn.addEventListener('click', () => {
    timeInputs.forEach((element) => {
        element.checked ? (allTime = element.id) : [];
        console.log(allTime);
    });
    squareMoveInputs.forEach((element) => {
        element.checked ? (SQUARE_MOVE_INTERVAL = element.id) : [];
        console.log(SQUARE_MOVE_INTERVAL);
    });
    // Ustawienie początkowych wartości na ekranie
    points.innerText = pointsNumber;
    time.innerText = allTime;
    backgroundMusic.loop = true;

    // Konfiguracja i uruchomienie muzyki tła
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();

    // Przełączenie widoku na ekran gry
    container.classList.add('in-game');

    // Interwał odpowiedzialny za losowe przemieszczanie kwadratu
    const setRandomPosition = () => {
        randomPosition = setInterval(() => {
            SQUARE_MOVE_INTERVAL = 200;
            // Losowa pozycja pozioma (oś X)
            let leftDistance = Math.floor(Math.random() * (GAME_WIDTH - 0 + 1)) + 0 + 'px';
            square.style.left = leftDistance;

            // Losowa pozycja pionowa (oś Y)
            let topDistance = Math.floor(Math.random() * (GAME_HEIGHT - 0 + 1)) + 0 + 'px';
            square.style.top = topDistance;
        }, SQUARE_MOVE_INTERVAL);
    };

    setRandomPosition();
    let timeNumber = allTime; // pozostały czas gry
    if (allTime === 'infinity') {
        time.innerText = 'Nieskończony czas';
        endInfinityGameBtn.style.display = 'block';
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
square.addEventListener('click', () => {
    stopAudio(clickSound);
    // Odtworzenie efektu dźwiękowego
    clickSound.play();

    // Zwiększenie liczby punktów i aktualizacja widoku
    pointsNumber++;
    points.innerText = pointsNumber;
});

restartGameBtn.addEventListener('click', () => {
    container.classList.remove('end-game');
});

endInfinityGameBtn.addEventListener('click', () => {
    endGame();
});
