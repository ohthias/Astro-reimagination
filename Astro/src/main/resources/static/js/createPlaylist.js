// Função para exibir o popup
function showCreatePlaylistPopup() {
  document.getElementById("createPlaylistPopup").style.display = "flex";
}

// Função para fechar o popup
function closePopup() {
  document.getElementById("createPlaylistPopup").style.display = "none";
}

// Função para criar a nova playlist
function createPlaylist() {
  const playlistName = document.getElementById("playlistName").value;
  const playlistImageInput = document.getElementById("playlistImage");
  const playlistImageFile = playlistImageInput.files[0];

  if (!playlistName || !playlistImageFile) {
    alert("Por favor, insira um nome para a playlist e selecione uma imagem.");
    return;
  }

  // Criar um URL para a imagem carregada
  const reader = new FileReader();
  reader.onloadend = function () {
    const playlistImageURL = reader.result;

    // Obter playlists do localStorage ou inicializar um array vazio
    let userPlaylists = JSON.parse(localStorage.getItem("userPlaylists")) || [];

    // Criar nova playlist
    const newPlaylist = {
      id: playlistName.toLowerCase().replace(/\s+/g, "_"), // ID gerado a partir do nome
      name: playlistName,
      author: "Você",
      isUserOwned: true,
      coverImage: playlistImageURL,
    };

    // Adicionar nova playlist ao array
    userPlaylists.push(newPlaylist);

    // Salvar as playlists atualizadas no localStorage
    localStorage.setItem("userPlaylists", JSON.stringify(userPlaylists));

    // Fechar o popup e atualizar a interface
    closePopup();
  };

  // Lê o arquivo da imagem como URL
  reader.readAsDataURL(playlistImageFile);
}
