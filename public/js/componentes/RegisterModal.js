window.RegisterModal = function RegisterModal({ onClose, onRegisterSuccess }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const pass = form.password.value.trim();

    if (!name || !email || !pass) {
      alert('Completa todos los campos');
      return;
    }

    const result = await onRegisterSuccess(name, email, pass);
    if (result !== true) {
      alert(result || 'Error al crear la cuenta.');
      return;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-md p-8 relative" style={{ backgroundColor: '#f8fafc' }}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">✕</button>
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#030213' }}>Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#030213' }}>Nombre completo</label>
            <input id="name" name="name" type="text" placeholder="Tu nombre" className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition" style={{ borderColor: '#bfdbfe', color: '#1a1a1a', backgroundColor: 'white' }} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#030213' }}>Correo electrónico</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition" style={{ borderColor: '#bfdbfe', color: '#1a1a1a', backgroundColor: 'white' }} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#030213' }}>Contraseña</label>
            <input id="password" name="password" type="password" placeholder="••••••••" className="w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 transition" style={{ borderColor: '#bfdbfe', color: '#1a1a1a', backgroundColor: 'white' }} />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-3 font-semibold rounded-2xl transition" style={{ color: '#717182', backgroundColor: '#efefff' }}>Cancelar</button>
            <button type="submit" className="px-6 py-3 text-white font-bold rounded-2xl transition" style={{ backgroundColor: '#030213' }}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
