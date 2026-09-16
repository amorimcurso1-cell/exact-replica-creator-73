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

/* Preto do topo descendo suavemente até a mesma cor do restante da página */
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

/* Área dos dispositivos: sem fundo preto/laranja, deixando somente os dispositivos visíveis */
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

/* Faixa promocional */
#faixas-secao .nextgen-marquee{
  width:100% !important;
  height:54px !important;
  min-height:54px !important;
  overflow:hidden !important;
  display:flex !important;
  align-items:center !important;
  justify-content:center !important;
  position:relative !important;
}
#faixas-secao .nextgen-marquee::before,
#faixas-secao .nextgen-marquee::after{
  content:none !important;
}
#faixas-secao .nextgen-marquee-track{
  position:absolute !important;
  left:0 !important;
  top:50% !important;
  display:flex !important;
  align-items:center !important;
  width:max-content !important;
  min-width:max-content !important;
  height:54px !important;
  white-space:nowrap !important;
  will-change:transform !important;
  animation:nextgenMarquee 12s linear infinite !important;
  animation-play-state:running !important;
  backface-visibility:hidden !important;
  transform:translate3d(0,-50%,0);
}
#faixas-secao .nextgen-marquee-item{
  display:inline-flex !important;
  align-items:center !important;
  justify-content:center !important;
  flex:0 0 auto !important;
  height:54px !important;
  margin-right:72px !important;
  padding:0 !important;
  color:#fff !important;
  font-family:"Barlow Condensed",Arial,sans-serif !important;
  font-size:clamp(25px,3vw,36px) !important;
  font-weight:400 !important;
  text-transform:uppercase !important;
  letter-spacing:.025em !important;
  line-height:1 !important;
  position:relative !important;
  top:6px !important;
  text-shadow:none !important;
  -webkit-font-smoothing:antialiased !important;
  font-synthesis:none !important;
}
@media (max-width:700px){
  #faixas-secao .nextgen-marquee{
    height:46px !important;
    min-height:46px !important;
  }
  #faixas-secao .nextgen-marquee-track{
    height:46px !important;
  }
  #faixas-secao .nextgen-marquee-item{
    height:46px !important;
    margin-right:48px !important;
    font-size:clamp(20px,5vw,27px) !important;
    letter-spacing:.02em !important;
    line-height:1 !important;
    top:5px !important;
  }
}
@keyframes nextgenMarquee{
  0%{transform:translate3d(0,-50%,0)}
  100%{transform:translate3d(-50%,-50%,0)}
}
#faixas-secao .elementor-element-d29ef32 > .elementor-widget-container > .elementor-icon-list-items{
  display:none !important;
}

/* Imagens da seção de feedbacks */
.nextgen-feedback-images{
  display:grid !important;
  grid-template-columns:repeat(3,minmax(0,1fr)) !important;
  gap:18px !important;
  width:min(1100px,calc(100vw - 32px)) !important;
  margin:28px auto 10px !important;
  padding:0 !important;
  position:relative !important;
  z-index:5 !important;
}
.nextgen-feedback-images a{
  display:block !important;
  margin:0 !important;
  padding:0 !important;
  border:0 !important;
  text-decoration:none !important;
}
.nextgen-feedback-images img{
  display:block !important;
  width:100% !important;
  height:auto !important;
  max-width:none !important;
  margin:0 !important;
  border:0 !important;
  border-radius:14px !important;
  box-shadow:0 12px 30px rgba(0,0,0,.24) !important;
  background:transparent !important;
}
@media (max-width:800px){
  .nextgen-feedback-images{
    grid-template-columns:1fr !important;
    gap:16px !important;
    width:min(92vw,520px) !important;
    margin-top:22px !important;
  }
  .nextgen-feedback-images img{
    border-radius:12px !important;
  }
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
  function updateWhoText(){
    const heading=document.querySelector('[data-id="aa8cff5"] .elementor-heading-title');
    if(!heading) return;
    heading.innerHTML='É um treinamento completo para quem quer vender na <span style="color:#F94F17;font-weight:700">Shopee</span> com estratégia, margem e escala. <span style="color:#F94F17">Ele é indicado para:</span>';
  }
  function replaceDeviceImage(){
    const img=document.querySelector('.elementor-element-60d7a7b img');
    if(!img) return;
    img.src='/images/plataforma-projeto-100k-transparent.svg?v=2';
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.background='transparent';
  }
  function buildMovingStrip(){
    const section=document.getElementById('faixas-secao');
    if(!section || section.querySelector('.nextgen-marquee')) return;
    const existing=section.querySelector('.elementor-icon-list-items');
    if(!existing) return;
    const marquee=document.createElement('div');
    marquee.className='nextgen-marquee';
    const track=document.createElement('div');
    track.className='nextgen-marquee-track';
    const labels=[
      '0 AO 100K','NOVA OPORTUNIDADE',
      '0 AO 100K','NOVA OPORTUNIDADE',
      '0 AO 100K','NOVA OPORTUNIDADE',
      '0 AO 100K','NOVA OPORTUNIDADE',
      '0 AO 100K','NOVA OPORTUNIDADE',
      '0 AO 100K','NOVA OPORTUNIDADE'
    ];
    labels.forEach(label=>{
      const el=document.createElement('span');
      el.className='nextgen-marquee-item';
      el.textContent=label;
      track.appendChild(el);
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
  function placeFeedbackImages(){
    if(document.querySelector('.nextgen-feedback-images')) return;
    const headings=[...document.querySelectorAll('.elementor-heading-title')];
    const target=headings.find(el=>/feedback|depoimento|avalia[cç][aã]o|o que dizem|clientes/i.test((el.textContent||'').trim()));
    if(!target) return;
    let host=target.closest('.e-con') || target.closest('.elementor-section') || target.parentElement;
    if(!host) return;
    const wrapper=document.createElement('div');
    wrapper.className='nextgen-feedback-images';
    const urls=[
      'https://socialist-blue-d5bf6z6q.edgeone.dev/',
      'https://xerothermic-apricot-usnjxqq5.edgeone.dev/',
      'https://colorful-yellow-sf4knjay.edgeone.dev/'
    ];
    urls.forEach(url=>{
      const link=document.createElement('a');
      link.href=url;
      link.target='_blank';
      link.rel='noopener noreferrer';
      const img=document.createElement('img');
      img.src=url;
      img.alt='Feedback de aluno';
      img.loading='lazy';
      link.appendChild(img);
      wrapper.appendChild(link);
    });
    const inner=host.querySelector(':scope > .e-con-inner');
    (inner || host).appendChild(wrapper);
  }
  function init(){
    if(window.__nextgenNativeSetInterval) window.setInterval = window.__nextgenNativeSetInterval;
    update();
    updateWhoText();
    replaceDeviceImage();
    buildMovingStrip();
    placeSecurityImage();
    placeFeedbackImages();
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
