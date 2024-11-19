export function colorImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const data = context.getImageData(0, 0, img.width, img.height).data;
      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.floor(r / (data.length / 4));
      g = Math.floor(g / (data.length / 4));
      b = Math.floor(b / (data.length / 4));

      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (brightness > 128) {
        r = Math.floor(r * 0.6);
        g = Math.floor(g * 0.6);
        b = Math.floor(b * 0.6);
      }

      resolve(`rgb(${r}, ${g}, ${b})`);
    };

    img.onerror = function () {
      reject("Erro ao carregar a imagem.");
    };
  });
}

export function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "mini-popup";
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("hide"); 
    setTimeout(() => popup.remove(), 500);
  }, 3000);
}