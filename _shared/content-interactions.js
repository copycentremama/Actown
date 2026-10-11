const reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-product-service]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelector('#service').value=button.dataset.productService;
  const animated=!reduced.matches&&!document.body.classList.contains('motion-off');
  document.querySelector('#contact').scrollIntoView({behavior:animated?'smooth':'instant'});
  document.querySelector('#service').focus({preventScroll:true});
}));
// Each direction opens into a short list, without overwhelming the overview.
document.addEventListener('toggle',event=>{
  const d=event.target;
  if(d.matches('.service-more')&&d.open)document.querySelectorAll('.service-more').forEach(other=>{if(other!==d)other.open=false;});
},true);
