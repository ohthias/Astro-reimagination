document.addEventListener("DOMContentLoaded", function () {
  // Criar um contêiner para as notificações
  const notificationsList = document.createElement("div");
  notificationsList.classList.add("notifications-list");
  document.body.appendChild(notificationsList);

  // Função para criar um item de menu
  function createMenuItem(
    content,
    tooltip,
    link,
    isButton = false,
    onClick = loadContent // Função padrão como `loadContent`
  ) {
    const item = document.createElement("li");
    const element = isButton
      ? document.createElement("button")
      : document.createElement("a");
    element.innerHTML = content;
    if (link) element.href = link;
    if (isButton && onClick) element.onclick = onClick;

    const tooltipElement = document.createElement("span");
    tooltipElement.classList.add("tooltip", "bebas-neue-regular");
    tooltipElement.textContent = tooltip;

    item.appendChild(element);
    item.appendChild(tooltipElement);
    return item;
  }

  // Função para criar e mostrar notificações
  function showNotification(message) {
    const notificationItem = document.createElement("div");
    notificationItem.classList.add("notification-item");

    notificationItem.innerHTML = `
        <div class="alert">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 alert-svg">
                <path clip-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fill-rule="evenodd"></path>
              </svg>
            </div>
            <div class="alert-prompt-wrap">
              <p class="text-sm text-yellow-700 montserrat-regular">${message}</p>
            </div>
          </div>
        </div>
      `;

    // Adiciona a notificação à lista
    notificationsList.appendChild(notificationItem);

    // Remover a notificação após um tempo
    setTimeout(() => {
      notificationItem.classList.add("notification-fade"); // Adiciona a classe de fade
      // Espera a animação de fade terminar e depois remove
      setTimeout(() => {
        notificationItem.remove();
      }, 500); // Tempo do fade
    }, 3000); // Tempo antes de iniciar o fade
  }

  // Criação da sidebar
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");

  const navList = document.createElement("ul");
  navList.classList.add("nav-list");

  // Adicionando itens à lista
  navList.appendChild(
    createMenuItem(
      '<i class="material-icons">public</i>',
      "Home",
      "home"
    )
  );
  navList.appendChild(
    createMenuItem(
      '<i class="material-icons">search</i><span class="tooltip bebas-neue-regular">Search</span>',
      "Search",
      "busca"
    )
  );
  navList.appendChild(document.createElement("hr")); // Separator
  navList.appendChild(
    createMenuItem(
      '<i class="material-icons">folder</i>',
      "Biblioteca",
      null,
      true,
      () =>
        showNotification(
          "Essa função não está disponível nesta versão do Astro&copy, aguarde!"
        )
    )
  );
  navList.appendChild(
    createMenuItem(
      '<i class="material-icons">add</i><span class="tooltip bebas-neue-regular">Criar</span>',
      "Criar",
      null,
      true,
      () =>
        showNotification(
          "Essa função não está disponível nesta versão do Astro&copy, aguarde!"
        )
    )
  );

  // Exit section
  const exitContainer = document.createElement("div");
  exitContainer.classList.add("exit-container");

  const exitItem = createMenuItem(
    '<i class="material-icons">exit_to_app</i>',
    "Sair",
    null,
    true,
    () => {
      console.log("Saindo"); // Imprime mensagem no console
      logout(); // Chama a função de logout
    }
  );

  exitContainer.appendChild(exitItem);
  navList.appendChild(exitContainer);

  // Montagem da lista e sidebar
  sidebar.appendChild(navList);
  document.body.prepend(sidebar);
});
