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

/* Faixa promocional */
#faixas-secao .nextgen-marquee{
  width:100% !important;
  overflow:hidden !important;
  display:flex !important;
  align-items:center !important;
  position:relative !important;
}
#faixas-secao .nextgen-marquee-track{
  display:flex !important;
  align-items:center !important;
  width:max-content !important;
  min-width:max-content !important;
  white-space:nowrap !important;
  will-change:transform !important;
  animation:nextgenMarquee 55s linear infinite !important;
  animation-play-state:running !important;
}
#faixas-secao .nextgen-marquee-item{
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  flex:0 0 auto !important;
  margin-right:72px !important;
  font-weight:800 !important;
  text-transform:uppercase !important;
  letter-spacing:.04em !important;
  line-height:1 !important;
}
@keyframes nextgenMarquee{
  from{transform:translate3d(0,0,0)}
  to{transform:translate3d(-50%,0,0)}
}
#faixas-secao .elementor-element-d29ef32 > .elementor-widget-container > .elementor-icon-list-items{
  display:none !important;
}
</style><script>
(function(){
  const START = 23 * 60 * 60 + 59 * 60 + 10;
  const KEY = "nextgen_countdown_started";
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
    let started=Number(localStorage.getItem(KEY));
    if(!started){
      started=Date.now();
      localStorage.setItem(KEY,String(started));
    }
    const remaining=Math.max(0,START-Math.floor((Date.now()-started)/1000));
    const d=Math.floor(remaining/86400);
    const h=Math.floor((remaining%86400)/3600);
    const m=Math.floor((remaining%3600)/60);
    const s=remaining%60;
    if(els.d)els.d.textContent=pad(d);
    els.h.textContent=pad(h);
    els.m.textContent=pad(m);
    els.s.textContent=pad(s);
    ['cd-dias','cd-horas','cd-min','cd-seg'].forEach(id=>{
      const el=document.getElementById(id);
      if(el)stopAncestorAnimations(el);
    });
  }
  function buildMovingStrip(){
    const section=document.getElementById('faixas-secao');
    if(!section || section.querySelector('.nextgen-marquee')) return;
    const existing=section.querySelector('.elementor-icon-list-items');
    if(!existing) return;
    const labels=['0 AO 100K','NOVA OPORTUNIDADE'];
    const marquee=document.createElement('div');
    marquee.className='nextgen-marquee';
    const track=document.createElement('div');
    track.className='nextgen-marquee-track';
    const items=[...labels,...labels,...labels,...labels];
    items.forEach(label=>{
      const item=document.createElement('span');
      item.className='nextgen-marquee-item';
      item.textContent=label;
      track.appendChild(item);
    });
    marquee.appendChild(track);
    existing.parentElement.insertAdjacentElement('beforebegin',marquee);
    existing.style.display='none';
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
    buildMovingStrip();
    placeSecurityImage();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  nativeSetInterval(update,1000);
})();
</script>`;

const enhancedSiteHtml = siteHtml.replace('<head>', `<head>${timerGuard}`).replace('</body>', `${countdownOverride}</body>`);

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
