document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".navgation-bar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 250) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
});
