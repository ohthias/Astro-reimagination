document.addEventListener("DOMContentLoaded", function () {
  const swipers = document.querySelectorAll(".swiper-container");

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
  });
});
