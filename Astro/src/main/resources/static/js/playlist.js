import SPOTIFY_CONFIG from "./api/config.js";

const clientId = SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET;
let accessToken;

const getPlaylistId = () => {
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

const fetchPlaylistData = async (playlistId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da playlist");
  }

  return await response.json();
};

const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Função para exibir dados da playlist
const displayPlaylistData = (playlistData) => {
  const playlistContainer = document.getElementById("albumTracks");

  // Obter os elementos do <picture> e <img> para definir o srcset dinamicamente
  const largeSource = document.getElementById("largeSource");
  const mediumSource = document.getElementById("mediumSource");
  const smallSource = document.getElementById("smallSource");
  const playlistImage = document.getElementById("albumImage");

  largeSource.srcset = playlistData.images[0].url; // Imagem grande
  mediumSource.srcset = playlistData.images[0].url; // Usar a mesma imagem para médio
  smallSource.srcset = playlistData.images[0].url; // Usar a mesma imagem para pequeno

  // Definir o fallback da imagem padrão no elemento <img>
  playlistImage.src = playlistData.images[0].url; // Padrão médio
  playlistImage.alt = playlistData.name;
  playlistImage.classList.add("album-image");

  document.getElementById("playlistName").innerHTML = playlistData.name
  const playlistOwner = document.getElementById("albumArtistElement");
  playlistOwner.innerHTML = playlistData.owner.display_name
  playlistOwner.href = `user?id=${playlistData.id}`;

  // Criar a lista de faixas
  const trackList = document.createElement("ul");
  playlistData.tracks.items.forEach((trackItemData, index) => {
    // Adicionamos "index" para usar o número da faixa
    const track = trackItemData.track;

    const trackItem = document.createElement("li");
    trackItem.classList.add("track-item");
    trackItem.dataset.trackSong = track.name;

    const trackDetails = document.createElement("div");
    trackDetails.classList.add("track-details");

    const trackNumber = document.createElement("span");
    trackNumber.classList.add("track-number", "montserrat-regular");
    trackNumber.textContent = `#${index + 1}`; // Usamos "index + 1" para definir o número da faixa baseado na ordem
    trackNumber.dataset.trackNumber = index + 1;

    const trackPicture = document.createElement("picture");
    const largeSourceTrack = document.createElement("source");
    const mediumSourceTrack = document.createElement("source");
    const smallSourceTrack = document.createElement("source");
    const trackImage = document.createElement("img");

    // Usar as imagens do álbum da faixa
    if (track.album.images && track.album.images.length > 0) {
      largeSourceTrack.srcset = track.album.images[0].url; // Imagem grande do álbum
      mediumSourceTrack.srcset = track.album.images[1].url; // Imagem média do álbum
      smallSourceTrack.srcset = track.album.images[2].url; // Imagem pequena do álbum

      trackImage.src = track.album.images[1].url; // Usar imagem média como fallback
    }

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
    trackTitle.textContent = track.name;
    trackTitle.dataset.trackTitle = track.name;

    const trackArtists = document.createElement("a");
    trackArtists.classList.add("montserrat-regular");
    trackArtists.href = `/artist?id=${track.artists[0].id}`;
    let artistNames = track.artists[0].name;
    if (track.artists.length > 1) {
      for (let i = 1; i < track.artists.length; i++) {
        artistNames += ", " + track.artists[i].name; // Concatena os nomes com uma vírgula
      }
    }

    trackArtists.textContent = artistNames;
    trackArtists.dataset.trackArtist = track.artists[0].name;

    trackInfo.appendChild(trackTitle);
    trackInfo.appendChild(trackArtists);

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

  playlistContainer.appendChild(trackList);
};

// Função principal para obter e exibir os dados da playlist
const showPlaylist = async () => {
  const playlistId = getPlaylistId(); // Pegar ID da playlist da URL
  if (playlistId) {
    try {
      const playlistData = await fetchPlaylistData(playlistId); // Buscar dados da playlist
      displayPlaylistData(playlistData); // Exibir os dados
    } catch (error) {
      console.error("Erro ao exibir playlist:", error);
    }
  } else {
    console.error("ID da playlist não encontrado na URL");
  }
};

// Chamar a função principal quando a página carregar
window.onload = showPlaylist;
