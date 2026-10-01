'use client';

import {useEffect,useState} from 'react';
import {Copy,Download,Heart,Trash2,X} from 'lucide-react';
import CopyButton from './CopyButton';

export default function FavoritesCenter(){
  const[items,setItems]=useState<string[]>([]);
  useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);
  function remove(name:string){const next=items.filter(i=>i!==name);setItems(next);localStorage.setItem('gdn-favorites',JSON.stringify(next))}
  async function copyAll(){await navigator.clipboard.writeText(items.join('\n'))}
  function clear(){setItems([]);localStorage.removeItem('gdn-favorites')}
  function exportTxt(){const blob=new Blob([items.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mis-nombres-favoritos.txt';a.click();URL.revokeObjectURL(url)}

  if(!items.length)return <div className="rounded-[20px] border border-[#e4e1ed] bg-white px-6 py-16 text-center shadow-[0_10px_28px_rgba(55,49,91,.04)]">
    <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Heart size={19}/></span>
    <h2 className="brand-serif mt-5 text-[28px] font-bold text-[#292a39]">Aún no has guardado nombres</h2>
    <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-[#7e8192]">Pulsa el corazón en cualquier tarjeta. Tus favoritos se guardan solo en este navegador.</p>
  </div>;

  return <section className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_10px_28px_rgba(55,49,91,.04)]">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eceaf3] bg-[#faf9ff] px-5 py-5">
      <div><p className="gdn-eyebrow">Guardados en este dispositivo</p><h2 className="brand-serif mt-1 text-[28px] font-bold text-[#292a39]">{items.length} favoritos</h2></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={copyAll} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-4 text-[10px] font-semibold text-[#626576]"><Copy size={13}/>Copiar todos</button>
        <button onClick={exportTxt} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-4 text-[10px] font-semibold text-[#626576]"><Download size={13}/>TXT</button>
        <button onClick={clear} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#f0d9de] bg-[#fff4f6] px-4 text-[10px] font-semibold text-[#a35465]"><Trash2 size={13}/>Vaciar</button>
      </div>
    </div>
    <div className="grid gap-px bg-[#eceaf3] md:grid-cols-2 lg:grid-cols-3">{items.map(name=><div key={name} className="bg-white p-5">
      <div className="flex items-center justify-between gap-3"><p className="brand-serif truncate text-[23px] font-bold text-[#2a2b39]">{name}</p><button onClick={()=>remove(name)} aria-label="Quitar" className="grid size-9 place-items-center rounded-full border border-[#e0ddea] text-[#8c8e9e] hover:bg-[#f7f5ff]"><X size={13}/></button></div>
      <div className="mt-4"><CopyButton value={name}/></div>
    </div>)}</div>
  </section>
}
