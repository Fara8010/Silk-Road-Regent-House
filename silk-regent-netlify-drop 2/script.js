"use strict";
const journey = document.getElementById("journey-select");
function updateForm(){
 const executive = /^E[34]/.test(journey.value);
 const fields=document.getElementById("executive-fields");
 fields.hidden=!executive;
 fields.querySelectorAll("input,textarea").forEach(el=>el.disabled=!executive);
 document.getElementById("group-hint").textContent=executive?"Executive departures are planned for 8–10 guests. Enter the number in your group.":"Couples departures are planned for six couples / 12 guests. Tell us how many places you are enquiring about.";
}
document.querySelectorAll("[data-audience]").forEach(button=>button.addEventListener("click",()=>{
 const audience=button.dataset.audience;
 document.querySelectorAll("[data-audience]").forEach(tab=>{tab.classList.toggle("active",tab===button);tab.setAttribute("aria-selected",String(tab===button));});
 [["[data-audience-card]","audienceCard"],["[data-price-audience]","priceAudience"],["[data-audience-meta]","audienceMeta"],["[data-terms]","terms"]].forEach(([selector,key])=>document.querySelectorAll(selector).forEach(el=>el.hidden=el.dataset[key]!==audience));
}));
journey.addEventListener("change",updateForm);
document.querySelectorAll(".book-button").forEach(button=>button.addEventListener("click",()=>{
 journey.value=button.dataset.package;updateForm();document.getElementById("booking").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});journey.focus({preventScroll:true});
}));
document.getElementById("share-button").addEventListener("click",async event=>{
 const label=event.currentTarget.querySelector("span");try{await navigator.clipboard.writeText(location.href);label.textContent="Link copied";setTimeout(()=>label.textContent="Copy share link",1800);}catch{label.textContent="Copy this page address from your browser";}
});
updateForm();
