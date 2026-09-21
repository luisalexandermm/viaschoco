// ============================================================
//  COMPILADOR (opcional)
//  Junta los archivos de componentes y paginas (que usan JSX) y
//  los convierte en un solo archivo "public/app.build.js" que el
//  navegador puede leer sin necesidad de Babel. Esto hace que la
//  pagina cargue MUCHO mas rapido.
//
//  Cuando cambies algo en js/componentes o js/paginas o main.js,
//  vuelve a ejecutar:   node compilar.js
// ============================================================

const fs = require("fs");
const path = require("path");
const Babel = require("./public/vendor/babel.min.js");

// Orden en que se juntan los archivos (main.js va de ultimo)
const archivos = [
  "public/js/componentes/Header.js",
  "public/js/componentes/Footer.js",
  "public/js/componentes/DeslizarEntrar.js",
  "public/js/componentes/LoginModal.js",
  "public/js/componentes/MapComponent.js",
  "public/js/componentes/ReporteModal.js",
  "public/js/componentes/ReportDetailsModal.js",
  "public/js/componentes/AdminPanel.js",
  "public/js/paginas/SobreNosotros.js",
  "public/js/paginas/Legal.js",
  "public/js/paginas/TerminosCondiciones.js",
  "public/js/paginas/Cookies.js",
  "public/js/paginas/ReporteAbuso.js",
  "public/js/main.js",
];

let salida =
  "// ARCHIVO GENERADO AUTOMATICAMENTE por 'node compilar.js'.\n" +
  "// No lo edites a mano: edita los archivos de js/componentes y js/paginas.\n\n";

archivos.forEach(function (relativo) {
  const codigo = fs.readFileSync(path.join(__dirname, relativo), "utf8");
  const compilado = Babel.transform(codigo, {
    presets: [[Babel.availablePresets["react"], { runtime: "classic" }]],
    compact: false,
  }).code;
  salida += "\n// ===== " + relativo + " =====\n" + compilado + "\n";
});

fs.writeFileSync(path.join(__dirname, "public/app.build.js"), salida, "utf8");
console.log("Listo: se genero public/app.build.js (" + archivos.length + " archivos).");
