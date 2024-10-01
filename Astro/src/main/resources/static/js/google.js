function handleCredentialResponse(response) {
  // O token JWT retornado pelo Google
  console.log("Encoded JWT ID token: " + response.credential);

  // Enviar o token para o backend
  fetch('/login/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: response.credential
    }),
  }).then(response => response.json())
    .then(data => {
      console.log('Usuário logado:', data);
      // Redirecionar para a página desejada após login
    }).catch(error => {
      console.error('Erro:', error);
    });
}
