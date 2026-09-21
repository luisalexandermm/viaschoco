// ============================================================
//  VENTANA DE ACCESO DE ADMINISTRADOR
//  Solo la usan los administradores. Se abre desde el punto
//  discreto que esta en el pie de pagina.
// ============================================================

window.LoginModal = function LoginModal(props) {
  var onClose = props.onClose;
  var onLogin = props.onLogin; // recibe (email, clave) y devuelve true o un mensaje

  async function enviar(e) {
    e.preventDefault();
    var email = e.target.email.value.trim();
    var clave = e.target.password.value.trim();

    if (!email || !clave) {
      alert("Ingresa tu correo y contraseña.");
      return;
    }

    var resultado = await onLogin(email, clave);
    if (resultado !== true) {
      alert(resultado || "No se pudo iniciar sesión.");
    }
  }

  return (
    <div className="fondo-modal">
      <div className="caja-modal max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-arena-100 text-selva-800 hover:bg-arena-200 transition">✕</button>

        <div className="w-12 h-12 rounded-2xl bg-selva-700 text-white flex items-center justify-center text-xl mb-4">🔒</div>
        <h2 className="text-2xl font-extrabold text-carbon-900 mb-1">Acceso administrador</h2>
        <p className="text-sm text-slate-500 mb-6">Área privada. Solo para el equipo de Vías Chocó.</p>

        <form onSubmit={enviar} className="space-y-4">
          <div>
            <label htmlFor="email" className="etiqueta-campo">Correo</label>
            <input id="email" name="email" type="email" placeholder="admin@viaschoco.com" className="campo" autoComplete="username" />
          </div>
          <div>
            <label htmlFor="password" className="etiqueta-campo">Contraseña</label>
            <input id="password" name="password" type="password" placeholder="••••••••" className="campo" autoComplete="current-password" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="boton-secundario">Cancelar</button>
            <button type="submit" className="boton-primario">Entrar al panel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
