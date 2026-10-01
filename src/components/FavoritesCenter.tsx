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

  if(!items.length)return <div className="rounded-[28px] border border-[#d6ccbd] bg-[#fffaf2] px-6 py-16 text-center">
    <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#e5ede7] text-[#446653]"><Heart size={19}/></span>
    <h2 className="brand-serif mt-5 text-[28px] font-bold text-[#23342b]">Aún no has guardado nombres</h2>
    <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-[#788179]">Pulsa el corazón en cualquier tarjeta. Tus favoritos se guardan solo en este navegador.</p>
  </div>;

  return <section className="overflow-hidden rounded-[28px] border border-[#d5cbbb] bg-[#fffaf2]">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfd6c9] bg-[#efe7da] px-5 py-5">
      <div><p className="gdn-eyebrow">Guardados en este dispositivo</p><h2 className="brand-serif mt-1 text-[28px] font-bold text-[#26372e]">{items.length} favoritos</h2></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={copyAll} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#cec4b6] bg-[#fffaf2] px-4 text-[10px] font-bold text-[#566259]"><Copy size={13}/>Copiar todos</button>
        <button onClick={exportTxt} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#cec4b6] bg-[#fffaf2] px-4 text-[10px] font-bold text-[#566259]"><Download size={13}/>TXT</button>
        <button onClick={clear} className="inline-flex h-10 items-center gap-2 rounded-full border border-[#dec6bd] bg-[#f9ebe6] px-4 text-[10px] font-bold text-[#9b5844]"><Trash2 size={13}/>Vaciar</button>
      </div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3">{items.map(name=><div key={name} className="border-b border-r border-[#e1d8cb] p-5">
      <div className="flex items-center justify-between gap-3"><p className="brand-serif truncate text-[23px] font-bold text-[#2a3b31]">{name}</p><button onClick={()=>remove(name)} aria-label="Quitar" className="grid size-9 place-items-center rounded-full border border-[#d5cbbb] text-[#849087]"><X size={13}/></button></div>
      <div className="mt-4"><CopyButton value={name}/></div>
    </div>)}</div>
  </section>
}
