// Função para inicializar os Swipers e observar mudanças no menu
function initializeSwipers() {
  const swipers = document.querySelectorAll(".swiper-container");
  const menu = document.querySelector("#content"); // Seletor para o menu

  swipers.forEach((swiperContainer) => {
    const swiper = new Swiper(swiperContainer, {
      slidesPerView: 7, // Valor padrão para telas maiores
      spaceBetween: 10,
      navigation: {
        nextEl: swiperContainer.querySelector(".swiper-button-next"),
        prevEl: swiperContainer.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        320: {
          slidesPerView: 2, // Para telas muito pequenas
          spaceBetween: 10,
        },
        420: {
          slidesPerView: 3, // Para telas pequenas
          spaceBetween: 10,
        },
        550: {
          slidesPerView: 4, // Para tablets
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6, // Para laptops
          spaceBetween: 10,
        },
        1440: {
          slidesPerView: 7, // Para telas grandes
          spaceBetween: 10,
        },
      },
    });

    // Verificar quando a classe "menu-active" é adicionada ou removida
    const observer = new MutationObserver(() => {
      if (menu.classList.contains("menu-active")) {
        swiper.params.slidesPerView = Math.max(swiper.params.slidesPerView - 1, 1); // Reduz o número de slides, garantindo pelo menos 1
      } else {
        swiper.params.slidesPerView = 7; // Volta ao padrão (ou ajuste conforme necessário)
      }
      swiper.update(); // Atualiza o Swiper com os novos parâmetros
    });

    observer.observe(menu, {
      attributes: true, // Observa mudanças nos atributos
      attributeFilter: ["class"], // Limita para mudanças na classe
    });
  });
}

// Chamar a função quando o conteúdo da página for carregado
document.addEventListener("DOMContentLoaded", initializeSwipers);
