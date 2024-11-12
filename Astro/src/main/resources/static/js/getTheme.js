document.addEventListener("DOMContentLoaded", () => {
    // Pega o theme da URL ou do armazenamento local
    let urlParams = new URLSearchParams(window.location.search);
    let theme = urlParams.get('theme');

    // Se o theme for encontrado na URL, armazena no localStorage
    if (theme) {
        localStorage.setItem('theme', theme);
    } else {
        theme = localStorage.getItem('theme');
    }
});

  // Função para adicionar token a todos os links de navegação
      function addThemeToLinks() {
          if (theme) {
              document.querySelectorAll('a').forEach(link => {
                  let href = link.getAttribute('href');
                  if (href && !href.includes('theme=')) {
                      link.setAttribute('href', href + (href.includes('?') ? '&' : '?') + 'theme=' + theme);
                  }
              });
          }
      }


    // Adicionar o token aos links no carregamento da página
    document.addEventListener('DOMContentLoaded', addThemeToLinks());
