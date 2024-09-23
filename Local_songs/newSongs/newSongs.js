const nameSong = document.querySelector("#nameSong");
const artist = document.querySelector("#artist");
const songAudio = document.querySelector("#songAudio");
const imageSong = document.querySelector("#imageSong");
const genero = document.querySelector("#genero");
const album = document.querySelector("#album");

// Ritmo da música
let selectRitmo = "";
const ritmos = [
  "calmo",
  "moderado",
  "agitado",
  "intenso",
  "raiva",
  "sombrio",
  "romantico",
  "dramatico",
];

ritmos.forEach((ritmo) => {
  const button = document.querySelector(`#${ritmo}`);
  button.addEventListener("click", function () {
    selectRitmo = ritmo.charAt(0).toUpperCase() + ritmo.slice(1); // Converte a primeira letra para maiúscula
  });
});

const done = document.querySelector("#done");
const resultados = document.querySelector("#results");
const musicList = [];

done.onclick = () => newSong();

/** - newSong():
 *    Nesta função, ele insere os valores assumidos nos
 *    inputs e nos botões, e atribui eles dentro do objeto newMusic,
 *    que em cada atributo ele associa com seu respectivo dado coletado.
 *    Após adicionar essa informação no objeto, ele reseta todos os valores,
 *    aguardando novos dados
 */

const newSong = () => {
  const songName = nameSong.value;
  const artistName = artist.value;
  const songURLAudio = songAudio.value;
  const songURLImage = imageSong.value;
  const imageAlt = `${songName} by ${artistName}`;
  const songTags = [genero.value, selectRitmo, album.value].filter(
    (tag) => tag
  );

  if (!songName || !artistName || !songURLAudio || !songURLImage) {
    alert("Por favor, preencha todos os campos antes de adicionar a música.");
    return;
  }

  // Garantir que o ID tenha 4 dígitos e não ultrapasse esse valor
  const idNumber = musicList.length + 1;
  if (idNumber > 9999) {
    alert("Limite máximo de músicas atingido.");
    return;
  }

  const id = `ast${String(idNumber).padStart(4, "0")}`; // Preenche com zeros à esquerda até 4 dígitos

  const newMusic = {
    id: id,
    name: songName,
    artist: artistName,
    tags: songTags,
    url: songURLAudio,
    image: {
      url: songURLImage,
      alt: imageAlt,
    },
  };

  musicList.push(newMusic);

  nameSong.value = "";
  artist.value = "";
  songAudio.value = "";
  imageSong.value = "";
  genero.value = "";
  album.value = "";
  selectRitmo = "";

  updateMusicList();
};

/**
 *  - UpdateMusicList()
 *    Criação de lista a partir dos dados do objeto.
 *    Com o seu output, o formato padrão de um objeto para ser
 *    inserido no arquivo songs.js
 */
const updateMusicList = () => {
  resultados.innerHTML = "";
  const ul = document.createElement("ul");

  for (const music of musicList) {
    const li = document.createElement("li");
    li.innerHTML = `<br> {<br>
            id: "${music.id}",<br>
            name: "${music.name}",<br>
            artist: "${music.artist}",<br>
            tags: [${music.tags.map((tag) => `"${tag}"`).join(", ")}],<br>
            url: "${music.url}",<br>
            image: {<br>
              url: "${music.image.url}",<br>
              alt: "${music.image.alt}"<br>
            },<br>
        }, <br>`;
    ul.appendChild(li);
  }
  resultados.appendChild(ul);
};
