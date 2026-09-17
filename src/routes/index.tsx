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
.elementor-element-60d7a7b img{
  display:block !important;
  background:transparent !important;
  box-shadow:none !important;
  border:0 !important;
}

#faixas-secao{
  position:relative !important;
  width:200vw !important;
  max-width:none !important;
  height:72px !important;
  min-height:72px !important;
  margin:8px 0 !important;
  overflow:visible !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  background:linear-gradient(90deg,#FF8035 -12.95%,#F6422E 82.93%) !important;
  box-shadow:0 10px 40px 0 rgba(249,79,23,.40) !important;
  transform:rotate(-4deg) !important;
  transform-origin:center center !important;
  z-index:20 !important;
}
#faixas-secao::before{
  content:"" !important;
  position:absolute !important;
  left:-10% !important;
  top:58px !important;
  width:120% !important;
  height:58px !important;
  background:linear-gradient(90deg,rgba(255,128,53,.16),rgba(246,66,46,.30),rgba(255,128,53,.10)) !important;
  filter:blur(13px) !important;
  opacity:.95 !important;
  transform:rotate(-2deg) scaleX(1.02) !important;
  transform-origin:center center !important;
  pointer-events:none !important;
  z-index:-1 !important;
}
#faixas-secao .elementor-icon-list-items{
  display:flex !important;
  flex-wrap:nowrap !important;
  align-items:center !important;
  width:max-content !important;
  min-width:max-content !important;
  white-space:nowrap !important;
  margin:0 !important;
  padding:0 !important;
  overflow:visible !important;
}
#faixas-secao .carrossel-ativo{
  display:flex !important;
  flex:0 0 auto !important;
  align-items:center !important;
  width:max-content !important;
  min-width:max-content !important;
  gap:56px !important;
  animation:nextgenOriginalStrip 20s linear infinite !important;
  will-change:transform !important;
}
#faixas-secao .elementor-icon-list-item{
  display:inline-flex !important;
  flex:0 0 auto !important;
  align-items:center !important;
  justify-content:center !important;
  height:72px !important;
  margin:0 !important;
  padding:0 !important;
  white-space:nowrap !important;
}
#faixas-secao .elementor-icon-list-icon,
#faixas-secao .elementor-icon-list-text{
  display:inline-flex !important;
  align-items:center !important;
}
#faixas-secao .elementor-icon-list-icon{
  flex:0 0 auto !important;
  margin-inline-end:12px !important;
}
#faixas-secao .elementor-icon-list-icon svg{
  display:block !important;
}
#faixas-secao .elementor-icon-list-text{
  color:#fff !important;
  white-space:nowrap !important;
  line-height:1 !important;
  font-family:"Halcom","Barlow",Arial,sans-serif !important;
  font-size:16px !important;
  font-weight:400 !important;
  letter-spacing:0 !important;
  text-transform:uppercase !important;
}
@keyframes nextgenOriginalStrip{
  0%{transform:translate3d(0,0,0)}
  100%{transform:translate3d(-50%,0,0)}
}
@media (max-width:1024px){
  #faixas-secao{ width:220vw !important; }
}
@media (max-width:700px){
  #faixas-secao{
    width:240vw !important;
    height:60px !important;
    min-height:60px !important;
    margin:4px 0 !important;
    transform:rotate(-4deg) !important;
  }
  #faixas-secao::before{
    top:48px !important;
    height:46px !important;
    filter:blur(11px) !important;
  }
  #faixas-secao .carrossel-ativo{
    gap:38px !important;
    animation-duration:18s !important;
  }
  #faixas-secao .elementor-icon-list-item{
    height:60px !important;
  }
  #faixas-secao .elementor-icon-list-icon{
    margin-inline-end:9px !important;
  }
  #faixas-secao .elementor-icon-list-text{
    font-size:14px !important;
  }
}
.nextgen-fb-marquee{
  width:100% !important;
  overflow:hidden !important;
  position:relative !important;
  padding:8px 0 4px !important;
  -webkit-mask-image:linear-gradient(to right,transparent 0,#000 6%,#000 94%,transparent 100%);
  mask-image:linear-gradient(to right,transparent 0,#000 6%,#000 94%,transparent 100%);
}
.nextgen-fb-track{
  display:flex !important;
  align-items:stretch !important;
  width:max-content !important;
  gap:18px !important;
  animation:nextgenFbScroll 45s linear infinite;
  will-change:transform;
}
.nextgen-fb-marquee:hover .nextgen-fb-track{ animation-play-state:paused; }
.nextgen-fb-item{
  flex:0 0 auto !important;
  width:clamp(230px,24vw,320px) !important;
  border-radius:18px !important;
  overflow:hidden !important;
  background:#f4f4f5 !important;
  box-shadow:0 18px 40px rgba(0,0,0,.45) !important;
  border:1px solid rgba(249,79,23,.25) !important;
}
.nextgen-fb-item img{
  display:block !important;
  width:100% !important;
  height:auto !important;
}
@media (max-width:767px){
  .nextgen-fb-item{ width:74vw !important; }
  .nextgen-fb-track{ gap:14px !important; animation-duration:38s; }
}
@keyframes nextgenFbScroll{
  0%{transform:translate3d(0,0,0)}
  100%{transform:translate3d(-50%,0,0)}
}

.ng-reveal{
  opacity:0 !important;
  transform:translate3d(0,34px,0) !important;
  transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);
  will-change:opacity,transform;
}
.ng-reveal.ng-in{
  opacity:1 !important;
  transform:none !important;
}
#elementor-element-6a282cb{}
#faixas-secao + .elementor-element{}
.elementor-element-11e7250{
  display:none !important;
}
/* Área dos dispositivos: preto + glow laranja, imagem original sem fundo */
.elementor-element-6a282cb,
.elementor-element-6a282cb > .e-con-inner,
.elementor-element-e964a3d,
.elementor-element-60d7a7b,
.elementor-element-60d7a7b > .elementor-widget-container{
  background:#000 !important;
}
.elementor-element-6a282cb{
  position:relative !important;
  border-radius:28px !important;
  overflow:hidden !important;
}
.elementor-element-6a282cb::after{
  content:"" !important;
  position:absolute !important;
  width:min(760px,92vw) !important;
  height:420px !important;
  left:50% !important;
  top:50% !important;
  transform:translate(-50%,-50%) !important;
  background:radial-gradient(circle,rgba(249,79,23,.18) 0%,rgba(249,79,23,.07) 34%,rgba(0,0,0,0) 72%) !important;
  filter:blur(16px) !important;
  pointer-events:none !important;
  z-index:0 !important;
}
.elementor-element-60d7a7b,
.elementor-element-60d7a7b img{
  position:relative !important;
  z-index:1 !important;
}
html,body{
  background:#000 !important;
  color:#fff !important;
}
/* Checkout / inscrição: painel branco, CTA laranja */
#comprar{
  background:#fff !important;
  color:#111 !important;
  border-radius:28px !important;
  box-shadow:0 18px 60px rgba(249,79,23,.18) !important;
  overflow:hidden !important;
  margin-left:auto !important;
  margin-right:auto !important;
}
#comprar > .e-con-inner{
  background:#fff !important;
}
#comprar .elementor-element-f3c3ded,
#comprar .elementor-element-1a4aa44,
#comprar .elementor-element-f9f116c,
#comprar .elementor-element-7f0828c,
#comprar .elementor-element-9cad982{
  background:#fff !important;
}
#comprar .elementor-element-324f9eb{
  display:none !important;
}
#comprar .elementor-element-4b183a7 .elementor-heading-title,
#comprar .elementor-element-5a3d0c4 .elementor-heading-title,
#comprar .elementor-element-5f1d8d1 .elementor-heading-title,
#comprar .elementor-element-507177e .elementor-heading-title,
#comprar .elementor-element-ec8a248 .elementor-heading-title{
  color:#111 !important;
}
#comprar .elementor-element-5a3d0c4 .elementor-heading-title{
  color:#F94F17 !important;
}
#comprar .elementor-element-5f1d8d1 .elementor-heading-title{
  color:#F94F17 !important;
}
#comprar .elementor-element-507177e .elementor-heading-title{
  color:#333 !important;
}
#comprar .elementor-element-63bc9de .elementor-button{
  background:#F94F17 !important;
  background-image:linear-gradient(90deg,#FF8035,#F94F17) !important;
  color:#fff !important;
  border:0 !important;
  box-shadow:0 12px 28px rgba(249,79,23,.28) !important;
}
#comprar .elementor-element-63bc9de .elementor-button:hover{
  background:#F94F17 !important;
  color:#fff !important;
}
#comprar .elementor-element-d46b042 img{
  background:#fff !important;
  display:block !important;
  width:min(910px,100%) !important;
  height:auto !important;
}
#comprar .elementor-progress-wrapper{
  background:#eee !important;
}
#comprar .elementor-progress-bar{
  background:#F94F17 !important;
}
#comprar .elementor-element-ec8a248 .elementor-heading-title{
  color:#111 !important;
}
@media(max-width:767px){
  #comprar{
    border-radius:22px !important;
    margin-left:10px !important;
    margin-right:10px !important;
  }
}
body,
#page,
.site,
.site-main,
.elementor,
.elementor-page,
.elementor-section-wrap{
  background:#000 !important;
}
.elementor .e-con,
.elementor .elementor-section,
.elementor .elementor-element{
  background-color:transparent !important;
  background-image:none !important;
}
.elementor .e-con::before,
.elementor .e-con::after,
.elementor .elementor-section::before,
.elementor .elementor-section::after{
  box-sizing:border-box !important;
}
.elementor > .e-con.e-parent:nth-of-type(3),
.elementor > .e-con.e-parent:nth-of-type(6),
.elementor > .e-con.e-parent:nth-of-type(9),
.elementor > .e-con.e-parent:nth-of-type(12){
  position:relative !important;
}
.elementor > .e-con.e-parent:nth-of-type(3)::before,
.elementor > .e-con.e-parent:nth-of-type(6)::before,
.elementor > .e-con.e-parent:nth-of-type(9)::before,
.elementor > .e-con.e-parent:nth-of-type(12)::before{
  content:"" !important;
  position:absolute !important;
  inset:8% 8% auto 8% !important;
  height:52% !important;
  background:radial-gradient(circle at 50% 50%,rgba(249,79,23,.20) 0%,rgba(249,79,23,.10) 30%,rgba(249,79,23,0) 72%) !important;
  filter:blur(20px) !important;
  pointer-events:none !important;
  z-index:0 !important;
}
.elementor > .e-con.e-parent:nth-of-type(3) > *,
.elementor > .e-con.e-parent:nth-of-type(6) > *,
.elementor > .e-con.e-parent:nth-of-type(9) > *,
.elementor > .e-con.e-parent:nth-of-type(12) > *{
  position:relative !important;
  z-index:1 !important;
}
.elementor-element-60d7a7b{
  width:min(733px,88vw) !important;
  max-width:733px !important;
  margin-left:auto !important;
  margin-right:auto !important;
  transform:none !important;
}
.elementor-element-60d7a7b img{
  display:block !important;
  width:100% !important;
  max-width:100% !important;
  height:auto !important;
  object-fit:contain !important;
  object-position:center center !important;
  transform:none !important;
  animation:nextgenTabletOriginalFloat 3s ease-in-out infinite !important;
  will-change:transform !important;
}
@keyframes nextgenTabletOriginalFloat{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-30px)}
}
@media (max-width:1024px){
  .elementor-element-6a282cb{
    margin-left:0 !important;
    margin-right:0 !important;
    padding-left:20px !important;
    padding-right:20px !important;
  }
  .elementor-element-60d7a7b{
    width:min(650px,90vw) !important;
    max-width:650px !important;
  }
}
@media (max-width:767px){
  .elementor-element-60d7a7b{
    width:min(560px,94vw) !important;
    max-width:94vw !important;
  }
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

const enhancedSiteHtml = siteHtml.replace(/\+70/g, '+20').replace('<head>', `<head>${timerGuard}`).replace('</body>', `${countdownOverride}<script src="/site-enhancements.js"></script></body>`);

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
