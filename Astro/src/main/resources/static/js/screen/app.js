import { loadTrackSlider, loadSavedState } from "../musicPlayer.js";
import {
  buscarArtistas,
  buscarMusicas,
  buscarAlbums,
} from "../api/apiAcess.js";
import { displayArtist } from "../artistPage.js";
import { showAlbum } from "../albums.js";
import { showPlaylist } from "../playlist.js";
import { imageGradient } from "../background-color.js";

export async function loadContent(page, id = null) {
  const content = document.getElementById("content");
  const loader = document.getElementById("loader");
  const url = new URL(window.location.href);

  loader.style.display = "flex";
  content.classList.add("fade-out");

  content.innerHTML = "";

  // Atualiza a URL com o id do artista (se disponível)
  url.searchParams.set("page", page);

  // Se estamos saindo da página do artista, removemos o ID da URL
  if (page !== "artist") {
    url.searchParams.delete("id"); // Remove o ID se não for a página do artista
  }

  if (id) {
    url.searchParams.set("id", id); // Adiciona o id do artista na URL
  }

  window.history.pushState({}, "", url);
  loadSavedState();

  // Remove o estilo anterior
  removeStyleSheet();

  // Adiciona o estilo correspondente à página
  switch (page) {
    case "home":
      addStyleSheet("home.css");
      generateHomePageContent();
      initializeSwipers();
      loadTrackSlider();
      await buscarArtistas();
      await buscarMusicas("rock");
      await buscarAlbums();
      break;
    case "busca":
      addStyleSheet("busca.css");
      generateSearchContent();
      initializeSwipers();
      break;
    case "artist":
      addStyleSheet("artista.css");
      if (id) {
        await generateArtistContent(); // Chama a função para carregar o artista
        initializeSwipers();
        displayArtist(id); // Exibe os detalhes do artista
        imageGradient();
      } else {
        content.innerHTML = "<p>Artista não encontrado.</p>";
      }
      break;
    case "album":
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
    case "jogos":
      addStyleSheet("jogos.css");
      generateGamesContent();
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

// Garantindo que loadContent esteja disponível globalmente
window.loadContent = loadContent;

// Manipula evento de mudança no histórico
window.addEventListener("popstate", function () {
  const url = new URL(window.location.href);
  const page = url.searchParams.get("page") || "home";
  loadContent(page);
});

// Carrega conteúdo inicial
document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(window.location.href);
  const page = url.searchParams.get("page") || "home";
  loadContent(page);
});
