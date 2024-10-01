const driver = window.driver.js.driver;

// Verifique se o tour já foi executado antes
if (!localStorage.getItem('tourCompleted')) {
  const driverObj = driver({
    nextBtnText: "—›",
    prevBtnText: "‹—",
    doneBtnText: "Pronto",
    popoverClass: 'driverjs-theme',
    showProgress: true,
    steps: [
      {
        element: ".user-perfil",
        popover: {
          title: "Seu perfil",
          description:
            "Aqui você pode acessar todas suas informações e configurações",
        },
      },
      {
        element: ".sidebar",
        popover: {
          title: "Navegue entre os planetas",
          description:
            "Aqui você pode acessar facilmente buscar novas músicas e suas playlists favoritas",
        },
      },
      {
        element: ".player",
        popover: {
          title: "Aumente o som!",
          description: "Escute e controle todas sua faixa do momento",
        },
      },
      {
        element: ".content-section",
        popover: {
          title: "Explore os planetas!",
          description: "Busque e conheça novos artistas pelas constelações",
        },
      },
    ],

    onDestroyStarted: () => {
      if (!driverObj.hasNextStep() || confirm("Deseja sair do Tour?")) {
        driverObj.destroy();
        // Marque o tour como concluído
        localStorage.setItem('tourCompleted', 'true');
      }
    },
  });

  driverObj.drive();
}