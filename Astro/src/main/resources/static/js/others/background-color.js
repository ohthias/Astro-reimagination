export function imageGradient() {
  const imgArtist = document.querySelector("#imageArtist");
  const imgAlbum = document.querySelector("#albumImage");
  const userImage = document.querySelector("#userImage");
  const gradientDiv = document.getElementById("backParallax");
  const defaultColor = "#05061e";
  const navLogo = document.querySelector(".nav-logo");

  const darkenFactor = 0.5;
  const saturationFactor = 0.9;

  function adicionaListenerImagem(img) {
    if (!img) {
      console.error("Image element is null");
      return;
    }
    img.addEventListener("load", () => {
      requestAnimationFrame(() => analiseDaImagem(img));
    });
    img.addEventListener("error", () => {
      console.error("Failed to load image:", img.src);
    });
  }

  if (document.body && document.body.id === "backParallax") {
    [imgArtist, imgAlbum, userImage].forEach(adicionaListenerImagem);
  } else {
    document.body.style.backgroundColor = defaultColor;
  }


  function analiseDaImagem(img) {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = capturarCentroDaImagem(ctx, img);
      const predominanteCor = calcularCorPredominante(imageData.data);

      const rgbMatch = predominanteCor.match(/\d+/g);
      if (!rgbMatch || rgbMatch.length !== 3) {
        throw new Error(
          "Failed to extract RGB values from the predominant color."
        );
      }

      const [r, g, b] = rgbMatch.map(Number);
      const [saturatedColor] = ajustarCor(r, g, b);

      aplicarGradiente(saturatedColor, r, g, b);
    } catch (error) {
      console.error("Error analyzing image:", error);
      document.body.style.backgroundColor = `linear-gradient(to bottom, ${defaultColor} 300px, ${defaultColor}), var(--shadow)`;
    }
  }

  function capturarCentroDaImagem(ctx, img) {
    const centerWidth = img.width / 4;
    const centerHeight = img.height / 4;
    const startX = (img.width - centerWidth) / 2;
    const startY = (img.height - centerHeight) / 2;
    return ctx.getImageData(startX, startY, centerWidth, centerHeight);
  }

  function calcularCorPredominante(pixels) {
    const contaCor = {};

    for (let i = 0; i < pixels.length; i += 4) {
      const rgb = `rgb(${pixels[i]},${pixels[i + 1]},${pixels[i + 2]})`;
      contaCor[rgb] = (contaCor[rgb] || 0) + 1;
    }

    return Object.keys(contaCor).reduce((a, b) =>
      contaCor[a] > contaCor[b] ? a : b
    );
  }

  function ajustarCor(r, g, b) {
    const darkenedColor = [r, g, b].map((c) =>
      Math.max(0, c - c * darkenFactor)
    );
    const max = Math.max(...darkenedColor);

    if (max === 0) return [darkenedColor, darkenedColor]; // Evitar divisão por zero

    const normColor = darkenedColor.map((c) => c / max);
    const saturatedColor = normColor.map(
      (c) => Math.min(1, c * saturationFactor) * 255
    );

    return [saturatedColor.map(Math.round), darkenedColor];
  }

  function aplicarGradiente([r, g, b], origR, origG, origB) {
    const rgbaPredominanteCor = `rgba(${r}, ${g}, ${b}, 0.8)`;  // Adjust alpha value for visibility
    const gradient = `linear-gradient(to bottom, ${rgbaPredominanteCor} 0%, ${defaultColor} 300px), var(--shadow)`;
    gradientDiv.style.background = gradient;

    if (origR >= 215 && origG >= 215 && origB >= 215 && navLogo) {
      navLogo.classList.add("near-white");
    } else if (origR <= 65 && origG <= 65 && origB <= 65 && navLogo) {
      navLogo.classList.remove("near-white");
    }
  }
}
