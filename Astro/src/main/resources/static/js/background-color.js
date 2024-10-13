/** Gradiente de cor de fundo baseado na imagem
 *  UTA 06/10/2024
 *  author - @ohthias
 */

document.addEventListener("DOMContentLoaded", () => {
  const imgArtist = document.querySelector("#imageArtist");
  const imgAlbum = document.querySelector("#albumImage");
  const gradientDiv = document.getElementById("backParallax");
  const defaultColor = "#05061e";

  // Função para adicionar event listeners
  function adicionaListenerImagem(img) {
    if (img) {
      console.log("Image element found:", img);
      img.addEventListener("load", () => {
        console.log("Image loaded:", img.src);
        requestAnimationFrame(() => analiseDaImagem(img));
      });
      img.addEventListener("error", () => {
        console.error("Failed to load image:", img.src);
      });
    } else {
      console.error("Image element is null");
    }
  }

  // Adiciona event listeners para ambas as imagens
  adicionaListenerImagem(imgArtist);
  adicionaListenerImagem(imgAlbum);
  console.log("Background color script loaded.");

  /**
   * Analyzes the center region of the provided image element (`img`), determines the predominant color,
   * and applies a gradient background to the global `gradientDiv` element.
   *
   * @param {HTMLElement} img - The image element (imgArtist or imgAlbum) to analyze.
   * @throws {Error} If there is an issue with image processing or canvas manipulation.
   */
  function analiseDaImagem(img) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Define o tamanho da área central a ser analisada (ajuste conforme necessário)
      const centerWidth = img.width / 4; // 1/4 da largura total
      const centerHeight = img.height / 4; // 1/4 da altura total

      // Calcula a posição do canto superior esquerdo da área central
      const startX = (img.width - centerWidth) / 2;
      const startY = (img.height - centerHeight) / 2;

      // Obtém os dados da imagem apenas na área central
      const imageData = ctx.getImageData(
        startX,
        startY,
        centerWidth,
        centerHeight
      );
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

      // Escurecer e aumentar saturação
      const [r, g, b] = predominanteCor.match(/\d+/g).map(Number);
      const [darkenedColor, saturatedColor] = adjustColor(r, g, b);

      const rgbaPredominanteCor = `rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 2)`;
      gradientDiv.style.backgroundColor = rgbaPredominanteCor;

      const gradient = `linear-gradient(to bottom, ${rgbaPredominanteCor} 0%, ${defaultColor} 25%)`;
      gradientDiv.style.background = gradient;
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  }

  /**
   * Adjust the RGB color by darkening and increasing saturation.
   *
   * @param {number} r - Red component (0-255)
   * @param {number} g - Green component (0-255)
   * @param {number} b - Blue component (0-255)
   * @returns {Array} - New RGB color after adjustment
   */
  function adjustColor(r, g, b) {
    const darkenFactor = 0.2;
    const darkenedColor = [
      Math.max(0, r - r * darkenFactor),
      Math.max(0, g - g * darkenFactor),
      Math.max(0, b - b * darkenFactor),
    ];

    const max = Math.max(darkenedColor[0], darkenedColor[1], darkenedColor[2]);
    const saturationFactor = 1.2;

    const normColor = darkenedColor.map((c) => c / max);
    const saturatedColor = normColor
      .map((c) => Math.min(1, c * saturationFactor))
      .map((c) => Math.round(c * 255));

    return [saturatedColor, darkenedColor];
  }
});
