class ApiAccess {
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
        `https://api.spotify.com/v1/browse/new-releases?market=${market}&limit=50`, // Endpoint de novos lançamentos, filtrado por localidade
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
const SPOTIFY_CLIENT_SECRET = "f72310fabe114507b38b88988be9cc73";

// Funções de busca de artistas, músicas e álbuns
const buscarArtistas = async () => {
  const apiAccess = new ApiAccess(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  const listaArtistas = document.getElementById("lista-artistas");
  listaArtistas.innerHTML = "";

  try {
    const genero = "pop"; // Defina o gênero desejado
    const artistas = await apiAccess.fetchArtistas(genero);
    exibirArtistas(artistas);
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    listaArtistas.innerHTML =
      "<li>Erro ao buscar artistas. Tente novamente.</li>";
  }
};

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

const buscarAlbums = async (genero) => {
  const apiAccess = new ApiAccess(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
  const listaAlbums = document.getElementById("lista-albums");
  listaAlbums.innerHTML = ""; // Limpa a lista antes da nova busca

  try {
    const albums = await apiAccess.fetchTopAlbums(); // Chamando a função para buscar os top álbuns sem filtrar por gênero
    exibirAlbums(albums); // Exibe os álbuns retornados
  } catch (error) {
    console.error("Erro ao buscar álbuns:", error);
    listaAlbums.innerHTML = "<li>Erro ao buscar álbuns. Tente novamente.</li>"; // Mensagem de erro na UI
  }
};


// Funções de exibição dos resultados
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
      <a href="./artist?id=${artista.id}" class="artist-link">
        <img src="${imgUrl}" class="artist_image" alt="${artista.name}" />
        <h4 class="bebas-neue-regular">${artista.name}</h4>
      </a>
    `;
    listaArtistas.appendChild(slide);
  });
}

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

const exibirAlbums = (albums) => {
  const listaAlbums = document.getElementById("lista-albums");
  listaAlbums.innerHTML = ""; // Limpa o conteúdo anterior

  if (albums.length === 0) {
    listaAlbums.innerHTML = "<li>Nenhum álbum encontrado.</li>"; // Exibe mensagem se não houver álbuns
    return;
  }

  albums.forEach((album) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const imgUrl =
      album.images && album.images.length > 0
        ? album.images[0].url
        : "default-image-url.jpg"; // Verifica se há imagem, senão usa uma imagem padrão
    const albumName = album.name || "Álbum desconhecido"; // Nome do álbum, com fallback
    const artistNames =
      album.artists && album.artists.length > 0
        ? album.artists.map((artist) => artist.name).join(", ")
        : "Artista desconhecido"; // Lista de artistas, com fallback

    slide.innerHTML = `
      <a href="./album.html?id=${album.id}" class="album-item">
        <img src="${imgUrl}" class="album-image" alt="${albumName}" />
        <div class="album-item-detail">
          <h5 class="montserrat-bold">${albumName}</h5>
          <p class="montserrat-regular">${artistNames}</p>
        </div>
      </a>
    `;

    listaAlbums.appendChild(slide); // Adiciona o slide à lista de álbuns
  });
};

// Carrega as funções ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
  await buscarArtistas();
  await buscarMusicas("rock");
  await buscarAlbums();
});
