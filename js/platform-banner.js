/* Optional APP-REBT.COM ticker. Independent of questions, timers and saved progress. */
(() => {
  'use strict';
  if (document.getElementById('rebt-platform-banner')) return;

  const href = 'https://app-rebt.com/';
  const benefits = [
    'Estadísticas para ver cómo avanzas',
    'Identifica las ITC que necesitas reforzar',
    'Recorrido guiado: estudia, practica y avanza',
    'Repasos con tus errores al completar el articulado y las ITC',
    'Descubre tu formación en APP-REBT.COM ↗'
  ];
  const style = document.createElement('style');
  style.textContent = `
    body.rebt-promo-enabled { margin-top: calc(var(--rebt-original-margin-top, 0px) + 44px) !important; min-height: calc(100vh - 44px) !important; }
    body.rebt-promo-enabled > nav.fixed { top: 44px !important; }
    body.rebt-promo-enabled .theme-toggle { top: 59px !important; }
    #rebt-platform-banner { position: fixed; inset: 0 0 auto; height: 44px; z-index: 90; display: flex; align-items: center; gap: 12px; padding: 0 16px; box-sizing: border-box; background: #0f2e55; color: #fff; font: 600 14px/1.3 Inter, system-ui, sans-serif; border-bottom: 1px solid #244a77; }
    #rebt-platform-banner * { box-sizing: border-box; }
    #rebt-platform-banner .rebt-promo-brand { flex-shrink: 0; font-size: 11px; font-weight: 800; letter-spacing: .06em; color: #bfdbfe; }
    #rebt-platform-banner a { flex: 1; display: flex; align-items: center; min-width: 0; height: 28px; overflow: hidden; color: #fff; text-decoration: none; }
    #rebt-platform-banner .rebt-promo-track { display: flex; width: max-content; flex-shrink: 0; animation: rebt-promo-scroll 38s linear infinite; }
    #rebt-platform-banner .rebt-promo-group { display: inline-flex; align-items: center; gap: 28px; padding-right: 28px; white-space: nowrap; flex-shrink: 0; }
    #rebt-platform-banner .rebt-promo-benefit { display: inline-flex; align-items: center; gap: 28px; }
    #rebt-platform-banner .rebt-promo-benefit::after { content: '◆'; color: #60a5fa; font-size: 8px; }
    #rebt-platform-banner a:hover { text-decoration: underline; text-underline-offset: 3px; }
    #rebt-platform-banner a:focus-visible { outline: 2px solid #bfdbfe; outline-offset: -2px; }
    @keyframes rebt-promo-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @media (max-width: 480px) {
      #rebt-platform-banner { gap: 6px; padding: 0 6px; }
      #rebt-platform-banner .rebt-promo-brand { display: none; }
    }
  `;
  const bar = document.createElement('aside');
  bar.id = 'rebt-platform-banner';
  bar.setAttribute('aria-label', 'Descubre APP-REBT.COM');
  const brand = document.createElement('span');
  brand.className = 'rebt-promo-brand';
  brand.textContent = 'APP-REBT.COM';
  brand.setAttribute('aria-hidden', 'true');
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', benefits.join('. ') + '. Conoce APP-REBT.COM (se abre en otra pestaña)');
  const track = document.createElement('span');
  track.className = 'rebt-promo-track';
  // Both visual copies belong to one link. The accessible name is stable and not repeated.
  track.setAttribute('aria-hidden', 'true');
  const group = document.createElement('span');
  group.className = 'rebt-promo-group';
  benefits.forEach(text => {
    const item = document.createElement('span');
    item.className = 'rebt-promo-benefit';
    item.textContent = text;
    group.append(item);
  });
  track.append(group, group.cloneNode(true));
  link.append(track);
  bar.append(brand, link);
  // Keep Enter on the banner link out of the test shortcuts.
  bar.addEventListener('keydown', event => { event.stopPropagation(); });

  // Reserve space only after the banner is ready; a failed load leaves the page intact.
  document.body.style.setProperty('--rebt-original-margin-top', getComputedStyle(document.body).marginTop);
  document.head.append(style);
  document.body.prepend(bar);
  document.body.classList.add('rebt-promo-enabled');
})();
