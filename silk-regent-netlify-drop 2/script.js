"use strict";
const journey = document.getElementById("journey-select");
function updateForm(){
 const executive = /^E[34]/.test(journey.value);
 const family = /^F[12]/.test(journey.value);
 const special = /^(Northern Belle|Cliveden House) ·/.test(journey.value);
 const familyFields = document.getElementById("family-fields");
 familyFields.hidden = !family;
 familyFields.querySelectorAll("input,select").forEach(el => el.disabled = !family);
 const fields=document.getElementById("executive-fields");
 fields.hidden=!executive;
 fields.querySelectorAll("input,textarea").forEach(el=>el.disabled=!executive);
 const travellers=document.querySelector('[name="travellers"]');
 travellers.min="1";
 if (family || special) travellers.removeAttribute("max");
 else travellers.max=executive || /^C[57]/.test(journey.value)?"10":"12";
 document.getElementById("group-hint").textContent=special?(document.documentElement.lang === "ru" ? "Отдельная программа по запросу. Даты, наличие мест и стоимость подтверждаются до бронирования." : "A separately arranged experience. Dates, availability and price are confirmed before booking."):/^C[57]/.test(journey.value)?"This tea experience: maximum five couples / ten guests. Your tea masterclass and all reservations are confirmed before booking.":family?"Family experiences: price on enquiry. Your fixed programme, duration and accommodation are confirmed before booking. Bilingual concierge escort at all times.":executive?"Executive packages: maximum 10 guests. Signature itinerary with bilingual concierge accompaniment throughout.":journey.value==="Liquid Heritage · Sussex / Kent"?"Liquid Heritage is a separately booked experience, not a modification to a fixed package. Maximum 12 guests.":"Couples packages: maximum 6 couples / 12 guests. Signature itinerary with bilingual concierge accompaniment throughout.";
}
document.querySelectorAll("[data-audience]").forEach(button=>button.addEventListener("click",()=>{
 const audience=button.dataset.audience;
 document.querySelectorAll("[data-audience]").forEach(tab=>{tab.classList.toggle("active",tab===button);tab.setAttribute("aria-selected",String(tab===button));});
 [["[data-audience-card]","audienceCard"],["[data-price-audience]","priceAudience"],["[data-audience-meta]","audienceMeta"],["[data-terms]","terms"]].forEach(([selector,key])=>document.querySelectorAll(selector).forEach(el=>el.hidden=el.dataset[key]!==audience));
}));
journey.addEventListener("change",updateForm);
document.querySelector('[name="journey_purpose"]').addEventListener("change",updateForm);
const audienceTabs=[...document.querySelectorAll('[role="tab"]')];
audienceTabs.forEach((tab,index)=>tab.addEventListener('keydown',event=>{
 if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
 event.preventDefault();
 const next=event.key==='Home'?0:event.key==='End'?audienceTabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+audienceTabs.length)%audienceTabs.length;
 audienceTabs[next].focus();audienceTabs[next].click();
}));
document.querySelectorAll(".book-button").forEach(button=>button.addEventListener("click",()=>{
 journey.value=button.dataset.package;updateForm();document.getElementById("booking").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});journey.focus({preventScroll:true});
}));
document.getElementById("share-button").addEventListener("click",async event=>{
 const label=event.currentTarget.querySelector("span");try{await navigator.clipboard.writeText(location.href);label.textContent="Link copied";setTimeout(()=>label.textContent="Copy share link",1800);}catch{label.textContent="Copy this page address from your browser";}
});
updateForm();

if(document.body.dataset.preview === "true") document.querySelector("form.enquiry").addEventListener("submit", event => {event.preventDefault();let status=document.getElementById("enquiry-preview-status");if(!status){status=document.createElement("p");status.id="enquiry-preview-status";status.setAttribute("role","status");event.currentTarget.append(status);}status.textContent="Preview: your enquiry has not been submitted. No details have been stored.";});
