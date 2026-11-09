import type { Config, Context } from '@netlify/functions';
import { brochures } from './_shared/brochures.ts';

function reply(body: object, status = 200) {
 return new Response(JSON.stringify(body), { status, headers: {'Content-Type':'application/json','Cache-Control':'no-store'} });
}
function escape(value: string) {
 return value.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
export default async (request: Request, context: Context) => {
 if(request.method !== 'POST') return reply({error:'Method not allowed'},405);
 const origin=request.headers.get('origin');
 if(!origin || origin !== new URL(request.url).origin) return reply({error:'Invalid request origin'},403);
 if(!request.headers.get('content-type')?.includes('application/json')) return reply({error:'Invalid request format'},415);
 const raw=await request.text();if(raw.length>3000)return reply({error:'Request too large'},413);
 let input: any;try{input=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
 if(!input||typeof input!=='object')return reply({error:'Invalid request'},400);
 if(input.website)return reply({error:'Invalid request'},400);
 const email=typeof input.email==='string'?input.email.trim():'';
 const name=typeof input.name==='string'?input.name.trim():'';
 if(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||name.length>80||/[\r\n]/.test(name)||input.consent!==true)return reply({error:'Enter a valid email and confirm the brochure request.'},400);
 const brochure=brochures.find(p=>p.code===input.code);
 if(!brochure)return reply({error:'Unknown brochure'},400);
 const key=Netlify.env.get('RESEND_API_KEY'),from=Netlify.env.get('BROCHURE_FROM_EMAIL');
 if(!key||!from)return reply({error:'Brochure email service is not yet connected. Please contact info@silkregent.co.uk.'},503);
 // Draft and branch deployments never send customer mail.
 if(context.deploy.context!=='production')return reply({error:'This is a draft preview. Email delivery is disabled.'},409);
 const link=new URL(brochure.pdf,context.site.url).href;
 const greeting=name?'Dear '+escape(name)+',':'Hello,';
 try {
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],reply_to:'info@silkregent.co.uk',subject:'Your Silk Regent brochure | '+brochure.title,text:(name?'Dear '+name+',':'Hello,')+'\n\nThank you for your interest in '+brochure.title+'. Download your brochure here:\n'+link+'\n\nDates, prices and reservations are confirmed before booking. To discuss your visit, reply to this email.\n\nSilk Regent Ltd\ninfo@silkregent.co.uk\n\nYou received this email because you requested this brochure. You have not been subscribed to marketing emails.',html:'<div style="font-family:Georgia,serif;color:#173c32;max-width:600px;margin:auto;padding:35px"><h1 style="font-weight:normal">Silk Regent</h1><p>'+greeting+'</p><p>Thank you for your interest in '+escape(brochure.title)+'. Your brochure brings together the programme, inclusions and booking details.</p><p><a style="display:inline-block;padding:15px 24px;background:#173c32;color:#f5e8ca;text-decoration:none" href="'+escape(link)+'">Download your brochure</a></p><p>Dates, prices and reservations are confirmed before booking. Reply to this email to discuss your visit.</p><p>Warm regards,<br>Silk Regent Ltd<br>info@silkregent.co.uk</p><p style="font:11px Arial;color:#68756e">You requested this brochure. You have not been subscribed to marketing emails.</p></div>'})});
  if(!response.ok)return reply({error:'We could not send the brochure. Please try again or contact info@silkregent.co.uk.'},502);
  return reply({ok:true});
 } catch {return reply({error:'Email service unavailable. Please try again later.'},502);}
};
export const config: Config = {path:'/api/brochure-request',rateLimit:{windowLimit:5,windowSize:60,aggregateBy:['ip','domain']}};
