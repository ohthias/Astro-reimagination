document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.documentElement;
    const theme = localStorage.getItem("theme"); // Obtendo o tema armazenado
    if (theme) {
        rootElement.classList.add(theme); // Adicionando a classe com o tema armazenado
    }
});