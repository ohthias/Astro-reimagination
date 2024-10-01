const clientId = "8b8a8c66585b4376b70f7362c50fbdf0";
const clientSecret = "f72310fabe114507b38b88988be9cc73";
const apiAccess = new ApiAccess(clientId, clientSecret);

const listaArtistas = document.getElementById("lista-artistas");

buscarButton.addEventListener("click", async () => {
  listaArtistas.innerHTML = ""; // Limpa a lista antes de buscar novos artistas

  try {
    const genero = "pop"; // Gênero fixo
    const artistas = await apiAccess.fetchArtistas(genero);
    exibirArtistas(artistas);
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    listaArtistas.innerHTML = "<li>Erro ao buscar artistas. Tente novamente.</li>";
  }
});

const exibirArtistas = (artistas) => {
  if (artistas.length === 0) {
    listaArtistas.innerHTML = "<li>Nenhum artista encontrado.</li>";
    return;
  }

  artistas.forEach(artista => {
    const li = document.createElement("li");
    li.textContent = `${artista.name} - ${artista.external_urls.spotify}`;
    listaArtistas.appendChild(li);
  });
};