// Função para obter o token do localStorage
export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("authToken"); // Obtém o token do localStorage
};

// Função para decodificar o token JWT
export const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Obtém o payload (a segunda parte do token)
    const base64 = atob(base64Url); // Decodifica o Base64
    const jsonPayload = decodeURIComponent(escape(base64)); // Corrige problemas de codificação

    return JSON.parse(jsonPayload); // Retorna o payload como um objeto JavaScript
  } catch (error) {
    console.error("Erro ao decodificar o token JWT", error);
    return null;
  }
};

// Função para exibir as informações do usuário no HTML
export const displayUserInfo = () => {
  const token = getTokenFromLocalStorage(); // Obtém o token do localStorage
  console.log("Token do localStorage: ", token);

  if (token) {
    const decodedToken = parseJwt(token); // Decodifica o token para extrair o payload
    console.log("Token decodificado: ", decodedToken);

    if (decodedToken) {
      // Obtém o nome de usuário, e-mail e data de criação do token
      const userName = decodedToken.sub || "Nome não disponível";
      const userEmail = decodedToken.email || "Email não disponível";
      const userCreationDate = decodedToken.iat
        ? new Date(decodedToken.iat * 1000).toLocaleDateString()
        : "Data de criação não disponível";

      // Exibindo as informações no HTML
      const userNameElement = document.getElementById("userNameAcess");
      if (userNameElement) {
        userNameElement.innerHTML = userName;
      }

      const userNameInput = document.querySelector("input#userNameAcess");
      if (userNameInput) {
        userNameInput.value = userName;
      }

      const userEmailInput = document.getElementById("userEmail");
      if (userEmailInput) {
        userEmailInput.value = userEmail;
      }

      console.log(`Nome: ${userName}, Email: ${userEmail}, Data: ${userCreationDate}`);
    } else {
      console.error("Falha ao decodificar o token.");
    }
  } else {
    console.error("Token não encontrado no localStorage.");
  }
};
