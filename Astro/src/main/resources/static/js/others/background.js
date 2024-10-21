document.addEventListener('DOMContentLoaded', function() {
    // Gera cores aleatórias
    const randomColor1 = `#${Math.floor(Math.random()*16777215).toString(8)}`;
    const randomColor2 = `#${Math.floor(Math.random()*16777215).toString(8)}`;
  
    // Aplica as cores geradas nas variáveis CSS
    document.documentElement.style.setProperty('--primary-shadow-light', randomColor1);
    document.documentElement.style.setProperty('--secondary-shadow-light', randomColor2);
  });
  