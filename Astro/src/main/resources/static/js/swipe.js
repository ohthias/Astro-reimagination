document.addEventListener("DOMContentLoaded", function () {
  const swipers = document.querySelectorAll(".swiper-container");

  swipers.forEach((swiperContainer) => {
    const swiper = new Swiper(swiperContainer, {
      slidesPerView: 8,
      spaceBetween: 10,
      navigation: {
        nextEl: swiperContainer.querySelector(".swiper-button-next"),
        prevEl: swiperContainer.querySelector(".swiper-button-prev"),
      },
    });
  });
});