window.TeamCard = function TeamCard({ person, index }) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  // detectar preferencias y tipo de puntero para ajustar efectos
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  return (
    <div
      className="group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 rounded-[28px]"
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label={`Tarjeta de ${person.name}. Presiona Enter o espacio o haz clic para ver su descripción.`}
      style={{ perspective: '1000px', animationDelay: `${index * 0.1}s` }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsFlipped(!isFlipped); }
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Contenedor que recibe el tilt (rotación ligera). Solo tilt en hover/mousemove; flip solo por click */}
      <div
        className={`card-tilt relative overflow-hidden rounded-[28px] transition-all duration-[600ms] ease-out`}
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.08s linear' }}
        onMouseMove={e => {
          try {
            if (prefersReducedMotion || isCoarsePointer) return;
          } catch (err) {}
          const r = e.currentTarget.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width/2) / (r.width/2);
          const dy = (e.clientY - r.top - r.height/2) / (r.height/2);
          const tiltX = -dy * 14;
          const tiltY = dx * 18;
          // aplicar tilt en el contenedor exterior para que gire hacia el puntero
          e.currentTarget.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
          // escalar ligeramente la imagen para dar sensación de profundidad sin perder nitidez
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = `translateZ(0) scale(1.07)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'rotateX(0) rotateY(0) scale(1)';
          const img = e.currentTarget.querySelector('img');
          if (img) img.style.transform = 'translateZ(0) scale(1)';
        }}
      >
        {/* Flip inner: gira en Y para mostrar reverso */}
        <div
          className="relative w-full transition-transform duration-500 ease-in-out"
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* FRENTE - Foto y nombre */}
          <div
            className="relative overflow-hidden rounded-[28px] bg-white shadow-xl p-8 flex flex-col items-center gap-4"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-yellow-400 to-blue-500 opacity-5 pointer-events-none rounded-[28px]" />

            <div className="relative w-40 h-52 flex-shrink-0 rounded-[1.5rem] overflow-hidden shadow-2xl">
              <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" style={{ willChange: 'transform', transform: 'translateZ(0)' }} loading="eager" decoding="async" />
            </div>

            <div className="text-center relative z-10">
              <div className="text-slate-900 font-bold text-lg leading-tight">{person.name}</div>
              <div className="text-slate-600 text-sm mt-1">{person.subtitle}</div>
              <div className={`text-sm font-bold tracking-widest uppercase px-4 py-2 mt-3 rounded-full bg-slate-50 border border-slate-100 ${person.roleColor}`}>
                {person.role}
              </div>
            </div>
          </div>

          {/* ATRÁS - Cargo y descripción */}
          <div
            className="absolute inset-0 overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl p-8 flex flex-col items-center justify-center gap-4"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-yellow-400 to-blue-500 opacity-10 pointer-events-none rounded-[28px]" />

            <div className="text-center relative z-10">
              <div className={`text-2xl font-bold mb-4 ${person.roleColor}`}>{person.role}</div>
              <p className="text-white text-sm leading-relaxed">{person.description}</p>
              {person.email && (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(person.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm text-white hover:bg-white/20"
                  aria-label={`Abrir Gmail para enviar correo a ${person.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7A2.5 2.5 0 0 0 18.5 6h-13A2.5 2.5 0 0 0 3 8.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.5l-9 6-9-6" />
                  </svg>
                  <span className="truncate">{person.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.AboutSection = function AboutSection() {
  return (
    <section id="seccion-sobre-nosotros" className="mb-20 px-6 lg:px-10 xl:px-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Sobre Nosotros */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-bold mb-3">
              Acerca de Viaschoco
            </p>
            <h2 className="text-5xl font-black text-slate-800 mb-6">
              Sobre nosotros
            </h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
              Vías del Chocó es la plataforma colaborativa que reúne datos de sensores, reportes ciudadanos y alertas en tiempo real para apoyar la movilidad segura en el departamento del Chocó.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-8">
              <div className="rounded-[2rem] bg-white p-10 shadow-lg border border-slate-200">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Nuestra misión
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Dar acceso a información vial relevante y oportuna para que conductores, comunidades y autoridades puedan planificar rutas seguras y evitar riesgos en las carreteras del Chocó.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white p-10 shadow-lg border border-slate-200">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Nuestra visión
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Ser reconocidos como la herramienta de referencia para la movilidad regional, apoyando decisiones informadas con datos precisos y una experiencia digital confiable.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-100 border border-slate-200 p-10 shadow-lg text-slate-900">
              <h3 className="text-3xl font-bold mb-6">Lo que ofrecemos</h3>
              <ul className="space-y-5 text-lg leading-relaxed text-slate-200">
                <li>• Informe de condiciones viales actualizadas.</li>
                <li>• Alertas de derrumbes, inundaciones y cierres.</li>
                <li>• Mapa interactivo con sensores y reportes georreferenciados.</li>
                <li>• Reportes ciudadanos verificados y noticias en vivo.</li>
              </ul>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-black font-bold mb-2">
                    Cobertura
                  </p>
                  <p className="text-sm text-black">
                    Todo el Chocó con foco en las principales vías intermunicipales.
                  </p>
                </div>

                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-black font-bold mb-2">
                    Colaboración
                  </p>
                  <p className="text-sm text-black">
                    Usuarios, instituciones y comunidades trabajan juntos para cuidar las vías.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipo */}
        <div>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-bold mb-3">
              Creadores
            </p>
            <h2 className="text-5xl font-black text-slate-800 mx-auto">
              Equipo de desarrollo
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-500 text-lg leading-relaxed">
              Conoce al equipo detrás de Viaschoco: profesionales enfocados en la movilidad, la experiencia de usuario y las alertas en tiempo real.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[
              {
                name: 'Luis Alexander', subtitle: 'Moreno Maturana', role: 'Full Stack',
                image: 'img/luis-alexander (2).png', 
                roleColor: 'text-emerald-600',
                description: 'Lideró el panel de administración, la arquitectura backend-frontend y el despliegue en Cloud Run.',
                email: 'alrxandermaturana76@gmail.com'
                
              },
              {
                name: 'Ashley Sofía', subtitle: 'Panesso Palacios', role: 'Frontend & Backend',
                image: 'img/ashley-sofia.png', 
                roleColor: 'text-rose-600',
                description: 'Diseñó el login, registro y la validación de usuarios locales, además de parte del servidor.',
                email: 'Ashleysofiapanessopalacios@gmail.com'
              },
              {
                name: 'Carlos Mauricio', subtitle: 'Machado Córdoba', role: 'Frontend',
                image: 'img/carlos-mauricio.png', 
                roleColor: 'text-blue-600',
                description: 'Implementó los componentes interactivos y mejoró la experiencia en dispositivos móviles.',
                email: 'machaocarlo10@gmail.com'
              },
              {
                name: 'Boris Leon', subtitle: 'Valoy Hinestroza', role: 'Frontend',
                image: 'img/boris-leon.png', 
                roleColor: 'text-yellow-600',
                description: 'Diseñó el estilo visual, las animaciones y la presentación general del panel.',
                email: 'borisleonvaloy@gmail.com'
              },
              {
                name: 'Jhaymar Smith', subtitle: 'Caicedo Garces', role: 'Frontend',
                image: 'img/jhaymar-smith.png', 
                roleColor: 'text-indigo-600',
                description: 'Desarrolló las integraciones de mapas y los reportes georreferenciados para la app.',
                email: 'marcelaoficial2020@gmail.com'
              },
            ].map((p, i) => (
              <div key={p.name}>
                <TeamCard person={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
