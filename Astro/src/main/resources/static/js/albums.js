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

const fetchAlbumData = async (albumId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do álbum");
  }

  return await response.json();
};

const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Função para exibir dados do álbum
export const displayAlbumData = (albumData) => {
  const albumContainer = document.getElementById("albumTracks");

  // Obter os elementos do <picture> e <img> para definir o srcset dinamicamente
  const largeSource = document.getElementById("largeSource");
  const mediumSource = document.getElementById("mediumSource");
  const smallSource = document.getElementById("smallSource");
  const albumImage = document.getElementById("albumImage");

  largeSource.srcset = albumData.images[0].url; // Imagem grande
  mediumSource.srcset = albumData.images[1].url; // Imagem média
  smallSource.srcset = albumData.images[2].url; // Imagem pequena

  // Definir o fallback da imagem padrão no elemento <img>
  albumImage.src = albumData.images[1].url; // Padrão médio
  albumImage.alt = albumData.name;
  albumImage.classList.add("album-image");

  document.getElementById("albumTitleElement").textContent = albumData.name;
  const albumArtistElement = document.getElementById("albumArtistElement");
  albumArtistElement.innerHTML = ""; // Limpar qualquer conteúdo existente no elemento

  albumData.artists.forEach((artist) => {
    const artistLink = document.createElement("a");
    artistLink.classList.add("montserrat-regular"); // Classe para estilização
    artistLink.onclick = () => loadContent("artist", artist.id);
    artistLink.textContent = artist.name; // Nome do artista

    albumArtistElement.appendChild(artistLink); // Adicionar o link ao elemento

    // Adicionar uma vírgula e espaço entre os links, exceto no último
    if (artist !== albumData.artists[albumData.artists.length - 1]) {
      const separator = document.createTextNode(", ");
      albumArtistElement.appendChild(separator); // Adicionar a vírgula após cada artista, exceto o último
    }
  });

  // Criar a lista de faixas
  const trackList = document.createElement("ul");
  albumData.tracks.items.forEach((track) => {
    const trackItem = document.createElement("li");
    trackItem.classList.add("track-item");
    trackItem.dataset.trackSong = track.name;

    const trackDetails = document.createElement("div");
    trackDetails.classList.add("track-details");

    const trackNumber = document.createElement("span");
    trackNumber.classList.add("track-number", "montserrat-regular");
    trackNumber.innerHTML = `#${track.track_number}`;
    trackNumber.dataset.trackNumber = track.track_number;

    const trackPicture = document.createElement("picture");
    const largeSourceTrack = document.createElement("source");
    const mediumSourceTrack = document.createElement("source");
    const smallSourceTrack = document.createElement("source");
    const trackImage = document.createElement("img");

    // Definir srcset para diferentes tamanhos de imagem
    largeSourceTrack.srcset = albumData.images[0].url;
    mediumSourceTrack.srcset = albumData.images[1].url;
    smallSourceTrack.srcset = albumData.images[2].url;

    // Definir fallback para <img>
    trackImage.src = albumData.images[1].url;
    trackImage.alt = track.name;
    trackImage.classList.add("track-image");

    trackPicture.appendChild(largeSourceTrack);
    trackPicture.appendChild(mediumSourceTrack);
    trackPicture.appendChild(smallSourceTrack);
    trackPicture.appendChild(trackImage);

    const trackInfo = document.createElement("div");
    trackInfo.classList.add("track-info");

    const trackTitle = document.createElement("h3");
    trackTitle.classList.add("montserrat-bold");
    trackTitle.innerHTML = track.name;
    trackTitle.dataset.trackTitle = track.name;

    const trackArtistsContainer = document.createElement("div"); // Contêiner para armazenar todos os links dos artistas
    trackArtistsContainer.classList.add("artists-container"); // Classe opcional para estilização

    track.artists.forEach((artist) => {
      const trackArtistLink = document.createElement("a");
      trackArtistLink.classList.add("montserrat-regular"); // Classe para estilização
      trackArtistLink.onclick = () => loadContent("artist", artist.id); // Carregar a página do artista
      trackArtistLink.textContent = artist.name; // Nome do artista

      trackArtistsContainer.appendChild(trackArtistLink); // Adicionar o link ao contêiner

      // Adicionar uma vírgula e espaço entre os links, exceto no último
      if (artist !== track.artists[track.artists.length - 1]) {
        const separator = document.createTextNode(", ");
        trackArtistsContainer.appendChild(separator); // Adicionar a vírgula após cada artista, exceto o último
      }
    });

    trackInfo.appendChild(trackTitle);
    trackInfo.appendChild(trackArtistsContainer);

    const trackDuration = document.createElement("span");
    trackDuration.classList.add("montserrat-regular");
    trackDuration.textContent = formatDuration(track.duration_ms);
    trackDuration.dataset.trackDuration = formatDuration(track.duration_ms);

    trackDetails.appendChild(trackNumber);
    trackDetails.appendChild(trackPicture);
    trackDetails.appendChild(trackInfo);
    trackItem.appendChild(trackDetails);
    trackItem.appendChild(trackDuration);
    trackList.appendChild(trackItem);
  });

  albumContainer.appendChild(trackList);
};

// Função principal para obter e exibir os dados do álbum
export const showAlbum = async () => {
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
