import { ApiAccess } from "../apis/apiAcess.js";
import { WikipediaAccess } from "../apis/WikipediaAccess.js";

const api = new ApiAccess();
const wikipedia = new WikipediaAccess();

// Função formatadora de duração
const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const displayArtist = async (id) => {
  // Recebe o ID do artista diretamente
  const artistId = id;
  console.log("ID do artista:", artistId);
  if (!artistId) {
    console.error("ID do artista não encontrado");
    return;
  }

  try {
    // Buscar dados do artista
    const artistData = await api.fetchArtistaPorId(artistId);
    const artistName = artistData.name;
    console.log("Dados do artista:", artistData);

    const artistGenres =
      artistData.genres.join(", ") ||
      "<img src='/images/astro7.png' alt='Erro' class='genres-image'>";
    const artistPopularity = 101 - artistData.popularity;
    const artistCountry =
      artistData.origin_country ||
      "<img src='/images/astro5.png' alt='Erro' class='country-image'>";

    // Atualizar informações na página
    document.getElementById("artist-name").textContent = artistName;
    document.getElementById(
      "ouvintes"
    ).textContent = `${artistData.followers.total.toLocaleString()} ouvintes`;
    document.getElementById("imageArtist").src =
      artistData.images[0]?.url || "https://placehold.co/1000x550";
    document.getElementById("artist-region").innerHTML = artistCountry;
    document.getElementById(
      "artist-popularity"
    ).innerHTML = `${artistPopularity}º`;
    document.getElementById("artist-genres").innerHTML = artistGenres;

    // Buscar e exibir biografia
    const biography = await wikipedia.fetchBiography(artistName);
    document.getElementById("artist-biography").innerHTML = biography;
    console.log("Biografia:", biography);

    // Buscar e exibir top tracks
    const topTracks = await api
      .fetchData(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`
      )
      .then((data) => data.tracks.slice(0, 5));
    console.log("Top tracks:", topTracks);

    const containerSongs = document.querySelector(".container-songs");
    containerSongs.innerHTML = ""; // Limpa a lista anterior

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
    const discography = await api
      .fetchData(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=10`
      )
      .then((data) => data.items);

    console.log("Discografia:", discography);
    const containerDiscography = document.querySelector(
      "#container-discography"
    );
    containerDiscography.innerHTML = ""; // Limpa a lista anterior

    discography.forEach((album) => {
      const albumHtml = `
        <div 
          onclick="loadContent('album', '${album.id}')" 
          class="swiper-slide album-item">
          <img
            class="album-image"
            alt="${album.name}"
            src="${album.images[0]?.url || "https://placehold.co/100x100"}"
            onerror="this.onerror=null; this.src='https://placehold.co/100x100';"
          />
          <p class="album-name montserrat-regular">${album.name} (${new Date(
        album.release_date
      ).getFullYear()})</p>
        </div>
      `;
      containerDiscography.innerHTML += albumHtml;
    });

    // Buscar e exibir playlists
    const playlists = await api.fetchPlaylists(artistName);
    const containerPlaylists = document.querySelector(".container-playlists");
    containerPlaylists.innerHTML = ""; // Limpa a lista anterior, se houver

    playlists.forEach((playlist) => {
      const playlistHtml = `
          <div
            onclick="loadContent('playlist', '${playlist.id}')" 
            class="playlist-item swiper-slide">
            <img
              class="playlist-image"
              alt="${playlist.name}"
              src="${playlist.images[0]?.url || 'https://placehold.co/100x100'}"
              onerror="this.onerror=null; this.src='https://placehold.co/100x100';"
            />
            <p class="playlist-name montserrat-regular">${playlist.name}</p>
          </div>
        `;
      containerPlaylists.innerHTML += playlistHtml;
    });

    // Buscar e exibir artistas similares
    const relatedArtists = await api.fetchRelatedArtists(artistId);
    const containerRelatedArtists = document.querySelector(
      ".container-related-artists"
    );
    containerRelatedArtists.innerHTML = ""; // Limpa a lista anterior, se houver

    relatedArtists.forEach((artist) => {
      const artistHtml = `
        <a 
          onclick="loadContent('artist', '${artist.id}')" 
          class="related-artist-item swiper-slide">
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
    console.error("Erro ao carregar os dados do artista", error);
  }
};
