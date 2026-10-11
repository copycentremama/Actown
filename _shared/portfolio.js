import {gallery} from './content.js';

export function initPortfolio(host) {
  if (!host) return;
  host.classList.add('portfolio-grid');
  const filters=document.createElement('div');
  filters.className='portfolio-filters';filters.setAttribute('role','group');filters.setAttribute('aria-label','Виды работ');
  const categories=[['all','Все работы'],['signs','Вывески'],['navigation','Навигация'],['print','Печать и наклейки'],['stands','Стенды']];
  filters.innerHTML=categories.map(([id,title])=>`<button type="button" data-filter="${id}" aria-pressed="${id==='all'}">${title}</button>`).join('');
  host.before(filters);
  const status=document.createElement('p');status.className='portfolio-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');host.after(status);
  host.innerHTML=gallery.map((g,i)=>`<figure class="portfolio-work" data-category="${g.category}"><button class="portfolio-open" type="button" data-work="${i}" aria-label="Увеличить: ${g.title}"><div class="portfolio-photo"><img src="../_shared/assets/content/${g.image}-960.webp" srcset="../_shared/assets/content/${g.image}-480.webp 480w, ../_shared/assets/content/${g.image}-960.webp 960w" sizes="(max-width:700px) 88vw, (max-width:1000px) 44vw, 42vw" width="960" height="720" alt="${g.title}" loading="lazy" decoding="async"><span aria-hidden="true">↗</span></div></button><figcaption><span class="portfolio-label">${g.label}</span><h3>${g.title}</h3></figcaption></figure>`).join('');
  let visible=gallery.map((g,i)=>i),selected=0,returnFocus;
  const dialog=document.createElement('dialog');dialog.className='portfolio-dialog';dialog.setAttribute('aria-labelledby','portfolio-dialog-title');
  dialog.innerHTML='<button type="button" class="portfolio-close" aria-label="Закрыть фотографию">×</button><img class="portfolio-full" alt=""><div class="portfolio-caption"><p class="portfolio-label"></p><h2 id="portfolio-dialog-title"></h2><p class="portfolio-description"></p><div class="portfolio-controls"><button type="button" aria-label="Предыдущая фотография">←</button><span aria-live="polite"></span><button type="button" aria-label="Следующая фотография">→</button></div></div>';
  document.body.append(dialog);
  function show(index){selected=(index+visible.length)%visible.length;const g=gallery[visible[selected]];dialog.querySelector('img').src=`../_shared/assets/content/${g.image}-960.webp`;dialog.querySelector('img').alt=g.title;dialog.querySelector('.portfolio-label').textContent=g.label;dialog.querySelector('h2').textContent=g.title;dialog.querySelector('.portfolio-description').textContent=g.caption;dialog.querySelector('.portfolio-controls span').textContent=`${selected+1} / ${visible.length}`;}
  host.querySelectorAll('[data-work]').forEach(b=>b.addEventListener('click',()=>{returnFocus=b;show(visible.indexOf(Number(b.dataset.work)));dialog.showModal();document.body.classList.add('modal-open');}));
  filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{const category=button.dataset.filter;filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));visible=[];host.querySelectorAll('figure').forEach((figure,i)=>{figure.hidden=category!=='all'&&figure.dataset.category!==category;if(!figure.hidden)visible.push(i);});status.textContent=`Показано работ: ${visible.length}`;}));
  dialog.querySelector('.portfolio-close').addEventListener('click',()=>dialog.close());
  const controls=dialog.querySelectorAll('.portfolio-controls button');controls[0].addEventListener('click',()=>show(selected-1));controls[1].addEventListener('click',()=>show(selected+1));
  dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(selected-1);}if(e.key==='ArrowRight'){e.preventDefault();show(selected+1);}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus({preventScroll:true});});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
}

const nextGallery=document.querySelector('[data-portfolio]');
if(nextGallery)initPortfolio(nextGallery);
