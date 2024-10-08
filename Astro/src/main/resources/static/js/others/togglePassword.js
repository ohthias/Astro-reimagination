const togglePassword = document.querySelector(".material-symbols-outlined");
const password = document.querySelector('input[type="password"]');

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.textContent = type === "password" ? "visibility_off" : "visibility";

    if (type === "password") {
        this.classList.remove("visible");
        this.classList.add("hidden");
    } else {
        this.classList.remove("hidden");
        this.classList.add("visible");
    }
});
