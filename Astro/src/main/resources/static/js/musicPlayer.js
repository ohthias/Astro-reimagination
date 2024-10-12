import localSongs from "./local-tracks/localSongs.mjs";

let currentSongIndex = 0;
const player = document.getElementById("player");
const imgSong = document.getElementById("imgSong");
const musicName = document.getElementById("musicName");
const artistName = document.getElementById("artistName");
const playPauseButton = document.getElementById("playPauseButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");
const progressBar = document.querySelector(".progress");
const progressBarContainer = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");

// Inicialização do Swiper
const swiper = new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Função para carregar e exibir as faixas no slider
function loadTrackSlider() {
  const trackSlider = document.getElementById("lista-local-songs");
  trackSlider.innerHTML = ""; // Limpa os slides existentes

  localSongs.forEach((track, index) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="track-item" data-index="${index}">
        <img src="${track.image.url}" class="track-image" alt="${track.image.alt}" />
        <div class='track-item-detail'>
          <h5 class='montserrat-bold'>${track.name}</h5>
          <p class='montserrat-regular'>${track.artist}</p>
        </div>
      </div>
    `;

    // Adiciona um evento de clique para cada slide
    slide.querySelector(".track-item").addEventListener("click", () => {
      currentSongIndex = index; // Atualiza o índice da música atual
      localStorage.setItem("currentSongIndex", currentSongIndex); // Salva o índice
      loadSong(track); // Carrega a música clicada
      playSong(); // Inicia a reprodução
    });

    trackSlider.appendChild(slide); // Adiciona o slide ao contêiner
  });

  swiper.update(); // Atualiza o Swiper para reconhecer os novos slides
}

// !TODO - Corrigir a função de volume do player
// Configurar o volume inicial do player
//player.volume = volumeSlider.value;

// Função para carregar o estado salvo
function loadSavedState() {
  const savedIndex = localStorage.getItem("currentSongIndex");
  const savedTime = localStorage.getItem("currentTime");
  const savedVolume = localStorage.getItem("currentVolume");
  const savedPlaying = localStorage.getItem("isPlaying") === "true";

  if (savedIndex !== null) {
    currentSongIndex = parseInt(savedIndex, 10);
  }

  loadSong(localSongs[currentSongIndex]);

  if (savedTime !== null) {
    player.currentTime = parseFloat(savedTime);
  }

  if (savedVolume !== null) {
    player.volume = parseFloat(savedVolume);
    volumeSlider.value = player.volume; // Atualiza o slider para o valor salvo
  }

  if (savedPlaying) {
    player.play();
    playPauseButton.innerHTML =
      '<span class="material-symbols-outlined pause">pause</span>';
  }
}

// Função para carregar a música
function loadSong(song) {
  player.src = song.url;
  imgSong.src = song.image.url;
  imgSong.alt = song.image.alt;
  musicName.textContent = song.name;
  artistName.textContent = song.artist;
  player.load();
}

// Funções de controle do player
function playSong() {
  player.play();
  playPauseButton.innerHTML =
    '<span class="material-symbols-outlined pause">pause</span>';
  localStorage.setItem("isPlaying", "true");
}

function pauseSong() {
  player.pause();
  playPauseButton.innerHTML =
    '<span class="material-symbols-outlined play_arrow">play_arrow</span>';
  localStorage.setItem("isPlaying", "false");
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % localSongs.length;
  localStorage.setItem("currentSongIndex", currentSongIndex);
  loadSong(localSongs[currentSongIndex]);
  playSong();
}

function prevSong() {
  currentSongIndex =
    (currentSongIndex - 1 + localSongs.length) % localSongs.length;
  localStorage.setItem("currentSongIndex", currentSongIndex);
  loadSong(localSongs[currentSongIndex]);
  playSong();
}

// Atualiza a barra de progresso
function updateProgressBar() {
  const progressPercentage = (player.currentTime / player.duration) * 100;
  progressBar.style.width = progressPercentage + "%";
  currentTimeDisplay.textContent = formatTime(player.currentTime);
  durationDisplay.textContent = formatTime(player.duration);
}

// Formata o tempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsDisplay = Math.floor(seconds % 60);
  return `${minutes}:${secondsDisplay < 10 ? "0" : ""}${secondsDisplay}`;
}

// !TODO - Corrigir a função de volume do player
// Atualiza o volume do player quando o slider é movido
/*volumeSlider.addEventListener("input", () => {
  player.volume = volumeSlider.value;
  localStorage.setItem("currentVolume", player.volume); // Salva o volume atual
});*/


// Salvar tempo atual antes de mudar de faixa
player.addEventListener("pause", () => {
  localStorage.setItem("currentTime", player.currentTime);
});

player.addEventListener("ended", nextSong);

playPauseButton.addEventListener("click", () => {
  if (player.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
player.addEventListener("timeupdate", updateProgressBar);

// Adicionar evento de clique na barra de progresso
progressBarContainer.addEventListener("click", (event) => {
  const progressBarWidth = progressBarContainer.clientWidth;
  const clickX = event.offsetX;
  const newTime = (clickX / progressBarWidth) * player.duration;
  player.currentTime = newTime;
});

// Carregar estado ao iniciar
loadSavedState();
loadTrackSlider(); // Carrega o slider ao iniciar