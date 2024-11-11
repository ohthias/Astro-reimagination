function loadContent(page) {
    const content = document.getElementById('content');

    // Limpa o conteúdo anterior
    content.innerHTML = '';

    // Chama a função correspondente com base na página
    switch (page) {
        case 'home':
            generateHomePageContent();  // Gera conteúdo da home
            break;
        case 'busca':
            generateSearchContent();   // Gera conteúdo da busca
            break;

        case 'artist':
        displayArtist();
            generateArtistContent();   // Gera conteúdo da busca
            break;
        default:
            content.innerHTML = '<p>Conteúdo não encontrado.</p>';
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    loadContent('home');
});
