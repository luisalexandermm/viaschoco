(function () {
  window.viasChocoInstallPrompt = null;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js").catch(function (error) {
        console.error("No se pudo registrar la aplicación offline:", error);
      });
    });
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    window.viasChocoInstallPrompt = event;
    window.dispatchEvent(new Event("viaschoco:installavailable"));
  });

  window.addEventListener("appinstalled", function () {
    window.viasChocoInstallPrompt = null;
    window.dispatchEvent(new Event("viaschoco:installed"));
  });
})();