const BASE_URL = "https://musicbrainz.org/ws/2";

/**
 * Faz uma requisição para a API do MusicBrainz.
 * @param {string} url - URL completa para a requisição.
 * @returns {Promise<Object>} Dados da resposta em JSON.
 */
async function fetchFromMusicBrainz(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  return response.json();
}

/**
 * Busca informações sobre a gravação de uma música.
 * @param {string} songTitle - Título da música.
 * @param {string} artistName - Nome do artista.
 * @returns {Promise<Object>} Dados da gravação.
 */
async function fetchRecordingDetails(songTitle, artistName) {
  const queryUrl = `${BASE_URL}/recording?query=recording:${encodeURIComponent(
    songTitle
  )}%20AND%20artist:${encodeURIComponent(artistName)}&fmt=json`;
  const data = await fetchFromMusicBrainz(queryUrl);

  if (!data.recordings || data.recordings.length === 0) {
    throw new Error("Nenhuma gravação encontrada.");
  }

  return data.recordings[0];
}

/**
 * Busca informações sobre o lançamento de uma gravação.
 * @param {string} releaseId - ID do lançamento.
 * @returns {Promise<string>} Nome da gravadora.
 */
async function fetchReleaseDetails(releaseId) {
  const releaseUrl = `${BASE_URL}/release/${releaseId}?fmt=json`;
  const releaseData = await fetchFromMusicBrainz(releaseUrl);
  return (
    releaseData["label-info"]?.[0]?.label?.name || "Gravadora desconhecida"
  );
}

/**
 * Exibe os resultados no DOM.
 * @param {Object|string} data - Dados ou mensagem de erro.
 */
function displayResults(data) {
  const resultsContainer = document.getElementById("songMoreInfo");
  resultsContainer.innerHTML = "";

  if (typeof data === "string") {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = data;
    resultsContainer.appendChild(errorMessage);
    return;
  }

  // Artistas e colaboradores
  const collaboratorsList = document.createElement("ul");
  collaboratorsList.className = "collaborators-list montserrat-semi-bold";
  collaboratorsList.textContent = "Colaboradores:";
  data.collaborators.forEach((collaborator) => {
    const listItem = document.createElement("li");
    listItem.textContent = collaborator;
    listItem.className = "list-item-collaborators montserrat-regular";
    collaboratorsList.appendChild(listItem);
  });
  resultsContainer.appendChild(collaboratorsList);

  // Gravadora
  const label = document.createElement("p");
  label.className = "gravadora montserrat-semi-bold";
  label.textContent = `Gravadora: ${data.label}`;
  resultsContainer.appendChild(label);
}

/**
 * Fluxo principal para buscar detalhes de uma música e exibir no DOM.
 * @param {string} songTitle - Título da música.
 * @param {string} artistName - Nome do artista.
 */
async function fetchMusicDetails(songTitle, artistName) {
  try {
    const recording = await fetchRecordingDetails(songTitle, artistName);
    const collaborators = recording["artist-credit"].map(
      (credit) => credit.artist.name
    );
    const releaseId = recording.releases?.[0]?.id;

    if (!releaseId) {
      displayResults({
        title: recording.title,
        collaborators,
        label: "Não foi possível determinar a gravadora.",
      });
      return;
    }

    const label = await fetchReleaseDetails(releaseId);

    displayResults({
      title: recording.title,
      collaborators,
      label,
    });
  } catch (error) {
    console.error(error);
    displayResults("Não foi possível obter informações sobre a música.");
  }
}

// Exportação das funções
export {
  fetchFromMusicBrainz,
  fetchRecordingDetails,
  fetchReleaseDetails,
  displayResults,
  fetchMusicDetails,
};
