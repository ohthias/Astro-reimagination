// Pega o token da URL ou do armazenamento local
let urlParams = new URLSearchParams(window.location.search);
let token = urlParams.get('token');

// Se o token for encontrado na URL, armazena no localStorage
if (token) {
    localStorage.setItem('authToken', token);
} else {
    token = localStorage.getItem('authToken');
}

// Função para adicionar token a todos os links de navegação
function addTokenToLinks() {
    if (token) {
        document.querySelectorAll('a').forEach(link => {
            let href = link.getAttribute('href');
            if (href && !href.includes('token=')) {
                link.setAttribute('href', href + (href.includes('?') ? '&' : '?') + 'token=' + token);
            }
        });
    }
}

// Adicionar o token aos links no carregamento da página
document.addEventListener('DOMContentLoaded', addTokenToLinks);

// Função para logout (chamada pelo botão de logout)
function logout() {
    localStorage.removeItem('authToken'); // Remove o token do armazenamento local
    window.location.href = '/login'; // Redireciona para a página de login
}

// Adiciona o evento de logout ao botão de logout
document.getElementById('logoutBtn').addEventListener('click', logout);
