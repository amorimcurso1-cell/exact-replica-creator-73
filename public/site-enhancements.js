/* Site enhancements for the synced Lovable project. */
(function(){
  if(window.__nextgenLiveUpdate)return;window.__nextgenLiveUpdate=true;
  const feedbackImages=['/images/feedback-100k-1.webp','/images/feedback-100k-2.webp','/images/feedback-100k-3.webp','/images/feedback-mark-1.webp','/images/feedback-mark-2.webp'];
  const style=document.createElement('style');
  style.textContent=`
  .ng-live-feedbacks{width:min(100%,430px);margin:18px auto 28px;position:relative;z-index:20;overflow:hidden}
  .ng-live-feedbacks__viewport{width:100%;overflow:hidden;padding:8px 0 10px}
  .ng-live-feedbacks__track{display:flex;width:max-content;gap:16px;animation:ngLiveFeedbackScroll 34s linear infinite;will-change:transform}
  .ng-live-feedbacks:hover .ng-live-feedbacks__track{animation-play-state:paused}
  .ng-live-feedbacks__card{width:min(78vw,338px);flex:0 0 auto;padding:10px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.26));border:1px solid rgba(249,79,23,.34);box-shadow:0 18px 42px rgba(0,0,0,.5),0 0 28px rgba(249,79,23,.08)}
  .ng-live-feedbacks__device{position:relative;padding:9px;border-radius:23px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.16);overflow:hidden}
  .ng-live-feedbacks__device:before{content:"";position:absolute;z-index:2;left:50%;top:0;transform:translateX(-50%);width:35%;height:16px;border-radius:0 0 11px 11px;background:#090909}
  .ng-live-feedbacks__device:after{content:"";position:absolute;z-index:2;right:-2px;top:23%;width:3px;height:52px;border-radius:3px;background:#ff5b28;box-shadow:0 80px 0 #ff5b28}
  .ng-live-feedbacks__device img{display:block;width:100%;height:auto;border-radius:16px;background:transparent}
  @keyframes ngLiveFeedbackScroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}

  /* Flutuação vertical da seção Para Quem É */
  .ng-who-float{animation:ngWhoFloat 3.6s ease-in-out infinite;will-change:transform}
  .ng-who-float-slow{animation:ngWhoFloat 4.6s ease-in-out infinite;will-change:transform}
  .ng-who-float-fast{animation:ngWhoFloat 3s ease-in-out infinite;will-change:transform}
  @keyframes ngWhoFloat{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-10px,0)}}

  /* Faixa laranja: usa literalmente o texto e os ícones originais da página */
  #faixas-secao{
    position:relative!important;
    width:200vw!important;
    max-width:none!important;
    height:72px!important;
    min-height:72px!important;
    margin-top:-6px!important;
    margin-bottom:2px!important;
    overflow:hidden!important;
    display:flex!important;
    align-items:center!important;
    justify-content:center!important;
    background:#F94F17!important;
    background-image:linear-gradient(90deg,#FF8035 -12.95%,#F6422E 82.93%)!important;
    box-shadow:0 10px 40px 0 rgba(249,79,23,.40)!important;
    transform:rotate(-4deg)!important;
    transform-origin:center center!important;
    z-index:20!important;
  }
  #faixas-secao .elementor-icon-list-items{
    display:flex!important;
    flex-wrap:nowrap!important;
    align-items:center!important;
    width:max-content!important;
    min-width:max-content!important;
    white-space:nowrap!important;
    margin:0!important;
    padding:0!important;
  }
  #faixas-secao .carrossel-ativo{
    display:flex!important;
    flex:0 0 auto!important;
    align-items:center!important;
    width:max-content!important;
    min-width:max-content!important;
    gap:56px!important;
    animation:nextgenOriginalStrip 34s linear infinite!important;
    will-change:transform!important;
  }
  #faixas-secao .elementor-icon-list-item{
    display:inline-flex!important;
    flex:0 0 auto!important;
    align-items:center!important;
    justify-content:center!important;
    height:72px!important;
    margin:0!important;
    padding:0!important;
    white-space:nowrap!important;
  }
  #faixas-secao .elementor-icon-list-icon,
  #faixas-secao .elementor-icon-list-text{
    display:inline-flex!important;
    align-items:center!important;
  }
  #faixas-secao .elementor-icon-list-text{
    display:inline-flex!important;
    align-items:center!important;
  }
  #faixas-secao .elementor-icon-list-icon{
    flex:0 0 auto!important;
    margin-inline-end:12px!important;
  }
  #faixas-secao .elementor-icon-list-icon svg{
    display:block!important;
  }
  #faixas-secao .elementor-icon-list-text{
    color:#fff!important;
    white-space:nowrap!important;
    line-height:1!important;
    font-family:"Halcom","Barlow",Arial,sans-serif!important;
    font-weight:400!important;
  }
  @keyframes nextgenOriginalStrip{
    0%{transform:translate3d(0,0,0)}
    100%{transform:translate3d(-50%,0,0)}
  }
  @media(max-width:700px){
    #faixas-secao{
      width:220vw!important;
      height:60px!important;
      min-height:60px!important;
      transform:rotate(-4deg)!important;
      margin-top:-4px!important;
      margin-bottom:2px!important;
    }
    #faixas-secao .carrossel-ativo{
      gap:38px!important;
      animation-duration:30s!important;
    }
    #faixas-secao .elementor-icon-list-item{
      height:60px!important;
    }
    #faixas-secao .elementor-icon-list-icon{
      margin-inline-end:9px!important;
    }
  }

  .elementor-element-60d7a7b{
    margin-top:42px !important;
  }
  @media(max-width:700px){
    .elementor-element-60d7a7b{
      margin-top:28px !important;
    }
  }

  #faixas-secao .elementor-icon-list-icon{
    display:none!important;
  }
  /* Remover as duas faixas finais do Manual do Milhão */
  /* Ajuste visual da oferta */
  #comprar{
    background:#0a0a0a!important;
    background-image:none!important;
    box-shadow:0 18px 60px rgba(0,0,0,.28),0 0 28px rgba(249,79,23,.08)!important;
  }
  #comprar .lista-precos,
  #comprar .lista-item,
  #comprar .elementor-heading-title{
    text-align:center!important;
  }
  #comprar .lista-precos{
    align-items:center!important;
  }
  #comprar .lista-item{
    justify-content:center!important;
    border-bottom:0!important;
    gap:6px!important;
    padding:3px 0!important;
  }
  #comprar .lista-item .check{
    display:inline-block!important;
  }
  #comprar .elementor-element-5a3d0c4,
  #comprar .elementor-element-5f1d8d1,
  #comprar .elementor-element-507177e{
    width:100%!important;
  }
  #comprar .elementor-element-5a3d0c4 .elementor-heading-title{
    color:#F94F17!important;
  }
  #comprar .elementor-element-5f1d8d1 .elementor-heading-title{
    color:#F94F17!important;
  }
  #comprar .elementor-element-507177e .elementor-heading-title{
    color:#fff!important;
  }
  #comprar .elementor-element-507177e{
    display:flex!important;
    width:100%!important;
    min-height:24px!important;
    align-items:center!important;
    justify-content:center!important;
    opacity:1!important;
    visibility:visible!important;
    transform:none!important;
    position:relative!important;
    z-index:10!important;
  }
  #comprar .elementor-element-507177e .elementor-heading-title{
    display:block!important;
    visibility:visible!important;
    opacity:1!important;
    margin:0!important;
  }
  /* Remove a marca/logotipo da área de pagamento */
  #comprar .elementor-element-324f9eb{
    display:none!important;
  }
  /* Área ao redor do pagamento permanece no preto do site */
  #comprar::before,#comprar::after{
    background:none!important;
    box-shadow:none!important;
  }
  /* Tablet/computador/celular mais para baixo */
  .elementor-element-60d7a7b{
    margin-top:155px!important;
  }
  @media(max-width:700px){
    .elementor-element-60d7a7b{
      margin-top:105px!important;
    }
  }

  /* Remover os dois blocos decorativos finais da página */
  .elementor-element-19a582c,
  .elementor-element-b4693e5{
    display:none!important;
    height:0!important;
    min-height:0!important;
    margin:0!important;
    padding:0!important;
    overflow:hidden!important;
  }
  /* Remover carrossel antigo de imagens abaixo dos benefícios */
  .elementor-element-36758a8{
    display:none!important;
  }
  /* Ajustes finais de feedback */
  .ng-live-feedbacks{
    width:min(100%,360px)!important;
    margin:18px auto 30px!important;
  }
  .ng-live-feedbacks__track{gap:10px!important}
  .ng-live-feedbacks__card{
    width:min(72vw,250px)!important;
    padding:7px!important;
    border-radius:20px!important;
  }
  .ng-live-feedbacks__device{
    padding:6px!important;
    border-radius:17px!important;
  }
  @media(max-width:700px){
    .ng-live-feedbacks{
      width:min(100%,300px)!important;
    }
    .ng-live-feedbacks__card{
      width:min(66vw,215px)!important;
    }
  }

  /* Galeria das novas aulas: logo depois de "O que você recebe dentro do curso" */
  .ng-module-gallery{
    width:min(100%,1180px)!important;
    margin:26px auto 52px!important;
    padding:0 14px!important;
    position:relative!important;
    z-index:15!important;
    opacity:1!important;
  }
  .ng-module-gallery__viewport{
    width:100%!important;
    overflow:hidden!important;
    padding:8px 0 18px!important;
    -webkit-mask-image:linear-gradient(to right,transparent 0,#000 5%,#000 95%,transparent 100%);
    mask-image:linear-gradient(to right,transparent 0,#000 5%,#000 95%,transparent 100%);
  }
  .ng-module-gallery__track{
    display:flex!important;
    width:max-content!important;
    gap:14px!important;
    align-items:stretch!important;
    animation:ngModuleMarquee 34s linear infinite!important;
    will-change:transform!important;
  }
  .ng-module-gallery__viewport:hover .ng-module-gallery__track{
    animation-play-state:paused!important;
  }
  .ng-module-gallery__card{
    width:220px!important;
    flex:0 0 220px!important;
    border-radius:16px!important;
    overflow:hidden!important;
    border:1px solid rgba(249,79,23,.26)!important;
    background:#090909!important;
    box-shadow:0 14px 34px rgba(0,0,0,.34),0 0 20px rgba(249,79,23,.07)!important;
  }
  .ng-module-gallery__card img{
    display:block!important;
    width:100%!important;
    height:auto!important;
    aspect-ratio:2/3!important;
    object-fit:cover!important;
  }
  @keyframes ngModuleMarquee{
    from{transform:translate3d(0,0,0)}
    to{transform:translate3d(-50%,0,0)}
  }
  @media(max-width:767px){
    .ng-module-gallery{
      width:100%!important;
      margin:20px auto 42px!important;
      padding:0 8px!important;
    }
    .ng-module-gallery__track{
      gap:10px!important;
      animation-duration:28s!important;
    }
    .ng-module-gallery__card{
      width:170px!important;
      flex-basis:170px!important;
      border-radius:13px!important;
    }
  }

  .elementor-element-60d7a7b{
    display:flex!important;
    justify-content:center!important;
    align-items:center!important;
    width:min(733px,88vw)!important;
    max-width:733px!important;
    margin-left:auto!important;
    margin-right:auto!important;
    background:transparent!important;
    position:relative!important;
    z-index:5!important;
  }
  .elementor-element-60d7a7b img{
    display:block!important;
    width:100%!important;
    max-width:100%!important;
    height:auto!important;
    margin:0 auto!important;
    object-fit:contain!important;
    object-position:center center!important;
    background:transparent!important;
    animation:ngDeviceFloat 3s ease-in-out infinite!important;
    will-change:transform!important;
  }
  @keyframes ngDeviceFloat{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-30px)}
  }
  /* Nome do professor sobre a imagem e entrada suave do bloco */
   .ng-device-stage{
    position:relative!important;
    margin-top:70px!important;
    opacity:0!important;
    transform:translate3d(0,38px,0) scale(.985)!important;
  }
  .ng-device-stage.ng-device-ready{
    animation:ngDeviceEnter .9s cubic-bezier(.22,.61,.36,1) forwards!important;
  }
  .ng-device-stage .ng-device-label{
    position:absolute!important;
    top:7%!important;
    right:18%!important;
    z-index:6!important;
    padding:0!important;
    border:0!important;
    border-radius:0!important;
    background:transparent!important;
    box-shadow:none!important;
    color:#fff!important;
    font:800 15px/1 "Barlow Condensed",Arial,sans-serif!important;
    letter-spacing:2.2px!important;
    text-transform:uppercase!important;
    text-align:center!important;
    white-space:nowrap!important;
    text-shadow:0 3px 14px rgba(0,0,0,.6),0 0 14px rgba(249,79,23,.22)!important;
    opacity:0!important;
    transform:translate(50%,-2px)!important;
  }
  .ng-device-stage.ng-device-ready .ng-device-label{
    animation:ngLabelEnter .7s .35s cubic-bezier(.22,.61,.36,1) forwards!important;
  }
  @keyframes ngDeviceEnter{
    from{opacity:0;transform:translate3d(0,38px,0) scale(.985)}
    to{opacity:1;transform:none}
  }
  @keyframes ngLabelEnter{
    from{opacity:0;transform:translateY(10px)}
    to{opacity:1;transform:none}
  }
  @media(max-width:700px){
    .ng-device-stage{
      margin-top:45px!important;
    }
    .ng-device-stage .ng-device-label{
      top:13%!important;
      right:10%!important;
      font-size:11px!important;
      letter-spacing:1.6px!important;
      padding:6px 11px!important;
    }
  }

  /* Ajuste fino para computador: separar totalmente o texto da imagem */
  @media(min-width:1024px){
    html,body{
      overflow-x:hidden!important;
    }
    .elementor > .e-con.e-parent{
      width:100%!important;
      max-width:100%!important;
      box-sizing:border-box!important;
    }
    .elementor-element-6a282cb{
      width:100%!important;
      max-width:1180px!important;
      margin-left:auto!important;
      margin-right:auto!important;
      box-sizing:border-box!important;
    }
    .elementor-element-e964a3d{
      width:min(880px,78vw)!important;
      margin-left:auto!important;
      margin-right:auto!important;
    }
    .elementor-element-60d7a7b{
      width:min(820px,78vw)!important;
      max-width:820px!important;
      margin-top:165px!important;
      margin-left:auto!important;
      margin-right:auto!important;
      overflow:visible!important;
    }
    .elementor-element-60d7a7b img{
      width:100%!important;
      max-width:100%!important;
      height:auto!important;
      display:block!important;
      margin:0 auto!important;
    }
    .elementor-element-7289298{
      width:min(1000px,90vw)!important;
      margin:150px auto 0!important;
      position:relative!important;
      z-index:8!important;
      clear:both!important;
    }
    .elementor-element-aa8cff5{
      width:min(960px,88vw)!important;
      max-width:960px!important;
      margin:24px auto 0!important;
      position:relative!important;
      z-index:9!important;
      clear:both!important;
    }
    .elementor-element-aa8cff5 .elementor-heading-title{
      max-width:900px!important;
      margin-left:auto!important;
      margin-right:auto!important;
      text-align:center!important;
    }
  }

  @media(min-width:1024px) and (max-width:1280px){
    .elementor-element-60d7a7b{
      margin-top:145px!important;
    }
    .elementor-element-7289298{
      margin-top:130px!important;
    }
  }

  /* Efeito de entrada para todos os blocos ao rolar */
  .ng-scroll-item{
    opacity:0!important;
    transform:translate3d(0,26px,0)!important;
    transition:opacity .72s cubic-bezier(.22,.61,.36,1),transform .72s cubic-bezier(.22,.61,.36,1)!important;
    will-change:opacity,transform!important;
  }
  .ng-scroll-item.ng-scroll-in{
    opacity:1!important;
    transform:none!important;
  }
  /* Final da página: somente preto, sem conteúdo */
  .ng-final-page-clean{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important}
  `;
  document.head.appendChild(style);

  const findText=t=>[...document.querySelectorAll('body *')].find(e=>e.children.length===0&&(e.textContent||'').trim().toUpperCase()===t);
  function rewriteOriginalStrip(){
    const section=document.getElementById('faixas-secao');
    if(!section)return;
    const items=[...section.querySelectorAll('.elementor-icon-list-item .elementor-icon-list-text')];
    items.forEach((el,i)=>{
      el.textContent=(i%2===0)?'0 AO 100K FACIL':'APROVEITA A OPORTUNIDADE';
    });
  }


  function plus20(){
    const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n=[];let x;
    while(x=w.nextNode())n.push(x);
    n.forEach(x=>{if(/\+70(?!\d)/.test(x.nodeValue||''))x.nodeValue=x.nodeValue.replace(/\+70(?!\d)/g,'+20')});
  }

  function feedbacks(){
    if(document.querySelector('.ng-live-feedbacks'))return;
    document.querySelectorAll('img').forEach(img=>{
      const a=(img.alt||'').toLowerCase(),s=(img.src||'').toLowerCase();
      if(a.includes('feedback')||s.includes('feedback')){const w=img.closest('.elementor-element');if(w)w.style.display='none'}
    });
    const a=findText('FEEDBACKS');if(!a)return;
    const h=a.closest('.elementor-element')||a.parentElement;if(!h)return;
    const sec=document.createElement('section');sec.className='ng-live-feedbacks';
    const vp=document.createElement('div');vp.className='ng-live-feedbacks__viewport';
    const tr=document.createElement('div');tr.className='ng-live-feedbacks__track';
    [...feedbackImages,...feedbackImages].forEach((src,i)=>{
      const c=document.createElement('article');c.className='ng-live-feedbacks__card';
      const d=document.createElement('div');d.className='ng-live-feedbacks__device';
      const im=document.createElement('img');im.src=src;im.alt='Feedback de aluno '+((i%5)+1);im.loading='lazy';
      d.appendChild(im);c.appendChild(d);tr.appendChild(c);
    });
    vp.appendChild(tr);sec.appendChild(vp);h.insertAdjacentElement('afterend',sec);
  }

  function findWhoSection(){
    const heading=findText('PARA QUEM É');if(!heading)return null;
    let node=heading.closest('.elementor-section, .e-con, .elementor-element');
    while(node&&node.parentElement){
      const text=(node.textContent||'').toUpperCase();
      if(text.includes('INICIANTES QUE QUEREM COMEÇAR DO ZERO')||text.includes('VENDEDORES QUE JÁ ESTÃO NA SHOPEE'))return node;
      node=node.parentElement;if(node&&node.textContent.length>5000)break;
    }
    return heading.closest('.elementor-section, .e-con')||heading.parentElement;
  }

  function whoFloat(){
    const section=findWhoSection();
    if(!section||section.classList.contains('ng-who-float-root'))return;
    section.classList.add('ng-who-float-root');
    section.querySelectorAll('img').forEach((img,i)=>{
      const wrap=img.closest('.elementor-element')||img.parentElement;
      if(!wrap||wrap===section)return;
      wrap.classList.add(i%2?'ng-who-float-slow':'ng-who-float');
    });
    const targets=[...section.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,.elementor-icon-list-item')]
      .filter(el=>!el.closest('.ng-live-feedbacks'))
      .filter((el,i)=>i<14);
    targets.forEach((el,i)=>{
      if(el.classList.contains('ng-who-float')||el.classList.contains('ng-who-float-slow'))return;
      el.classList.add(i%3===0?'ng-who-float-fast':i%3===1?'ng-who-float-slow':'ng-who-float');
      el.style.animationDelay=(i*0.09)+'s';
    });
  }

  function addModuleGallery(){
    if(document.querySelector('.ng-module-gallery'))return;

    const heading=[...document.querySelectorAll('.elementor-heading-title')]
      .find(el=>(el.textContent||'').trim().toLowerCase().startsWith('o que você recebe dentro da mentoria'));
    if(!heading)return;

    const anchorWidget=heading.closest('.elementor-element');
    if(!anchorWidget)return;
    const contentContainer=anchorWidget.closest('.e-con-inner') || anchorWidget.parentElement;
    if(!contentContainer)return;

    const gallery=document.createElement('section');
    gallery.className='ng-module-gallery';
    gallery.setAttribute('aria-label','Aulas atualizadas para 2026');

    const viewport=document.createElement('div');
    viewport.className='ng-module-gallery__viewport';

    const track=document.createElement('div');
    track.className='ng-module-gallery__track';

    const modules=['06','05','13','12','03','07','04','09'];

    [...modules,...modules].forEach((num,idx)=>{
      const card=document.createElement('article');
      card.className='ng-module-gallery__card';
      const img=document.createElement('img');
      img.src='/images/'+num+'.webp';
      img.alt='Aula atualizada para 2026 — módulo '+num;
      img.loading='lazy';
      card.appendChild(img);
      track.appendChild(card);
    });

    viewport.appendChild(track);
    gallery.appendChild(viewport);

    contentContainer.appendChild(gallery);

    const reveal=()=>{
      if(gallery.getBoundingClientRect().top < window.innerHeight*.95){
        gallery.classList.add('ng-module-gallery--in');
        return true;
      }
      return false;
    };

    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            gallery.classList.add('ng-module-gallery--in');
            io.disconnect();
          }
        });
      },{threshold:.03});
      io.observe(gallery);
    }else reveal();
  }

  function addMarkDinizLabel(){
    const host=document.querySelector('.elementor-element-60d7a7b');
    if(!host||host.querySelector('.ng-device-label'))return;
    host.classList.add('ng-device-stage');
    const label=document.createElement('div');
    label.className='ng-device-label';
    label.textContent='MARK DINIZ';
    host.appendChild(label);
    requestAnimationFrame(()=>host.classList.add('ng-device-ready'));
  }

  function initUniversalScrollEffects(){
    const skip=new Set(['faixas-secao']);
    const elements=[...document.querySelectorAll('.elementor > .e-con.e-parent')];
    elements.forEach(section=>{
      if(skip.has(section.id)||section.classList.contains('ng-module-gallery'))return;
      const items=[...section.querySelectorAll(':scope > .e-con-inner > .elementor-element, :scope > .e-con-inner > .e-con > .elementor-element')]
        .filter(el=>!el.classList.contains('ng-module-gallery'))
        .slice(0,24);
      items.forEach((el,idx)=>{
        if(el.closest('.ng-live-feedbacks'))return;
        el.classList.add('ng-scroll-item');
        el.style.transitionDelay=(Math.min(idx,8)*0.05)+'s';
      });
    });
    const targets=[...document.querySelectorAll('.ng-scroll-item')];
    if(!targets.length)return;
    if(!('IntersectionObserver' in window)){
      targets.forEach(el=>el.classList.add('ng-scroll-in'));
      return;
    }
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('ng-scroll-in');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -7% 0px'});
    targets.forEach(el=>io.observe(el));
  }

  function hideEnding(){
    const selectors=[
      'footer',
      '#footer',
      '.elementor-location-footer',
      '.elementor-footer',
      '.site-footer',
      '[data-footer]'
    ];
    document.querySelectorAll(selectors.join(',')).forEach(el=>el.classList.add('ng-final-page-clean'));

    const needles=['GARANTIR AGORA!','GARANTIR AGORA','COPYRIGHT © 2026 TODOS OS DIREITOS RESERVADOS.','MANUAL DO MILHÃO'];
    [...document.querySelectorAll('body *')].forEach(el=>{
      if(el.children.length>0)return;
      const txt=(el.textContent||'').trim().toUpperCase();
      if(needles.some(n=>txt===n)||txt.includes('COPYRIGHT © 2026')){
        let box=el.closest('.elementor-element')||el.parentElement;
        if(box)box.classList.add('ng-final-page-clean');
      }
    });
  }

  function bindEnrollCheckout(){
    document.querySelectorAll('a').forEach(link=>{
      const label=(link.textContent||'').trim().toLowerCase();
      if(label!=='inscreva-se agora')return;
      link.addEventListener('click',event=>{
        event.preventDefault();
        window.location.href='/checkout';
      },{passive:false});
    });
  }

  function ensureFinalPaymentLine(){
    const el=document.querySelector('[data-id="507177e"] .elementor-heading-title');
    if(!el)return;
    el.textContent='ou R$59,98 à vista';
    el.style.setProperty('display','block','important');
    el.style.setProperty('visibility','visible','important');
    el.style.setProperty('opacity','1','important');
    el.style.setProperty('color','#111','important');
    el.style.setProperty('text-align','center','important');
    el.style.setProperty('margin','0','important');
    const box=el.closest('[data-id="507177e"]');
    if(box){
      box.style.setProperty('display','flex','important');
      box.style.setProperty('visibility','visible','important');
      box.style.setProperty('opacity','1','important');
      box.style.setProperty('justify-content','center','important');
      box.style.setProperty('align-items','center','important');
      box.style.setProperty('width','100%','important');
      box.classList.remove('elementor-invisible','ng-scroll-item');
    }
  }

  function ensureDeviceImage(){
    const img=document.querySelector('[data-id="60d7a7b"] img');
    if(!img)return;
    const src='https://i.postimg.cc/NGC0ZFdq/Chat-GPT-Image-17-de-set-de-2026-21-26-07.png';
    if(img.getAttribute('src')!==src)img.setAttribute('src',src);
    img.removeAttribute('srcset');
    img.removeAttribute('data-src');
    img.removeAttribute('data-lazy-src');
    img.classList.remove('lazyloaded','lazyload','swiper-lazy');
    img.setAttribute('loading','eager');
    img.setAttribute('decoding','async');
    img.style.setProperty('display','block','important');
    img.style.setProperty('visibility','visible','important');
    img.style.setProperty('opacity','1','important');
    img.style.setProperty('background','transparent','important');
    img.style.setProperty('margin','0 auto','important');
  }

  function bindDominarVendasScroll(){
    document.querySelectorAll('a[href="#comprar"], a').forEach(link=>{
      const text=(link.textContent||'').trim().toLowerCase();
      if(text!=='quero dominar as vendas')return;
      link.addEventListener('click',event=>{
        const target=document.getElementById('comprar');
        if(!target)return;
        event.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      },{passive:false});
    });
  }

  function init(){
    plus20();
    rewriteOriginalStrip();
    feedbacks();
    whoFloat();
    addModuleGallery();
    addMarkDinizLabel();
    initUniversalScrollEffects();
    bindDominarVendasScroll();
    ensureFinalPaymentLine();
    ensureDeviceImage();
    bindEnrollCheckout();
    hideEnding();
    setTimeout(ensureFinalPaymentLine,600);
    setTimeout(ensureDeviceImage,900);
    document.querySelectorAll('.elementor-element-11e7250').forEach(el=>el.style.setProperty('display','none','important'));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(hideEnding,500);
})();
