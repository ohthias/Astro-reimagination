const rootElement = document.documentElement;

// Funções associadas aos botões de tema
document.getElementById("defaultTheme").addEventListener("click", () => {
  changeTheme(""); // Tema padrão (sem classe adicional)
});

document.getElementById("lightMode").addEventListener("click", () => {
  changeTheme("light");
});

document.getElementById("darkMode").addEventListener("click", () => {
  changeTheme("dark");
});

document.getElementById("oceanMode").addEventListener("click", () => {
  changeTheme("ocean");
});

document.getElementById("fireMode").addEventListener("click", () => {
  changeTheme("fire");
});

document.getElementById("garden").addEventListener("click", () => {
  changeTheme("green");
});

document.getElementById("highContrast").addEventListener("click", () => {
  changeTheme("high-contrast");
});

document.getElementById("galaxy").addEventListener("click", () => {
  changeTheme("galaxy");
});

async function changeTheme(themeClass = "") {
  // Remove todas as classes de tema existentes
  rootElement.className = "";

  // Adiciona a nova classe, se fornecida
  if (themeClass) {
    rootElement.classList.add(themeClass);
  }

  // Atualiza o localStorage
  localStorage.setItem("theme", themeClass);

  // Atualiza os links com a query de tema
  document.querySelectorAll("a").forEach((link) => {
    let href = link.getAttribute("href");
    if (href) {
      const url = new URL(href, window.location.origin);
      url.searchParams.set("theme", themeClass);
      link.setAttribute("href", url.toString());
    }
  });

  // Envia o tema para o backend
  try {
    const token = localStorage.getItem("authToken"); // Certifique-se de que o token está salvo no localStorage
    if (!token) {
      console.error("Token de autenticação não encontrado.");
      return;
    }

    const response = await fetch("/api/save-theme", {
      method: "POST", // Garantindo que seja POST
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ theme: themeClass }),
    });

    if (response.ok) {
      console.log("Tema salvo com sucesso!");
    } else {
      const error = await response.text();
      console.error("Erro ao salvar o tema:", error);
    }
  } catch (err) {
    console.error("Erro de conexão com o servidor:", err);
  }
}

// Recupera e aplica o tema salvo ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    changeTheme(savedTheme);
  }
});
