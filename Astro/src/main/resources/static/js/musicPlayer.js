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
const sideMenuSongName = document.getElementById("sideMenuSongName");
const sideMenuArtistName = document.getElementById("sideMenuArtistName");
const sideMenuImage = document.getElementById("sideMenuSongImage");
const songLyrics = document.getElementById("songLyrics");

const accessToken = "bE8LQ_zSqZiH5JqsdgGdNXEX1JT6HiP4DZzHTOlfkSFy06V0jcJafH2pjs8-qNmF"; // Substitua pela sua chave da API Genius

// Função para buscar a letra da música com a API Genius
async function fetchLyrics(songTitle) {
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}`;

    try {
        const response = await fetch(searchUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Debug para verificar o status e o conteúdo da resposta
        console.log("Status da resposta:", response.status);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados da resposta:", data); // Mostra o conteúdo da resposta para análise

        const song = data.response.hits[0]; // Seleciona a primeira música encontrada
        if (song) {
            return `<a href="${song.result.url}" target="_blank">Ver Letra Completa</a>`;
        } else {
            return "Letra não encontrada";
        }
    } catch (error) {
        console.error("Erro ao buscar letra:", error.message);
        return "Erro ao buscar letra";
    }
}

// Função para carregar a música e exibir letra
async function loadSong(song) {
    player.src = song.url;
    imgSong.src = song.image.url;
    imgSong.alt = song.image.alt;
    musicName.textContent = song.name;
    artistName.textContent = song.artist;
    sideMenuSongName.textContent = song.name;
    sideMenuArtistName.textContent = song.artist;
    sideMenuImage.src = song.image.url;
    
    // Buscar e exibir a letra
    const lyricsContent = await fetchLyrics(song.name, song.artist);
    songLyrics.innerHTML = lyricsContent;
    
    player.load();
}

// Configurar slider das faixas
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

        slide.querySelector(".track-item").addEventListener("click", async () => {
            currentSongIndex = index;
            localStorage.setItem("currentSongIndex", currentSongIndex);
            await loadSong(track);
            playSong();
        });

        trackSlider.appendChild(slide);
    });
}

// Controle do volume e ícone
const volumeIcon = document.querySelector("span.volume_up");
let isMuted = false;

function updateVolumeIcon() {
    if (player.volume === 0) {
        volumeIcon.innerHTML = "volume_off";
        isMuted = true;
    } else {
        volumeIcon.innerHTML = "volume_up";
        isMuted = false;
    }
}

// Evento para alternar mute/unmute
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

// Evento de atualização do volume
volumeSlider.addEventListener("input", () => {
    player.volume = volumeSlider.value;
    localStorage.setItem("currentVolume", player.volume);
    updateVolumeIcon();
});

// Funções de controle do player
function playSong() {
    player.play();
    playPauseButton.innerHTML = '<span class="material-symbols-outlined pause">pause</span>';
    localStorage.setItem("isPlaying", "true");
}

function pauseSong() {
    player.pause();
    playPauseButton.innerHTML = '<span class="material-symbols-outlined play_arrow">play_arrow</span>';
    localStorage.setItem("isPlaying", "false");
}

// Controles de próxima e anterior
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % localSongs.length;
    localStorage.setItem("currentSongIndex", currentSongIndex);
    loadSong(localSongs[currentSongIndex]);
    playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + localSongs.length) % localSongs.length;
    localStorage.setItem("currentSongIndex", currentSongIndex);
    loadSong(localSongs[currentSongIndex]);
    playSong();
}

// Atualização da barra de progresso
function updateProgressBar() {
    const progressPercentage = (player.currentTime / player.duration) * 100;
    progressBar.style.width = progressPercentage + "%";
    currentTimeDisplay.textContent = formatTime(player.currentTime);
    durationDisplay.textContent = formatTime(player.duration);
}

// Função de formatação de tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsDisplay = Math.floor(seconds % 60);
    return `${minutes}:${secondsDisplay < 10 ? "0" : ""}${secondsDisplay}`;
}

// Evento para atualizar o progresso
progressBarContainer.addEventListener("click", (event) => {
    const progressBarWidth = progressBarContainer.clientWidth;
    const clickX = event.offsetX;
    const newTime = (clickX / progressBarWidth) * player.duration;
    player.currentTime = newTime;
});

// Controles do teclado
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        nextSong();
    } else if (event.key === "ArrowLeft") {
        prevSong();
    } else if (event.key === " ") {
        if (player.paused) {
            playSong();
        } else {
            pauseSong();
        }
    } else if (event.key === "m") {
        if (player.volume === 0) {
            player.volume = parseFloat(localStorage.getItem("currentVolume")) || 1;
        } else {
            localStorage.setItem("currentVolume", player.volume);
            player.volume = 0;
        }
    }
});

// Carregar o estado salvo e iniciar
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
        volumeSlider.value = player.volume;
    }

    if (savedPlaying) {
        playSong();
    }
}

// Eventos para salvar o tempo atual e carregar a faixa seguinte
player.addEventListener("pause", () => {
    localStorage.setItem("currentTime", player.currentTime);
});
player.addEventListener("ended", nextSong);

// Iniciar aplicação
loadSavedState();
loadTrackSlider();
