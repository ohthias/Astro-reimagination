class ApiAccess {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.token = "";
  }

  async authenticate() {
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
  }

  async fetchArtistas(genero) {
    await this.authenticate();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(genero)}&type=artist`,
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
    await this.authenticate();

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(genero)}&type=track`,
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
}

// Função para buscar artistas e exibi-los
const buscarArtistas = async () => {
  const clientId = "8b8a8c66585b4376b70f7362c50fbdf0";
  const clientSecret = "f72310fabe114507b38b88988be9cc73";
  const apiAccess = new ApiAccess(clientId, clientSecret);
  
  const listaArtistas = document.getElementById("lista-artistas");
  listaArtistas.innerHTML = "";
  try {
    const genero = "pop";
    const artistas = await apiAccess.fetchArtistas(genero);
    exibirArtistas(artistas);
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    listaArtistas.innerHTML = "<li>Erro ao buscar artistas. Tente novamente.</li>";
  }
};

const buscarMusicas = async (genero) => {
  const clientId = "8b8a8c66585b4376b70f7362c50fbdf0";
  const clientSecret = "f72310fabe114507b38b88988be9cc73";
  const apiAccess = new ApiAccess(clientId, clientSecret);
  
  const listaMusicas = document.getElementById("lista-musicas");
  listaMusicas.innerHTML = "";
  try {
    const musicas = await apiAccess.fetchTopTracks(genero);
    exibirTopTracks(musicas);
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    listaMusicas.innerHTML = "<li>Erro ao buscar músicas. Tente novamente.</li>";
  }
};

const exibirArtistas = (artistas) => {
  const listaArtistas = document.getElementById("lista-artistas");
  listaArtistas.innerHTML = ""; // Limpa a lista antes de adicionar novos artistas

  if (artistas.length === 0) {
    listaArtistas.innerHTML = "<li>Nenhum artista encontrado.</li>";
    return;
  }

  artistas.forEach((artista) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide"); // Classe Swiper

    const imgUrl = artista.images.length > 0 ? artista.images[0].url : '';

    // Define o HTML da slide
    slide.innerHTML = `
      <a href="./artist?id=${artista.id}" class="artist-link" data-artist-id="${artista.id}" data-genero="pop">
        <img src="${imgUrl}" class="artist_image" alt="${artista.name}" />
        <h4 class="bebas-neue-regular">${artista.name}</h4>
      </a>
    `;

    listaArtistas.appendChild(slide);
  });

  const swiper = new Swiper('.swiper-container-artistas', {
    slidesPerView: 7, // Ajuste conforme necessário
    spaceBetween: 16,  // Espaçamento entre os slides
    navigation: {      // Habilita navegação
      nextEl: '.swiper-button-next-artistas',
      prevEl: '.swiper-button-prev-artistas',
    },
  });

};

const exibirTopTracks = (tracks) => {
  const listaMusicas = document.getElementById("lista-musicas");
  listaMusicas.innerHTML = ""; // Limpa a lista antes de adicionar novas músicas

  if (tracks.length === 0) {
    listaMusicas.innerHTML = "<li>Nenhuma música encontrada.</li>";
    return;
  }

  tracks.forEach((track) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    
    const imgUrl = track.album.images.length > 0 ? track.album.images[0].url : ''; // A imagem da música vem do álbum

    slide.innerHTML = `
      <div class="track-item">
        <img src="${imgUrl}" class="track-image" alt="${track.name}" />
        <div class='track-item-detail'>
          <h5 class='montserrat-bold'>${track.name}</h5>
          <p class='montserrat-regular'>${track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
      </div>
    `;

    listaMusicas.appendChild(slide);
  });

  const swiper = new Swiper('.swiper-container-musicas', {
    slidesPerView: 7, // Ajuste conforme necessário
    spaceBetween: 24,  // Espaçamento entre os slides
    navigation: {      // Habilita navegação
      nextEl: '.swiper-button-next-musicas',
      prevEl: '.swiper-button-prev-musicas',
    },
  });
};

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", buscarArtistas);
document.addEventListener("DOMContentLoaded", buscarMusicas('rock'));
