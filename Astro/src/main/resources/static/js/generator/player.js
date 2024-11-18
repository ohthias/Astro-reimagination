// Criação da estrutura HTML para o player usando JavaScript
const containerPlayer = document.createElement("div");
containerPlayer.className = "container_player";

const player = document.createElement("div");
player.className = "player";

const sideLeft = document.createElement("div");
sideLeft.className = "side-left";

const playerImage = document.createElement("div");
playerImage.className = "player_image";

const imgSong = document.createElement("img");
imgSong.id = "imgSong";
imgSong.src = "https://fakeimg.pl/210x210/e9e9e9/e9e9e9";
imgSong.alt = "Song_Image";
playerImage.appendChild(imgSong);

const playerInfoMusic = document.createElement("div");
playerInfoMusic.className = "player_infoMusic";

const musicName = document.createElement("span");
musicName.id = "musicName";
musicName.className = "montserrat-bold";
musicName.textContent = "Título da Música";

const artistName = document.createElement("span");
artistName.id = "artistName";
artistName.className = "montserrat-regular";
artistName.textContent = "Artista";

playerInfoMusic.appendChild(musicName);
playerInfoMusic.appendChild(artistName);
sideLeft.appendChild(playerImage);
sideLeft.appendChild(playerInfoMusic);
player.appendChild(sideLeft);

// Controles de usuário
const userPrefers = document.createElement("div");
userPrefers.className = "user-prefers";

const heartMusicButton = document.createElement("button");
heartMusicButton.id = "heartMusic";
const heartIcon = document.createElement("span");
heartIcon.className = "material-symbols-outlined heart";
heartIcon.textContent = "favorite";
heartMusicButton.appendChild(heartIcon);

const prevButton = document.createElement("button");
prevButton.id = "prevButton";
const prevIcon = document.createElement("span");
prevIcon.className = "material-symbols-outlined skip_previous";
prevIcon.textContent = "skip_previous";
prevButton.appendChild(prevIcon);

const playPauseButton = document.createElement("button");
playPauseButton.id = "playPauseButton";
const playIcon = document.createElement("span");
playIcon.className = "material-symbols-outlined play_arrow";
playIcon.textContent = "play_arrow";
playPauseButton.appendChild(playIcon);

const nextButton = document.createElement("button");
nextButton.id = "nextButton";
const nextIcon = document.createElement("span");
nextIcon.className = "material-symbols-outlined skip_next";
nextIcon.textContent = "skip_next";
nextButton.appendChild(nextIcon);

const randomPlayerMusicButton = document.createElement("button");
randomPlayerMusicButton.id = "randomPlayerMusic";
const shuffleIcon = document.createElement("span");
shuffleIcon.className = "material-symbols-outlined shuffle";
shuffleIcon.textContent = "shuffle";
randomPlayerMusicButton.appendChild(shuffleIcon);

userPrefers.appendChild(heartMusicButton);
userPrefers.appendChild(prevButton);
userPrefers.appendChild(playPauseButton);
userPrefers.appendChild(nextButton);
userPrefers.appendChild(randomPlayerMusicButton);
player.appendChild(userPrefers);

// Player de áudio
const audioPlayer = document.createElement("audio");
audioPlayer.id = "player";
audioPlayer.src = "";
player.appendChild(audioPlayer);

// Barra de progresso e tempo
const timecodePlayer = document.createElement("div");
timecodePlayer.className = "timecode_player";

const currentTime = document.createElement("span");
currentTime.id = "currentTime";
currentTime.className = "montserrat-medium";
currentTime.textContent = "0:00";

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";
progressBar.id = "progressBar";
progressBar.style.cursor = "pointer";

const progress = document.createElement("div");
progress.className = "progress";
progressBar.appendChild(progress);

const duration = document.createElement("span");
duration.id = "duration";
duration.className = "montserrat-medium";
duration.textContent = "0:00";

timecodePlayer.appendChild(currentTime);
timecodePlayer.appendChild(progressBar);
timecodePlayer.appendChild(duration);
player.appendChild(timecodePlayer);

// Controle de volume e botão de menu lateral
const volumeControl = document.createElement("div");
volumeControl.className = "volume-control";

const volumeIcon = document.createElement("span");
volumeIcon.className = "material-symbols-outlined volume_up";
volumeIcon.textContent = "volume_up";

const volumeToolkit = document.createElement("div");
volumeToolkit.className = "volume-toolkit";

const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.id = "volumeSlider";
volumeSlider.min = "0";
volumeSlider.max = "1";
volumeSlider.step = "0.01";
volumeSlider.value = "1";

volumeToolkit.appendChild(volumeSlider);
volumeControl.appendChild(volumeIcon);
volumeControl.appendChild(volumeToolkit);
player.appendChild(volumeControl);

// Botão de "info" para abrir o menu lateral
const infoButton = document.createElement("button");
infoButton.className = "info-button";
const spanInfoButton = document.createElement("span");
spanInfoButton.className = "material-symbols-outlined";
spanInfoButton.textContent = "add";

infoButton.appendChild(spanInfoButton);

infoButton.onclick = () => {
  sideMenu.classList.toggle("visible"); // Alterna a visibilidade do menu lateral
  mainContent.classList.toggle("menu-active"); // Adiciona classe ao main quando o menu está ativo

  spanInfoButton.textContent = spanInfoButton.textContent === "add" ? "close" : "add";
  spanInfoButton.classList.add("rotate-animation");

  spanInfoButton.addEventListener("animationend", () => {
    spanInfoButton.classList.remove("rotate-animation");
  }, { once: true });
};

player.appendChild(infoButton);

// Adiciona o player ao container
containerPlayer.appendChild(player);
document.body.appendChild(containerPlayer); // Adiciona o container ao body

// Menu lateral com informações da música e letra
const sideMenu = document.createElement("div");
sideMenu.className = "side-menu";

const songDetails = document.createElement("div");
songDetails.className = "song-details";

const songImageMenu = document.createElement("img");
songImageMenu.id = "sideMenuSongImage";
songImageMenu.src = "https://fakeimg.pl/210x210/e9e9e9/e9e9e9";
songImageMenu.alt = "Song_Image";

const songTitle = document.createElement("h3");
songTitle.id = "sideMenuSongName";
songTitle.className = "montserrat-bold";
songTitle.textContent = "Título da Música";

const songArtist = document.createElement("p");
songArtist.id = "sideMenuArtistName";
songArtist.className = "montserrat-regular";
songArtist.textContent = "Artista";

const songLyrics = document.createElement("div");
songLyrics.id = "songLyrics";
songLyrics.className = "song-lyrics montserrat-regular";
songLyrics.textContent = "Letra da música aqui...";

const songMoreInfo = document.createElement("div");
songMoreInfo.className = "song-details-more-info";
songMoreInfo.id = "songMoreInfo";

songDetails.appendChild(songImageMenu);
songDetails.appendChild(songTitle);
songDetails.appendChild(songArtist);
songDetails.appendChild(songLyrics);
songDetails.appendChild(songMoreInfo);
sideMenu.appendChild(songDetails);

document.body.appendChild(sideMenu); // Adiciona o menu lateral ao body como um elemento separado

const mainContent = document.querySelector("main");