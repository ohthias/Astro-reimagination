const imgSong = document.getElementById("imageArtist");
const gradientDiv = document.getElementById("backParallax");
const defaultColor = "#ffffff";

imgSong.addEventListener("load", analiseDaImagem);

function analiseDaImagem() {
  const canvas = document.createElement("canvas");
  canvas.width = imgSong.width;
  canvas.height = imgSong.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgSong, 0, 0, imgSong.width, imgSong.height);

  const imageData = ctx.getImageData(0, 0, imgSong.width, imgSong.height);
  const pixels = imageData.data;

  const contaCor = {};

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    const rgb = `rgb(${r},${g},${b})`;
    contaCor[rgb] = contaCor[rgb] ? contaCor[rgb] + 1 : 1;
  }

  const predominanteCor = Object.keys(contaCor).reduce((a, b) =>
    contaCor[a] > contaCor[b] ? a : b
  );

  gradientDiv.style.backgroundColor = predominanteCor;

  const gradient = `linear-gradient(to bottom, ${predominanteCor}, ${defaultColor})`;
  gradientDiv.style.background = gradient;
}