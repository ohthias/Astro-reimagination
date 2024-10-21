const getTokenFromLocalStorage = () => {
    return localStorage.getItem('authToken'); // Obtém o token do localStorage
}

// Função para decodificar o token JWT
const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1]; // Obtém o payload (a segunda parte do token)
        const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(base64); // Retorna o payload como um objeto JavaScript
    } catch (error) {
        console.error("Erro ao decodificar o token JWT", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const token = getTokenFromLocalStorage(); // Obtém o token do localStorage
    console.log("Token do localStorage: ", token);

    if (token) {
        const decodedToken = parseJwt(token); // Decodifica o token para extrair o payload
        console.log("Token decodificado: ", decodedToken);

        if (decodedToken) {
            // Obtém o nome de usuário do token decodificado (supondo que esteja no campo 'sub')
            const userName = decodedToken.sub || "Nome não disponível";
            const userEmail = decodedToken.email || "Email não disponível";
            const userCreationDate = decodedToken.iat ? new Date(decodedToken.iat * 1000).toLocaleDateString() : "Data de criação não disponível";

            // Exibindo as informações no HTML
            document.getElementById("userNameAcess").innerHTML = userName;
            document.getElementById("userEmail").innerHTML = userEmail;
            document.getElementById("userCreationDate").innerHTML = userCreationDate;
        } else {
            console.error("Falha ao decodificar o token.");
        }
    } else {
        console.error("Token não encontrado no localStorage.");
    }
});