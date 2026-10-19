/* APP-REBT.COM invitations. No writes to questions, timers or learner progress. */
(() => {
  'use strict';
  const PROMO_END = '2026-10-31T23:59:59+01:00';
  function promoActiva() { return Date.now() <= Date.parse(PROMO_END); }
  function diasRestantes() { return Math.max(0, Math.ceil((Date.parse(PROMO_END) - Date.now()) / 86400000)); }
  if (window.rebtPlatformBannerReady) return;
  window.rebtPlatformBannerReady = true;
  const TICKER_CLOSED = 'rebt:platform-ticker:closed';
  const QUESTION_SHOWN = 'rebt:question-invite:shown';
  const storageGet = key => { try { return sessionStorage.getItem(key); } catch { return null; } };
  const storageSet = key => { try { sessionStorage.setItem(key, 'true'); } catch { /* Session-only memory below still applies. */ } };
  const screenReader = '<span class="sr-only"> (se abre en otra pestaña)</span>';
  const placements = ['ticker','home','home_demo','orientation_menu','test_menu','exam_menu','test_question','test_result','exam_result','paso_bloqueado'];
  function destination(placement) {
    const page = ['test_result','exam_result'].includes(placement) ? 'registro' : 'descubre';
    return 'https://app-rebt.com/' + page + '?utm_source=app-rebt.es&utm_medium=referral&utm_campaign=' + (promoActiva() ? 'oferta_oct26' : 'guia_rebt') + '&utm_content=' + placement;
  }
  function measure(name, placement) {
    try {
      if (localStorage.getItem('cookiesAccepted') !== 'true' || typeof window.gtag !== 'function') return false;
      window.gtag('event', name, {promotion_placement:placement,link_domain:'app-rebt.com'});
      return true;
    } catch { return false; }
  }
  const style = document.createElement('style');
  style.textContent = `
    html.rebt-promo-pending body { margin-top:44px !important; min-height:calc(100vh - 44px) !important; }
    body.rebt-promo-enabled { margin-top:calc(var(--rebt-original-margin-top, 0px) + 44px) !important; min-height:calc(100vh - 44px) !important; }
    html.rebt-promo-pending body > nav.fixed,body.rebt-promo-enabled > nav.fixed { top:44px !important; }
    html.rebt-promo-pending .theme-toggle,body.rebt-promo-enabled .theme-toggle { top:59px !important; }
    #rebt-platform-banner { position:fixed;inset:0 0 auto;height:44px;z-index:90;display:flex;align-items:center;gap:8px;padding:0 12px;box-sizing:border-box;background:#0f2e55;color:#fff;font:600 clamp(9px,1.1vw,12px)/1.25 Inter,system-ui,sans-serif;border-bottom:1px solid #244a77; }
    #rebt-platform-banner * { box-sizing:border-box; }
    #rebt-platform-banner a { display:flex;align-items:center;justify-content:center;gap:14px;flex:1;min-width:0;min-height:40px;color:#fff;text-decoration:none; }
    #rebt-platform-banner .rebt-promo-desktop { min-width:0;text-wrap:balance; }
    #rebt-platform-banner .rebt-promo-action { flex:none;text-decoration:underline;text-underline-offset:3px; }
    #rebt-platform-banner .rebt-promo-mobile { display:none; }
    #rebt-platform-banner button { flex:none;width:32px;height:40px;padding:0;border:0;border-radius:5px;background:transparent;color:#fff;font-size:22px;cursor:pointer; }
    #rebt-platform-banner :is(a,button):focus-visible { outline:2px solid #bfdbfe;outline-offset:-2px; }
    #rebt-platform-banner a:hover { text-decoration:underline; }
    @media(max-width:480px) {
      #rebt-platform-banner { gap:4px;padding:0 6px;font-size:11px; }
      #rebt-platform-banner .rebt-promo-desktop,#rebt-platform-banner .rebt-promo-action { display:none; }
      #rebt-platform-banner .rebt-promo-mobile { display:inline; }
    }
  `;
  // Loaded synchronously in the head: reserve the same 44px before first paint.
  document.head.append(style);
  if (storageGet(TICKER_CLOSED) !== 'true') document.documentElement.classList.add('rebt-promo-pending');
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

  const refinements = document.createElement('style');
  refinements.textContent = `
    .rebt-invite-slot{width:100%;max-width:48rem;min-height:112px;flex-shrink:0;margin-bottom:12px}
    .rebt-invite-slot>.rebt-test-invite{margin:0;min-height:112px}
    .rebt-test-invite[hidden]{display:none}
    .rebt-test-invite{position:relative;padding-right:44px}
    .rebt-invite-close{position:absolute;top:5px;right:5px;width:32px;height:32px;border:0;border-radius:6px;background:transparent;color:inherit;font-size:22px;cursor:pointer}
    .rebt-invite-close:focus-visible{outline:3px solid #60a5fa;outline-offset:1px}
    .rebt-test-invite a{color:inherit;text-decoration:none}
    .rebt-test-invite a.rebt-test-invite-cta{color:white;white-space:normal;text-align:center}
    .rebt-discover-card [data-rebt-promo-copy="menu_price"]{display:block;min-height:1.6em}
    .rebt-result-invite{min-width:0;overflow-wrap:anywhere}
    .rebt-result-invite>a{max-width:100%;box-sizing:border-box;text-align:center}
    .academy-invite-cta{min-height:54px;text-align:center;line-height:1.4}
    .academy-invite-secondary{display:block;margin-top:12px;font-size:.8rem;line-height:1.5}
    .academy-invite-note{display:block;margin-top:12px;text-align:left}
    .academy-locked-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:24px}
    .academy-locked-step{padding:20px;border:1px solid #bfdbfe;border-radius:16px;background:#eff6ff;color:#163351}
    .academy-locked-step h3{font-size:16px;font-weight:700;margin:0 0 10px;line-height:1.4}
    .academy-locked-step a{font-size:12px;color:#1766ae;text-decoration:underline;text-underline-offset:3px;display:inline-block;padding:6px 0}
    .academy-locked-step svg{display:inline-block;vertical-align:middle;margin-right:6px}
    html.dark .rebt-test-invite,body.dark .rebt-test-invite,html.dark .rebt-result-invite,body.dark .rebt-result-invite,html.dark .academy-locked-step,body.dark .academy-locked-step{background:linear-gradient(120deg,#122236,#172d48);border-color:#365775;color:#f1f7ff}
    html.dark .rebt-result-invite h2,body.dark .rebt-result-invite h2{color:#f1f7ff}
    html.dark .rebt-result-invite p,body.dark .rebt-result-invite p,html.dark .rebt-test-invite-copy>span,body.dark .rebt-test-invite-copy>span{color:#c3d6e9}
    html.dark .rebt-result-kicker,body.dark .rebt-result-kicker,html.dark .academy-locked-step a,body.dark .academy-locked-step a{color:#93c5fd}
    html.dark .rebt-result-topics>span,body.dark .rebt-result-topics>span{background:#122236;border-color:#365775;color:#dbeafe}
    html.dark .rebt-result-topics b,body.dark .rebt-result-topics b{color:#f1c77c}
    html.dark .rebt-result-invite>small,body.dark .rebt-result-invite>small{color:#b5c9dc}
    @media(max-width:480px){.academy-invite-cta{min-height:72px}.rebt-result-invite>a{min-height:64px}.rebt-result-invite>small{min-height:30px}}
    @media(max-width:560px){.rebt-invite-slot,.rebt-invite-slot>.rebt-test-invite{min-height:132px}.rebt-test-invite{padding-right:44px}.academy-locked-steps{grid-template-columns:1fr}}
    .rebt-result-invite .sr-only,.rebt-test-invite .sr-only,#rebt-platform-banner .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
  `;
  document.head.append(refinements);
  // This attempt's history is read only to label the invitation; no result is transferred.
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
    const title = wrong.length ? `${wrong.length} ${wrong.length===1?'fallo. Conviértelo':'fallos. Conviértelos'} en tu plan de repaso.` : 'Sin fallos. Consolida con simulacros por bloques.';
    return `<aside class="rebt-result-invite" aria-label="Tu siguiente paso en APP-REBT.COM"><span class="rebt-result-kicker">TU SIGUIENTE PASO</span><h2>${title}</h2>${chips?`<div class="rebt-result-topics" aria-label="Temas con fallos en este intento">${chips}</div>`:''}<p>Aquí tus resultados no se guardan en una cuenta ni forman un historial. En APP-REBT.COM sí: evolución de notas, tiempo por respuesta y repaso de tus errores.</p><a href="${destination(placement).replaceAll('&','&amp;')}" data-rebt-placement="${placement}" target="_blank" rel="noopener noreferrer" onkeydown="event.stopPropagation()"><span data-rebt-promo-copy="result_button">${promoActiva()?'Crear cuenta y reservar 3,50 €/mes ↗':'Crear mi cuenta ↗'}</span>${screenReader}</a><small data-rebt-promo-copy="result_note">${promoActiva()?'−30 % hasta el 31 de octubre · Crear la cuenta es gratis · Sin permanencia':'Crear la cuenta es gratis · Sin permanencia'}</small></aside>`;
  };
  function refreshPromotion() {
    const active = promoActiva();
    document.querySelectorAll('a[data-rebt-placement]').forEach(link => {
      const placement = link.getAttribute('data-rebt-placement');
      if (placements.includes(placement)) link.href = destination(placement);
    });
    document.querySelectorAll('[data-rebt-promo-copy]').forEach(node => {
      switch (node.getAttribute('data-rebt-promo-copy')) {
        case 'home_button':node.textContent=active?'Ver el plan · 3,50 €/mes hasta el 31 oct':'Ver el plan completo';break;
        case 'menu_price':node.textContent=active?' 3,50 €/mes hasta el 31 de octubre.':'';break;
        case 'result_button':node.textContent=active?'Crear cuenta y reservar 3,50 €/mes ↗':'Crear mi cuenta ↗';break;
        case 'result_note':node.textContent=active?'−30 % hasta el 31 de octubre · Crear la cuenta es gratis · Sin permanencia':'Crear la cuenta es gratis · Sin permanencia';break;
      }
    });
    const link=document.querySelector('#rebt-platform-banner a');
    if (!link) return;
    if(active){
      link.innerHTML=`<span class="rebt-promo-desktop">APP-REBT.COM · −30 % hasta el 31 de octubre · 3,50 €/mes durante 3 meses · Quedan ${diasRestantes()} días</span><strong class="rebt-promo-action">Reservar mi precio →</strong><span class="rebt-promo-mobile">−30 % hasta el 31 oct · 3,50 €/mes · Reservar →</span>${screenReader}`;
    }else{
      link.innerHTML=`<span>Tu historial y el repaso de tus errores, en APP-REBT.COM →</span>${screenReader}`;
    }
  }
  document.addEventListener('click',event=>{
    const target=event.target instanceof Element?event.target.closest('a[data-rebt-placement]'):null;
    const placement=target?.getAttribute('data-rebt-placement');
    if(placements.includes(placement)) {
      // Refresh the destination at click time too, including after a sleeping tab expires.
      target.href=destination(placement);
      measure('discover_platform_click',placement);
    }
  });
  function mountTicker() {
    if(storageGet(TICKER_CLOSED)==='true')return;
    const bar=document.createElement('aside');bar.id='rebt-platform-banner';bar.setAttribute('aria-label','Descubre APP-REBT.COM');
    bar.innerHTML=`<a data-rebt-placement="ticker" href="${destination('ticker').replaceAll('&','&amp;')}" target="_blank" rel="noopener noreferrer" onkeydown="event.stopPropagation()"></a><button type="button" aria-label="Cerrar aviso de APP-REBT.COM">×</button>`;
    bar.addEventListener('keydown',event=>event.stopPropagation());
    bar.querySelector('button').addEventListener('click',()=>{
      storageSet(TICKER_CLOSED);bar.remove();document.body.classList.remove('rebt-promo-enabled');
    });
    document.documentElement.classList.remove('rebt-promo-pending');
    document.body.style.setProperty('--rebt-original-margin-top',getComputedStyle(document.body).marginTop);
    document.body.prepend(bar);document.body.classList.add('rebt-promo-enabled');
  }
  function initQuestionInvite() {
    const slot=document.querySelector('.rebt-invite-slot');
    if(!slot)return;
    const invite=slot.querySelector('.rebt-test-invite');
    if(!invite)return;
    let shown=false;
    const dismiss=()=>{invite.hidden=true;};
    invite.querySelector('button').addEventListener('click',dismiss);
    invite.addEventListener('keydown',event=>event.stopPropagation());
    const inspect=()=>{
      const correct=document.getElementById('stats-aciertos'),wrong=document.getElementById('stats-fallos');
      const inQuestion=document.getElementById('contenedor-opciones');
      if(!inQuestion){slot.hidden=true;observer.disconnect();return;}
      const answered=Number(correct?.textContent||0)+Number(wrong?.textContent||0);
      if(!shown&&storageGet(QUESTION_SHOWN)!=='true'&&answered>=5){shown=true;storageSet(QUESTION_SHOWN);invite.hidden=false;}
    };
    const observer=new MutationObserver(inspect);
    const card=document.getElementById('main-card');
    if(card)observer.observe(card,{subtree:true,childList:true,characterData:true});
    inspect();
  }
  function observeResults() {
    const seen=new WeakSet(),tracked=new WeakSet();
    const visible=element=>{
      if(!element.isConnected||document.visibilityState==='hidden')return false;
      const rect=element.getBoundingClientRect();
      if(rect.width<=0||rect.height<=0||rect.bottom<=0||rect.top>=innerHeight)return false;
      // Result content scrolls inside the existing card; do not count below its clipping edge.
      for(let parent=element.parentElement;parent;parent=parent.parentElement){
        const css=getComputedStyle(parent);
        if(/auto|scroll|hidden|clip/.test(css.overflowY)){
          const clip=parent.getBoundingClientRect();if(rect.bottom<=clip.top||rect.top>=clip.bottom)return false;
        }
      }
      return true;
    };
    const report=element=>{
      const placement=element.querySelector('a[data-rebt-placement]')?.getAttribute('data-rebt-placement');
      if(!seen.has(element)&&visible(element)&&['test_result','exam_result'].includes(placement)&&measure('discover_platform_view',placement))seen.add(element);
    };
    const intersection=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)report(entry.target);})):null;
    const scan=()=>document.querySelectorAll('.rebt-result-invite').forEach(element=>{
      if(!tracked.has(element)){tracked.add(element);intersection?.observe(element);}
      report(element);
    });
    const observer=new MutationObserver(()=>{refreshPromotion();scan();});
    // Limit observation to inserted/removed result blocks: banner text changes cannot loop it.
    const card=document.getElementById('contenedor-test')||document.querySelector('.orientation-quiz #test');
    if(card)observer.observe(card,{childList:true});
    document.addEventListener('scroll',scan,{capture:true,passive:true});
    document.addEventListener('visibilitychange',scan);
    window.addEventListener('focus',scan);
    scan();
  }
  function ready() {
    mountTicker();refreshPromotion();initQuestionInvite();observeResults();
    // Keep open tabs correct at midnight, on focus and after browser throttling.
    const refresh=()=>refreshPromotion();
    setInterval(refresh,60000);
    const untilEnd=Date.parse(PROMO_END)-Date.now()+1;
    if(untilEnd>0&&untilEnd<2147483647)setTimeout(refresh,untilEnd);
    document.addEventListener('visibilitychange',refresh);
    window.addEventListener('focus',refresh);
    window.addEventListener('pageshow',refresh);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
