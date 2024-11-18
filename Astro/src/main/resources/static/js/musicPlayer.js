import {localSongs} from "./local-tracks/localSongs.js";
import {colorImage, showPopup} from "./musicPlayer/utils.js";
import {getLyrics} from "./musicPlayer/lyrics.js";
import {fetchMusicDetails} from "./musicPlayer/songDetails.js";

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
const sideMenuSongName = document.getElementById("sideMenuSongName");
const sideMenuArtistName = document.getElementById("sideMenuArtistName");
const sideMenuImage = document.getElementById("sideMenuSongImage");

let jumpCount = 0;
let lastJumpTime = Date.now();

const MAX_JUMPS_PER_HOUR = 6;
const HOUR_IN_MS = 3600000;

const favoriteButton = document.getElementById("favoriteButton");
let favoriteSongs = JSON.parse(localStorage.getItem("favoriteSongs")) || [];

loadTrackSlider(); // Garante que o DOM está pronto

// Adiciona a lógica para favoritar/desfavoritar músicas
function toggleFavorite() {
  const currentSong = localSongs[currentSongIndex];

  if (!currentSong) {
    console.error("Nenhuma música está sendo reproduzida para favoritar.");
    return;
  }

  const isFavorite = favoriteSongs.some(
    (favSong) => favSong.url === currentSong.url
  );

  if (isFavorite) {
    favoriteSongs = favoriteSongs.filter(
      (favSong) => favSong.url !== currentSong.url
    );
    favoriteButton.innerHTML = "favorite_border"; // Ícone de coração vazio
    favoriteButton.classList.remove("favorited");
    showPopup(`${currentSong.name} removida dos favoritos!`);
  } else {
    favoriteSongs.push(currentSong);
    favoriteButton.innerHTML = "favorite"; // Ícone de coração preenchido
    favoriteButton.classList.add("favorited");
    showPopup(`${currentSong.name} adicionada aos favoritos!`);
  }

  localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs));
}

// Atualiza o estado do botão de favorito
function updateFavoriteButton(song) {
  const isFavorite = favoriteSongs.some((favSong) => favSong.url === song.url);

  if (isFavorite) {
    favoriteButton.innerHTML = "favorite"; // Ícone de coração preenchido
    favoriteButton.classList.add("favorited");
  } else {
    favoriteButton.innerHTML = "favorite_border"; // Ícone de coração vazio
    favoriteButton.classList.remove("favorited");
  }
}

// Eventos do botão de favorito
favoriteButton.addEventListener("click", toggleFavorite);

export function loadTrackSlider() {
  const trackSlider = document.getElementById("localListSongs");

  if (!trackSlider) {
    console.warn("Elemento 'localListSongs' não encontrado.");
    return;
  }

  trackSlider.innerHTML = ""; // Limpa o conteúdo anterior

  localSongs.forEach((track, index) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = (`
      <div class="track-item" data-index="${index}">
        <img
          src="${track.image.url}"
          class="track-image"
          alt="${track.image.alt}"
        />
        <div class="track-item-detail">
          <h5 class="montserrat-bold">${track.name}</h5>
          <p class="montserrat-regular">${track.artist}</p>
        </div>
      </div>`
    );

    slide.querySelector(".track-item").addEventListener("click", () => {
      currentSongIndex = index;
      localStorage.setItem("currentSongIndex", currentSongIndex);
      loadSong(track);
      playSong();
    });

    trackSlider.appendChild(slide); // Adiciona o slide ao contêiner
  });
}

// Configurar o volume inicial do player
player.volume = volumeSlider.value;

// Função para carregar o estado salvo
export function loadSavedState() {
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
async function loadSong(song) {
  if (!song) {
    console.error("Nenhuma música encontrada para carregar.");
    setPlaceholder();
    return;
  }

  player.src = song.url; // Configura a URL da música
  imgSong.src = song.image.url;
  imgSong.alt = song.image.alt;
  musicName.textContent = song.name;
  artistName.textContent = song.artist;
  sideMenuSongName.textContent = song.name;
  sideMenuArtistName.textContent = song.artist;
  sideMenuImage.src = song.image.url;

  getLyrics(song.artist, song.name);

  try {
    const backgroundLyrics = await colorImage(song.image.url);
    songLyrics.style.background = backgroundLyrics;
  } catch (error) {
    console.error(error);
  }

  fetchMusicDetails(song.name, song.artist);
  updateFavoriteButton(song)
  player.load(); // Carrega o áudio no player
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

function canJump() {
  const currentTime = Date.now();

  // Reseta o contador se uma hora se passou
  if (currentTime - lastJumpTime > HOUR_IN_MS) {
    jumpCount = 0;
    lastJumpTime = currentTime;
  }

  return jumpCount < MAX_JUMPS_PER_HOUR;
}

function nextSong() {
  if (!canJump()) {
    showPopup("Você atingiu o limite de pulos! Tente novamente mais tarde.");
    return;
  }

  // Incrementa o índice da música atual
  currentSongIndex = (currentSongIndex + 1) % localSongs.length;

  // Salva o índice atual no localStorage
  localStorage.setItem("currentSongIndex", currentSongIndex);

  // Carrega e toca a próxima música
  loadSong(localSongs[currentSongIndex]);
  playSong();

  jumpCount++;
}

function prevSong() {
  if (!canJump()) {
    showPopup("Você atigiu os limite de pulos por hora, aguarde!")
    return;
  }

  currentSongIndex =
    (currentSongIndex - 1 + localSongs.length) % localSongs.length;
  localStorage.setItem("currentSongIndex", currentSongIndex);
  loadSong(localSongs[currentSongIndex]);
  playSong();

  jumpCount++;
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

// Atualiza o volume do player quando o slider é movido
const volumeIcon = document.querySelector("span.volume_up");
let isMuted = false;

const savedVolume = localStorage.getItem("currentVolume");
if (savedVolume !== null) {
  player.volume = parseFloat(savedVolume);
  volumeSlider.value = player.volume;
  updateVolumeIcon();
}

function updateVolumeIcon() {
  if (player.volume === 0) {
    volumeIcon.innerHTML = "volume_off";
    volumeIcon.classList.add("volume_off");
    isMuted = true;
  } else {
    volumeIcon.innerHTML = "volume_up";
    volumeIcon.classList.remove("volume_off");
    isMuted = false;
  }
}

// Evento para mudar o volume com o slider
volumeSlider.addEventListener("input", () => {
  player.volume = volumeSlider.value;
  localStorage.setItem("currentVolume", player.volume); // Salva o volume atual
  updateVolumeIcon();
});

// Evento para alternar entre mute e unmute
volumeIcon.addEventListener("click", () => {
  if (isMuted) {
    player.volume = parseFloat(localStorage.getItem("currentVolume")) || 1;
    updateVolumeIcon();
  } else {
    localStorage.setItem("currentVolume", player.volume);
    player.volume = 0;
    updateVolumeIcon();
  }
});

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

let isPlay = false;
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    nextSong();
  } else if (event.key === "ArrowLeft") {
    prevSong();
  } else if (event.key === " ") {
    if (isPlay) {
      pauseSong();
    } else {
      playSong();
    }
    isPlay = !isPlay; // Inverte o estado de reprodução
  } else if (event.key === "m") {
    if (player.volume === 0) {
      const currentVolume = localStorage.getItem("currentVolume");
      player.volume = currentVolume !== null ? parseFloat(currentVolume) : 1; // Define um volume padrão
    } else {
      localStorage.setItem("currentVolume", player.volume);
      player.volume = 0;
    }
  }
});

loadSavedState(); 