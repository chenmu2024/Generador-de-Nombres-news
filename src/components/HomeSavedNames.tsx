'use client';

import TrackedLink from './TrackedLink';
import {EXPERIMENTS} from '@/data/experiments';
import {ArrowRight,Heart} from 'lucide-react';
import {useEffect,useState} from 'react';

function readFavorites(){
  try{
    const items=JSON.parse(localStorage.getItem('gdn-favorites')||'[]');
    return Array.isArray(items)?items.filter((item):item is string=>typeof item==='string'):[];
  }catch{return []}
}

export default function HomeSavedNames(){
  const[items,setItems]=useState<string[]>([]);

  useEffect(()=>{
    const sync=()=>setItems(readFavorites());
    sync();
    window.addEventListener('storage',sync);
    window.addEventListener('gdn:favorites-updated',sync);
    return()=>{
      window.removeEventListener('storage',sync);
      window.removeEventListener('gdn:favorites-updated',sync);
    };
  },[]);

  if(!items.length)return null;
  const preview=items.slice(-4).reverse();

  return <section className="gdn-shell mt-4">
    <div className="flex flex-col gap-4 rounded-[18px] border border-[#ded9f6] bg-[linear-gradient(135deg,#faf9ff,#f5f2ff)] p-4 shadow-[0_10px_28px_rgba(66,54,135,.06)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-white text-[#ff4f80] shadow-sm"><Heart size={15} fill="currentColor"/></span>
          <div>
            <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#7d72df]">Tu colección</p>
            <p className="gdn-editorial mt-0.5 text-[16px] font-bold text-[#393b4a]">Continúa donde lo dejaste</p><p className="mt-1 text-[10px] text-[#777a8b]">{items.length} {items.length===1?'nombre guardado':'nombres guardados'} en este navegador.</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {preview.map(name=><span key={name} className="max-w-[160px] truncate rounded-full border border-[#dfdbef] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#505263]">{name}</span>)}
        </div>
      </div>
      <TrackedLink href="/favoritos" placement="home-resume" role="resume-favorites" experimentId={EXPERIMENTS.homeResume} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-[11px] bg-[#5b4df5] px-4 text-[11px] font-semibold text-white shadow-[0_8px_22px_rgba(91,77,245,.2)] transition hover:bg-[#5044de]">
        Ver mis favoritos <ArrowRight size={13}/>
      </TrackedLink>
    </div>
  </section>
}
