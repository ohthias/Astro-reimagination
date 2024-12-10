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
    console.warn("Um ou mais elementos DOM não foram encontrados!");
    return; // Interromper a execução do código se algum elemento não for encontrado
  }

  // Função para carregar a música
  const favoriteButton = document.getElementById("favoriteButton");

  favoriteButton.addEventListener("click", toggleFavorite);

  // Atualiza o botão ao carregar a música
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

    // Atualiza o botão de favorito
    updateFavoriteButton(song);

    getLyrics(song.artist, song.name);

    try {
      const backgroundLyrics = await colorImage(song.image.url);
      songLyrics.style.background = backgroundLyrics;
    } catch (error) {
      console.error(error);
    }

    fetchMusicDetails(song.name, song.artist);

    player.load(); // Carrega o áudio no player
  }

  // Função para exibir a letra da música
  function displayLyrics(lyrics) {
    const lyricsContainer = document.querySelector("#songLyrics");
    if (lyricsContainer) {
      lyricsContainer.innerText = lyrics;
    } else {
      console.warn("Elemento para exibir a letra não encontrado!");
    }
  }

  // Função para carregar a música selecionada
  function loadSelectedSong(songIndex) {
    const song = localSongs[songIndex]; // Usando o localSongs para carregar a música
    if (!song) {
      console.warn("Música não encontrada!");
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
