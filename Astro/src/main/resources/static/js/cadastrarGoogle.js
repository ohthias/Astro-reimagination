function cadastraNovoUsuario(user) {
  const db = firebase.firestore();

  // Adiciona um novo usuário no banco de dados
  db.collection("usuarios").doc(user.uid).set({
    nome: user.displayName,
    email: user.email,
    fotoPerfil: user.photoURL,
    dataCadastro: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("Usuário cadastrado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao cadastrar usuário:", error);
  });
}
