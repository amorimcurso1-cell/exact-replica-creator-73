import { createFileRoute } from "@tanstack/react-router";
import siteHtml from "../site/index.html?raw";

const enhancements = `
<style>
.nextgen-cta-logo{width:30px!important;height:30px!important;object-fit:contain!important;display:block!important;background:transparent!important;border:0!important;box-shadow:none!important;mix-blend-mode:multiply!important;flex:0 0 auto!important}
.nextgen-cta-wrap{display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important}
.nextgen-live-values{display:flex!important;align-items:baseline!important;justify-content:center!important;gap:5px!important}
.nextgen-live-item{display:flex!important;align-items:baseline!important;gap:2px!important}
.nextgen-live-number{font-size:24px!important;line-height:1!important;font-weight:800!important}
.nextgen-live-unit{font-size:9px!important;font-weight:600!important}
.nextgen-live-sep{font-size:18px!important}
</style>
<script>
(function(){
  var KEY='nextgen_24h_offer_started_v2', DURATION=24*60*60*1000;
  function norm(s){return String(s||'').replace(/\\s+/g,' ').trim().toUpperCase()}
  function ctas(){return Array.from(document.querySelectorAll('a,button,[role="button"]')).filter(function(e){return norm(e.textContent).indexOf('QUERO DOMINAR AS VENDAS')!==-1})}
  function addLogo(){
    ctas().forEach(function(cta){
      if(!cta.querySelector('.nextgen-cta-logo')){
        var img=document.createElement('img');img.className='nextgen-cta-logo';img.src='https://present-crimson-8pbuvjls.edgeone.dev/';img.alt='';img.setAttribute('aria-hidden','true');
        img.onerror=function(){img.style.display='none'};
        var wrap=cta.querySelector('.elementor-button-content-wrapper')||cta;wrap.classList.add('nextgen-cta-wrap');wrap.insertBefore(img,wrap.firstChild);
      }
    });
  }
  function bind(){
    ctas().forEach(function(cta){
      if(cta.dataset.nextgenTimerBound)return;
      cta.dataset.nextgenTimerBound='1';
      cta.addEventListener('click',function(){if(!localStorage.getItem(KEY))localStorage.setItem(KEY,String(Date.now()))},true);
    });
  }
  function timer(){
    var bar=document.querySelector('.countdown-bar');if(!bar)return;
    if(!bar.dataset.nextgenBuilt){
      bar.dataset.nextgenBuilt='1';
      bar.innerHTML='<span class="countdown-label">⏳ Oferta encerra em:</span><div class="nextgen-live-values"><span class="nextgen-live-item"><span class="nextgen-live-number" data-ng="d">00</span><span class="nextgen-live-unit">dias</span></span><span class="nextgen-live-sep">:</span><span class="nextgen-live-item"><span class="nextgen-live-number" data-ng="h">24</span><span class="nextgen-live-unit">horas</span></span><span class="nextgen-live-sep">:</span><span class="nextgen-live-item"><span class="nextgen-live-number" data-ng="m">00</span><span class="nextgen-live-unit">min</span></span><span class="nextgen-live-sep">:</span><span class="nextgen-live-item"><span class="nextgen-live-number" data-ng="s">00</span><span class="nextgen-live-unit">seg</span></span></div>';
    }
    var started=localStorage.getItem(KEY), remaining=started?Math.max(0,Number(started)+DURATION-Date.now()):DURATION;
    var total=Math.floor(remaining/1000),v={d:Math.floor(total/86400),h:Math.floor(total%86400/3600),m:Math.floor(total%3600/60),s:total%60};
    Object.keys(v).forEach(function(k){var el=bar.querySelector('[data-ng="'+k+'"]');if(el)el.textContent=String(v[k]).padStart(2,'0')});
  }
  function init(){addLogo();bind();timer();setInterval(function(){addLogo();bind();timer()},1000)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
</script>`;

const enhancedHtml = siteHtml.includes('</head>') ? siteHtml.replace('</head>', enhancements + '</head>') : siteHtml + enhancements;

export const Route = createFileRoute("/")({
  component: () => <iframe title="Projeto dos 100K" srcDoc={enhancedHtml} style={{ width: "100vw", height: "100vh", border: 0, display: "block" }} />,
});
