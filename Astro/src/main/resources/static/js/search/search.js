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
    console.warn("Campo vazio");
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

  let conteudoExibido = false;

  // Exibir artistas
  if (data.artists && data.artists.items.length > 0) {
    conteudoExibido = true;
    data.artists.items.forEach((artista) => {
      const item = document.createElement("a");
      item.onclick = () => loadContent("artist", artista.id);
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
    conteudoExibido = true;
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

  // Exibir álbuns
  if (data.albums && data.albums.items.length > 0) {
    conteudoExibido = true;
    data.albums.items.forEach((album) => {
      const item = document.createElement("a");
      item.onclick = () => loadContent("album", album.id);
      item.classList.add("track-item");

      const imagemUrl =
        album.images.length > 0
          ? album.images[0].url
          : "https://via.placeholder.com/50";

      const artistas = album.artists.map((album) => album.name).join(", ");
      item.innerHTML = `
        <img src="${imagemUrl}" class="track-image" alt="${album.name}" />
        <div class='track-item-detail'>
            <h3 class='montserrat-bold'>${album.name}</h3>
            <p class='montserrat-regular'>${artistas}</p>
        </div>
      `;
      listaPlaylists.appendChild(item);
    });
  }

  // Caso nenhuma informação seja exibida
  if (!conteudoExibido) {
    exibirMensagemErro(
      "Nenhum resultado encontrado. Tente outro termo de busca."
    );
  }
};

export function consultSearch(event) {
  const query = event.target.value.trim();
  const url = new URL(window.location.href);

  if (query) {
    url.searchParams.set("query", query); // Atualiza a URL com a query
    window.history.pushState({}, "", url); // Atualiza o histórico sem recarregar
    generateResultsContainer();
    buscarSpotify(query);
  } else {
    generateSearchBase();
    url.searchParams.delete("query"); // Remove a query da URL se estiver vazia
    window.history.pushState({}, "", url);
  }
}

function generateResultsContainer() {
  const results = document.getElementById("results");
  results.innerHTML = `
    <div class="albums-container">
      <h2 class="bebas-neue-regular">Álbuns</h2>
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

export function generateSearchBase() {
  const results = document.getElementById("results");
  results.innerHTML = `
    <div class='error-container'>
      <img src='/images/astro4.png' alt='Erro' class='error-image'>
      <div class='error-message'>
        <h1 class='montserrat-bold'>Procure sua próxima galáxia musical!</h1>
      </div>
    </div>`;
}

function exibirMensagemErro(mensagem) {
  const results = document.getElementById("results");
  results.innerHTML = `
    <div class='error-container'>
      <div class='error-message'>
        <h1 class='montserrat-bold'>${mensagem}</h1>
      </div>
    </div>`;
}
