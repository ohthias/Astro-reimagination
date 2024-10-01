const imgArtist = document.getElementById("imageArtist");
const gradientDiv = document.getElementById("backParallax");
const defaultColor = "#05061e";

imgArtist.addEventListener("load", analiseDaImagem);

function analiseDaImagem() {
  const canvas = document.createElement("canvas");
  canvas.width = imgArtist.width;
  canvas.height = imgArtist.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(imgArtist, 0, 0, imgArtist.width, imgArtist.height);

  const imageData = ctx.getImageData(0, 0, imgArtist.width, imgArtist.height);
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
  const rgbaPredominanteCor = predominanteCor.replace('rgb', 'rgba').replace(')', ', 0.5)');
  gradientDiv.style.backgroundColor = rgbaPredominanteCor;

  const gradient = `linear-gradient(to bottom, ${rgbaPredominanteCor} 0%, ${defaultColor} 25%)`;
  gradientDiv.style.background = gradient;
}