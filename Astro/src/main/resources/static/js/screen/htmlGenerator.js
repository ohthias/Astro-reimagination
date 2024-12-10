// Função para gerar o conteúdo da página inicial
function generateHomePageContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
                              <div class="wrapper first-acess">
                                <span class="montserrat-bold" id="userNameAcess"></span>
                                <h1 class="bebas-neue-regular first-acess-title">
                                  Seja bem-vindo ao Astro
                                </h1>
                                <p class="montserrat-regular subtitle">Suas músicas nas galáxias</p>
                              </div>

                              <section class="local-tracks swiper">
                                <h2 class="bebas-neue-regular categoria-name">Andrômeda</h2>
                                <div class="swiper-container">
                                  <div class="swiper-wrapper" id="localListSongs"></div>
                                  <button class="swiper-button-prev"></button>
                                  <button class="swiper-button-next"></button>
                                </div>
                              </section>

                              <section class="artistas-section swiper">
                                <h2 class="bebas-neue-regular categoria-name">Top Artistas</h2>
                                <div class="swiper-container">
                                  <div class="swiper-wrapper" id="lista-artistas"></div>
                                  <button class="swiper-button-prev"></button>
                                  <button class="swiper-button-next"></button>
                                </div>
                              </section>

                              <section class="music-section swiper">
                                <h2 class="bebas-neue-regular categoria-name">Rock</h2>
                                <div class="swiper-container">
                                  <div class="swiper-wrapper" id="lista-musicas"></div>
                                  <button class="swiper-button-prev"></button>
                                  <button class="swiper-button-next"></button>
                                </div>
                              </section>

                              <section class="music-section swiper">
                                <h2 class="bebas-neue-regular categoria-name">Pop</h2>
                                <div class="swiper-container">
                                  <div class="swiper-wrapper" id="lista-albums"></div>
                                  <button class="swiper-button-prev"></button>
                                  <button class="swiper-button-next"></button>
                                </div>
                              </section>
                          `;
}

// Função para gerar o conteúdo da playlist
function generateSearchContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
                              <div class="container-search">
                                <i class="material-icons">search</i>
                                <input
                                  class="montserrat-regular"
                                  type="text"
                                  name="busca"
                                  id="search"
                                  placeholder="Procure por um artista, uma música ou playlist"
                                />
                              </div>

                              <div class="container-results" id="results">
                                <div class="tracks-container">
                                  <h2 class="bebas-neue-regular">Músicas</h2>
                                  <div id="lista-musicas" class="results-list"></div>
                                </div>
                                <div class="artists-container">
                                  <h2 class="bebas-neue-regular">Artistas</h2>
                                  <div id="lista-artistas" class="results-list"></div>
                                </div>
                                <div class="playlists-container">
                                  <h2 class="bebas-neue-regular">Playlists</h2>
                                  <div id="lista-playlists" class="results-list"></div>
                                </div>
                              </div>
                          `;
}

function generateArtistContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <section class="module module1">
            <div class="banner-artist">
              <img
                crossorigin="anonymous"
                id="imageArtist"
                class="artist-image"
                alt="Artista"
                src="https://placehold.co/1000x500"
              />
              <div class="banner-details">
                <h1 id="artist-name" class="bebas-neue-regular">
                  Placeholder Artist
                </h1>
              </div>
            </div>
            <div class="container-details-artist">
              <div class="top">
                <h3 id="ouvintes" class="montserrat-bold">000.000</h3>
                <div id="artist-biography" class="montserrat-regular">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
                  aperiam accusamus soluta totam delectus aut molestias nemo, fugit
                  optio corporis modi illo repellendus itaque quas ipsum error
                  ratione sequi hic.
                </div>
              </div>
              <div class="others-informations">
                <div id="artist-region" class="montserrat-bold"></div>
                <div id="artist-popularity" class="montserrat-bold"></div>
                <div id="artist-genres" class="montserrat-bold"></div>
              </div>
            </div>
          </section>
          <div class="container2">
            <section class="module2 section-main-content">
              <div class="hot-tracks">
                <h2 class="montserrat-bold">Musicas em alta</h2>
                <ul class="container-songs"></ul>
              </div>
              <div class="player-musicas"></div>
            </section>

            <section class="swiper">
              <h2 class="bebas-neue-regular categoria-name">Discografia</h2>
              <div class="swiper-container">
                <div class="swiper-wrapper" id="container-discography"></div>
                <button class="swiper-button-prev"></button>
                <button class="swiper-button-next"></button>
              </div>
            </section>

            <section class="swiper">
              <h2 class="bebas-neue-regular categoria-name">
                Constelações presente
              </h2>
              <div class="swiper-container swiper-playlists">
                <div class="swiper-wrapper container-playlists"></div>
                <button class="swiper-button-prev"></button>
                <button class="swiper-button-next"></button>
              </div>
            </section>

            <section class="swiper">
              <h2 class="bebas-neue-regular categoria-name">Estrelas similares</h2>
              <div class="swiper-container swiper-artists">
                <div class="swiper-wrapper container-related-artists"></div>
                <button class="swiper-button-prev"></button>
                <button class="swiper-button-next"></button>
              </div>
            </section>
          </div>
    `;
}

function generateAlbumContent() {
  const content = document.getElementById("content");
  content.innerHTML = `<section class="display-album">
        <picture id="albumPicture">
          <source id="largeSource" media="(min-width: 1024px)" />
          <source id="mediumSource" media="(max-width: 1023px)" />
          <source id="smallSource" media="(max-width: 600px)" />
          <img
            src="https://placehold.co/350x350"
            id="albumImage"
            alt="Album cover"
            class="album-image"
            crossorigin="anonymous"
          />
        </picture>
        <div class="display-album-details">
          <h1
            class="bebas-neue-regular"
            data-album-title="albumTitle"
            id="albumTitleElement"
          >▬▬▬▬▬▬
          </h1>
          <a
            href="#"
            class="montserrat-regular"
            data-album-artist="albumArtistName"
            id="albumArtistElement"
          >
          ▬▬▬▬▬▬▬▬
          </a>

          <section class="controller">
            <button id="playButton" class="controller-button">
              <span class="material-symbols-outlined play_arrow"
                >play_arrow</span
              >
            </button>
            <button id="favoriteButton" class="controller-button">
              <span class="material-symbols-outlined favorite">favorite</span>
            </button>
            <button id="shuffleButton" class="controller-button">
              <span class="material-symbols-outlined shuffle">shuffle</span>
            </button>
            <button id="repeatButton" class="controller-button">
              <span class="material-symbols-outlined repeat">repeat</span>
            </button>
          </section>
        </div>
      </section>
      <section id="albumTracks"></section>`;
}

function generatePlaylistContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
  <section class="display-album">
        <picture id="albumPicture">
          <source id="largeSource" media="(min-width: 1024px)" />
          <source id="mediumSource" media="(max-width: 1023px)" />
          <source id="smallSource" media="(max-width: 600px)" />
          <img
            src="https://placehold.co/350x350"
            id="albumImage"
            alt="Album cover"
            class="album-image"
            crossorigin="anonymous"
          />
        </picture>
        <div class="display-album-details">
          <h1
            class="bebas-neue-regular"
            data-album-title="albumTitle"
            id="playlistName"
          >
            ▬▬▬▬▬▬
          </h1>
          <a
            href="#"
            class="montserrat-regular"
            data-album-artist="albumArtistName"
            id="albumArtistElement"
          >
            ▬▬▬▬▬▬▬▬
          </a>

          <section class="controller">
            <button id="playButton" class="controller-button">
              <span class="material-symbols-outlined play_arrow"
                >play_arrow</span
              >
            </button>
            <button id="favoriteButton" class="controller-button">
              <span class="material-symbols-outlined favorite">favorite</span>
            </button>
            <button id="shuffleButton" class="controller-button">
              <span class="material-symbols-outlined shuffle">shuffle</span>
            </button>
            <button id="repeatButton" class="controller-button">
              <span class="material-symbols-outlined repeat">repeat</span>
            </button>
          </section>
        </div>
      </section>
      <section id="albumTracks"></section>
  `;
}

function generateUserContent() {
  const content = document.getElementById("content");
  content.innerHTML = `
  <section class="user-banner">
        <div class="user-banner-details">
          <h1 class="montserrat-bold" id="userNameAcess"></h1>

          <div class="details-side-right">
            <a onclick="loadContent('settings')" class="btn-seguir montserrat-bold">Editar</a>
          </div>
        </div>
        <div class="user-banner-image">
          <img
            id="userImage"
            class="user-image"
            alt="User_Image"
            src="/images/placeholder.png"
          />
        </div>
      </section>

      <section class="user-playlists swiper" id="userPlaylistsSection">
        <h2 class="montserrat-bold categoria-name">Playlists</h2>
        <div class="swiper-container">
          <div class="swiper-wrapper" id="playlistsContainer"></div>
          <button class="swiper-button-prev"></button>
          <button class="swiper-button-next"></button>
        </div>
      </section>
    `;
}

