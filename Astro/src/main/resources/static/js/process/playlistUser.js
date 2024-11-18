// Exemplo de playlists que o usuário pode ter
const userPlaylists = [
  {
    id: 1,
    name: "Favoritos",
    author: "Você",
    isUserOwned: true,
    coverImage: "path/to/favorites-cover.jpg", // Caminho para a imagem de capa
  },
  {
    id: 2,
    name: "Rock Clássico",
    author: "John Doe",
    isUserOwned: false,
    coverImage: "path/to/rock-cover.jpg",
  },
  {
    id: 3,
    name: "Relaxamento",
    author: "Você",
    isUserOwned: true,
    coverImage: "path/to/relaxation-cover.jpg",
  },
];

// Função para carregar as playlists
export function loadUserPlaylists() {
  const playlistsContainer = document.getElementById("playlistsContainer");

  if (!playlistsContainer) {
    console.error("Elemento 'playlistsContainer' não encontrado!");
    return;
  }

  // Limpa qualquer conteúdo existente
  playlistsContainer.innerHTML = "";

  // Cria cada playlist dinamicamente
  userPlaylists.forEach((playlist) => {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-item");
    playlistDiv.setAttribute(
      "onclick",
      `loadContent('playlist', ${playlist.id})`
    );

    playlistDiv.innerHTML = `
        <img src="${playlist.coverImage}" alt="${
      playlist.name
    }" class="playlist-cover">
        <h4 class="playlist-name">${playlist.name}</h4>
        ${
          playlist.isUserOwned
            ? ""
            : `<p class="playlist-author">Por ${playlist.author}</p>`
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

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", loadUserPlaylists);
