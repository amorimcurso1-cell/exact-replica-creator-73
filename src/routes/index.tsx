import { createFileRoute } from "@tanstack/react-router";
import siteHtml from "../site/index.html?raw";

const timerGuard = `<script>
(function(){
  const nativeSetInterval = window.setInterval.bind(window);
  window.__nextgenNativeSetInterval = nativeSetInterval;
  window.setInterval = function(fn, delay, ...args){
    try{
      const src = Function.prototype.toString.call(fn);
      if(/cd-(dias|horas|min|seg)|deadline|countdown/i.test(src)) return 0;
    }catch(e){}
    return nativeSetInterval(fn, delay, ...args);
  };
})();
</script>`;

const countdownOverride = `<style>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400&display=swap');
#cd-dias,#cd-horas,#cd-min,#cd-seg,
#cd-dias *,#cd-horas *,#cd-min *,#cd-seg *{
  animation:none !important;
  animation-name:none !important;
  animation-duration:0s !important;
  animation-iteration-count:1 !important;
  animation-play-state:paused !important;
  transition:none !important;
  opacity:1 !important;
  visibility:visible !important;
  transform:none !important;
  filter:none !important;
  text-shadow:none !important;
  caret-color:transparent !important;
  font-variant-numeric:tabular-nums;
  font-feature-settings:"tnum" 1;
}
#cd-dias::before,#cd-horas::before,#cd-min::before,#cd-seg::before,
#cd-dias::after,#cd-horas::after,#cd-min::after,#cd-seg::after{
  animation:none !important;
  content:none !important;
}
.nextgen-security-image{
  display:flex !important;
  justify-content:center !important;
  align-items:center !important;
  width:100% !important;
  margin:8px auto 12px !important;
  padding:0 !important;
}
.nextgen-security-image img{
  display:block !important;
  width:min(320px,72vw) !important;
  max-width:320px !important;
  height:auto !important;
  margin:0 auto !important;
}

html,body{
  background:#0a0a0a !important;
}
.elementor-location-header,
#page,
.site,
.site-main,
.elementor{
  background:linear-gradient(to bottom,#000 0%,#020202 26%,#050505 52%,#080808 78%,#0a0a0a 100%) !important;
}

.elementor-element-6a282cb,
.elementor-element-6a282cb > .e-con-inner,
.elementor-element-e964a3d,
.elementor-element-60d7a7b,
.elementor-element-60d7a7b > .elementor-widget-container{
  background:transparent !important;
  background-image:none !important;
  box-shadow:none !important;
}
@media (prefers-reduced-motion:reduce){
  .ng-reveal{opacity:1 !important;transform:none !important;transition:none !important}
  .nextgen-fb-track{animation:none !important}
  #faixas-secao .carrossel-ativo{animation:none !important}
}
</style><script>
(function(){
  const START = 23 * 60 * 60 + 59 * 60 + 10;
  const started = Date.now();
  const nativeSetInterval = window.__nextgenNativeSetInterval || window.setInterval.bind(window);
  function pad(n){ return String(n).padStart(2,"0"); }
  function stopAncestorAnimations(el){
    let node=el;
    for(let i=0;i<30 && node;i++,node=node.parentElement){
      node.classList.remove('elementor-invisible','animated','elementor-element-animated');
      node.style.setProperty('animation','none','important');
      node.style.setProperty('animation-name','none','important');
      node.style.setProperty('animation-duration','0s','important');
      node.style.setProperty('animation-iteration-count','1','important');
      node.style.setProperty('animation-play-state','paused','important');
      node.style.setProperty('transition','none','important');
      node.style.setProperty('opacity','1','important');
      node.style.setProperty('visibility','visible','important');
      node.style.setProperty('transform','none','important');
      node.style.setProperty('filter','none','important');
    }
  }
  function update(){
    const els={
      d:document.getElementById("cd-dias"),
      h:document.getElementById("cd-horas"),
      m:document.getElementById("cd-min"),
      s:document.getElementById("cd-seg")
    };
    if(!els.h||!els.m||!els.s)return;
    const remaining=Math.max(0,START-Math.floor((Date.now()-started)/1000));
    const totalHours=Math.floor(remaining/3600);
    const m=Math.floor((remaining%3600)/60);
    const s=remaining%60;
    if(els.d)els.d.textContent='00';
    els.h.textContent=pad(totalHours);
    els.m.textContent=pad(m);
    els.s.textContent=pad(s);
    ['cd-dias','cd-horas','cd-min','cd-seg'].forEach(id=>{
      const el=document.getElementById(id);
      if(el)stopAncestorAnimations(el);
    });
  }
  function updateWhoText(){
    const heading=document.querySelector('[data-id="aa8cff5"] .elementor-heading-title');
    if(!heading) return;
    heading.innerHTML='É um treinamento completo para quem quer vender na <span style="color:#F94F17;font-weight:700">Shopee</span> com estratégia, margem e escala. <span style="color:#F94F17">Ele é indicado para:</span>';
  }
  function buildMovingStrip(){
    const section=document.getElementById('faixas-secao');
    const existing=section?.querySelector('.elementor-icon-list-items');
    if(!existing)return;
    existing.style.display='flex';
    const track=existing.querySelector('.carrossel-ativo');
    if(track){
      track.style.setProperty('display','flex','important');
      track.style.setProperty('align-items','center','important');
    }
  }

  function initScrollReveals(){
    const targets=[...document.querySelectorAll('.elementor > .e-con.e-parent')];
    if(!targets.length)return;
    const revealTargets=targets.filter(el=>el.id!=='faixas-secao');
    revealTargets.forEach(el=>{
      el.classList.add('ng-reveal');
      el.querySelectorAll('.elementor-invisible').forEach(child=>child.classList.remove('elementor-invisible'));
    });
    if(!('IntersectionObserver' in window)){
      revealTargets.forEach(el=>el.classList.add('ng-in'));
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('ng-in');
        entry.target.querySelectorAll('.elementor-invisible').forEach(child=>child.classList.remove('elementor-invisible'));
        observer.unobserve(entry.target);
      });
    },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
    revealTargets.forEach(el=>observer.observe(el));
  }
  function placeSecurityImage(){
    if(document.querySelector('.nextgen-security-image'))return;
    const button=[...document.querySelectorAll('.elementor-button-text')]
      .find(el=>el.textContent.trim()==='QUERO DOMINAR AS VENDAS');
    if(!button)return;
    const buttonWidget=button.closest('.elementor-widget-button');
    if(!buttonWidget)return;
    const source=[...document.querySelectorAll('img')].find(img=>{
      const src=img.getAttribute('src')||'';
      return src.includes('compra-segura.webp');
    });
    if(!source)return;
    const wrapper=document.createElement('div');
    wrapper.className='nextgen-security-image';
    wrapper.appendChild(source);
    buttonWidget.insertAdjacentElement('afterend',wrapper);
  }
  function init(){
    if(window.__nextgenNativeSetInterval) window.setInterval = window.__nextgenNativeSetInterval;
    update();
    updateWhoText();
    buildMovingStrip();
    initScrollReveals();
    placeSecurityImage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  nativeSetInterval(update,1000);
})();
</script>`;

const enhancedSiteHtml = siteHtml
  .replace(/\+70/g, '+20')
  .replace('<head>', `<head>
<link rel="preconnect" href="https://i.postimg.cc" crossorigin>
<link rel="preload" as="image" href="https://i.postimg.cc/NGC0ZFdq/Chat-GPT-Image-17-de-set-de-2026-21-26-07.png" fetchpriority="high">
${timerGuard}`)
  .replace('</body>', `${countdownOverride}<script src="/site-enhancements.js"></script></body>`);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Projeto dos 100K | Vendas na Shopee" },
      {
        name: "description",
        content: "Projeto dos 100K com Mark Diniz: estratégias para vender na Shopee com margem, validação e escala.",
      },
      { property: "og:title", content: "Projeto dos 100K | Vendas na Shopee" },
      {
        property: "og:description",
        content: "Aprenda com Mark Diniz a vender na Shopee com estratégia, margem e escala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  server: {
    handlers: {
      GET: () =>
        new Response(enhancedSiteHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
