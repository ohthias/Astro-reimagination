import SPOTIFY_CONFIG from "./api/config.js";

const clientId = SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET;
let accessToken;

// Função para obter o nome de usuário da URL
const getUserName = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("username"); // Pega o nome de usuário da URL
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
  accessToken = data.access_token; // Armazena o token em uma variável global
  return accessToken;
};

// Função para buscar dados do usuário do Spotify usando o nome de usuário
const fetchUserData = async (userName, retry = true) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obtém o token se não existir
  }

  const response = await fetch(`https://api.spotify.com/v1/users/${userName}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401 && retry) {
    // Token expirado ou inválido, obter um novo token e tentar novamente
    accessToken = await getToken();
    return fetchUserData(userName, false); // Retry com o novo token
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do usuário");
  }

  return await response.json();
};

// Função para buscar playlists do usuário do Spotify usando o nome de usuário
const fetchUserPlaylists = async (userName, retry = true) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obtém o token se não existir
  }

  const response = await fetch(`https://api.spotify.com/v1/users/${userName}/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401 && retry) {
    // Token expirado ou inválido, obter um novo token e tentar novamente
    accessToken = await getToken();
    return fetchUserPlaylists(userName, false); // Retry com o novo token
  }

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
  } else {
    userImageElement.src = "https://placehold.co/250x250"; // Imagem placeholder se não houver imagem
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
    playlistImage.src = playlist.images && playlist.images.length > 0 
      ? playlist.images[0].url 
      : "https://placehold.co/250x250"; // Usa uma imagem placeholder se não houver imagem

    const playlistTitle = document.createElement("h3");
    playlistTitle.classList.add("montserrat-bold", "playlist-title");
    playlistTitle.textContent = playlist.name;

    playlistItem.appendChild(playlistImage);
    playlistItem.appendChild(playlistTitle);

    playlistItem.addEventListener("click", () => {
      window.location.href = `playlist.html?username=${playlist.id}`; // Redireciona para a página da playlist ao clicar
    });

    swiperWrapper.appendChild(playlistItem);
  });
};

// Função principal para obter e exibir os dados do usuário
const showUser = async () => {
  const userName = getUserName(); // Pega o nome de usuário da URL
  if (userName) {
    console.log("Nome de usuário:", userName);
    try {
      const [userData, playlistsData] = await Promise.all([
        fetchUserData(userName),
        fetchUserPlaylists(userName),
      ]);
      displayUserData(userData); // Exibir os dados do usuário
      displayUserPlaylists(playlistsData); // Exibir as playlists
    } catch (error) {
      const main = document.querySelector("main");
      main.innerHTML = `<div class='error-container'>
      <img src='../static/images/astro4.png' alt='Erro' class='error-image'>
      <div class='error-message'>
      <h1 class='montserrat-bold'>Galáxia perdida!</h1>
      <h3 class='montserrat-semi-bold'>Erro ao carregar os dados do usuário</h3>
      <p class='montserrat-regular'>${error.message}</p>
      </div>
    </div>`;
      console.error("Erro ao exibir usuário e playlists:", error);
    }
  } else {
    console.error("Nome de usuário não encontrado na URL");
  }
};

// Chamar a função principal quando a página carregar
window.onload = showUser;
