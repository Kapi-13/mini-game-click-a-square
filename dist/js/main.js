// Pobranie elementów z DOM
const startGameBtn = document.querySelector(".start-game-btn");
const container = document.querySelector(".container");
const square = document.querySelector(".square");
const points = document.querySelector(".points");
const time = document.querySelector(".time");
const endGameScreen = document.querySelector(".end-game-screen");

// Utworzenie obiektów audio (muzyka tła, dźwięk kliknięcia i koniec gry)
const audio = new Audio("./audio/HeadEmpty.mp3");
const clickwave = new Audio("./audio/Point.wav");
const endGameSound = new Audio("./audio/EndGame.wav");

// Zmienne sterujące stanem gry
let pointsNumber = 0; // aktualna liczba punktów gracza
let oneClickFlag = 0; // blokada wielokrotnego kliknięcia w jednym cyklu
let timeNumber = 1; // czas gry w sekundach
let oneClick = false;

// Ustawienie początkowych wartości na ekranie
points.innerText = "0";
time.innerText = "1";

// Obsługa kliknięcia przycisku startu gry
startGameBtn.addEventListener("click", () => {
    // Konfiguracja i uruchomienie muzyki tła
    audio.volume = 0.2;
    audio.play();

    // Przełączenie widoku na ekran gry
    container.classList.add("in-game");

    // Obsługa kliknięcia w kwadrat
    square.addEventListener("click", () => {
        // Obsługa wyłączania blokady wielokrotnego kliknięcia
        if (oneClick === true) {
            // Punkt można zdobyć tylko raz zanim kwadrat zmieni pozycję
            if (oneClickFlag === 0) {
                // Odtworzenie efektu dźwiękowego
                clickwave.play();

                // Zwiększenie liczby punktów i aktualizacja widoku
                pointsNumber++;
                points.innerText = pointsNumber;

                // Zablokowanie kolejnych kliknięć do czasu zmiany pozycji
                oneClickFlag++;
            }
        } else {
            // Odtworzenie efektu dźwiękowego
            clickwave.play();

            // Zwiększenie liczby punktów i aktualizacja widoku
            pointsNumber++;
            points.innerText = pointsNumber;
        }
    });

    // Interwał odpowiedzialny za losowe przemieszczanie kwadratu
    const randomPosition = setInterval(() => {
        // Losowa pozycja pozioma (oś X)
        let leftDistance = Math.floor(Math.random() * (600 - 0 + 1)) + 0 + "px";
        square.style.left = leftDistance;

        // Losowa pozycja pionowa (oś Y)
        let topDistance = Math.floor(Math.random() * (400 - 0 + 1)) + 0 + "px";
        square.style.top = topDistance;

        // Odblokowanie możliwości zdobycia punktu w nowej pozycji
        oneClickFlag = 0;
    }, 800);

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
            audio.pause();
            endGameSound.play();
            endGameScreen;
        }
    }, 1000);
});

//# sourceMappingURL=main.js.map
