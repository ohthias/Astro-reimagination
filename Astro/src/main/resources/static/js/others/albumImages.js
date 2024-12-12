// Array com URLs das imagens
const images = [
  "https://cdns-images.dzcdn.net/images/cover/967ac8605268db88a1e597394115365d/1900x1900-000000-80-0-0.jpg",
  "https://www.billboard.com/wp-content/uploads/2023/07/SZA-SOS-album-art-billboard-1240.jpg?w=800",
  "https://www.audiograma.com.br/wp-content/uploads/2014/07/maroon5_v.jpg",
  "https://www.vogue.pt/uploads/photos/21314571d6821571f6cae6554fbc3be1.jpg",
  "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-4.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
];

const musicImage = document.querySelector(".music-image");

const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

function updateBeforeBackground(imageUrl) {
  styleElement.innerHTML = `
        section.music-section .music-image::before {
            background-image: url(${imageUrl});
        }
    `;
}

let currentIndex = 0;
function changeBackground() {
  musicImage.classList.remove("show");

  setTimeout(() => {
    updateBeforeBackground(images[currentIndex]);

    musicImage.classList.add("show");

    currentIndex = (currentIndex + 1) % images.length;
  }, 1000); // Tempo de espera precisa ser igual ao da transição
}

setInterval(changeBackground, 10000);

changeBackground();
