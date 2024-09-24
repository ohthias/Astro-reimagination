import localSongs from "./localSongs.mjs";

let currentSongIndex = 0;
const player = document.getElementById('player');
const imgSong = document.getElementById('imgSong');
const musicName = document.getElementById('musicName');
const artistName = document.getElementById('artistName');
const playPauseButton = document.getElementById('playPauseButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const progressBar = document.querySelector('.progress');
const progressBarContainer = document.getElementById('progressBar');

function loadSavedState() {
  const savedIndex = localStorage.getItem('currentSongIndex');
  const savedTime = localStorage.getItem('currentTime');
  const savedPlaying = localStorage.getItem('isPlaying') === 'true';

  if (savedIndex !== null) {
    currentSongIndex = parseInt(savedIndex, 10);
  }

  loadSong(localSongs[currentSongIndex]);

  if (savedTime !== null) {
    player.currentTime = parseFloat(savedTime);
  }

  if (savedPlaying) {
    player.play();
    playPauseButton.innerHTML = '<span class="material-symbols-outlined pause">pause</span>';
  }
}

function loadSong(song) {
  player.src = song.url;
  imgSong.src = song.image.url;
  imgSong.alt = song.image.alt;
  musicName.textContent = song.name;
  artistName.textContent = song.artist;
  player.load();
}

function fadeOut(element, duration, callback) {
  element.style.transition = `opacity ${duration}s`;
  element.style.opacity = 0;
  setTimeout(callback, duration * 1000);
}

function fadeIn(element, duration) {
  element.style.transition = `opacity ${duration}s`;
  element.style.opacity = 1;
}

function playSong() {
  player.play();
  playPauseButton.innerHTML = '<span class="material-symbols-outlined pause">pause</span>';
  localStorage.setItem('isPlaying', 'true');
}

function pauseSong() {
  player.pause();
  playPauseButton.innerHTML = '<span class="material-symbols-outlined play_arrow">play_arrow</span>';
  localStorage.setItem('isPlaying', 'false');
}

function updateProgressBar() {
  const progressPercentage = (player.currentTime / player.duration) * 100;
  progressBar.style.width = progressPercentage + '%';
  currentTimeDisplay.textContent = formatTime(player.currentTime);
  durationDisplay.textContent = formatTime(player.duration);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsDisplay = Math.floor(seconds % 60);
  return `${minutes}:${secondsDisplay < 10 ? '0' : ''}${secondsDisplay}`;
}

function nextSong() {
  fadeOut(imgSong, 0.5, () => {
    currentSongIndex = (currentSongIndex + 1) % localSongs.length;
    localStorage.setItem('currentSongIndex', currentSongIndex);
    loadSong(localSongs[currentSongIndex]);
    fadeIn(imgSong, 0.5);
    playSong();
  });
}

function prevSong() {
  fadeOut(imgSong, 0.5, () => {
    currentSongIndex = (currentSongIndex - 1 + localSongs.length) % localSongs.length;
    localStorage.setItem('currentSongIndex', currentSongIndex);
    loadSong(localSongs[currentSongIndex]);
    fadeIn(imgSong, 0.5);
    playSong();
  });
}

// Salvar tempo atual antes de mudar de faixa
player.addEventListener('pause', () => {
  localStorage.setItem('currentTime', player.currentTime);
});

player.addEventListener('ended', nextSong);

playPauseButton.addEventListener('click', () => {
  if (player.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
player.addEventListener('timeupdate', updateProgressBar);

// Adicionar evento de clique na barra de progresso
progressBarContainer.addEventListener('click', (event) => {
  const progressBarWidth = progressBarContainer.clientWidth; // largura total da barra
  const clickX = event.offsetX; // posição do clique
  const newTime = (clickX / progressBarWidth) * player.duration; // calcular novo tempo
  player.currentTime = newTime; // atualizar o tempo atual do player
});

// Carregar estado ao iniciar
loadSavedState();