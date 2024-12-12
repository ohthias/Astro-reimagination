function initializePlaylists() {
  const defaultPlaylists = [];

  localStorage.setItem("userPlaylists", JSON.stringify(defaultPlaylists));
  console.log("Playlists criadas/atualizadas no localStorage!");
}


// Função para carregar as playlists do localStorage
export function loadUserPlaylists() {
  const playlistsContainer = document.getElementById("playlistsContainer");

  if (!playlistsContainer) {
    console.warn("Elemento 'playlistsContainer' não encontrado!");
    return;
  }

  // Limpa qualquer conteúdo existente
  playlistsContainer.innerHTML = "";

  const storedPlaylists = localStorage.getItem("userPlaylists");

  if (!storedPlaylists) {
    console.error("Nenhuma playlist encontrada no localStorage!");
    return;
  }

  const userPlaylists = JSON.parse(storedPlaylists); 
  // Cria cada playlist dinamicamente
  userPlaylists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-item");

    // Alteração aqui: passa o ID da playlist ao invés de uma variável não definida
    playlistDiv.setAttribute(
      "onclick",
      `loadContent('playlist', '${playlist.id}')`
    );

    playlistDiv.innerHTML = `
        <img src="${playlist.coverImage}" alt="${
      playlist.name
    }" class="playlist-image">
        <h3 class="playlist-name bebas-neue-regular">${playlist.name}</h3>
        ${
          playlist.isUserOwned
            ? ""
            : `<p class="playlist-author montserrat-regular">Por ${playlist.author}</p>`
        }
      `;

    // Adiciona o elemento ao contêiner de playlists
    playlistsContainer.appendChild(playlistDiv);
  });

  // Exibe a seção de playlists
  const playlistsSection = document.getElementById("userPlaylistsSection");
  if (userPlaylists.length > 0 && playlistsSection) {
    playlistsSection.style.display = "block";
  }
}

  initializePlaylists();
  loadUserPlaylists();
