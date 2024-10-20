document.querySelector(".btn-secondary").addEventListener("click", function () {
  fetch("/payment/create", {
    method: "POST",
  })
    .then((response) => response.text())
    .then((url) => {
      window.location.href = url; // Redireciona o usuário para o Mercado Pago
    })
    .catch((error) => console.error("Error:", error));
});
