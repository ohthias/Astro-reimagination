import localSongs from "./localSongs.mjs";

function displaySongs() {
  const musicList = document.getElementById("lista-local-songs");
  musicList.innerHTML = ""; // Limpa a lista atual

  localSongs.forEach((song, index) => {
    // Cria um elemento para cada música
    const songItem = document.createElement("div");
    songItem.classList.add("song-item");
    songItem.innerHTML = `
        <img src="${song.image.url}" alt="${song.image.alt}" class="song-image" />
        <div class="song-info">
          <span class="song-title">${song.name}</span>
          <span class="song-artist">${song.artist}</span>
        </div>
        <button class="playSongButton" data-index="${index}">
          <span class="material-symbols-outlined play_arrow">play_arrow</span>
        </button>
      `;
    musicList.appendChild(songItem);
  });

  // Adiciona eventos de clique para cada botão de reprodução
  const playSongButtons = document.querySelectorAll(".playSongButton");
  playSongButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentSongIndex = parseInt(button.getAttribute("data-index"));
      loadSong(localSongs[currentSongIndex]);
      playSong();
    });
  });
}

displaySongs();
