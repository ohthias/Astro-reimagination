const accessToken = "adT51gLRjImmrvnB2Hjq2Zw8M07FCWvgEfDx9zJYW8-EA5Zd2P9_JzrHR2K2iFc_"; // Substitua pela sua chave da API Genius

// Função para buscar a letra da música com a API Genius
async function fetchLyrics(songTitle) {
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}`;

    try {
        const response = await fetch(searchUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Debug para verificar o status e o conteúdo da resposta
        console.log("Status da resposta:", response.status);
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados da resposta:", data); // Mostra o conteúdo da resposta para análise

        const song = data.response.hits[0]; // Seleciona a primeira música encontrada
        if (song) {
            return `<a href="${song.result.url}" target="_blank">Ver Letra Completa</a>`;
        } else {
            return "Letra não encontrada";
        }
    } catch (error) {
        console.error("Erro ao buscar letra:", error.message);
        return "Erro ao buscar letra";
    }
}

// Exemplo de uso da função:
fetchLyrics("Blinding Lights").then((lyricsLink) => {
    console.log("Link da letra:", lyricsLink);
});
