export class WikipediaAccess {
    constructor() {
      this.baseUrl = "https://pt.wikipedia.org/api/rest_v1/page/summary/";
    }
  
    async fetchBiography(artistName) {
      if (!artistName) throw new Error("Nome do artista não informado.");
  
      try {
        const response = await fetch(`${this.baseUrl}${encodeURIComponent(artistName)}`);
        if (!response.ok) {
          throw new Error(``);
        }
        const data = await response.json();
        return data.extract || "Biografia não disponível.";
      } catch (error) {
        console.error("Erro ao buscar biografia:", error.message);
        return "";
      }
    }
  }
  