import SPOTIFY_CONFIG from "./config.js";

class ApiAccess {
  constructor(clientId, clientSecret) {
    this.clientId = clientId || SPOTIFY_CONFIG.SPOTIFY_CLIENT_ID; // Usando variáveis de ambiente
    this.clientSecret = clientSecret || SPOTIFY_CONFIG.SPOTIFY_CLIENT_SECRET; // Usando variáveis de ambiente
    this.token = "";
    this.tokenExpiresAt = null;
  }

  isTokenExpired() {
    return !this.tokenExpiresAt || new Date() >= this.tokenExpiresAt;
  }

  async authenticate() {
    if (this.token && !this.isTokenExpired()) return;

    const authString = `${this.clientId}:${this.clientSecret}`;
    const base64Encoded = btoa(authString);

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Encoded}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiresAt = new Date(
      new Date().getTime() + data.expires_in * 1000
    );

    // Armazenar o token no localStorage para melhorar o desempenho
    localStorage.setItem("spotify_token", this.token);
    localStorage.setItem("spotify_token_expires_at", this.tokenExpiresAt);
  }

  // Função genérica para buscar dados
  async fetchData(url) {
    await this.authenticate();
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar dados da API Spotify", error);
      return [];
    }
  }

  async fetchArtistaPorId(artistaId) {
    if (!artistaId) throw new Error("ID do artista não informado.");
    const url = `https://api.spotify.com/v1/artists/${artistaId}`;
    return await this.fetchData(url);
  }

  async fetchArtistas(genero) {
    if (!genero) throw new Error("Gênero não informado.");
    const url = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
      genero
    )}&type=artist`;
    return await this.fetchData(url).then((data) => data.artists?.items || []);
  }

  async fetchTopTracks(genero) {
    if (!genero) throw new Error("Gênero não informado.");
    const url = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
      genero
    )}&type=track`;
    return await this.fetchData(url).then((data) => data.tracks?.items || []);
  }

  async fetchTopAlbums(market = "US") {
    const url = `https://api.spotify.com/v1/browse/new-releases?market=${market}&limit=15`;
    return await this.fetchData(url)
      .then((data) => data.albums?.items || [])
      .then((albums) => {
        return albums.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      });
  }
}

// Função genérica de exibição
const exibirItens = (itens, containerId, itemTemplate) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (itens.length === 0) {
    container.innerHTML = "<li>Não encontrado.</li>";
    return;
  }

  itens.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    slide.innerHTML = itemTemplate(item);
    container.appendChild(slide);
  });
};

// Função de template para artistas
const artistaDetalhadoTemplate = (artista) => {
  const imgUrl =
    artista.images.length > 0 ? artista.images[0].url : "default-image-url.jpg";
  return `
    <a onclick="loadContent('artist', '${artista.id}')" class="artist-link">
      <img src="${imgUrl}" alt="${artista.name}" class="artist_image" />
      <h4 class="bebas-neue-regular">${artista.name}</h4>
    </a>
  `;
};

// Função para buscar e exibir o artista por ID
export const buscarArtistaPorId = async (artistaId) => {
  const apiAccess = new ApiAccess();
  try {
    const artista = await apiAccess.fetchArtistaPorId(artistaId);
    const container = document.getElementById("artista-detalhado");
    container.innerHTML = artistaDetalhadoTemplate(artista);
  } catch (error) {
    console.error("Erro ao buscar artista:", error);
    document.getElementById("artista-detalhado").innerHTML =
      "<p>Erro ao buscar informações do artista. Tente novamente.</p>";
  }
};

// Função de template para músicas
const trackTemplate = (track) => {
  const imgUrl = track.album.images.length > 0 ? track.album.images[0].url : "";
  return `
    <div class="track-item">
      <img src="${imgUrl}" class="track-image" alt="${track.name}" />
      <div class="track-item-detail">
        <h5 class="montserrat-bold">${track.name}</h5>
        <p class="montserrat-regular">${track.artists
          .map((artist) => artist.name)
          .join(", ")}</p>
      </div>
    </div>
  `;
};

// Função de template para álbuns
const albumTemplate = (album) => {
  const imgUrl =
    album.images && album.images.length > 0
      ? album.images[0].url
      : "default-image-url.jpg";
  const albumName = album.name || "Álbum desconhecido";
  const artistNames =
    album.artists && album.artists.length > 0
      ? album.artists.map((artist) => artist.name).join(", ")
      : "Artista desconhecido";
  return `
    <a onclick="loadContent('album', '${album.id}')" class="album-item">
      <img src="${imgUrl}" class="album-image" alt="${albumName}" />
      <div class="album-item-detail">
        <h5 class="montserrat-bold">${albumName}</h5>
        <p class="montserrat-regular">${artistNames}</p>
      </div>
    </a>
  `;
};

// Função para buscar e exibir artistas
export const buscarArtistas = async () => {
  const apiAccess = new ApiAccess();
  try {
    const artistas = await apiAccess.fetchArtistas("pop");
    exibirItens(artistas, "lista-artistas", artistaDetalhadoTemplate); // Corrigido para usar artistaDetalhadoTemplate
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    document.getElementById("lista-artistas").innerHTML =
      "<li>Erro ao buscar artistas. Tente novamente.</li>";
  }
};

// Função para buscar e exibir músicas
export const buscarMusicas = async (genero) => {
  const apiAccess = new ApiAccess();
  try {
    const musicas = await apiAccess.fetchTopTracks(genero);
    exibirItens(musicas, "lista-musicas", trackTemplate);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    document.getElementById("lista-musicas").innerHTML =
      "<li>Erro ao buscar músicas. Tente novamente.</li>";
  }
};

// Função para buscar e exibir álbuns
export const buscarAlbums = async () => {
  const apiAccess = new ApiAccess();
  try {
    const albums = await apiAccess.fetchTopAlbums();
    exibirItens(albums, "lista-albums", albumTemplate);
  } catch (error) {
    console.error("Erro ao buscar álbuns:", error);
    document.getElementById("lista-albums").innerHTML =
      "<li>Erro ao buscar álbuns. Tente novamente.</li>";
  }
};

// Inicialização
document.addEventListener("DOMContentLoaded", async () => {
  await buscarArtistas();
  await buscarMusicas("rock");
  await buscarAlbums();
});