function generateSettingsContent() {
  const content = document.getElementById("content")
  content.innerHTML = `
  <section class="user-banner">
        <div class="user-banner-details">
          <h1 class="montserrat-bold" id="userNameAcess">User</h1>

          <div class="details-side-right">
            <a onclick="loadContent('user')" class="btn-seguir montserrat-bold">Voltar</a>
          </div>
        </div>
        <div class="user-banner-image">
          <img
            id="userImage"
            class="user-image"
            alt="User_Image"
            src="/images/placeholder.png"
          />
        </div>
      </section>

      <section class="settings-container">
        <article class="general">
          <h2 class="bebas-neue-regular">Geral</h2>
          <div class="container-user">
            <label for="username" class="montserrat-bold">Username</label>
            <input
              type="text"
              class="montserrat-regular"
              readonly
              id="userNameAcess"
              name="username"
            />
          </div>
          <div class="container-user">
            <label for="email" class="montserrat-bold">Email</label>
            <input
              type="text"
              class="montserrat-regular"
              readonly
              id="userEmail"
              name="email"
            />
          </div>
          <div class="container-user">
            <label for="password" class="montserrat-bold">Senha</label>
            <input
              type="text"
              class="montserrat-regular"
              readonly
              value="*******"
              id="userPassword"
              name="password"
            />
          </div>
        </article>
        <article class="themes">
          <h2 class="bebas-neue-regular">Temas</h2>
          <div class="wrapper-themes">
            <div class="container-temas">
              <button id="defaultTheme"></button>
              <p class="nome-tema montserrat-regular">Astro</p>
            </div>
            <div class="container-temas">
              <button id="lightMode"></button>
              <p class="nome-tema montserrat-regular">Light Mode</p>
            </div>
            <div class="container-temas">
              <button id="darkMode"></button>
              <p class="nome-tema montserrat-regular">Dark Mode</p>
            </div>
            <div class="container-temas">
              <button id="fireMode"></button>
              <p class="nome-tema montserrat-regular">Fire Mode</p>
            </div>
            <div class="container-temas">
              <button id="oceanMode"></button>
              <p class="nome-tema montserrat-regular">Ocean Mode</p>
            </div>
            <div class="container-temas">
              <button id="garden"></button>
              <p class="nome-tema montserrat-regular">Garden Mode</p>
            </div>
            <div class="container-temas">
              <button id="highContrast"></button>
              <p class="nome-tema montserrat-regular">Alto Contraste</p>
            </div>
            <div class="container-temas">
              <button id="galaxy"></button>
              <p class="nome-tema montserrat-regular">Galaxy</p>
            </div>
          </div>
        </article>
      </section>
  `
}

function generateAdmHome() {
  const content = document.getElementById("content")
  content.innerHTML = `
  `
}

function generateListUsers() {
  const content = document.getElementById("content")
  content.innerHTML = `
   <h1 class="bebas-neue-regular">Lista de Usuários</h1>
      <table id="users-table">
        <thead>
          <tr>
            <th class="montserrat-bold">ID</th>
            <th class="montserrat-bold">Email</th>
            <th class="montserrat-bold">Nome de Usuário</th>
            <th class="montserrat-bold">Data de Criação</th>
            <th class="montserrat-bold">Último Acesso</th>
          </tr>
        </thead>
        <tbody class="montserrat-regular"></tbody>
      </table>
  `
}

function generatePreferencesContent() {
  const content = document.getElementById("content");

  const neonBordersPref = localStorage.getItem("neonBorders") === "true";
  const dynamicBackgroundPref = localStorage.getItem("dynamicBackground") === "true";

  content.innerHTML = `
    <h2 class='bebas-neue-regular'>Preferências</h2>
    <div class="preferences-section">
      <h3 class='montserrat-bold'>Bordas Neon</h3>
      <label class='montserrat-regular'>
        <input type="checkbox" id="neonBorders" ${neonBordersPref ? "checked" : ""} />
        Ativar bordas neon
      </label>
    </div>

    <div class="preferences-section">
      <h3 class='montserrat-bold'>Fundo do Player</h3>
      <label class='montserrat-regular'>
        <input type="checkbox" id="dynamicBackground" ${dynamicBackgroundPref ? "checked" : ""} />
        Mudar o fundo do player dinamicamente
      </label>
    </div>

    <button id="savePreferences" class='montserrat-bold'>Salvar Preferências</button>
  `;

  // Adicionar evento para salvar as preferências
  document.getElementById("savePreferences").addEventListener("click", savePreferences);
}

function savePreferences() {
  const neonBorders = document.getElementById("neonBorders").checked;
  const dynamicBackground = document.getElementById("dynamicBackground").checked;

  console.log("Preferências Salvas:");
  console.log("Bordas Neon:", neonBorders);
  console.log("Fundo Dinâmico:", dynamicBackground);

  localStorage.setItem("neonBorders", neonBorders);
  localStorage.setItem("dynamicBackground", dynamicBackground);

  alert("Preferências salvas com sucesso!");
  window.location.reload();
}