const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const artistName = document.querySelector("#artistName");
const imgSong = document.querySelector("#imgSong");
const heartMusic = document.querySelector("#heartMusic");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

// Icones para botão
const textButtonPlay = "<span class='material-symbols-outlined play_arrow'>play_arrow</span>";
const textButtonPause = "<span class='material-symbols-outlined play_arrow'>pause</span>";

let index = 0;

// Keyboard atalhos
const pressPrevNext = (event) => {
  if (event.key === "ArrowLeft") {
    prevNextMusic("prev");
  } else if (event.key == "ArrowRight") {
    prevNextMusic();
  } else if (event.key === "m" && event.ctrlKey) {
    stateButtonVolume();
  } else if (event.key === "p" && event.altKey && event.ctrlKey) {
    playPause();
  }
};

//Eventos
document.addEventListener("keydown", pressPrevNext);
prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();
playPauseButton.onclick = () => playPause();
player.ontimeupdate = () => updateTime();

let isPlaying = false;

/**
 * @param {function} playPause - controle de estado de reprodução do player de áudio,
 * juntamente com a atualização do ícone do botão de reprodução/pausa, @param {updatePlayPauseIcon}.
 */
const playPause = () => {
  if (player.paused) {
    player.play();
    startListening();
    isPlaying = true; // Atualize o estado para tocando
  } else {
    stopListening();
    player.pause();
    isPlaying = false; // Atualize o estado para pausado
  }
  updatePlayPauseIcon(); // Atualiza o ícone do botão Play/Pause
};

const updatePlayPauseIcon = () => {
  if (player.paused) {
    playPauseButton.innerHTML = textButtonPlay;
  } else {
    playPauseButton.innerHTML = textButtonPause;
  }
};

/**
 * @param {fuction} updateTime - Atualiza a exibição do tempo de reprodução
 *  atual e da duração da faixa no formato de minutos e segundos, bem como
 *  atualizar visualmente a barra de progresso, com base no estado de reprodução
 *  do player de áudio. A função updateTime calcula os minutos e segundos do tempo
 *  atual de reprodução e da duração total da faixa, formatando-os para exibição.
 *  Além disso, ela atualiza a largura da barra de progresso de acordo com o
 * progresso da reprodução. A função formatZero garante que os números menores que
 * 10 sejam exibidos com um zero à esquerda. O evento onclick na progressBar permite
 * que o usuário clique na barra de progresso para ajustar a minutagem da reprodução
 * com base na posição do clique.
 */
const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};


/**
 * @param {fuction} prevNextMusic - Gerencia a reprodução de músicas
 *  anteriores e próximas do player, considerando também o modo de reprodução
 *  aleatória. A função prevNextMusic é acionada ao clicar nos botões de
 *  avançar ou retroceder e aceita um argumento type, que especifica a ação
 *  ("next" para avançar ou "prev" para retroceder). Dependendo do modo de
 *  reprodução aleatória (randomMode), ele pode selecionar aleatoriamente uma
 *  nova música (getRandomIndex()) ou atualizar o índice da música atual. Se
 *  o modo aleatório não estiver ativado, ele ajusta o índice com base nas ações
 *  do usuário. Os detalhes da nova música são carregados no player de áudio,
 *  incluindo a fonte, o nome, o artista e a capa. Além disso, se o player não
 *  estiver reproduzindo, inicia a reprodução, atualiza os detalhes exibidos e
 *  chama a função updateTime(). Se a ação for "next", também atualiza a lista de
 *  próximas músicas com showUpcomingSongs(). Em resumo, esse código permite a
 *  navegação entre músicas e a atualização dos detalhes da reprodução, considerando
 *  tanto a reprodução aleatória quanto o estado de reprodução anterior.
 */
const prevNextMusic = (type = "next") => {
  if (
    (type == "next" && index + 1 === allSongs.length) ||
    type === "init"
  ) {
    index = 0;
  } else if (type == "prev" && index === 0) {
    index = allSongs.length;
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }
  player.src = Object.values(allSongs)[index].src;
  musicName.innerHTML = Object.values(allSongs)[index].nameSong;
  artistName.innerHTML = Object.values(allSongs)[index].artist;
  imgSong.src = Object.values(allSongs)[index].imgSong;
  heartMusic.innerHTML = textNormalHeartMusic;

  if (!isPlaying) {
    player.play();
  }

  updateTime();
  playPause();

  if (type === "next") {
    showUpcomingSongs();
  }
};

prevNextMusic("init");
