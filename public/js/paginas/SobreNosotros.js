// ============================================================
//  SECCION "SOBRE NOSOTROS" + EQUIPO  (rediseño liquid glass)
//  Un manifiesto en vidrio, numeros de impacto, tres pilares y
//  las tarjetas del equipo tipo vidrio transparente.
// ============================================================

// ---- Tarjeta de una persona del equipo (vidrio) ----
window.TarjetaEquipo = function TarjetaEquipo(props) {
  var p = props.persona;
  return (
    <div className="equipo-card">
      <img src={p.imagen} alt={p.nombre} className="equipo-foto" />
      <h3 className="font-bold text-carbon-900 text-lg">{p.nombre}</h3>
      <p className="text-sm text-slate-500">{p.apellido}</p>
      <div className="mt-3"><span className="rol-chip">{p.rol}</span></div>
      <p className="text-sm text-slate-600 mt-4 leading-relaxed">{p.descripcion}</p>
      {p.email && (
        <a
          href={"mailto:" + p.email}
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-selva-700 hover:text-selva-600 break-all"
        >
          ✉ {p.email}
        </a>
      )}
    </div>
  );
};

// ---- Seccion completa ----
window.AboutSection = function AboutSection() {
  var equipo = [
    { nombre: "Luis Alexander", apellido: "Moreno Maturana", rol: "Full Stack", imagen: "img/luis-alexander (2).png", descripcion: "Lideró el panel de administración, la arquitectura backend-frontend y el despliegue.", email: "alrxandermaturana76@gmail.com" },
    { nombre: "Ashley Sofía", apellido: "Panesso Palacios", rol: "Frontend y Backend", imagen: "img/ashley-sofia.png", descripcion: "Diseñó el login, el registro y la validación de usuarios, además de parte del servidor.", email: "Ashleysofiapanessopalacios@gmail.com" },
    { nombre: "Carlos Mauricio", apellido: "Machado Córdoba", rol: "Frontend", imagen: "img/carlos-mauricio.png", descripcion: "Implementó los componentes interactivos y mejoró la experiencia en celulares.", email: "machaocarlo10@gmail.com" },
    { nombre: "Boris Leon", apellido: "Valoy Hinestroza", rol: "Frontend", imagen: "img/boris-leon.png", descripcion: "Diseñó el estilo visual, las animaciones y la presentación general del panel.", email: "borisleonvaloy@gmail.com" },
    { nombre: "Jhaymar Smith", apellido: "Caicedo Garces", rol: "Frontend", imagen: "img/jhaymar-smith.png", descripcion: "Desarrolló las integraciones de mapas y los reportes georreferenciados.", email: "marcelaoficial2020@gmail.com" },
  ];

  var impacto = [
    { n: "8", t: "Vías monitoreadas" },
    { n: "24/7", t: "Monitoreo continuo" },
    { n: "4", t: "Niveles de estado" },
    { n: "100%", t: "Hecho con la comunidad" },
  ];

  var pilares = [
    { icono: "🎯", titulo: "Nuestra misión", texto: "Dar acceso a información vial oportuna para que conductores, comunidades y autoridades planifiquen rutas seguras y eviten riesgos." },
    { icono: "🌅", titulo: "Nuestra visión", texto: "Ser la herramienta de referencia para la movilidad del Pacífico colombiano, con datos precisos y una experiencia confiable." },
    { icono: "🤝", titulo: "Lo que ofrecemos", texto: "Estado de las vías al día, alertas de derrumbes e inundaciones, mapa interactivo y reportes ciudadanos en vivo." },
  ];

  return (
    <section id="seccion-sobre-nosotros" className="scroll-mt">
      <div className="text-center mb-12">
        <span className="etiqueta-seccion">Acerca de Vías Chocó</span>
        <h2 className="titulo-seccion mt-3">Sobre nosotros</h2>
      </div>

      {/* Manifiesto en vidrio */}
      <div className="vidrio-claro vidrio-glow p-8 md:p-12 mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <p className="titulo-display text-2xl md:text-4xl leading-snug text-carbon-900">
            Conectamos a las comunidades del Chocó con información vial{" "}
            <span className="text-selva-600">clara, oportuna y colaborativa</span>.
          </p>
          <p className="text-slate-600 mt-5 text-lg">
            Vías del Chocó reúne reportes ciudadanos, sensores y alertas en tiempo real para que viajar por el Pacífico colombiano sea más seguro.
          </p>
        </div>
      </div>

      {/* Numeros de impacto */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {impacto.map(function (i) {
          return (
            <div key={i.t} className="impacto">
              <p className="numero-grande text-selva-700">{i.n}</p>
              <p className="text-xs text-slate-500 mt-2">{i.t}</p>
            </div>
          );
        })}
      </div>

      {/* Tres pilares */}
      <div className="grid gap-6 lg:grid-cols-3 mb-16">
        {pilares.map(function (p) {
          return (
            <div key={p.titulo} className="vidrio-claro vidrio-glow vidrio-hover p-8">
              <div className="text-3xl mb-3">{p.icono}</div>
              <h3 className="font-bold text-carbon-900 text-xl mb-2">{p.titulo}</h3>
              <p className="text-slate-600 leading-relaxed">{p.texto}</p>
            </div>
          );
        })}
      </div>

      {/* Equipo */}
      <div className="text-center mb-10">
        <span className="etiqueta-seccion">Creadores</span>
        <h2 className="titulo-seccion mt-3">Equipo de desarrollo</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {equipo.map(function (persona) {
          return <window.TarjetaEquipo key={persona.nombre} persona={persona} />;
        })}
      </div>
    </section>
  );
};
