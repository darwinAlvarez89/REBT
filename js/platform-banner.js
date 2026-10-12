/* Optional APP-REBT.COM invitation. Independent of questions, timers and saved progress. */
(() => {
  'use strict';
  if (document.getElementById('rebt-platform-banner')) return;

  const base = 'https://app-rebt.com/?utm_source=app-rebt.es&utm_medium=referral&utm_campaign=nueva_plataforma&utm_content=barra_superior';
  const slides = [
    { text: '10 preguntas gratis · Sin cuenta', href: base + '#demo' },
    { text: 'Tu progreso, en un solo lugar', href: base + '#temario' },
    { text: 'Formación guiada por suscripción', href: base + '#lista-espera' }
  ];
  const style = document.createElement('style');
  style.textContent = `
    body.rebt-promo-enabled { margin-top: calc(var(--rebt-original-margin-top, 0px) + 36px) !important; min-height: calc(100vh - 36px) !important; }
    body.rebt-promo-enabled > nav.fixed { top: 36px !important; }
    body.rebt-promo-enabled .theme-toggle { top: 51px !important; }
    #rebt-platform-banner { position: fixed; inset: 0 0 auto; height: 36px; z-index: 90; display: flex; align-items: center; justify-content: center; gap: 4px; padding: 0 12px; box-sizing: border-box; background: #0f2e55; color: #fff; font: 500 12px/1.3 Inter, system-ui, sans-serif; border-bottom: 1px solid #244a77; }
    #rebt-platform-banner * { box-sizing: border-box; }
    #rebt-platform-banner a { display: flex; align-items: center; gap: 12px; min-width: 0; min-height: 28px; color: #fff; text-decoration: none; overflow: hidden; }
    #rebt-platform-banner a:hover { text-decoration: underline; text-underline-offset: 3px; }
    #rebt-platform-banner .rebt-promo-brand { flex-shrink: 0; font-size: 10px; font-weight: 800; letter-spacing: .06em; color: #bfdbfe; }
    #rebt-platform-banner .rebt-promo-message { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
    #rebt-platform-banner .rebt-promo-arrow { flex-shrink: 0; }
    #rebt-platform-banner button { flex-shrink: 0; width: 28px; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 5px; background: transparent; color: #fff; cursor: pointer; font: 700 14px/1 system-ui, sans-serif; display: inline-flex; align-items: center; justify-content: center; }
    #rebt-platform-banner button:hover { background: #244a77; }
    #rebt-platform-banner a:focus-visible, #rebt-platform-banner button:focus-visible { outline: 2px solid #bfdbfe; outline-offset: -2px; }
    @media (max-width: 480px) {
      #rebt-platform-banner { padding: 0 6px; }
      #rebt-platform-banner .rebt-promo-brand { display: none; }
      #rebt-platform-banner a { gap: 6px; }
    }
  `;
  const bar = document.createElement('aside');
  bar.id = 'rebt-platform-banner';
  bar.setAttribute('aria-label', 'Descubre APP-REBT.COM');
  const link = document.createElement('a');
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  const brand = document.createElement('span');
  brand.className = 'rebt-promo-brand';
  brand.textContent = 'APP-REBT.COM';
  const message = document.createElement('span');
  message.className = 'rebt-promo-message';
  const arrow = document.createElement('span');
  arrow.className = 'rebt-promo-arrow';
  arrow.textContent = '↗';
  arrow.setAttribute('aria-hidden', 'true');
  link.append(brand, message, arrow);
  const pause = document.createElement('button');
  pause.type = 'button';
  const next = document.createElement('button');
  next.type = 'button';
  next.textContent = '›';
  next.setAttribute('aria-label', 'Ver el siguiente mensaje');
  bar.append(link, pause, next);

  let index = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let hovered = false;
  let focused = false;
  function render() {
    message.textContent = slides[index].text;
    link.href = slides[index].href;
    link.setAttribute('aria-label', slides[index].text + '. Conoce APP-REBT.COM (se abre en otra pestaña)');
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-label', paused ? 'Activar cambio automático de mensajes' : 'Pausar cambio automático de mensajes');
    pause.setAttribute('aria-pressed', String(paused));
  }
  pause.addEventListener('click', () => { paused = !paused; render(); });
  next.addEventListener('click', () => { index = (index + 1) % slides.length; render(); });
  bar.addEventListener('mouseenter', () => { hovered = true; });
  bar.addEventListener('mouseleave', () => { hovered = false; });
  // Keep Enter and number keys on banner controls out of the test shortcuts.
  bar.addEventListener('keydown', event => { event.stopPropagation(); });
  bar.addEventListener('focusin', () => { focused = true; });
  bar.addEventListener('focusout', event => { focused = bar.contains(event.relatedTarget); });
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { paused = true; render(); }
  });
  render();

  // Reserve space only after the banner is ready; a failed load leaves the page intact.
  document.body.style.setProperty('--rebt-original-margin-top', getComputedStyle(document.body).marginTop);
  document.head.append(style);
  document.body.prepend(bar);
  document.body.classList.add('rebt-promo-enabled');
  window.setInterval(() => {
    if (paused || hovered || focused || document.hidden) return;
    index = (index + 1) % slides.length;
    render();
  }, 8000);
})();
