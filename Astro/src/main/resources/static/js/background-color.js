/** Gradiente de cor de fundo baseado na imagem
 *  UTA 06/10/2024
 *  author - @ohthias
*/

const imgArtist = document.getElementById("image");
const gradientDiv = document.getElementById("backParallax");
const defaultColor = "#05061e";

imgArtist.addEventListener("load", () => {
  requestAnimationFrame(analiseDaImagem);
});

/**
 * Analyzes the image from the global `imgArtist` element, determines the predominant color,
 * and applies a gradient background to the global `gradientDiv` element.
 *
 * The function creates a canvas element, draws the image onto it, and then processes the image
 * data to count the occurrences of each color. The most predominant color is then used to set
 * the background color and gradient of the `gradientDiv`.
 *
 * @throws {Error} If there is an issue with image processing or canvas manipulation.
 */
function analiseDaImagem() {
  try {
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

  } catch (error) {
    console.error("Error analyzing image:", error);
  }
}