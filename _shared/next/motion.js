const $=s=>document.querySelector(s);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=false;try{paused=localStorage.getItem('actown-motion-paused')==='true';}catch{}
export const motionAllowed=()=>!paused&&!reduced.matches;
const toggle=$('.motion-toggle');
function updateMotion(){
 const enabled=motionAllowed();document.body.classList.toggle('motion-on',enabled);document.body.classList.toggle('motion-off',!enabled);
 toggle.setAttribute('aria-pressed',String(!enabled));toggle.setAttribute('aria-label',enabled?'Отключить анимации':'Включить анимации');
 toggle.disabled=reduced.matches;if(reduced.matches)toggle.setAttribute('aria-label','Анимации отключены системной настройкой');
 document.dispatchEvent(new CustomEvent('motionchange',{detail:{enabled}}));
 if(!enabled)document.getAnimations().forEach(a=>a.cancel());
 if(!enabled)document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('revealed'));
}
toggle.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('actown-motion-paused',String(paused));}catch{}updateMotion();});reduced.addEventListener('change',updateMotion);updateMotion();
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}},{threshold:.12});
document.querySelectorAll('[data-reveal]').forEach(e=>observer.observe(e));
const menu=$('#menu-screen');let returnFocus;
$('.menu-open').addEventListener('click',()=>{returnFocus=document.activeElement;menu.showModal();document.body.style.overflow='hidden';if(motionAllowed())menu.animate([{opacity:0,transform:'translateY(-18px)'},{opacity:1,transform:'none'}],{duration:350,easing:'cubic-bezier(.16,1,.3,1)'});});
$('.menu-close').addEventListener('click',()=>menu.close());menu.addEventListener('close',()=>{document.body.style.overflow='';returnFocus?.focus({preventScroll:true});});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.close();const target=document.querySelector(a.getAttribute('href'));target?.scrollIntoView({behavior:motionAllowed()?'smooth':'instant'});target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});}));
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{
 $('#service').value=button.dataset.service;$('#contact').scrollIntoView({behavior:motionAllowed()?'smooth':'instant'});$('#service').focus({preventScroll:true});
}));
export function enter(element){if(motionAllowed())element.animate([{opacity:.35,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:450,easing:'cubic-bezier(.16,1,.3,1)'});}
