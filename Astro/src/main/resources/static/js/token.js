let urlParams = new URLSearchParams(window.location.search);
let username = urlParams.get("username");

if (username) {
  localStorage.setItem("username", username);
} else {
  token = localStorage.getItem("username");
}

let theme = urlParams.get("theme");
if (theme) {
  localStorage.setItem("theme", theme);
} else {
  theme = localStorage.getItem("theme");
}

function addTokenToLinks() {
  if (username) {
    document.querySelectorAll("a").forEach((link) => {
      let href = link.getAttribute("href");
      if (href && !href.includes("username=")) {
        link.setAttribute(
          "href",
          href + (href.includes("?") ? "&" : "?") + "username=" + username
        );
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", addTokenToLinks);

function logout() {
  showConfirmationPopup("Você realmente quer sair?", () => {
    localStorage.removeItem("username");
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

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Não";
  cancelButton.className = "popup-button cancel monsterrat-regular";
  cancelButton.onclick = () => {
    document.body.removeChild(overlay); // Remove o pop-up
  };
  popup.appendChild(cancelButton);

  overlay.appendChild(popup);

  document.body.appendChild(overlay);
}
