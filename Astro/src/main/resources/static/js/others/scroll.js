document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".navgation-bar");
  const controllerNav = nav.querySelector("#controllerNav");
  const albumTitleNav = nav.querySelector("#albumTitleNav");
  const navLogo = nav.querySelector(".nav-logo");

  const originalNavLogoColor = getComputedStyle(navLogo).color;
  console.log(originalNavLogoColor);
  window.addEventListener("scroll", function () {
    if (window.scrollY > 250) {
      nav.classList.add("scrolled");

      if (controllerNav) {
        albumTitleNav.style.display = "block";
        controllerNav.style.display = "block"; // Define o display como "block" se o elemento existir
      }
    } else {
      nav.classList.remove("scrolled");

      if (controllerNav) {
        albumTitleNav.style.display = "none";
        controllerNav.style.display = "none"; // Volta para "none" se necessário
      }
    }
  });
});
