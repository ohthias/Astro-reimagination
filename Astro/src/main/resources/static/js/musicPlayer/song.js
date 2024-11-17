document.addEventListener("DOMContentLoaded", () => {
  // Seletores DOM
  const musicName = document.querySelector(".music-name");
  const artistName = document.querySelector(".artist-name");
  const sideMenuSongName = document.querySelector(".side-menu-song-name");
  const sideMenuArtistName = document.querySelector(".side-menu-artist-name");
  const sideMenuImage = document.querySelector(".side-menu-image");

  // Verificação se os elementos DOM existem
  if (
    !musicName ||
    !artistName ||
    !sideMenuSongName ||
    !sideMenuArtistName ||
    !sideMenuImage
  ) {
    console.error("Um ou mais elementos DOM não foram encontrados!");
    return; // Interromper a execução do código se algum elemento não for encontrado
  }

  // Função para carregar a música
  export function loadSong(
    song,
    player,
    imgElement,
    musicName,
    artistName,
    sideMenuSongName,
    sideMenuArtistName,
    sideMenuImage,
    getLyrics,
    colorImage
  ) {
    if (!song) return;

    // Atualizar a música e o artista
    musicName.innerText = song.name;
    artistName.innerText = song.artist;
    sideMenuSongName.innerText = song.name;
    sideMenuArtistName.innerText = song.artist;

    // Carregar a imagem da música
    if (song.imageUrl) {
      sideMenuImage.src = song.imageUrl;
    }

    // Atualizar o player com a nova música
    player.src = song.audioUrl;

    // Atualizar a cor da imagem da música
    if (imgElement) {
      colorImage(imgElement, song.artist);
    }

    // Tentar carregar a letra da música
    getLyrics(song.artist, song.name)
      .then((lyrics) => {
        displayLyrics(lyrics);
      })
      .catch((error) => {
        displayLyrics("Erro ao carregar letra.");
      });
  }

  // Função para exibir a letra da música
  function displayLyrics(lyrics) {
    const lyricsContainer = document.querySelector("#songLyrics");
    if (lyricsContainer) {
      lyricsContainer.innerText = lyrics;
    } else {
      console.error("Elemento para exibir a letra não encontrado!");
    }
  }

  // Função para carregar a música selecionada
  function loadSelectedSong(songIndex) {
    const song = localSongs[songIndex]; // Usando o localSongs para carregar a música
    if (!song) {
      console.error("Música não encontrada!");
      return;
    }

    // Carregar a música usando a função `loadSong`
    loadSong(
      song,
      document.getElementById("player"),
      document.querySelector(".music-image"),
      musicName,
      artistName,
      sideMenuSongName,
      sideMenuArtistName,
      sideMenuImage,
      getLyrics,
      colorImage
    );
  }

  // Verificação se o índice da música está salvo e carregar a música inicial
  let currentSongIndex =
    parseInt(localStorage.getItem("currentSongIndex"), 10) || 0;
  loadSelectedSong(currentSongIndex);

  // Exemplo de como adicionar uma funcionalidade de controle de música
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");

  nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % localSongs.length; // Vai para a próxima música
    localStorage.setItem("currentSongIndex", currentSongIndex);
    loadSelectedSong(currentSongIndex);
  });

  prevButton.addEventListener("click", () => {
    currentSongIndex =
      (currentSongIndex - 1 + localSongs.length) % localSongs.length; // Vai para a música anterior
    localStorage.setItem("currentSongIndex", currentSongIndex);
    loadSelectedSong(currentSongIndex);
  });
});

export { loadSong };
