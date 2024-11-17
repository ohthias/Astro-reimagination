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
