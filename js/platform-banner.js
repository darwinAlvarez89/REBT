/* Optional APP-REBT.COM ticker. Independent of questions, timers and saved progress. */
(() => {
  'use strict';
  if (document.getElementById('rebt-platform-banner')) return;

  const href = 'https://app-rebt.com/?utm_source=app-rebt.es&utm_medium=referral&utm_campaign=guia_rebt&utm_content=ticker';
  const benefits = [
    'Tus notas cuentan una historia: descubre tu evolución',
    'Descubre qué ITC necesitas reforzar antes de tu próxima práctica',
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
  const invitationStyle = document.createElement('style');
  invitationStyle.textContent = `
    .rebt-discover-card{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 0 22px;padding:20px;border:1px solid #bfdbfe;border-radius:16px;background:linear-gradient(120deg,#f8fbff,#edf5ff);text-align:left;font-family:Inter,system-ui,sans-serif;color:#1e3551}
    .rebt-discover-card>div{flex:1;min-width:0}
    .rebt-discover-card>div>span{display:block;font-size:9px;font-weight:800;letter-spacing:.09em;color:#1766ae;margin-bottom:7px}
    .rebt-discover-card h2{font-size:17px;line-height:1.35;font-weight:800;letter-spacing:-.3px;margin:0 0 8px;color:#163351}
    .rebt-discover-card p{font-size:12px;line-height:1.6;margin:0;color:#516b83}
    .rebt-discover-card>a{display:inline-flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;min-height:44px;max-width:100%;padding:11px 15px;border-radius:10px;background:#017aeb;color:#fff;font-size:12px;font-weight:700;text-decoration:none;line-height:1.4}
    .rebt-discover-card>a:hover{background:#0666c0}
    .rebt-discover-card>a:focus-visible{outline:3px solid #60a5fa;outline-offset:3px}
    html.dark .rebt-discover-card,body.dark .rebt-discover-card{background:linear-gradient(120deg,#122236,#172d48);border-color:#365775}
    html.dark .rebt-discover-card h2,body.dark .rebt-discover-card h2{color:#f1f7ff}
    html.dark .rebt-discover-card p,body.dark .rebt-discover-card p{color:#c3d6e9}
    html.dark .rebt-discover-card>div>span,body.dark .rebt-discover-card>div>span{color:#93c5fd}
    @media(max-width:700px){.rebt-discover-card{flex-direction:column;align-items:stretch;gap:14px;padding:17px}.rebt-discover-card h2{font-size:16px}.rebt-discover-card>a{align-self:flex-start}}
  `;
  document.head.append(invitationStyle);
  const placements=['ticker','home','orientation_menu','test_menu','exam_menu','test_result','exam_result'];
  // Only aggregate clicks after the existing free-site cookie choice. No answers, scores or IDs.
  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target.closest('a[data-rebt-placement]'):null;
    const placement=target?.getAttribute('data-rebt-placement');
    if(!placements.includes(placement))return;
    try{if(localStorage.getItem('cookiesAccepted')!=='true'||typeof window.gtag!=='function')return;
      window.gtag('event','discover_platform_click',{promotion_placement:placement,link_domain:'app-rebt.com'});
    }catch{/* Measurement must never block navigation or practice. */}
  });
  const bar = document.createElement('aside');
  bar.id = 'rebt-platform-banner';
  bar.setAttribute('aria-label', 'Descubre APP-REBT.COM');
  const brand = document.createElement('span');
  brand.className = 'rebt-promo-brand';
  brand.textContent = 'APP-REBT.COM';
  brand.setAttribute('aria-hidden', 'true');
  const link = document.createElement('a');
  link.href = href;
  link.setAttribute('data-rebt-placement','ticker');
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
