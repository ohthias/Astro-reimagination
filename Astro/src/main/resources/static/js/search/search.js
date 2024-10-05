import getToken from "./token"

const searchSpotify = async (query) => {
  const token = await getToken();  // Obtém o token de acesso

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,  // Passa o token no cabeçalho da requisição
      },
      params: {
        q: query,  // Termo de busca
        type: 'track,artist,playlist',  // Busca por músicas, artistas e playlists
        limit: 5,  // Limita a 5 resultados por categoria
      },
    });

    return response.data;  // Retorna os resultados
  } catch (error) {
    console.error('Erro ao fazer a busca:', error.response.data);
  }
};