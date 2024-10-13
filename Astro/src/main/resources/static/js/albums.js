import SPOTIFY_CONFIG from "./api/config.js";

const clientId = SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET;
let accessToken;

const getAlbumId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

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

const fetchAlbumData = async (artistId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/albums/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do artista");
  }

  return await response.json();
};

// Função para formatar a duração da música (em milissegundos) para mm:ss
const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Função para exibir dados do álbum
const displayAlbumData = (albumData) => {
  const albumContainer = document.getElementById("album-info");

  // Criar e exibir a imagem do álbum
  const albumImage = document.getElementById("albumImage");
  albumImage.src = albumData.images[0].url;
  albumImage.alt = albumData.name;
  albumImage.classList.add("album-image");

  // Exibir o nome do álbum
  const albumTitle = document.createElement("h2");
  albumTitle.textContent = albumData.name;
  albumContainer.appendChild(albumTitle);

  // Exibir o nome do autor (artista)
  const albumAuthor = document.createElement("h3");
  albumAuthor.textContent = albumData.artists[0].name;
  albumContainer.appendChild(albumAuthor);

  // Criar a lista de faixas
  const trackList = document.createElement("ul");
  albumData.tracks.items.forEach((track) => {
    const trackItem = document.createElement("li");

    // Nome da faixa
    const trackName = document.createElement("strong");
    trackName.textContent = track.name;

    // Duração da faixa formatada
    const trackDuration = document.createElement("span");
    trackDuration.textContent = ` - ${formatDuration(track.duration_ms)}`;

    // Artistas da faixa
    const trackArtists = document.createElement("span");
    trackArtists.textContent = ` - ${track.artists
      .map((artist) => artist.name)
      .join(", ")}`;

    // Montar item da lista
    trackItem.appendChild(trackName);
    trackItem.appendChild(trackDuration);
    trackItem.appendChild(trackArtists);

    trackList.appendChild(trackItem);
  });

  albumContainer.appendChild(trackList);
};

// Função principal para obter e exibir os dados do álbum
const showAlbum = async () => {
  const albumId = getAlbumId(); // Pegar ID do álbum da URL
  if (albumId) {
    try {
      const albumData = await fetchAlbumData(albumId); // Buscar dados do álbum
      displayAlbumData(albumData); // Exibir os dados
    } catch (error) {
      console.error("Erro ao exibir álbum:", error);
    }
  } else {
    console.error("ID do álbum não encontrado na URL");
  }
};

// Chamar a função principal quando a página carregar
window.onload = showAlbum;
