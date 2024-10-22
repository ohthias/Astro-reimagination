// Criação da estrutura HTML usando JavaScript
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

// Controle de volume
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

// Adiciona o player ao container
containerPlayer.appendChild(player);

// Adiciona o container ao body (ou outro elemento desejado)
document.body.appendChild(containerPlayer);
