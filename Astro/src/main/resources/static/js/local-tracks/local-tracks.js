import localSongs from "./localSongs.mjs";

function displaySongs() {
  const musicList = document.getElementById("lista-local-songs");
  musicList.innerHTML = ""; // Limpa a lista atual

  localSongs.forEach((song, index) => {
    // Cria um elemento para cada música
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");

    const songImage = document.createElement("img");
    songImage.src = song.image.url;
    songImage.alt = song.image.alt;
    songImage.classList.add("song-image");

    const songInfo = document.createElement("div");
    songInfo.classList.add("song-info");

    const songTitle = document.createElement("span");
    songTitle.classList.add("song-title");
    songTitle.textContent = song.name;

    const songArtist = document.createElement("span");
    songArtist.classList.add("song-artist");
    songArtist.textContent = song.artist;

    const playButton = document.createElement("button");
    playButton.classList.add("playSongButton");
    playButton.setAttribute("data-index", index);

    const playIcon = document.createElement("span");
    playIcon.classList.add("material-symbols-outlined", "play_arrow");
    playIcon.textContent = "play_arrow";

    playButton.appendChild(playIcon);
    songInfo.appendChild(songTitle);
    songInfo.appendChild(songArtist);
    songItem.appendChild(songImage);
    songItem.appendChild(songInfo);
    songItem.appendChild(playButton);
    musicList.appendChild(songItem);
  });
}

displaySongs();
