import SPOTIFY_CONFIG from "./api/config.js";

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
    `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
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
    
    const artistGenres =
      artistData.genres.join(", ") ||
      "<img src='/images/astro7.png' alt='Erro' class='genres-image'>";
    const artistPopularity = 101 - artistData.popularity;
    const artistCountry =
      artistData.origin_country ||
      "<img src='/images/astro5.png' alt='Erro' class='country-image'>";
    artistName = artistData.name;

    console.log("Artista: " + artistName);
    document.getElementById("artist-name").textContent = artistData.name;
    document.getElementById(
      "ouvintes"
    ).textContent = `${artistData.followers.total.toLocaleString()} ouvintes`;
    document.getElementById("imageArtist").src =
      artistData.images[0]?.url || "https://placehold.co/1000x550";
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
                track.album.images[0]?.url || "https://placehold.co/60x60"
              }"
              onerror="this.onerror=null; this.src='https://placehold.co/100x100';"
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
      "#container-discography"
    );
    containerDiscography.innerHTML = ""; // Limpa a lista anterior, se houver

    discography.forEach((album) => {
      const albumHtml = `
        <a href="/album?id=${album.id}" class="album-item swiper-slide">
          <img
            class="album-image"
            alt="${album.name}"
            src="${album.images[0]?.url || "https://placehold.co/100x100"}"
            onerror="this.onerror=null; this.src='https://placehold.co/100x100';"
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
        <a href="/playlist?id=${playlist.id}" class="playlist-item swiper-slide">
          <img
            class="playlist-image"
            alt="${playlist.name}"
            src="${playlist.images[0]?.url || "https://placehold.co/100x100"}"
            onerror="this.onerror=null; this.src='https://placehold.co/100x100';"
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
        <a href="/artist?id=${artist.id}" class="related-artist-item swiper-slide">
          <img
            class="related-artist-image"
            alt="${artist.name}"
            src="${artist.images[0]?.url || "https://placehold.co/100x100"}"
            onerror="this.onerror=null; this.src='https://placehold.co/100x100';"
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
        <img src='/images/astro4.png' alt='Erro' class='error-image'>
        <div class='error-message'>
        <h1 class='montserrat-bold'>Galáxia perdida!</h1>
        <h3 class='montserrat-semi-bold'>Erro ao carregar os dados do artista</h3>
        <p class='montserrat-regular'>${error.message}</p>
        </div>
      </div>`;
    console.error(error);
  }
};

