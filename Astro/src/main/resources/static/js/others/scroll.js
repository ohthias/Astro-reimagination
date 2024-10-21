document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".navigation-bar");
  const controllerNav = nav.querySelector("#controllerNav") ? nav.querySelector("#controllerNav") : null;
  const albumTitleNav = nav.querySelector("#albumTitleNav") ? nav.querySelector("#albumTitleNav") : null;
  const navLogo = nav.querySelector(".nav-logo");

  // Captura a cor original do logo da navegação
  const originalNavLogoColor = getComputedStyle(navLogo).color;
  console.log(originalNavLogoColor);

  const main = document.getElementById("mainScroll");

  main.addEventListener("scroll", function () {
    const scrollPosition = main.scrollTop;
    const threshold = 50;

    console.log(scrollPosition);

    // Alterar classes e estilos apenas se os elementos existirem
    if (scrollPosition > threshold) {
      nav.classList.add("scrolled");
      if (albumTitleNav) albumTitleNav.style.display = "block";
      if (controllerNav) controllerNav.style.display = "block";
    } else {
      nav.classList.remove("scrolled");
      if (albumTitleNav) albumTitleNav.style.display = "none";
      if (controllerNav) controllerNav.style.display = "none";
    }
  });
});
