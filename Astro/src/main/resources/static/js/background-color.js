const imgSong = document.getElementById("imageArtist");
const gradientDiv = document.getElementById("backParallax");
const defaultColor = "#05061e";

imgSong.addEventListener("load", analiseDaImagem);

function analiseDaImagem() {
  const imagem = new Image();
  imagem.src = imgSong.src;

  imagem.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = imagem.width;
    canvas.height = imagem.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(imagem, 0, 0, imagem.width, imagem.height);

    const imageData = ctx.getImageData(0, 0, imagem.width, imagem.height);
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

    // Apply the predominant color to the background of gradientDiv
    gradientDiv.style.backgroundColor = predominanteCor;

    // Create a gradient background with the predominant color and the default color
    const gradient = `linear-gradient(to bottom, ${predominanteCor}, ${defaultColor})`;
    gradientDiv.style.backgroundImage = gradient;
  };
}
