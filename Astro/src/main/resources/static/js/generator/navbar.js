/**
 * Função para criar a barra de navegação do Astro
 * @ohthias
 */

const createNavigationBar = () => {
  const nav = document.createElement("nav");
  nav.className = "navigation-bar";

  const sideLeft = document.createElement("div");
  sideLeft.className = "side-left";

  const hamburgerIcon = document.createElement("i");
  hamburgerIcon.className = "material-icons hamburger";
  hamburgerIcon.textContent = "menu";

  const logoLink = document.createElement("a");
  logoLink.href = "/home";
  logoLink.className = "nav-logo bebas-neue-regular";
  logoLink.textContent = "Astro";

  sideLeft.appendChild(hamburgerIcon);
  sideLeft.appendChild(logoLink);

  // Obtém o caminho da URL atual
  const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // Ex: 'playlist' ou 'album'

  // Verifica se a página atual é playlist ou álbum
  if (currentPage === "playlist" || currentPage === "album") {
    const navMenu = document.createElement("section");
    navMenu.className = "nav-menu";
    navMenu.id = "controllerNav";
    navMenu.style.display = "none";

    const controllerButtons = document.createElement("div");
    controllerButtons.className = "controller-buttons";

    const playButton = document.createElement("button");
    playButton.id = "playButton";
    playButton.className = "controller-button";
    playButton.setAttribute("aria-label", "Play");

    const playIcon = document.createElement("span");
    playIcon.className = "material-symbols-outlined";
    playIcon.textContent = "play_arrow";

    playButton.appendChild(playIcon);

    const favoriteButton = document.createElement("button");
    favoriteButton.id = "favoriteButton";
    favoriteButton.className = "controller-button";
    favoriteButton.setAttribute("aria-label", "Favorite");

    const favoriteIcon = document.createElement("span");
    favoriteIcon.className = "material-symbols-outlined";
    favoriteIcon.textContent = "favorite";

    favoriteButton.appendChild(favoriteIcon);

    controllerButtons.appendChild(playButton);
    controllerButtons.appendChild(favoriteButton);
    navMenu.appendChild(controllerButtons);

    sideLeft.appendChild(navMenu);
  }

  const sideRight = document.createElement("div");
  sideRight.className = "side-right";

  const premiumLink = document.createElement("a");
  premiumLink.href = "./planos.html";
  premiumLink.className = "btn-shine montserrat-bold";
  premiumLink.innerHTML = "Seja <i>premium</i>";

  const userLink = document.createElement("a");
  userLink.href = "./user.html";
  userLink.className = "btn-user";

  const userImage = document.createElement("img");
  userImage.src = "https://fakeimg.pl/40x40/e9e9e9/e9e9e9";
  userImage.alt = "placeholder";
  userImage.className = "user-perfil";

  userLink.appendChild(userImage);
  sideRight.appendChild(premiumLink);
  sideRight.appendChild(userLink);

  nav.appendChild(sideLeft);
  nav.appendChild(sideRight);

  // Menu do hamburger
  const overlayMenu = document.createElement("div");
  overlayMenu.className = "overlay-menu";
  overlayMenu.style.display = "none";

  // Botão de fechar
  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "&times;"; // Símbolo de fechar
  closeButton.setAttribute("aria-label", "Fechar menu");

  const menuItems = [
    { name: "Home", icon: "home", link: "./home" },
    { name: "Busca", icon: "search", link: "./busca" },
    { name: "Sair", icon: "logout", link: "/" },
  ];

  menuItems.forEach((item) => {
    const menuItem = document.createElement("a");
    menuItem.href = item.link;

    const itemIcon = document.createElement("span");
    itemIcon.className = "material-icons";
    itemIcon.textContent = item.icon;

    menuItem.appendChild(itemIcon);
    menuItem.appendChild(document.createTextNode(item.name));
    menuItem.className = "menu-item montserrat-bold";

    if (item.name === "Sair") {
      menuItem.classList.add("logoutBtn");
    }

    overlayMenu.appendChild(menuItem);
  });

  overlayMenu.appendChild(closeButton); // Adiciona o botão de fechar
  document.body.appendChild(nav);
  document.body.appendChild(overlayMenu);

  // Evento para mostrar/ocultar o menu
  hamburgerIcon.addEventListener("click", () => {
    overlayMenu.style.display = "flex"; // Torna o menu visível
    setTimeout(() => {
      overlayMenu.classList.add("visible"); // Adiciona a classe de visibilidade após a exibição
    }, 10); // Delay para permitir a aplicação da transição
  });

  // Evento para fechar o menu
  closeButton.addEventListener("click", () => {
    overlayMenu.classList.remove("visible");
    setTimeout(() => {
      overlayMenu.style.display = "none";
    }, 300);
  });
};

// Chamar a função para gerar a barra de navegação
createNavigationBar();
