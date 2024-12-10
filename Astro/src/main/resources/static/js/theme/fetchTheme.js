function saveThemeToDatabase() {
    const theme = localStorage.getItem('theme'); // Obtém o tema do localStorage
    if (!theme) {
        console.warn("Nenhum tema encontrado no localStorage.");
        return;
    }

    const endpoint = '/api/save-theme';

    // Requisição para salvar o tema
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Inclui o token do usuário
        },
        body: JSON.stringify({ theme }) // Envia o tema no corpo da requisição
    })
    .then(response => {
        if (response.ok) {
            console.log("Tema salvo no banco de dados com sucesso!");
        } else {
            console.error("Erro ao salvar o tema no banco de dados.");
        }
    })
    .catch(error => console.error("Erro na requisição:", error));
}

saveThemeToDatabase();