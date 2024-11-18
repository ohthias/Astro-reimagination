let score = 0;
let isPlaying = false;
let activeArrows = [];
let gameTime = 30;
let timerInterval = null;
let arrowInterval = null;
let beatsPerMinute = 120; // BPM inicial
let beatInterval = (60 / beatsPerMinute) * 2500; // Intervalo entre batidas em milissegundos
let audio = document.getElementById("audio");
let startBtn = document.getElementById("start-btn");
let scoreDisplay = document.getElementById("score");
let feedback = document.getElementById("feedback");
let timerDisplay = document.getElementById("timer");
let arrowContainer = document.getElementById("arrow-container");
let powerUpAudio = new Audio("powerup-sound.mp3");  // Som de power-up

// Função para reiniciar o jogo
startBtn.addEventListener("click", startGame);

function startGame() {
    score = 0;
    isPlaying = true;
    gameTime = 30;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    feedback.textContent = "";
    timerDisplay.textContent = `Tempo: ${gameTime}`;
    startBtn.disabled = true;
    audio.play();

    // Iniciar o cronômetro
    timerInterval = setInterval(() => {
        if (gameTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(arrowInterval);
            feedback.textContent = "Fim de Jogo!";
            startBtn.disabled = false;
            audio.pause();
        } else {
            gameTime--;
            timerDisplay.textContent = `Tempo: ${gameTime}`;
            adjustDifficulty(gameTime);
        }
    }, 1000);

    // Iniciar a geração das setas sincronizadas com a música
    arrowInterval = setInterval(() => {
        if (isPlaying) {
            randomArrows();
        }
    }, beatInterval);
}

// Ajuste da dificuldade
function adjustDifficulty(timeRemaining) {
    if (timeRemaining === 20) {
        beatsPerMinute = 140;
    } else if (timeRemaining === 10) {
        beatsPerMinute = 160;
    } else if (timeRemaining === 5) {
        beatsPerMinute = 180;
    }

    beatInterval = (60 / beatsPerMinute) * 1000;

    // Adicionando power-up aleatório a cada 5 segundos
    if (Math.random() < 0.1) {
        activatePowerUp();
    }
}

function randomArrows() {
    const arrows = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const activeArrowsCount = Math.floor(Math.random() * 3) + 1; // Gerar de 1 a 3 setas por batida

    activeArrows = [];
    for (let i = 0; i < activeArrowsCount; i++) {
        const arrow = arrows[Math.floor(Math.random() * arrows.length)];
        activeArrows.push(arrow);

        const arrowElement = document.createElement("div");
        arrowElement.classList.add("arrow");
        arrowElement.textContent = getArrowSymbol(arrow);
        arrowElement.setAttribute("data-arrow", arrow);

        arrowContainer.appendChild(arrowElement);
        animateArrow(arrowElement);
    }
}

function animateArrow(arrowElement) {
    const arrowPosition = 300; // Posição final da seta (no centro)

    arrowElement.animate(
        [{ top: "-60px" }, { top: `${arrowPosition}px` }],
        { duration: beatInterval, easing: "linear" }
    );

    setTimeout(() => {
        if (arrowElement.getBoundingClientRect().top > arrowPosition - 10) {
            arrowElement.remove();
            feedback.textContent = "Errou!";
        }
    }, beatInterval);
}

function getArrowSymbol(direction) {
    switch (direction) {
        case "ArrowUp": return "↑";
        case "ArrowDown": return "↓";
        case "ArrowLeft": return "←";
        case "ArrowRight": return "→";
        default: return "";
    }
}

document.addEventListener("keydown", (event) => {
    if (!activeArrows.length) return;

    let arrowFound = false;
    activeArrows.forEach((arrow) => {
        const arrows = document.querySelectorAll(".arrow");
        arrows.forEach(arrowElement => {
            if (arrowElement.getAttribute("data-arrow") === event.key) {
                arrowFound = true;
                score++;
                scoreDisplay.textContent = `Pontuação: ${score}`;
                feedback.textContent = "Acertou!";
                arrowElement.classList.add("correct");
                setTimeout(() => {
                    arrowElement.remove();
                }, 500);
            }
        });
    });

    if (!arrowFound) {
        feedback.textContent = "Errou!";
        const arrows = document.querySelectorAll(".arrow");
        arrows.forEach(arrowElement => {
            arrowElement.classList.add("wrong");
            setTimeout(() => {
                arrowElement.remove();
            }, 500);
        });
    }

    activeArrows = []; // Resetando as setas ativas
    setTimeout(() => {
        feedback.textContent = "";
    }, 500);
});

// Função para ativar o power-up
function activatePowerUp() {
    feedback.textContent = "Power-up ativado!";
    powerUpAudio.play();
    // Por exemplo, desacelerar a música ou adicionar um bônus
    setTimeout(() => {
        feedback.textContent = "";
    }, 2000);
}
