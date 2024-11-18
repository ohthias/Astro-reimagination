// Pega o token da URL ou do armazenamento local
let urlParams = new URLSearchParams(window.location.search);
let token = urlParams.get("token");

// Se o token for encontrado na URL, armazena no localStorage
if (token) {
  localStorage.setItem("authToken", token);
} else {
  token = localStorage.getItem("authToken");
}

// Pega o theme da URL ou do armazenamento local
let theme = urlParams.get('theme');
// Se o theme for encontrado na URL, armazena no localStorage
if (theme) {
    localStorage.setItem('theme', theme);
} else {
    theme = localStorage.getItem('theme');
}

// Função para adicionar token a todos os links de navegação
function addTokenToLinks() {
  if (token) {
    document.querySelectorAll("a").forEach((link) => {
      let href = link.getAttribute("href");
      if (href && !href.includes("token=")) {
        link.setAttribute(
          "href",
          href + (href.includes("?") ? "&" : "?") + "token=" + token
        );
      }
    });
  }
}

// Adicionar o token aos links no carregamento da página
document.addEventListener("DOMContentLoaded", addTokenToLinks);

// Função para logout (chamada pelo botão de logout)
function logout() {
  showConfirmationPopup("Você realmente quer sair?", () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("theme");
    localStorage.removeItem("driveInitialized");
    window.location.href = "/login";
  });
}

function showConfirmationPopup(message, onConfirm) {
  // Cria o overlay do pop-up
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";

  // Cria o contêiner do pop-up
  const popup = document.createElement("div");
  popup.className = "popup-container";

  // Adiciona a mensagem
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageElement.className = "popup-message montserrat-bold";
  popup.appendChild(messageElement);

  // Botão de confirmar
  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Sim";
  confirmButton.className = "popup-button confirm montserrat-semi-bold";
  confirmButton.onclick = () => {
    document.body.removeChild(overlay); // Remove o pop-up
    onConfirm(); // Executa a função de confirmação
  };
  popup.appendChild(confirmButton);

  // Botão de cancelar
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Não";
  cancelButton.className = "popup-button cancel monsterrat-regular";
  cancelButton.onclick = () => {
    document.body.removeChild(overlay); // Remove o pop-up
  };
  popup.appendChild(cancelButton);

  // Adiciona o pop-up ao overlay
  overlay.appendChild(popup);

  // Adiciona o overlay ao corpo do documento
  document.body.appendChild(overlay);
}
