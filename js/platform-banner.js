/* Optional APP-REBT.COM ticker. Independent of questions, timers and saved progress. */
(() => {
  'use strict';
  if (document.getElementById('rebt-platform-banner')) return;

  const href = 'https://app-rebt.com/descubre?utm_source=app-rebt.es&utm_medium=referral&utm_campaign=guia_rebt&utm_content=ticker';
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
    .rebt-test-invite{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:18px;width:100%;max-width:48rem;min-height:88px;flex-shrink:0;margin:0 0 12px;padding:16px 18px;border:1px solid #bdd6f5;border-left:4px solid #1976e9;border-radius:14px;background:linear-gradient(115deg,#fff 0%,#eff6ff 70%,#e4efff 100%);box-shadow:0 5px 18px -10px rgba(30,64,175,.28);color:#163351;font-family:Inter,system-ui,sans-serif;text-align:left;text-decoration:none;transition:background .2s,box-shadow .2s}
    .rebt-test-invite-copy{display:flex;flex-direction:column;gap:5px;min-width:0}
    .rebt-test-invite-copy>strong{font-size:15px;line-height:1.35;font-weight:800;letter-spacing:-.2px}
    .rebt-test-invite-copy>span{font-size:12px;line-height:1.45;color:#506984}
    .rebt-test-invite-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;flex-shrink:0;min-height:38px;padding:9px 13px;border-radius:9px;background:#0875e5;color:#fff;font-size:11px;line-height:18px;font-weight:800;box-shadow:0 3px 8px rgba(8,117,229,.18);white-space:nowrap}
    .rebt-test-invite:hover{background:linear-gradient(115deg,#f8fbff,#e4efff);box-shadow:0 6px 20px -8px rgba(30,64,175,.3)}
    .rebt-test-invite:hover .rebt-test-invite-cta{background:#075fc1}
    .rebt-test-invite:focus-visible{outline:3px solid #60a5fa;outline-offset:3px}
    @media(max-width:560px){.rebt-test-invite{flex-wrap:wrap;gap:10px;padding:13px 14px}.rebt-test-invite-copy{width:100%;gap:4px}.rebt-test-invite-copy>strong{font-size:14px}.rebt-test-invite-copy>span{font-size:11px}.rebt-test-invite-cta{min-height:34px;padding:7px 11px;margin-left:auto}}
    .rebt-result-invite{margin:0 0 22px;padding:20px;text-align:left;border:1px solid #c9dff8;border-radius:15px;background:linear-gradient(120deg,#f8fbff,#eaf3ff);font-family:Inter,system-ui,sans-serif}
    .rebt-result-kicker{font-size:9px;letter-spacing:.12em;font-weight:800;color:#176bb7}
    .rebt-result-invite h2{font-size:20px;font-weight:800;line-height:1.3;color:#163351;margin:8px 0 12px;letter-spacing:-.4px}
    .rebt-result-topics{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px}
    .rebt-result-topics>span{display:flex;align-items:center;gap:7px;padding:6px 9px;border:1px solid #dae5f2;border-radius:8px;background:white;color:#385772;font-size:10px}
    .rebt-result-topics b{color:#a46f20;font-size:10px;font-weight:700}
    .rebt-result-invite p{font-size:12px;line-height:1.5;color:#516b83;margin:0 0 14px}
    .rebt-result-invite>a{display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:44px;padding:11px 17px;border-radius:9px;background:#0875e5;color:white;font-size:12px;font-weight:750;text-decoration:none}
    .rebt-result-invite>a:hover{background:#075fc1}.rebt-result-invite>a:focus-visible{outline:3px solid #60a5fa;outline-offset:3px}
    .rebt-result-invite>small{display:block;font-size:9px;color:#71859d;margin-top:9px}
    @media(max-width:480px){.rebt-result-invite{padding:17px}.rebt-result-invite h2{font-size:18px}.rebt-result-invite>a{display:flex;width:100%}}
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
  // Only this attempt's answered questions are summarized locally. No result is transferred.
  window.rebtResultPromotion = (history, placement) => {
    if (!['test_result','exam_result'].includes(placement)) return '';
    const wrong = (Array.isArray(history) ? history : []).filter(h => h && h.elegida && h.elegida !== h.correcta);
    const counts = new Map();
    wrong.forEach(h => {
      const raw = typeof h.itc === 'string' ? h.itc : '';
      const itc = raw.match(/^ITC[-\s]*BT[-\s]*(\d{1,2})\b/i);
      const article = raw.match(/^ART[IÍ]CULO\s*(\d{1,2})\b/i);
      let topic = '';
      if (itc && Number(itc[1]) >= 1 && Number(itc[1]) <= 52) topic = 'ITC-BT-' + itc[1].padStart(2,'0');
      else if (article && Number(article[1]) >= 1 && Number(article[1]) <= 29) topic = 'Artículo ' + Number(article[1]);
      if (topic) counts.set(topic, (counts.get(topic) || 0) + 1);
    });
    const chips = [...counts].sort((a,b) => b[1]-a[1]).slice(0,3).map(([topic,count]) => `<span>${topic}<b>${count} ${count===1?'fallo':'fallos'}</b></span>`).join('');
    const title = wrong.length ? `${wrong.length} ${wrong.length===1?'error. Descubre':'errores. Descubre'} qué reforzar.` : 'Dale continuidad a tu preparación.';
    return `<aside class="rebt-result-invite" aria-label="Tu siguiente paso en APP-REBT.COM"><span class="rebt-result-kicker">TU SIGUIENTE PASO</span><h2>${title}</h2>${chips?`<div class="rebt-result-topics" aria-label="Temas con fallos en este intento">${chips}</div>`:''}<p>Mira cómo seguir tus notas y enfocar tu preparación.</p><a href="https://app-rebt.com/descubre?utm_source=app-rebt.es&amp;utm_medium=referral&amp;utm_campaign=guia_rebt&amp;utm_content=${placement}" data-rebt-placement="${placement}" target="_blank" rel="noopener noreferrer" onkeydown="event.stopPropagation()">Ver cómo mejorar <span aria-hidden="true">↗</span><span class="sr-only"> (se abre en otra pestaña)</span></a><small>Demo visual · Sin registro · Datos de ejemplo</small></aside>`;
  };
  const placements=['ticker','home','orientation_menu','test_question','exam_question','test_menu','exam_menu','test_result','exam_result'];
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
