document.addEventListener("DOMContentLoaded", function () {
    // Criação da sidebar
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const navList = document.createElement("ul");
    navList.classList.add("nav-list");

    // Home item
    const homeItem = document.createElement("li");
    const homeLink = document.createElement("a");
    homeLink.href = "home";
    homeLink.innerHTML = '<i class="material-icons">public</i><span class="links_name bebas-neue-regular">Home</span>';
    const homeTooltip = document.createElement("span");
    homeTooltip.classList.add("tooltip", "bebas-neue-regular");
    homeTooltip.textContent = "Home";
    homeItem.appendChild(homeLink);
    homeItem.appendChild(homeTooltip);

    // Search item
    const searchItem = document.createElement("li");
    const searchLink = document.createElement("a");
    searchLink.href = "busca";
    searchLink.innerHTML = '<i class="material-icons">search</i><span class="tooltip bebas-neue-regular">Search</span>';
    searchItem.appendChild(searchLink);

    // Separator
    const separator = document.createElement("hr");

    // Biblioteca item
    const bibliotecaItem = document.createElement("li");
    const bibliotecaLink = document.createElement("a");
    bibliotecaLink.href = "#";
    bibliotecaLink.innerHTML = '<i class="material-icons">folder</i><span class="links_name bebas-neue-regular">Biblioteca</span>';
    const bibliotecaTooltip = document.createElement("span");
    bibliotecaTooltip.classList.add("tooltip", "bebas-neue-regular");
    bibliotecaTooltip.textContent = "Biblioteca";
    bibliotecaItem.appendChild(bibliotecaLink);
    bibliotecaItem.appendChild(bibliotecaTooltip);

    // Criar playlist item
    const createPlaylistItem = document.createElement("li");
    const createPlaylistButton = document.createElement("button");
    createPlaylistButton.id = "new_playlist";
    createPlaylistButton.innerHTML = '<i class="material-icons">add</i>';
    const createPlaylistTooltip = document.createElement("span");
    createPlaylistTooltip.classList.add("tooltip", "bebas-neue-regular");
    createPlaylistTooltip.textContent = "Criar";
    createPlaylistItem.appendChild(createPlaylistButton);
    createPlaylistItem.appendChild(createPlaylistTooltip);

    // Exit section
    const exitContainer = document.createElement("div");
    exitContainer.classList.add("exit-container");

    const exitItem = document.createElement("li");
    const exitSeparator = document.createElement("hr");
    const exitLink = document.createElement("a");
    exitLink.href = "/";
    exitLink.classList.add("exit-button");
    exitLink.innerHTML = '<i class="material-icons">exit_to_app</i><span class="links_name bebas-neue-regular">Sair</span>';
    const exitTooltip = document.createElement("span");
    exitTooltip.classList.add("tooltip", "bebas-neue-regular");
    exitTooltip.textContent = "Sair";

    exitItem.appendChild(exitSeparator);
    exitItem.appendChild(exitLink);
    exitItem.appendChild(exitTooltip);
    exitContainer.appendChild(exitItem);

    // Montagem da lista
    navList.appendChild(homeItem);
    navList.appendChild(searchItem);
    navList.appendChild(separator);
    navList.appendChild(bibliotecaItem);
    navList.appendChild(createPlaylistItem);
    navList.appendChild(exitContainer);

    sidebar.appendChild(navList);

    // Adiciona navbar e sidebar à página
    document.body.appendChild(sidebar);
});
