import { ApiAccess } from "../apis/apiAcess.js";

const apiAccess = new ApiAccess();

async function buscarSpotify(query) {
  try {
    const resultados = await apiAccess.search(query, [
      "artist",
      "album",
      "track",
    ]);
    exibirResultados(resultados);
  } catch (error) {
    console.error(error);
  }
}

const exibirResultados = (data) => {
  const listaArtistas = document.getElementById("lista-artistas");
  const listaMusicas = document.getElementById("lista-musicas");
  const listaPlaylists = document.getElementById("lista-albums");

  // Limpa as listas
  listaArtistas.innerHTML = "";
  listaMusicas.innerHTML = "";
  listaPlaylists.innerHTML = "";

  // Exibir artistas
  // TODO - Arrumar para carregar com loadContent()
  if (data.artists && data.artists.items.length > 0) {
    data.artists.items.forEach((artista) => {
      const item = document.createElement("a");
      item.href = `./artist?id=${artista.id}`;
      item.classList.add("track-item");

      const imagemUrl =
        artista.images.length > 0
          ? artista.images[0].url
          : "https://via.placeholder.com/50";

      item.innerHTML = `
        <img src="${imagemUrl}" class="artist-image" alt="${artista.name}" />
        <div class='track-item-detail'>
            <h3 class='montserrat-bold artists-result'>${artista.name}</h3>
        </div>
      `;
      listaArtistas.appendChild(item);
    });
  }

  // Exibir músicas
  if (data.tracks && data.tracks.items.length > 0) {
    data.tracks.items.forEach((musica) => {
      const item = document.createElement("div");
      item.classList.add("track-item");

      const imagemUrl =
        musica.album.images.length > 0
          ? musica.album.images[0].url
          : "https://via.placeholder.com/50";

      const artistas = musica.artists.map((artista) => artista.name).join(", ");

      item.innerHTML = `
        <img src="${imagemUrl}" class="track-image" alt="${musica.name}" />
        <div class='track-item-detail'>
            <h3 class='montserrat-bold'>${musica.name}</h3>
            <p class='montserrat-regular'>${artistas}</p>
        </div>
      `;
      listaMusicas.appendChild(item);
    });
  }

  // Exibir playlists
  // TODO - Arrumar para carregar com loadContent()
  if (data.albums && data.albums.items.length > 0) {
    data.albums.items.forEach((playlist) => {
      const item = document.createElement("a");
      item.href = `/playlist?id=${playlist.id}`;
      item.classList.add("track-item");

      const imagemUrl =
        playlist.images.length > 0
          ? playlist.images[0].url
          : "https://via.placeholder.com/50";

      item.innerHTML = `
        <img src="${imagemUrl}" class="track-image" alt="${playlist.name}" />
        <div class='track-item-detail'>
            <h3 class='montserrat-bold'>${playlist.name}</h3>
        </div>
      `;
      listaPlaylists.appendChild(item);
    });
  }
};

// Listener para a barra de busca
document.querySelector("#search").addEventListener("input", (event) => {
  const query = event.target.value;
  if (query.length > 0) {
    generateResultsContainer()
    buscarSpotify(query);
  } else {
    generateSearchBase()
  }
});

document.onload = generateSearchBase()

function generateResultsContainer() {
  const results = document.getElementById("results");
  results.innerHTML = `
  <div class="playlists-container">
    <h2 class="bebas-neue-regular">Albuns</h2>
    <div id="lista-albums" class="results-list"></div>
  </div>
  <div class="artists-container">
    <h2 class="bebas-neue-regular">Artistas</h2>
    <div id="lista-artistas" class="results-list"></div>
  </div>
  <div class="tracks-container">
                                 <h2 class="bebas-neue-regular">Músicas</h2>
                                 <div id="lista-musicas" class="results-list"></div>
                               </div>
  `;
}

function generateSearchBase() {
  const results = document.getElementById("results");
  results.innerHTML = `
  <div class='error-container'>
        <img src='/images/astro4.png' alt='Erro' class='error-image'>
        <div class='error-message'>
        <h1 class='montserrat-bold'>Procure sua próxima galáxia musical!</h1>
        </div>
      </div>`;
}