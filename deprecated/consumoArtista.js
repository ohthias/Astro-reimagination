const apiKey = 'apiKey';

const fetchArtistInfo = async (artistName) => {
    const baseUrl = 'https://ws.audioscrobbler.com/2.0/';
    const query = `?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(baseUrl + query);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.artist) {
            console.log(data.artist);
        } else {
            console.log('Artista não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar dados da Last.fm:', error);
    }
};

// Exemplo de uso
fetchArtistInfo('Nirvana');
