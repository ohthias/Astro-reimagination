const togglePassword = document.querySelector(".material-symbols-outlined");
const password = document.querySelector('input[type="password"]');

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.textContent = password.getAttribute("type") === "password" ? "visibility_off" : "visibility";;
});