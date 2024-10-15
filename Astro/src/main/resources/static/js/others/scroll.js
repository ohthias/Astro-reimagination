document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".navgation-bar");
  const controllerNav = nav.querySelector("#controllerNav");
  const albumTitleNav = nav.querySelector("#albumTitleNav");
  const navLogo = nav.querySelector(".nav-logo");

  const originalNavLogoColor = getComputedStyle(navLogo).color;
  console.log(originalNavLogoColor);

  const main = document.getElementById("mainScroll");
  main.addEventListener("scroll", function () {
    console.log(main.scrollTop); // Use scrollTop ao invés de scrollY
    if (main.scrollTop > 50) {
      albumTitleNav.style.display = "block";
      controllerNav.style.display = "block";
    } else {
      albumTitleNav.style.display = "none";
      controllerNav.style.display = "none";
    }
  });
});
