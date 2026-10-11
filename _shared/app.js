import { services, production, steps } from './content.js';
import {initPortfolio} from './portfolio.js';
const $ = selector => document.querySelector(selector);
const iconPaths = [
  '<path d="M4 30h32M7 30V11h26v19M12 24l4-9 4 9m-6-3h4m7-6v9m-2-9h6"/>',
  '<path d="M20 4v32M6 8h28v9H6zm0 15h28v9H6zM26 11l3 2-3 2M12 26l-3 2 3 2"/>',
  '<path d="M10 5h18v11H10zM9 30H5V15h30v15h-4M10 23h20v12H10zM28 19h3"/>',
  '<path d="m7 12 4-5h18l4 5v18H7zm0 4h26M10 30v5m20-5v5M11 23h4m10 0h4M15 8v7m10-7v7"/>',
  '<path d="M5 6h30v28H5zM9 10h22v20H9zM14 16h12M14 21h12M14 26h7"/>',
  '<path d="m6 22 7 7 20-20M6 9h10M6 14h5M25 27v8m-4-4h8"/>',
];
const picture = (name, alt, sizes) => `<img src="../_shared/assets/content/${name}-960.webp" srcset="../_shared/assets/content/${name}-480.webp 480w, ../_shared/assets/content/${name}-960.webp 960w" sizes="${sizes}" width="960" height="1280" alt="${alt}" loading="lazy" decoding="async">`;
$('#services-list').innerHTML = services.map((s,i)=>`<article class="service"><span class="service-number">${s.number}</span><div class="service-heading"><h3>${s.title}</h3><span class="service-icon" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${iconPaths[i]}</svg></span></div><p>${s.text}</p><details class="service-more"><summary>Виды изделий <span aria-hidden="true">＋</span></summary><ul>${s.items.map(item=>`<li>${item}</li>`).join('')}</ul><p>${s.detail}</p></details><button type="button" data-service="${s.id}">Обсудить заказ <span aria-hidden="true">↗</span></button></article>`).join('');
$('#service').insertAdjacentHTML('beforeend', services.map(s=>`<option value="${s.id}">${s.title}</option>`).join(''));
initPortfolio($('#gallery'));
$('#steps').innerHTML = steps.map((s,i)=>`<article class="step"><span class="step-number">0${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('');
if($('#production-grid')) $('#production-grid').innerHTML = production.map(p=>`<figure>${picture(p.image,p.title,'(max-width:700px) 88vw, 30vw')}<figcaption><h3>${p.title}</h3><p>${p.text}</p></figcaption></figure>`).join('');

const menu = $('.menu-toggle');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');$('#navigation').classList.remove('open');}
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));menu.setAttribute('aria-label',expanded?'Открыть меню':'Закрыть меню');$('#navigation').classList.toggle('open',!expanded);});
$('#navigation').addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
matchMedia('(min-width:701px)').addEventListener('change',closeMenu);
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{$('#service').value=button.dataset.service;$('#contact').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#service').focus({preventScroll:true});}));


const form=document.querySelector('#request-form');
const status=document.querySelector('#form-status');
form.addEventListener('submit',event=>{
 event.preventDefault();
 const phone=document.querySelector('#phone'),email=document.querySelector('#email');
 const digits=phone.value.replace(/\D/g,'');
 const phoneError=/^[78][0-9]{10}$/.test(digits)?'':'Введите полный номер телефона: +7 или 8 и ещё 10 цифр.';
 const emailError=!email.value||email.validity.valid?'':'Проверьте адрес электронной почты.';
 for(const [input,message] of [[phone,phoneError],[email,emailError]]){input.setAttribute('aria-invalid',String(Boolean(message)));document.querySelector('#'+input.id+'-error').textContent=message;}
 if(phoneError||emailError){status.textContent='Проверьте выделенные поля.';(phoneError?phone:email).focus();return;}
 status.textContent='Форма заполнена. Это просмотр дизайна — заявка не отправлялась.';
});
