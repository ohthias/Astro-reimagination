/** Sistema de busca pela API do Spotify
 *  UTA 06/10/2024
 *  author - @ohthias
*/

import SPOTIFY_CONFIG from '../api/config.js';

const clientId = SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET;

const getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    },
    body: 'grant_type=client_credentials'
  });
  const data = await result.json();
  return data.access_token;
};

const searchSpotify = async (query, type = 'track', token) => {
  const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return result.json();
};

// Função para obter playlists por gênero
const getPlaylistsByGenre = async (token) => {
  const genres = ['pop', 'rock', 'hip-hop', 'k-pop', 'indie'];
  const playlists = await Promise.all(genres.map(async genre => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=genre:"${genre}"&type=playlist`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await result.json();
    return data.playlists.items;
  }));
  return playlists.flat();
};

const getPopularTracksByGenre = async (token) => {
  const genres = ['pop', 'rock', 'hip-hop', 'k-pop', 'indie'];
  const popularTracks = await Promise.all(genres.map(async genre => {
    const result = await fetch(`https://api.spotify.com/v1/search?q=genre:"${genre}"&type=track`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await result.json();
    return data.tracks.items.slice(0, 3);
  }));
  return popularTracks.flat();
};

// Função para exibir os resultados
const displayResults = (data) => {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const fragment = document.createDocumentFragment();

  // Adiciona uma música popular e seu artista
  if (data.popularTrack) {
    const { track, artist } = data.popularTrack;
    const trackElement = document.createElement('div');
    trackElement.classList.add('track-item');
    trackElement.innerHTML = `
      <img src="${track.album.images[0].url}" class="track-image" alt="${track.name}" />
      <div class='track-item-detail'>
        <h3 class='montserrat-bold'>${track.name}</h3>
        <p class='montserrat-regular'>${artist.name}</p>
      </div>
    `;
    fragment.appendChild(trackElement);
  }

  // Exibir artistas
  if (data.artists && data.artists.length > 0) {
    const artistsElement = document.createElement('div');
    artistsElement.classList.add('artists-container');  
    const artistsTitle = document.createElement('h2');
    artistsTitle.classList.add('bebas-neue-regular');
    artistsTitle.textContent = 'Artistas';
    artistsElement.appendChild(artistsTitle);

    const artistsResults = document.createElement('div');
    artistsResults.classList.add('results-list');

    data.artists.forEach(artist => {
      const artistElement = document.createElement('div');
      artistElement.classList.add('track-item');
      artistElement.innerHTML = `
        <img src="${artist.images[0]?.url || 'https://fakeimg.pl/150x150/0b1215/0b1215'}" class="artist-image" alt="${artist.name}" />
        <div class='track-item-detail'>
          <h3 class='montserrat-bold artists-result'>${artist.name}</h3>
        </div>
      `;
      artistsResults.appendChild(artistElement);
    });

    artistsElement.appendChild(artistsResults);
    fragment.appendChild(artistsElement);
  }

  // Exibir playlists
  if (data.playlists && data.playlists.length > 0) {
    const playlistsElement = document.createElement('div');
    playlistsElement.classList.add('playlists-container');
    const playlistsTitle = document.createElement('h2');
    playlistsTitle.classList.add('bebas-neue-regular');
    playlistsTitle.textContent = 'Playlists';
    playlistsElement.appendChild(playlistsTitle);

    const playlistsResults = document.createElement('div');
    playlistsResults.classList.add('results-list');

    data.playlists.forEach(playlist => {
      const playlistElement = document.createElement('div');
      playlistElement.classList.add('track-item');
      playlistElement.innerHTML = `
        <img src="${playlist.images[0]?.url || 'https://fakeimg.pl/150x150/0b1215/0b1215'}" class="track-image" alt="${playlist.name}" />
        <div class='track-item-detail'>
          <h3 class='montserrat-bold'>${playlist.name}</h3>
          <p class='montserrat-regular'>Criado por: ${playlist.owner.display_name}</p>
        </div>
      `;
      playlistsResults.appendChild(playlistElement);
    });

    playlistsElement.appendChild(playlistsResults);
    fragment.appendChild(playlistsElement);
  }

  // Exibir faixas
  if (data.tracks && data.tracks.length > 0) {
    const tracksElement = document.createElement('div');
    tracksElement.classList.add('tracks-container');
    const tracksTitle = document.createElement('h2');
    tracksTitle.classList.add('bebas-neue-regular');
    tracksTitle.textContent = 'Faixas Populares';
    tracksElement.appendChild(tracksTitle);

    const tracksResults = document.createElement('div');
    tracksResults.classList.add('results-list');
    data.tracks.forEach(track => {
      const trackElement = document.createElement('div');
      trackElement.classList.add('track-item');
      trackElement.innerHTML = `
        <img src="${track.album.images[0]?.url || 'https://fakeimg.pl/150x150/0b1215/0b1215'}" class="track-image" alt="${track.name}" />
        <div class='track-item-detail'>
          <h3 class='montserrat-bold'>${track.name}</h3>
          <p class='montserrat-regular'>Artista: ${track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      `;
      tracksResults.appendChild(trackElement);
    });

    tracksElement.appendChild(tracksResults);
    fragment.appendChild(tracksElement);
  }

  if (fragment.childNodes.length === 0) {
    resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
  } else {
    resultsDiv.appendChild(fragment);
  }
};

// Função de debounce para evitar muitas requisições em um curto período
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Função para lidar com a digitação no campo de busca
const handleSearch = debounce(async (event) => {
  const query = event.target.value;
  const token = await getToken();

  if (query) {
    window.history.pushState(null, '', `?search=${encodeURIComponent(query)}`);
  } else {
    window.history.pushState(null, '', window.location.pathname); // Remove a query se a busca estiver vazia
  }

  if (query) {
    const [trackData, artistData, playlistData] = await Promise.all([
      searchSpotify(query, 'track', token),
      searchSpotify(query, 'artist', token),
      searchSpotify(query, 'playlist', token)
    ]);

    const popularTrack = trackData.tracks.items.length > 0 ? trackData.tracks.items[0] : null;
    const popularArtist = popularTrack ? popularTrack.artists[0] : null;

    const combinedData = {
      popularTrack: popularTrack ? { track: popularTrack, artist: popularArtist } : null,
      tracks: trackData.tracks.items,
      playlists: playlistData.playlists.items,
      artists: artistData.artists.items,
    };

    displayResults(combinedData);
  } else {
    const [genrePlaylists, popularTracks] = await Promise.all([
      getPlaylistsByGenre(token),
      getPopularTracksByGenre(token)
    ]);
    const combinedData = { playlists: genrePlaylists, tracks: popularTracks, artists: [] }; // Não estamos exibindo artistas aqui
    displayResults(combinedData);
  }
}, 500);

document.getElementById('searchInput').addEventListener('input', handleSearch);
