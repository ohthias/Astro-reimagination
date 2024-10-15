document.addEventListener("DOMContentLoaded", () => {
  const imgArtist = document.querySelector("#imageArtist");
  const imgAlbum = document.querySelector("#albumImage");
  const gradientDiv = document.getElementById("backParallax");
  const defaultColor = "#05061e";
  const navLogo = document.querySelector(".nav-logo");

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

  adicionaListenerImagem(imgArtist);
  adicionaListenerImagem(imgAlbum);
  console.log("Background color script loaded.");

  function analiseDaImagem(img) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const centerWidth = img.width / 4;
      const centerHeight = img.height / 4;
      const startX = (img.width - centerWidth) / 2;
      const startY = (img.height - centerHeight) / 2;

      const imageData = ctx.getImageData(startX, startY, centerWidth, centerHeight);
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

      const rgbMatch = predominanteCor.match(/\d+/g);
      if (!rgbMatch || rgbMatch.length !== 3) {
        throw new Error("Failed to extract RGB values from the predominant color.");
      }

      const [r, g, b] = rgbMatch.map(Number);
      const [darkenedColor] = adjustColor(r, g, b);

      const rgbaPredominanteCor = `rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 2)`;
      gradientDiv.style.backgroundColor = rgbaPredominanteCor;

      const gradient = `linear-gradient(to bottom, ${rgbaPredominanteCor} 0%, ${defaultColor} 300px, var(--primary-shadow) 100%), var(--shadow)`;
      gradientDiv.style.background = gradient;
      console.log(gradient);

      const isNearWhite = (r >= 215 && g >= 215 && b >= 215);
      if (isNearWhite && navLogo) {
        navLogo.classList.add("near-white");
        console.log("Nav logo color changed to var(--shadow) due to near white background.");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  }

  function adjustColor(r, g, b) {
    const darkenFactor = 0.2;
    const darkenedColor = [
      Math.max(0, r - r * darkenFactor),
      Math.max(0, g - g * darkenFactor),
      Math.max(0, b - b * darkenFactor),
    ];

    const max = Math.max(darkenedColor[0], darkenedColor[1], darkenedColor[2]);
    if (max === 0) {
      return [darkenedColor, darkenedColor]; // Evitar divisão por zero
    }

    const saturationFactor = 1.2;
    const normColor = darkenedColor.map((c) => c / max);
    const saturatedColor = normColor
      .map((c) => Math.min(1, c * saturationFactor))
      .map((c) => Math.round(c * 255));

    return [saturatedColor, darkenedColor];
  }
});