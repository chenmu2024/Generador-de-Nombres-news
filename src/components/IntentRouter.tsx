'use client';

import Link from 'next/link';
import {useMemo,useState} from 'react';
import {keywordPages} from '@/data/keywordMaster';

const intents=[
  {icon:'🎮',label:'Juego',href:'/nombres-free-fire',hint:'Free Fire, Roblox, anime'},
  {icon:'👶',label:'Bebé',href:'/nombres-de-nina',hint:'Niña, niño, unisex'},
  {icon:'🐾',label:'Mascota',href:'/nombres-gatos',hint:'Gatos, perros, caballos'},
  {icon:'📱',label:'Usuario',href:'/nombres-instagram',hint:'Instagram y perfiles'},
  {icon:'🏪',label:'Negocio',href:'/nombres-para-tiendas',hint:'Tiendas y marcas'},
  {icon:'🌏',label:'Cultura',href:'/nombres-japoneses',hint:'Japoneses, coreanos y más'},
];

export default function IntentRouter(){
  const[q,setQ]=useState('');
  const matches=useMemo(()=>{
    const value=q.trim().toLocaleLowerCase('es');
    if(!value)return [];
    return keywordPages.filter(item=>
      item.path!=='/'&&
      [item.h1,item.primaryKeyword,...item.secondaryKeywords].some(text=>text.toLocaleLowerCase('es').includes(value))
    ).slice(0,6);
  },[q]);

  return <section className="gdn-card rounded-[28px] p-5 md:p-7">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="gdn-eyebrow">Empieza por aquí</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">¿Qué quieres nombrar?</h2>
      </div>
      <span className="text-xs font-semibold text-[#858995]">Elige una categoría o busca directamente</span>
    </div>
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {intents.map(item=><Link key={item.href} href={item.href} className="rounded-2xl border border-[#e2e3e8] bg-[#fbfbfc] p-4 transition hover:-translate-y-0.5 hover:border-[#bcb0ff] hover:bg-[#f5f2ff]">
        <span className="text-2xl">{item.icon}</span>
        <p className="mt-3 font-extrabold text-[#262830]">{item.label}</p>
        <p className="mt-1 text-xs leading-5 text-[#7a7e88]">{item.hint}</p>
      </Link>)}
    </div>
    <div className="relative mt-6">
      <input value={q} onChange={e=>setQ(e.target.value)} className="gdn-input h-14 rounded-2xl px-4 pr-12" placeholder="Buscar: gato negro, free fire, japonés, tienda..." />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8d95]">⌕</span>
      {matches.length>0&&<div className="absolute left-0 right-0 top-[62px] z-30 overflow-hidden rounded-2xl border border-[#e0e1e6] bg-white shadow-2xl">
        {matches.map(item=><Link key={item.path} href={item.path} className="block border-b border-[#f0f0f3] px-4 py-3 last:border-0 hover:bg-[#f7f5ff]">
          <p className="text-sm font-extrabold text-[#292b32]">{item.h1}</p>
          <p className="mt-1 text-xs text-[#80838d]">{item.description}</p>
        </Link>)}
      </div>}
    </div>
  </section>
}
