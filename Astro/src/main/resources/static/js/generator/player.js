document.addEventListener("DOMContentLoaded", function () {
    // Criação da estrutura do player
    const containerPlayer = document.createElement("div");
    containerPlayer.classList.add("container_player");

    const player = document.createElement("div");
    player.classList.add("player");

    // Seção esquerda do player
    const sideLeft = document.createElement("div");
    sideLeft.classList.add("side-left");

    const playerImage = document.createElement("div");
    playerImage.classList.add("player_image");
    const imgSong = document.createElement("img");
    imgSong.id = "imgSong";
    imgSong.src = "https://fakeimg.pl/210x210/e9e9e9/e9e9e9";
    imgSong.alt = "Song_Image";
    playerImage.appendChild(imgSong);

    const playerInfoMusic = document.createElement("div");
    playerInfoMusic.classList.add("player_infoMusic");
    const musicName = document.createElement("span");
    musicName.id = "musicName";
    musicName.classList.add("montserrat-bold");
    musicName.textContent = "Título da Música";
    const artistName = document.createElement("span");
    artistName.id = "artistName";
    artistName.classList.add("montserrat-regular");
    artistName.textContent = "Artista";
    playerInfoMusic.appendChild(musicName);
    playerInfoMusic.appendChild(artistName);

    sideLeft.appendChild(playerImage);
    sideLeft.appendChild(playerInfoMusic);

    // Seção dos controles do usuário
    const userPrefers = document.createElement("div");
    userPrefers.classList.add("user-prefers");

    const heartMusic = document.createElement("button");
    heartMusic.id = "heartMusic";
    heartMusic.innerHTML = '<span class="material-symbols-outlined heart">favorite</span>';

    const prevButton = document.createElement("button");
    prevButton.id = "prevButton";
    prevButton.innerHTML = '<span class="material-symbols-outlined skip_previous">skip_previous</span>';

    const playPauseButton = document.createElement("button");
    playPauseButton.id = "playPauseButton";
    playPauseButton.innerHTML = '<span class="material-symbols-outlined play_arrow">play_arrow</span>';

    const nextButton = document.createElement("button");
    nextButton.id = "nextButton";
    nextButton.innerHTML = '<span class="material-symbols-outlined skip_next">skip_next</span>';

    const randomPlayerMusic = document.createElement("button");
    randomPlayerMusic.id = "randomPlayerMusic";
    randomPlayerMusic.innerHTML = '<span class="material-symbols-outlined shuffle">shuffle</span>';

    userPrefers.appendChild(heartMusic);
    userPrefers.appendChild(prevButton);
    userPrefers.appendChild(playPauseButton);
    userPrefers.appendChild(nextButton);
    userPrefers.appendChild(randomPlayerMusic);

    // Audio player
    const audioPlayer = document.createElement("audio");
    audioPlayer.id = "player";
    audioPlayer.src = "";

    // Barra de progresso e tempo
    const timecodePlayer = document.createElement("div");
    timecodePlayer.classList.add("timecode_player");

    const currentTime = document.createElement("span");
    currentTime.id = "currentTime";
    currentTime.classList.add("montserrat-medium");
    currentTime.textContent = "0:00";

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.id = "progressBar";
    progressBar.style.cursor = "pointer";
    const progress = document.createElement("div");
    progress.classList.add("progress");
    progressBar.appendChild(progress);

    const duration = document.createElement("span");
    duration.id = "duration";
    duration.classList.add("montserrat-medium");
    duration.textContent = "0:00";

    timecodePlayer.appendChild(currentTime);
    timecodePlayer.appendChild(progressBar);
    timecodePlayer.appendChild(duration);

    // Controle de volume
    const volumeControl = document.createElement("div");
    volumeControl.classList.add("volume-control");
    const volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    volumeSlider.id = "volumeSlider";
    volumeSlider.min = "0";
    volumeSlider.max = "1";
    volumeSlider.step = "0.01";
    volumeSlider.value = "1";
    volumeControl.appendChild(volumeSlider);

    // Montagem da estrutura do player
    player.appendChild(sideLeft);
    player.appendChild(userPrefers);
    player.appendChild(audioPlayer);
    player.appendChild(timecodePlayer);
    player.appendChild(volumeControl);

    containerPlayer.appendChild(player);

    // Adiciona a estrutura na página
    document.body.appendChild(containerPlayer);
});
