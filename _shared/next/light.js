import {motionAllowed} from './motion.js';
const hero=document.querySelector('.light-hero'),object=document.querySelector('.hero-object');
const toggle=document.querySelector('#light-toggle');
toggle.addEventListener('click',()=>{const on=toggle.getAttribute('aria-pressed')!=='true';toggle.setAttribute('aria-pressed',String(on));toggle.querySelector('span').textContent=on?'включена':'выключена';hero.classList.toggle('light-off',!on);});
const fine=matchMedia('(hover:hover) and (pointer:fine)');let frame=0;
hero.addEventListener('pointermove',e=>{if(!motionAllowed()||!fine.matches)return;cancelAnimationFrame(frame);const r=hero.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;frame=requestAnimationFrame(()=>object.style.transform=`translate(${x*14}px,${y*10}px) scale(1.015)`);});
hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);object.style.transform='none';});document.addEventListener('motionchange',e=>{if(!e.detail.enabled){cancelAnimationFrame(frame);object.style.transform='none';}});
const articles=[...document.querySelectorAll('[data-story-step]')],visual=document.querySelector('.story-visual');
const captions=['Объём и материал','Свет и характер','Изделие в пространстве'];
function mark(i){articles.forEach((a,n)=>a.classList.toggle('active',n===i));visual.dataset.active=String(i);document.querySelector('#story-caption').textContent=captions[i];document.querySelector('.story-index').textContent=`0${i+1} / 03`;}
mark(0);let scrollFrame=0;window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;let best=0,distance=Infinity;articles.forEach((a,i)=>{const r=a.getBoundingClientRect();const d=Math.abs(r.top+r.height*.35-innerHeight*.45);if(d<distance){best=i;distance=d;}});mark(best);});},{passive:true});
document.querySelectorAll('.service-accordion details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('.service-accordion details').forEach(other=>{if(other!==d)other.open=false;});}));
