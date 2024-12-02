
const apiUrl = 'api/users'; // URL do endpoint da API

// Função para formatar a data no padrão brasileiro (dd/MM/yyyy HH:mm:ss)
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

// Função para buscar os dados e renderizar a tabela
async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados: ' + response.statusText);
        }
        const users = await response.json();

        // Seleciona o corpo da tabela
        const tableBody = document.querySelector('#users-table tbody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de preencher novamente

        // Popula a tabela com os dados do JSON
        users.forEach(user => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${user.idUserDetails}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${formatDate(user.createAt)}</td>
                <td>${formatDate(user.lastAccess)}</td>
                <td><button class="remove-btn" onclick="removeUser(${user.idUserDetails})">Remover</button></td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para remover o usuário
async function removeUser(userId) {
    if (!confirm('Tem certeza que deseja remover este usuário?')) {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao remover o usuário: ' + response.statusText);
        }

        alert('Usuário removido com sucesso!');
        fetchUsers(); // Atualiza a tabela após a remoção
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao tentar remover o usuário.');
    }
}

// Chama a função para buscar os usuários ao carregar a página
addEventListener("DOMContentLoaded", fetchUsers())