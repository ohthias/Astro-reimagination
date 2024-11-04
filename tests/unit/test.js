async function fetchLyrics(songTitle) {
    const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}`;
    const GENIUS_ACCESS_TOKEN = "bE8LQ_zSqZiH5JqsdgGdNXEX1JT6HiP4DZzHTOlfkSFy06V0jcJafH2pjs8"; // Coloque sua chave de acesso aqui
  
    try {
      const response = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`
        }
      });
  
      const data = await response.json();
      if (data.response.hits.length > 0) {
        const songPath = data.response.hits[0].result.url;
        console.log(`Link da letra: ${songPath}`);
        return songPath;
      } else {
        console.log("Letra não encontrada.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar letra:", error);
    }
  }
  
  // Exemplo de uso
  fetchLyrics("Blinding Lights");
  