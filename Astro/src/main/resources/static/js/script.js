const buscarArtistas = async () => {
    const listaArtistas = document.getElementById("lista-artistas");
    listaArtistas.innerHTML = "";
    try {
        const response = await fetch(`/api/spotify/artists?genre=pop`);
        if (!response.ok) throw new Error("Erro ao buscar artistas");

        const artistas = await response.json();
        exibirArtistas(artistas);
    } catch (error) {
        console.error("Erro ao buscar artistas:", error);
        listaArtistas.innerHTML = "<li>Erro ao buscar artistas. Tente novamente.</li>";
    }
};

const buscarMusicas = async (genero) => {
    const listaMusicas = document.getElementById("lista-musicas");
    listaMusicas.innerHTML = "";
    try {
        const response = await fetch(`/api/spotify/tracks?genre=${encodeURIComponent(genero)}`);
        if (!response.ok) throw new Error("Erro ao buscar músicas");

        const musicas = await response.json();
        exibirTopTracks(musicas);
    } catch (error) {
        console.error("Erro ao buscar músicas:", error);
        listaMusicas.innerHTML = "<li>Erro ao buscar músicas. Tente novamente.</li>";
    }
};

const exibirArtistas = (artistas) => {
    const listaArtistas = document.getElementById("lista-artistas");
    listaArtistas.innerHTML = "";

    if (artistas.length === 0) {
        listaArtistas.innerHTML = "<li>Nenhum artista encontrado.</li>";
        return;
    }

    artistas.forEach((artista) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const imgUrl = artista.images.length > 0 ? artista.images[0].url : '';

        slide.innerHTML = `
            <a href="./artist?id=${artista.id}" class="artist-link" data-artist-id="${artista.id}">
                <img src="${imgUrl}" class="artist_image" alt="${artista.name}" />
                <h4>${artista.name}</h4>
            </a>
        `;

        listaArtistas.appendChild(slide);
    });

    new Swiper('.swiper-container-artistas', {
        slidesPerView: 7,
        spaceBetween: 16,
        navigation: {
            nextEl: '.swiper-button-next-artistas',
            prevEl: '.swiper-button-prev-artistas',
        },
    });
};

const exibirTopTracks = (tracks) => {
    const listaMusicas = document.getElementById("lista-musicas");
    listaMusicas.innerHTML = "";

    if (tracks.length === 0) {
        listaMusicas.innerHTML = "<li>Nenhuma música encontrada.</li>";
        return;
    }

    tracks.forEach((track) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const imgUrl = track.album.images.length > 0 ? track.album.images[0].url : '';

        slide.innerHTML = `
            <div class="track-item">
                <img src="${imgUrl}" class="track-image" alt="${track.name}" />
                <div class='track-item-detail'>
                    <h5>${track.name}</h5>
                    <p>${track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
            </div>
        `;

        listaMusicas.appendChild(slide);
    });

    new Swiper('.swiper-container-musicas', {
        slidesPerView: 7,
        spaceBetween: 24,
        navigation: {
            nextEl: '.swiper-button-next-musicas',
            prevEl: '.swiper-button-prev-musicas',
        },
    });
};
