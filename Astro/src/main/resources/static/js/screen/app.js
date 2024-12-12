import { loadTrackSlider, loadSavedState } from "../musicPlayer.js";
import {
  buscarArtistas,
  buscarMusicas,
  buscarAlbums,
} from "../apis/apiAcess.js";
import { displayArtist } from "../process/artistPage.js";
import { showAlbum } from "../process/albums.js";
import { showPlaylist } from "../process/playlist.js";
import { imageGradient } from "../others/background-color.js";
import { loadUserPlaylists } from "../process/playlistUser.js";
import { generateSearchBase } from "../search/search.js";

export async function loadContent(page, id = null) {
  const content = document.getElementById("content");
  const loader = document.getElementById("loader");
  const url = new URL(window.location.href);

  loader.style.display = "flex";
  content.classList.add("fade-out");

  content.innerHTML = "";

  url.searchParams.set("page", page);

  // Se estamos saindo da página do artista, removemos o ID da URL
  if (page !== "artist") {
    url.searchParams.delete("id");
  } else if (page !== "busca") {
    url.searchParams.delete("query");
  } else if (page !== "album") {
    url.searchParams.delete("query");
    url.searchParams.delete("id");
  } else if (page !== "astro") { 
    url.searchParams.delete("query");
    url.searchParams.delete("id");
  }

  if (id) {
    url.searchParams.set("id", id); // Adiciona o id do artista na URL
  }

  if (localStorage.getItem("neonBorders") === "true") {
    document.getElementsByClassName("container_player")[0].style.border =
      "var(--border-neon)";
    document.getElementsByClassName("sidebar")[0].style.border =
      "var(--border-neon)";
    document.getElementsByClassName("side-menu")[0].style.border =
      "var(--border-neon)";
  } else {
    document.getElementsByClassName("container_player")[0].style.border =
      "none";
    document.getElementsByClassName("sidebar")[0].style.border = "none";
    document.getElementsByClassName("side-menu")[0].style.border = "none";
  }

  document.body.style.background =
    "linear-gradient(to bottom, var(--shadow) 90%, var(--primary-shadow) 100%), var(--shadow)";

  window.history.pushState({}, "", url);

  removeStyleSheet();

  // Páginas comuns
  switch (page) {
    case "astro":
      document.body.id = "deafult";
      addStyleSheet("home.css");
      generateHomePageContent();
      initializeSwipers();
      loadTrackSlider();
      await buscarArtistas();
      await buscarMusicas("rock");
      await buscarAlbums();
      import("../process/home.js").then(({ displayUserInfo }) => {
        displayUserInfo();
      });
      localStorage.setItem("driveInicialize", true);
      break;
    case "busca":
      document.body.id = "deafult";
      generateSearchContent(); // Gera o conteúdo da página de busca
      addStyleSheet("busca.css"); // Adiciona o estilo específico para a busca
      addScript("search/search.js", true); // Adiciona o script da busca dinamicamente

      // Importação dinâmica da função consultSearch
      import("../search/search.js").then(({ consultSearch }) => {
        generateSearchBase();
        const searchInput = document.querySelector("#search");

        if (searchInput) {
          // Remove event listener anterior, se necessário
          searchInput.removeEventListener("input", consultSearch);

          // Associa o evento de input ao campo de busca
          searchInput.addEventListener("input", (event) => {
            consultSearch(event); // Chama a função consultSearch ao digitar
          });

          // Realiza a busca inicial se houver query na URL
          const url = new URL(window.location.href);
          const query = url.searchParams.get("query");
          if (query && query.trim() !== "") {
            searchInput.value = query; // Preenche o input com a query
            consultSearch({ target: { value: query } }); // Realiza a busca inicial
          }
        } else {
          console.error("Campo de busca (#search) não encontrado.");
        }
      });
      break;
    case "artist":
      generateArtistContent();
      document.body.id = "backParallax";
      addStyleSheet("artista.css");
      if (id) {
        initializeSwipers();
        displayArtist(id);
        imageGradient();
      }
      break;
    case "album":
      document.body.id = "backParallax";
      addStyleSheet("album.css");
      if (id) {
        await generateAlbumContent();
        initializeSwipers();
        showAlbum();
        imageGradient();
      } else {
        content.innerHTML = "<p>Álbum não encontrado.</p>";
      }
      break;
    case "playlist":
      document.body.id = "backParallax";
      addStyleSheet("album.css");
      if (id) {
        await generatePlaylistContent();
        initializeSwipers();
        showPlaylist();
        imageGradient();
      } else {
        content.innerHTML = "<p>Playlist não encontrada.</p>";
      }
      break;
    case "user":
      addStyleSheet("user.css");
      generateUserContent();
      import("../process/home.js").then(({ displayUserInfo }) => {
        displayUserInfo();
      });
      loadUserPlaylists();
      break;
    case "settings":
      addStyleSheet("settings.css");
      generateSettingsContent();
      addScript("process/userInfo.js");
      import("../process/home.js").then(({ displayUserInfo }) => {
        displayUserInfo();
      });
      break;
    case "ADM_home":
      addScript("/adm/admSettings.js");
      addStyleSheet("adm.css");
      generateAdmHome();
      break;
    case "list_users":
      addStyleSheet("adm.css");
      generateListUsers();
    case "preferences":
      addStyleSheet("preferences.css");
      generatePreferencesContent();
      break;
    default:
      content.innerHTML = "<p>Conteúdo não encontrado.</p>";
      break;
  }

  setTimeout(() => {
    content.classList.remove("fade-out");
    content.classList.add("fade-in");
  }, 500);

  setTimeout(() => {
    content.classList.remove("fade-in");
  }, 1000);

  setTimeout(() => {
    loader.style.display = "none";
  }, 1500);
}

// Função para adicionar o arquivo CSS
function addStyleSheet(styleFile) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `../static/css/screen/${styleFile}`;
  link.id = "dynamic-stylesheet";
  document.head.appendChild(link);
}

// Função para remover o arquivo CSS atual
function removeStyleSheet() {
  const existingLink = document.getElementById("dynamic-stylesheet");
  if (existingLink) {
    existingLink.parentNode.removeChild(existingLink);
  }
}

// Função para adicionar o arquivo JS
function addScript(scriptFile, isModule = false) {
  const existingScript = document.getElementById("dynamic-script");
  if (existingScript) {
    existingScript.parentNode.removeChild(existingScript);
  }

  const script = document.createElement("script");
  script.src = `../static/js/${scriptFile}`;
  script.id = "dynamic-script";

  if (isModule) {
    script.type = "module"; // Define o script como módulo
  }

  document.body.appendChild(script);
}

// Garantindo que loadContent esteja disponível globalmente
window.loadContent = loadContent;

// Manipula evento de mudança no histórico
window.addEventListener("popstate", function () {
  const url = new URL(window.location.href);
  const page = url.searchParams.get("page") || "astro";
  loadContent(page);
});

// Carrega conteúdo inicial
document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(window.location.href);
  const page = url.searchParams.get("page") || "astro";
  const query = url.searchParams.get("query") || ""; // Obtém a query da URL

  // Carrega o conteúdo inicial
  loadContent(page);

  // Verifica se estamos na página de busca e há uma query
  if (page === "busca" && query.trim() !== "") {
    generateSearchContent(); // Configura a estrutura de busca
    consultSearch({ target: { value: query } }); // Chama a busca inicial
  }
});
