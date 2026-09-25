"use strict";
const journey = document.getElementById("journey-select");
function updateForm(){
 const executive = /^E[34]/.test(journey.value);
 const fields=document.getElementById("executive-fields");
 fields.hidden=!executive;
 fields.querySelectorAll("input,textarea").forEach(el=>el.disabled=!executive);
 const travellers=document.querySelector('[name="travellers"]');
 travellers.min="1";
 travellers.max=executive?"10":"12";
 document.getElementById("group-hint").textContent=executive?"Executive packages: maximum 10 guests. Fixed itinerary with bilingual concierge escort throughout.":journey.value==="Liquid Heritage · Sussex / Kent"?"Liquid Heritage is a separately booked experience, not a modification to a fixed package. Maximum 12 guests.":"Couples packages: maximum 6 couples / 12 guests. Fixed itinerary with bilingual concierge escort throughout.";
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
