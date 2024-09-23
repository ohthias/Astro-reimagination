const apiKey = '01bdc79df110067ff9eedcf67cbf5419'; // Substitua pela sua chave de API

document.getElementById('search-button').addEventListener('click', () => {
    const artistName = document.getElementById('artist-name').value;
    fetchArtistInfo(artistName);
});

const fetchArtistInfo = async (artistName) => {
    const baseUrl = 'https://ws.audioscrobbler.com/2.0/';
    const query = `?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(baseUrl + query);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayArtistInfo(data.artist);
    } catch (error) {
        console.error('Erro ao buscar dados da Last.fm:', error);
        document.getElementById('artist-info').innerText = 'Erro ao buscar informações do artista.';
    }
};

const displayArtistInfo = (artist) => {
    const artistInfoDiv = document.getElementById('artist-info');
    artistInfoDiv.innerHTML = '';

    if (artist) {
        const imageUrl = artist.image
            .filter(img => img['#text'] !== '')
            .reduce((largest, img) => img.size === 'extralarge' ? img['#text'] : largest, '');

        const html = `
            <h2>${artist.name}</h2>
            <img src="${imageUrl || 'https://via.placeholder.com/200'}" alt="${artist.name}" style="width: 200px;">
            <p><strong>Biografia:</strong> ${artist.bio.summary}</p>
            <p><strong>Popularidade:</strong> ${artist.stats.playcount} plays</p>
            <p><a href="${artist.url}" target="_blank">Ver mais no Last.fm</a></p>
        `;
        artistInfoDiv.innerHTML = html;

        // Buscar as músicas do artista
        fetchTopTracks(artist.name);
    } else {
        artistInfoDiv.innerText = 'Artista não encontrado.';
    }
};

const fetchTopTracks = async (artistName) => {
    const baseUrl = 'https://ws.audioscrobbler.com/2.0/';
    const query = `?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

    try {
        const response = await fetch(baseUrl + query);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayTopTracks(data.toptracks.track);
    } catch (error) {
        console.error('Erro ao buscar músicas do artista:', error);
        document.getElementById('artist-info').innerText += '\nErro ao buscar músicas.';
    }
};

const displayTopTracks = (tracks) => {
    const artistInfoDiv = document.getElementById('artist-info');

    if (tracks && tracks.length > 0) {
        let tracksHtml = '<h3>Músicas Populares:</h3><ul>';
        tracks.forEach(track => {
            // Usa o URL da Last.fm para a música
            const trackLink = track.url; // URL da música na Last.fm
            tracksHtml += `
                <li>
                    ${track.name} - ${track.playcount} plays 
                    <a href="${trackLink}" target="_blank">Ouvir</a>
                </li>`;
        });
        tracksHtml += '</ul>';
        artistInfoDiv.innerHTML += tracksHtml;
    } else {
        artistInfoDiv.innerHTML += '<p>Nenhuma música encontrada.</p>';
    }
};
