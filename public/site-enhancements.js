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

  /* Final da página: somente preto, sem conteúdo */
  .ng-final-page-clean{display:none!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important}
  `;
  document.head.appendChild(style);

  const findText=t=>[...document.querySelectorAll('body *')].find(e=>e.children.length===0&&(e.textContent||'').trim().toUpperCase()===t);

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

  function init(){plus20();feedbacks();whoFloat();hideEnding();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(hideEnding,500);
})();
