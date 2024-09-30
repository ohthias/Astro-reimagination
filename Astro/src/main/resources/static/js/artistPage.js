const clientId = "8b8a8c66585b4376b70f7362c50fbdf0";
const clientSecret = "f72310fabe114507b38b88988be9cc73";
let artistName;
let accessToken;

const getArtistId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Erro ao obter o token");
  }

  const data = await response.json();
  return data.access_token;
};

// Função para buscar os dados do artista na API do Spotify
const fetchArtistData = async (artistId) => {
  if (!accessToken) {
    accessToken = await getToken(); // Obter token se não existir
  }

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar dados do artista");
  }

  return await response.json();
};

// Função para buscar a biografia do artista na Wikipedia
const fetchBiography = async (artistName) => {
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      artistName
    )}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar biografia");
  }

  const data = await response.json();
  return data.extract; // Retorna a biografia
};

// Função principal
const displayArtist = async () => {
  const artistId = getArtistId();
  if (!artistId) {
    console.error("ID do artista não encontrado");
    return;
  }

  try {
    const artistData = await fetchArtistData(artistId);
    artistName = artistData.name;
    console.log("Artista: " + artistName);
    document.getElementById("artist-name").textContent = artistData.name;
    document.getElementById("artist-image").src =
      artistData.images[0]?.url || "imagem-padrao.png"; // Imagem padrão se não houver
    document.title = `Astro - ${artistName}`;
    // Agora chama a função para buscar a biografia
    const biography = await fetchBiography(artistName);
    document.getElementById("artist-biography").innerHTML = biography;
  } catch (error) {
    console.error(error);
  }
};

window.onload = displayArtist;