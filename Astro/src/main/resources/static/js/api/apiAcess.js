/*
    Arquivo: spotify-api.js
    Descrição: Este arquivo contém a implementação de uma classe que gerencia o acesso à API do Spotify, além de funções auxiliares para buscar artistas, músicas e álbuns, e exibi-los na interface.

    Principais componentes:
    1. Classe ApiAccess - Realiza autenticação e requisições à API do Spotify para buscar dados de artistas, músicas e álbuns.
    2. Funções buscarArtistas, buscarMusicas, buscarAlbums - Funções que chamam a API e manipulam os resultados para exibição na interface.
    3. Funções de exibição - exibirArtistas, exibirTopTracks, exibirAlbums - Funções responsáveis por renderizar os dados na interface.

    Data: 20 de Outubro de 2024
*/

class ApiAccess {
  /*
    Classe: ApiAccess
    Descrição: Esta classe é responsável por autenticar na API do Spotify e realizar requisições para buscar artistas, músicas e álbuns.
    Métodos:
    - constructor(clientId, clientSecret): Inicializa a classe com as credenciais da API e define o token de autenticação.
    - isTokenExpired(): Verifica se o token de acesso expirou.
    - authenticate(): Realiza a autenticação na API do Spotify e obtém o token de acesso.
    - fetchArtistas(genero): Busca artistas de um determinado gênero musical na API do Spotify.
    - fetchTopTracks(genero): Busca as principais músicas de um determinado gênero musical.
    - fetchTopAlbums(market): Busca os álbuns mais populares em uma determinada localidade.

    Dependências: Utiliza o `fetch` para realizar requisições à API do Spotify.
*/
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = "";
    this.tokenExpiresAt = null; // Para controlar a expiração do token
  }

  // Verifica se o token ainda é válido
  isTokenExpired() {
    return !this.tokenExpiresAt || new Date() >= this.tokenExpiresAt;
  }

  // Autenticação com verificação de token expirado
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

    // Token expira em 1 hora, ajusta tempo de expiração
    this.tokenExpiresAt = new Date(
      new Date().getTime() + data.expires_in * 1000
    );
  }

  async fetchArtistas(genero) {
    if (!genero) throw new Error("Gênero não informado.");
    await this.authenticate();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
          genero
        )}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.artists?.items || [];
    } catch (error) {
      console.error("Erro ao buscar dados da API Spotify", error);
      return [];
    }
  }

  async fetchTopTracks(genero) {
    if (!genero) throw new Error("Gênero não informado.");
    await this.authenticate();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(
          genero
        )}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.tracks?.items || [];
    } catch (error) {
      console.error("Erro ao buscar dados da API Spotify", error);
      return [];
    }
  }

  async fetchTopAlbums(market = "US") {
    await this.authenticate();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/browse/new-releases?market=${market}&limit=15`, // Endpoint de novos lançamentos, filtrado por localidade
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const albums = data.albums?.items || [];

      // Ordena os álbuns por popularidade (se disponível)
      const topAlbums = albums.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );

      return topAlbums;
    } catch (error) {
      console.error("Erro ao buscar dados da API Spotify", error);
      return [];
    }
  }
}

const SPOTIFY_CLIENT_ID = "8b8a8c66585b4376b70f7362c50fbdf0";
const SPOTIFY_CLIENT_SECRET = "e856e53832ad4651a0dc1ab0ba1d33fc";

/*
    Função: buscarArtistas
    Descrição: Função que busca e exibe uma lista de artistas de um gênero musical pré-definido.
    Parâmetros:
    - Nenhum. O gênero está definido dentro da função como "pop".
    Retorno:
    - Atualiza a lista de artistas na interface.

    Dependências: ApiAccess, exibirArtistas.
*/
const buscarArtistas = async () => {
  const apiAccess = new ApiAccess(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  const listaArtistas = document.getElementById("lista-artistas");
  listaArtistas.innerHTML = "";

  try {
    const genero = "pop";
    const artistas = await apiAccess.fetchArtistas(genero);
    exibirArtistas(artistas);
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    listaArtistas.innerHTML =
      "<li>Erro ao buscar artistas. Tente novamente.</li>";
  }
};

/*
    Função: buscarMusicas
    Descrição: Função que busca as principais músicas de um gênero musical passado como parâmetro e as exibe na interface.
    Parâmetros:
    - genero (string): O gênero musical a ser buscado.
    Retorno:
    - Atualiza a lista de músicas na interface.

    Dependências: ApiAccess, exibirTopTracks.
*/
const buscarMusicas = async (genero) => {
  const apiAccess = new ApiAccess(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  const listaMusicas = document.getElementById("lista-musicas");
  listaMusicas.innerHTML = "";

  try {
    const musicas = await apiAccess.fetchTopTracks(genero);
    exibirTopTracks(musicas);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    listaMusicas.innerHTML =
      "<li>Erro ao buscar músicas. Tente novamente.</li>";
  }
};

/*
    Função: buscarAlbums
    Descrição: Função que busca os álbuns mais recentes e populares de uma localidade e os exibe na interface.
    Parâmetros:
    - Nenhum. O mercado está definido como "US" por padrão.
    Retorno:
    - Atualiza a lista de álbuns na interface.

    Dependências: ApiAccess, exibirAlbums.
*/
const buscarAlbums = async (genero) => {
  const apiAccess = new ApiAccess(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  const listaAlbums = document.getElementById("lista-albums");
  listaAlbums.innerHTML = "";

  try {
    const albums = await apiAccess.fetchTopAlbums();
    exibirAlbums(albums);
  } catch (error) {
    console.error("Erro ao buscar álbuns:", error);
    listaAlbums.innerHTML = "<li>Erro ao buscar álbuns. Tente novamente.</li>";
  }
};

/*
    Função: exibirArtistas
    Descrição: Função responsável por renderizar a lista de artistas na interface com base nos dados fornecidos.
    Parâmetros:
    - artistas (array): Lista de artistas retornados da API do Spotify.
    Retorno:
    - Atualiza o elemento HTML com os dados dos artistas.

    Dependências: Manipulação do DOM.
*/
const exibirArtistas = (artistas) => {
  const listaArtistas = document.getElementById("lista-artistas");
  listaArtistas.innerHTML = "";

  if (artistas.length === 0) {
    listaArtistas.innerHTML = "<li>Nenhum artista encontrado.</li>";
    return;
  }

  artistas.forEach((artista) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const imgUrl = artista.images.length > 0 ? artista.images[0].url : "";

    slide.innerHTML = `
      <a onclick="loadContent('artist')" class="artist-link">
        <img src="${imgUrl}" class="artist_image" alt="${artista.name}" />
        <h4 class="bebas-neue-regular">${artista.name}</h4>
      </a>
    `;
    listaArtistas.appendChild(slide);
  });
};

/*
    Função: exibirTopTracks
    Descrição: Função responsável por renderizar a lista de músicas na interface com base nos dados fornecidos.
    Parâmetros:
    - tracks (array): Lista de músicas retornadas da API do Spotify.
    Retorno:
    - Atualiza o elemento HTML com os dados das músicas.

    Dependências: Manipulação do DOM.
*/
const exibirTopTracks = (tracks) => {
  const listaMusicas = document.getElementById("lista-musicas");
  listaMusicas.innerHTML = "";

  if (tracks.length === 0) {
    listaMusicas.innerHTML = "<li>Nenhuma música encontrada.</li>";
    return;
  }

  tracks.forEach((track) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const imgUrl =
      track.album.images.length > 0 ? track.album.images[0].url : "";

    slide.innerHTML = `
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
    listaMusicas.appendChild(slide);
  });

  const swiper = new Swiper(".swiper-container-musicas", {
    slidesPerView: 7,
    spaceBetween: 24,
    navigation: {
      nextEl: ".swiper-button-next-musicas",
      prevEl: ".swiper-button-prev-musicas",
    },
  });
};

