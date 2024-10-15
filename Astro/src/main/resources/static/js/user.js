import SPOTIFY_CONFIG from "./api/config.js";

const clientId = SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET;
let accessToken;

// Função para obter o ID do usuário da URL
const getUserId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // Pega o ID do usuário da URL
};

// Função para obter o token de autenticação
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Erro ao obter o token");
  }

  const data = await response.json();
  return data.access_token;
};

// Função para buscar dados do usuário do Spotify
const fetchUserData = async (userId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obtém o token se não existir
  }

  const response = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do usuário");
  }

  return await response.json();
};

// Função para buscar playlists do usuário do Spotify
const fetchUserPlaylists = async (userId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obtém o token se não existir
  }

  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar playlists do usuário");
  }

  return await response.json();
};

// Função para exibir os dados do usuário no HTML
const displayUserData = (userData) => {
  const userNameElement = document.getElementById("userNameAcess");
  const userImageElement = document.getElementById("userImage");
  const seguidoresElement = document.querySelector(".seguidores");
  const seguindoElement = document.querySelector(".seguindo");

  // Exibir nome do usuário
  userNameElement.textContent = userData.display_name;
  window.document.title = `Astro - ${userData.display_name}`;
  // Exibir imagem do usuário
  if (userData.images && userData.images.length > 0) {
    userImageElement.src = userData.images[0].url; // Usa a primeira imagem disponível
  }

  // Exibir número de seguidores
  seguidoresElement.textContent = userData.followers.total;
  seguindoElement.textContent = "000"; // Simulado, pois o Spotify não retorna diretamente essa informação
};

// Função para exibir as playlists do usuário no HTML
const displayUserPlaylists = (playlistsData) => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  playlistsData.items.forEach((playlist) => {
    const playlistItem = document.createElement("div");
    playlistItem.classList.add("swiper-slide", "playlist-item");

    const playlistImage = document.createElement("img");
    playlistImage.classList.add("playlist-image");
    playlistImage.alt = playlist.name;
    playlistImage.src = playlist.images[0] ? playlist.images[0].url : "https://placehold.co/250x250"; // Usa uma imagem placeholder se não houver imagem

    const playlistTitle = document.createElement("h3");
    playlistTitle.classList.add("montserrat-bold", "playlist-title");
    playlistTitle.textContent = playlist.name;

    playlistItem.appendChild(playlistImage);
    playlistItem.appendChild(playlistTitle);

    playlistItem.addEventListener("click", () => {
      window.location.href = `playlist.html?id=${playlist.id}`; // Redireciona para a página da playlist ao clicar
    });

    swiperWrapper.appendChild(playlistItem);
  });
};

// Função principal para obter e exibir os dados do usuário
const showUser = async () => {
  const userId = getUserId(); // Pega o ID do usuário da URL
  if (userId) {
    try {
      const [userData, playlistsData] = await Promise.all([
        fetchUserData(userId),
        fetchUserPlaylists(userId),
      ]);

      displayUserData(userData); // Exibir os dados do usuário
      displayUserPlaylists(playlistsData); // Exibir as playlists
    } catch (error) {
      console.error("Erro ao exibir usuário e playlists:", error);
    }
  } else {
    console.error("ID do usuário não encontrado na URL");
  }
};

// Chamar a função principal quando a página carregar
window.onload = showUser;