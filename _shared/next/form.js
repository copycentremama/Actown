
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
