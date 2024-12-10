// Função para obter o token baseado no username armazenado no localStorage
export const getTokenFromApi = async () => {
  try {
    const username = localStorage.getItem("username");
    if (!username) throw new Error("Username não encontrado no localStorage.");

    const response = await fetch(`/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Captura a mensagem do backend
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const userData = await response.json();
    return userData.token;
  } catch (error) {
    console.error("Erro ao buscar o token do usuário:", error.message);
    return null;
  }
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
export const displayUserInfo = async () => {
  try {
    // Busca o token diretamente da API
    const token = await getTokenFromApi();

    if (!token) {
      throw new Error("Token não encontrado para o username especificado.");
    }

    // Decodifica o token
    const decodedToken = parseJwt(token);
    console.log("Token decodificado");

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

    } else {
      console.error("Falha ao decodificar o token.");
    }
  } catch (error) {
    console.error("Erro ao exibir informações do usuário:", error);
  }
};
