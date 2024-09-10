function togglePassword() {
  const passwordField = document.querySelector('input[type="password"]');
  const icon = document.querySelector(".material-symbols-outlined");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.textContent = "visibility_off"; // Change to eye-off icon
  } else {
    passwordField.type = "password";
    icon.textContent = "visibility"; // Change back to eye icon
  }
}
