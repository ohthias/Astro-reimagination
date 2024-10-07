import SPOTIFY_CONFIG from '../api/config.js';

const clientId = SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET;
let artistName;
let accessToken;

const getArtistId = () => {
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

// Função para buscar os dados do artista na API do Spotify
const fetchArtistData = async (artistId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
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

// Função para buscar as músicas mais populares do artista
const fetchTopTracks = async (artistId) => {
  const endpoint = `artists/${artistId}/top-tracks?market=US`;
  return await makeApiRequest(endpoint);
};

// Função para buscar a biografia do artista na Wikipedia
const fetchBiography = async (artistName) => {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      artistName
    )}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar biografia");
  }

  const data = await response.json();
  return data.extract; // Retorna a biografia
};

// Função para formatar a duração da música
const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Função principal
const displayArtist = async () => {
  const artistId = getArtistId();
  if (!artistId) {
    console.error("ID do artista não encontrado");
    return;
  }

  try {
    const artistData = await fetchArtistData(artistId);
    artistName = artistData.name;
    console.log("Artista: " + artistName);
    document.getElementById("artist-name").textContent = artistData.name;
    document.getElementById("ouvintes").textContent = `${(artistData.followers.total).toLocaleString()} ouvintes`;
    document.getElementById("imageArtist").src =
      artistData.images[0]?.url || "https://placehold.co/1000x550"; // Imagem padrão se não houver
    document.title = `Astro - ${artistName}`;
    
    // Agora chama a função para buscar a biografia
    const biography = await fetchBiography(artistName);
    document.getElementById("artist-biography").innerHTML = biography;

    // Chama a função para buscar as top tracks
    const topTracks = await fetchTopTracks(artistId);
    
    // Gerar as músicas no HTML
    const containerSongs = document.querySelector(".container-songs");
    containerSongs.innerHTML = ""; // Limpa a lista anterior, se houver

    topTracks.forEach((track) => {
      const trackHtml = `
        <li class="track-song">
          <div class="track-song-details">
            <img
              class="track-song-image"
              alt="${track.name}"
              src="${track.album.images[0]?.url || 'https://placehold.co/50x50'}"
            />
            <p class="name-song montserrat-regular">${track.name}</p>
          </div>
          <span class="time-code montserrat-regular">${formatDuration(track.duration_ms)}</span>
        </li>
      `;
      containerSongs.innerHTML += trackHtml;
    });
  } catch (error) {
    console.error(error);
  }
};

window.onload = displayArtist;