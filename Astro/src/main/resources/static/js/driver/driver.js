const driver = window.driver.js.driver;
  let driveInicialize = localStorage.getItem("driveInitialized") === "true"; // Check localStorage

// Função para lançar partículas (confetti)
function launchConfetti() {
  var duration = 3 * 1000; // Duração do confetti em milissegundos
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 5000, ticks: 60, zIndex: 9999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    var particleCount = 50 * (timeLeft / duration);
    // Confetti saindo das laterais
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

// Configuração do Driver.js
const driverObj = driver({
  nextBtnText: "—›",
  prevBtnText: "‹—",
  doneBtnText: "Pronto",
  popoverClass: "driverjs-theme",
  overlayColor: "#05061e76",
  steps: [
    {
      element: ".user-perfil",
      popover: {
        title: "Seu Perfil",
        description:
          "Aqui você pode acessar todas as suas informações e configurações pessoais, centralizando o controle da sua conta.",
      },
    },
    {
      element: ".sidebar",
      popover: {
        title: "Navegue Entre os Planetas",
        description:
          "Acesse facilmente novas músicas e suas playlists favoritas. A sidebar é o seu portal para a exploração musical!",
      },
    },
    {
      element: ".player",
      popover: {
        title: "Aumente o Som!",
        description:
          "Ouça suas faixas favoritas e controle a reprodução com facilidade. O player coloca a música em suas mãos.",
      },
    },
    {
      element: ".btn-shine",
      popover: {
        title: "Seja premium!",
        description:
          "Desbloqueie recursos exclusivos e tenha uma experiência musical ainda mais incrível. Seja um astro premium!",
      },
    },
    {
      element: ".local-tracks",
      popover: {
        title: "Explore os Planetas!",
        description:
          "Descubra e conheça novos artistas ao navegar pelas constelações musicais. Uma nova jornada sonora espera por você!",
      },
    },
  ],
  // Quando o tour for finalizado
  onDestroyStarted: () => {
    if (!driverObj.hasNextStep() || confirm("Deseja sair do Tour?")) {
      const main = document.querySelector("main");
      main.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      driverObj.destroy();
      driveInicialize = true;
      localStorage.setItem("driveInitialized", "true"); // Save to localStorage
      launchConfetti(); // Lança o confetti quando o tour termina
    }
  },
});

if (!driveInicialize) {
  driverObj.drive();
}