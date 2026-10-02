'use client';

import {useEffect} from 'react';
declare global{interface Window{adsbygoogle?:Record<string,unknown>[]}}
export default function AdSlot({slot,label='Publicidad'}:{slot?:string;label?:string}){
  const client=process.env.NEXT_PUBLIC_ADSENSE_CLIENT;const resolvedSlot=slot||process.env.NEXT_PUBLIC_ADSENSE_SLOT_INLINE;
  useEffect(()=>{if(!client||!resolvedSlot)return;try{window.adsbygoogle=window.adsbygoogle||[];window.adsbygoogle.push({})}catch{}},[client,resolvedSlot]);
  if(!client||!resolvedSlot)return null;
  return <aside className="mt-12 min-h-[286px] overflow-hidden rounded-[16px] border border-[#e5e2ef] bg-[#faf9ff] p-3" aria-label={label}><p className="mb-2 text-center text-[9px] font-bold uppercase tracking-[.14em] text-[#9a9cab]">{label}</p><ins className="adsbygoogle" style={{display:'block',minHeight:250}} data-ad-client={client} data-ad-slot={resolvedSlot} data-ad-format="auto" data-full-width-responsive="true"/></aside>
}
