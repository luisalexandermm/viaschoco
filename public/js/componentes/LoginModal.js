window.LoginModal = function LoginModal({ onClose, onShowRegister, onLogin }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const pass = form.password.value.trim();

    if (!email || !pass) {
      alert('Ingresa correo y contraseña');
      return;
    }

    const result = await onLogin(email, pass);
    if (result !== true) {
      alert(result || 'Correo o contraseña incorrectos. Verifica tus datos o regístrate primero.');
      return;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-md p-8 relative mt-12 md:mt-0" style={{ backgroundColor: '#f8fafc' }}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">✕</button>
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#030213' }}>Iniciar sesión</h2>
        <p className="text-sm text-slate-600 mb-6">Usa tu correo y contraseña para acceder al panel de alertas y reportes.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#030213' }}>Correo electrónico</label>
            <input id="email" name="email" type="email" autoComplete="username" placeholder="tu@email.com" className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition" style={{ borderColor: '#bfdbfe', color: '#1a1a1a', backgroundColor: 'white' }} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#030213' }}>Contraseña</label>
            <input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition" style={{ borderColor: '#bfdbfe', color: '#1a1a1a', backgroundColor: 'white' }} />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-3 font-semibold rounded-2xl transition" style={{ color: '#717182', backgroundColor: '#efefff' }}>Cancelar</button>
            <button type="submit" className="px-6 py-3 text-white font-bold rounded-2xl transition bg-slate-950 hover:bg-slate-800">Entrar</button>
          </div>
        </form>
        <p className="text-center text-sm mt-5" style={{ color: '#717182' }}>
          ¿No tienes cuenta?{' '}
          <button type="button" onClick={onShowRegister} className="font-semibold hover:underline" style={{ color: '#2563eb' }}>Regístrate aquí</button>
        </p>
      </div>
    </div>
  );
}
