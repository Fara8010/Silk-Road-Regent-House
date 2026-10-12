"use strict";
(() => {
 const ru=document.documentElement.lang==='ru';
 const dialog=document.getElementById('brochure-dialog'),form=document.getElementById('brochure-form'),status=document.getElementById('brochure-status'),result=document.getElementById('brochure-result');
 let selected,previousFocus;
 document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>previousFocus?.focus());
 document.querySelectorAll('[data-brochure]').forEach(button=>button.addEventListener('click',()=>{
  selected=window.SilkRegentBrochures.find(p=>p.code===button.dataset.brochure);if(!selected)return;
  previousFocus=button;form.reset();form.hidden=false;result.hidden=true;result.replaceChildren();status.textContent='';
  document.getElementById('brochure-code').value=selected.code;
  document.getElementById('brochure-language').value=ru?'Russian':'English';
  document.getElementById('brochure-package-name').textContent=button.closest('.package-card')?.querySelector('h3')?.textContent||selected.title;
  dialog.showModal();document.getElementById('brochure-email').focus();
 }));
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity()||!selected)return;
  const data=new FormData(form),submit=form.querySelector('[type=submit]');if(data.get('website'))return;
  submit.disabled=true;status.textContent=ru?'Готовим вашу брошюру…':'Preparing your brochure…';
  try{
   const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});
   if(!response.ok)throw Error(ru?'Не удалось отправить запрос. Повторите попытку или напишите info@silkregent.co.uk.':'Unable to submit your request. Please try again or contact info@silkregent.co.uk.');
   form.hidden=true;result.hidden=false;
   const message=document.createElement('p');message.textContent=ru?'Благодарим за интерес к Silk Regent. Ваша брошюра готова.':'Thank you for your interest in Silk Regent. Your brochure is ready.';
   const link=document.createElement('a');link.href='https://silkregent.co.uk/'+selected.pdf;link.download=selected.slug+'.pdf';link.className='button button-gold';link.textContent=ru?'Скачать брошюру (PDF)':'Download your brochure (PDF)';
   result.replaceChildren(message,link);status.textContent='';link.focus();link.click();
  }catch(error){status.textContent=error.message;}
  finally{submit.disabled=false;}
 });
})();
