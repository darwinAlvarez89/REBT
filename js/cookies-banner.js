(function () {
  // Evitar duplicado si ya existe en la página
  if (document.getElementById('cookieOverlay')) return;

  // Si ya aceptó cookies, no mostramos nada
  if (localStorage.getItem('cookiesAccepted')) return;

  const bannerHTML = `
  <div id="cookieOverlay"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 hidden transition-opacity duration-500 ease-in-out opacity-0">

    <div class="dark-glass-card w-full max-w-md rounded-2xl p-6 sm:p-8 shadow-2xl ring-1 ring-white/10 flex flex-col items-center text-center transform transition-all duration-500 ease-out scale-95 opacity-0">

      <div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-5 text-blue-400 ring-1 ring-blue-500/20">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      </div>

      <h3 class="text-xl font-bold text-white mb-3">Valoramos tu privacidad</h3>

      <p class="text-slate-300 text-sm leading-relaxed mb-8">
        Utilizamos cookies propias y de terceros para garantizar el mejor funcionamiento del sitio,
        analizar la navegación y ofrecerte contenidos adaptados a tus intereses.
      </p>

      <div class="w-full space-y-3">
        <button id="acceptCookies"
          class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30">
          Aceptar y continuar
        </button>

        <a href="/politica-cookies.html"
          class="block w-full py-2.5 px-4 text-slate-400 hover:text-white text-xs font-medium transition-colors hover:bg-white/5 rounded-xl">
          Preferencias y más información
        </a>
      </div>
    </div>
  </div>
  `;

  // Insertar en la página
  document.body.insertAdjacentHTML('beforeend', bannerHTML);

  const overlay = document.getElementById('cookieOverlay');
  const card = overlay.querySelector('.dark-glass-card');
  const acceptBtn = document.getElementById('acceptCookies');

  // Mostrar con delay y animación (igual que tu versión)
  setTimeout(() => {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      card.classList.remove('scale-95', 'opacity-0');
    }, 50);
  }, 1500);

  // Aceptar cookies
  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookiesAccepted', 'true');

    overlay.classList.add('opacity-0');
    card.classList.add('scale-95', 'opacity-0');

    document.body.style.overflow = '';

    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.remove();
    }, 500);
  });
})();
