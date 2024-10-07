const searchArtists = async (query) => {
    try {
      const response = await fetch(`/api/spotify/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      exibirResultados(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API Spotify", error);
    }
  };

  const exibirResultados = (data) => {
    const listaArtistas = document.getElementById("lista-artistas");
    const listaMusicas = document.getElementById("lista-musicas");
    const listaPlaylists = document.getElementById("lista-playlists");

    listaArtistas.innerHTML = ""; // Limpa a lista de artistas
    listaMusicas.innerHTML = "";   // Limpa a lista de músicas
    listaPlaylists.innerHTML = "";  // Limpa a lista de playlists

    // Exibir artistas
    if (data.artists && data.artists.items.length > 0) {
      data.artists.items.forEach(artista => {
        const item = document.createElement('div');
        item.classList.add("track-item")
        const imagemUrl = artista.images.length > 0 ? artista.images[0].url : 'https://via.placeholder.com/50';
        item.innerHTML = `
            <img src="${imagemUrl}" class="artist-image" alt="${artista.name}" />
            <div class='track-item-detail'>
                <h3 class='montserrat-bold artists-result'>${artista.name}</h3>
            </div>
        `;
        listaArtistas.appendChild(item);
      });
    }

    // Exibir músicas
    if (data.tracks && data.tracks.items.length > 0) {
      data.tracks.items.forEach(musica => {
        const item = document.createElement('div');
        item.classList.add("track-item")
        const imagemUrl = musica.album.images.length > 0 ? musica.album.images[0].url : 'https://via.placeholder.com/50';
        item.innerHTML = `
            <img src="${imagemUrl}" class="track-image" alt="${musica.name}" />
            <div class='track-item-detail'>
                <h3 class='montserrat-bold'>${musica.name}</h3>
                <p class='montserrat-regular'>${musica.name}</p>
            </div>
        `;
        listaMusicas.appendChild(item);
      });
    }

    // Exibir playlists
    if (data.playlists && data.playlists.items.length > 0) {
      data.playlists.items.forEach(playlist => {
        const item = document.createElement('div');
        item.classList.add("track-item")
        const imagemUrl = playlist.images.length > 0 ? playlist.images[0].url : 'https://via.placeholder.com/50';
        item.innerHTML = `
            <img src="${imagemUrl}" class="track-image" alt="${playlist.name}" />
            <div class='track-item-detail'>
                <h3 class='montserrat-bold'>${playlist.name}</h3>
                <p class='montserrat-regular'>Criado por: ${playlist.owner.display_name}</p>
            </div>
        `;
        listaPlaylists.appendChild(item);
      });
    }
  };

  // Listener para a barra de busca
  document.querySelector('#search').addEventListener('input', (event) => {
    const query = event.target.value;
    if (query.length > 2) { // Apenas busca se o tamanho for maior que 2
      searchArtists(query);
    }
  });