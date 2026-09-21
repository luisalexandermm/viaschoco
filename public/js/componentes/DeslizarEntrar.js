// ============================================================
//  CONTROL "DESLIZA PARA ENTRAR"
//  El usuario arrastra el circulo hacia la derecha para entrar.
//  Si no lo desliza completo, el circulo regresa al inicio.
//  Tambien hay un boton de respaldo por si prefiere solo tocar.
// ============================================================

window.DeslizarEntrar = function DeslizarEntrar(props) {
  var onEntrar = props.onEntrar;

  var pistaRef = React.useRef(null);
  var [x, setX] = React.useState(0);            // posicion del circulo
  var [arrastrando, setArrastrando] = React.useState(false);

  var anchoKnob = 56;
  var margen = 5;

  // Cuanto se puede mover el circulo (ancho de la pista menos el circulo)
  function maximo() {
    if (!pistaRef.current) return 0;
    return pistaRef.current.offsetWidth - anchoKnob - margen * 2;
  }

  function alPresionar(e) {
    setArrastrando(true);
    e.target.setPointerCapture(e.pointerId); // seguir el dedo aunque salga del circulo
  }

  function alMover(e) {
    if (!arrastrando) return;
    var caja = pistaRef.current.getBoundingClientRect();
    var nueva = e.clientX - caja.left - anchoKnob / 2;
    if (nueva < 0) nueva = 0;
    if (nueva > maximo()) nueva = maximo();
    setX(nueva);
  }

  function alSoltar() {
    setArrastrando(false);
    // Si llego a mas del 70% del recorrido, entramos
    if (x >= maximo() * 0.7) {
      onEntrar();
    } else {
      setX(0); // regresa al inicio
    }
  }

  return (
    <div>
      <div className="desliza" ref={pistaRef}>
        {/* Relleno verde que crece con el circulo */}
        <div className="desliza-relleno" style={{ width: (x + anchoKnob + margen) + "px" }}></div>
        <span className="desliza-texto">Desliza para entrar</span>
        {/* Circulo que se arrastra */}
        <div
          className="desliza-knob"
          style={{ transform: "translateX(" + x + "px)", transition: arrastrando ? "none" : "transform 0.25s ease" }}
          onPointerDown={alPresionar}
          onPointerMove={alMover}
          onPointerUp={alSoltar}
        >
          →
        </div>
      </div>

      {/* Boton de respaldo (por si prefiere solo un clic) */}
      <button onClick={onEntrar} className="boton-fantasma mt-4" style={{ color: "rgba(255,255,255,0.85)" }}>
        o entra directo
      </button>
    </div>
  );
};