/*
    Função: exibirAlbums
    Descrição: Função responsável por renderizar a lista de álbuns na interface com base nos dados fornecidos.
    Parâmetros:
    - albums (array): Lista de álbuns retornados da API do Spotify.
    Retorno:
    - Atualiza o elemento HTML com os dados dos álbuns.

    Dependências: Manipulação do DOM.
*/
const exibirAlbums = (albums) => {
  const listaAlbums = document.getElementById("lista-albums");
  listaAlbums.innerHTML = "";

  if (albums.length === 0) {
    listaAlbums.innerHTML = "<li>Nenhum álbum encontrado.</li>"; 
    return;
  }

  albums.forEach((album) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const imgUrl =
      album.images && album.images.length > 0
        ? album.images[0].url
        : "default-image-url.jpg";
    const albumName = album.name || "Álbum desconhecido";
    const artistNames =
      album.artists && album.artists.length > 0
        ? album.artists.map((artist) => artist.name).join(", ")
        : "Artista desconhecido";

    slide.innerHTML = `
      <a href="./album?id=${album.id}" class="album-item">
        <img src="${imgUrl}" class="album-image" alt="${albumName}" />
        <div class="album-item-detail">
          <h5 class="montserrat-bold">${albumName}</h5>
          <p class="montserrat-regular">${artistNames}</p>
        </div>
      </a>
    `;

    listaAlbums.appendChild(slide);
  });
};

// Carrega as funções ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
  await buscarArtistas();
  await buscarMusicas("rock");
  await buscarAlbums();
});
