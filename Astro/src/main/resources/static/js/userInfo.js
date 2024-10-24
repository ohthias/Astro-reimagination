const rootElement = document.documentElement;

document.getElementById("defaultTheme").addEventListener("click", () => {
  changeTheme();
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

function changeTheme(themeClass) {
  rootElement.className = ""; // Remove all previous classes
  rootElement.classList.add(themeClass); // Add the new theme class
  localStorage.setItem("theme", themeClass)
}
