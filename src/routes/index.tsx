import { createFileRoute } from "@tanstack/react-router";
import siteHtml from "../site/index.html?raw";

const countdownOverride = `<style>
#cd-dias,#cd-horas,#cd-min,#cd-seg{
  animation:none !important;
  transition:none !important;
  opacity:1 !important;
  visibility:visible !important;
  transform:none !important;
  filter:none !important;
  text-shadow:none !important;
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
  margin:14px 0 8px !important;
}
.nextgen-security-image img{
  display:block !important;
  width:min(462px,92vw) !important;
  max-width:100% !important;
  height:auto !important;
}
</style><script>
(function(){
  const START = 23 * 60 * 60 + 59 * 60 + 10;
  const KEY = "nextgen_countdown_started";
  function pad(n){ return String(n).padStart(2,"0"); }
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
  }
  function placeSecurityImage(){
    const headings=[...document.querySelectorAll('.elementor-heading-title')];
    const heading=headings.find(el=>el.textContent.trim()==='+300 alunos já garantiram');
    if(!heading)return;
    const widget=heading.closest('.elementor-widget-heading');
    if(!widget||document.querySelector('.nextgen-security-image'))return;
    const source=[...document.querySelectorAll('img')].find(img=>{
      const src=img.getAttribute('src')||'';
      return src.includes('compra-segura.webp');
    });
    if(!source)return;
    const wrapper=document.createElement('div');
    wrapper.className='nextgen-security-image';
    wrapper.appendChild(source);
    widget.insertAdjacentElement('afterend',wrapper);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){update();placeSecurityImage();});
  }else{
    update();
    placeSecurityImage();
  }
  setInterval(update,1000);
})();
</script>`;

const enhancedSiteHtml = siteHtml.replace('</body>', `${countdownOverride}</body>`);

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
