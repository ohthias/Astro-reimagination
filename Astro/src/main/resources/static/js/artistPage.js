import SPOTIFY_CONFIG from "./api/config.js";
import localSongs from "./local-tracks/localSongs.mjs";

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
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar top tracks do artista");
  }

  const data = await response.json();
  return data.tracks.slice(0, 5); // Retorna as 5 primeiras músicas
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

// Função para buscar a discografia do artista
const fetchDiscography = async (artistId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar discografia do artista");
  }

  const data = await response.json();
  return data.items; // Retorna os álbuns
};

// Função para buscar playlists relacionadas ao artista
const fetchPlaylists = async (artistName) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artistName
    )}&type=playlist&market=US&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar playlists do artista");
  }

  const data = await response.json();
  return data.playlists.items; // Retorna as playlists
};

// Função para buscar artistas similares
const fetchRelatedArtists = async (artistId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar artistas similares");
  }

  const data = await response.json();
  return data.artists; // Retorna os artistas similares
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
    const playerMusicas = document.querySelector(".player-musicas");

    // Filtra as músicas do artista específico
    const artistSongs = localSongs.filter(
      (song) => song.artist === artistData.name
    );

    // Verifica se o artista tem músicas na lista local
    if (artistSongs.length > 0) {
      console.log("This artist is in the local songs list");
      playerMusicas.style.display = "block";
      playerMusicas.innerHTML = "";

      /*artistSongs.forEach((song) => {
        const musicCard = document.createElement("div");
        musicCard.className = "music-card";

        musicCard.innerHTML = `
          <div class="card-header">
            <div class="card-track-info">
              <svg
                class="track-icon"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              <div class="track-details">
                <span class="card-track-title">${song.name}</span>
                <p class="card-track-artist">${song.artist}</p>
              </div>
            </div>
            <div class="card-icons">
              <svg
                class="icon-heart"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                ></path>
              </svg>
              <svg
                class="icon-star"
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                ></polygon>
              </svg>
            </div>
          </div>
          <div class="card-progress-container">
            <div class="card-progress-bar"></div>
          </div>
          <div class="card-progress-time">
            <span>00:00</span><span>${formatDuration(song)}</span>
          </div>
        `;
        playerMusicas.appendChild(musicCard);
      });*/
    } else {
      console.log("This artist is not in the local songs list");
      playerMusicas.style.display = "none";
    }

    const artistGenres =
      artistData.genres.join(", ") ||
      "<img src='../static/images/astro7.png' alt='Erro' class='genres-image'>";
    const artistPopularity = 101 - artistData.popularity;
    const artistCountry =
      artistData.origin_country ||
      "<img src='../static/images/astro5.png' alt='Erro' class='country-image'>";
    artistName = artistData.name;

    console.log("Artista: " + artistName);
    document.getElementById("artist-name").textContent = artistData.name;
    document.getElementById(
      "ouvintes"
    ).textContent = `${artistData.followers.total.toLocaleString()} ouvintes`;
    document.getElementById("imageArtist").src =
      artistData.images[0]?.url || "https://placehold.co/1000x550"; // Imagem padrão se não houver
    document.title = `Astro - ${artistName}`;

    // Atualizando os dois novos cards de região, popularidade e gênero
    document.getElementById("artist-region").innerHTML = `${artistCountry}`;
    document.getElementById(
      "artist-popularity"
    ).innerHTML = `${artistPopularity}º`;
    document.getElementById("artist-genres").innerHTML = `${artistGenres}`;

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
              src="${
                track.album.images[0]?.url || "https://placehold.co/50x50"
              }"
            />
            <p class="name-song montserrat-regular">${track.name}</p>
          </div>
          <span class="time-code montserrat-regular">${formatDuration(
            track.duration_ms
          )}</span>
        </li>
      `;
      containerSongs.innerHTML += trackHtml;
    });

    // Buscar e exibir discografia
    const discography = await fetchDiscography(artistId);
    const containerDiscography = document.querySelector(
      ".container-discography"
    );
    containerDiscography.innerHTML = ""; // Limpa a lista anterior, se houver

    discography.forEach((album) => {
      const albumHtml = `
        <a href="album.html?id=${album.id}" class="album-item">
          <img
            class="album-image"
            alt="${album.name}"
            src="${album.images[0]?.url || "https://placehold.co/100x100"}"
          />
          <p class="album-name montserrat-regular">${album.name} (${new Date(
        album.release_date
      ).getFullYear()})</p>
        </a>
      `;
      containerDiscography.innerHTML += albumHtml;
    });

    // Buscar e exibir playlists
    const playlists = await fetchPlaylists(artistName);
    const containerPlaylists = document.querySelector(".container-playlists");
    containerPlaylists.innerHTML = ""; // Limpa a lista anterior, se houver

    playlists.forEach((playlist) => {
      const playlistHtml = `
        <a href="./playlist.html?id=${playlist.id}" class="playlist-item">
          <img
            class="playlist-image"
            alt="${playlist.name}"
            src="${playlist.images[0]?.url || "https://placehold.co/100x100"}"
          />
          <p class="playlist-name montserrat-regular">${playlist.name}</p>
        </a>
      `;
      containerPlaylists.innerHTML += playlistHtml;
    });

    // Buscar e exibir artistas similares
    const relatedArtists = await fetchRelatedArtists(artistId);
    const containerRelatedArtists = document.querySelector(
      ".container-related-artists"
    );
    containerRelatedArtists.innerHTML = ""; // Limpa a lista anterior, se houver

    relatedArtists.forEach((artist) => {
      const artistHtml = `
        <a href="./artist.html?id=${artist.id}" class="related-artist-item">
          <img
            class="related-artist-image"
            alt="${artist.name}"
            src="${artist.images[0]?.url || "https://placehold.co/100x100"}"
          />
          <p class="related-artist-name montserrat-bold">${artist.name}</p>
        </a>
      `;
      containerRelatedArtists.innerHTML += artistHtml;
    });
  } catch (error) {
    const module2 = document.querySelector(".container2");
    module2.innerHTML = `
      <div class='error-container'>
        <img src='../static/images/astro4.png' alt='Erro' class='error-image'>
        <div class='error-message'>
        <h1 class='montserrat-bold'>Galáxia perdida!</h1>
        <h3 class='montserrat-semi-bold'>Erro ao carregar os dados do artista</h3>
        <p class='montserrat-regular'>${error.message}</p>
        </div>
      </div>`;
    console.error(error);
  }
};

window.onload = displayArtist;
