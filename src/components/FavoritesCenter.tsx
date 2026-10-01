'use client';

import {useEffect,useState} from 'react';
import {Copy,Download,Heart,Trash2,X} from 'lucide-react';
import CopyButton from './CopyButton';

export default function FavoritesCenter(){
  const[items,setItems]=useState<string[]>([]);

  useEffect(()=>{
    try{setItems(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}
  },[]);

  function remove(name:string){
    const next=items.filter(item=>item!==name);
    setItems(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
  }

  async function copyAll(){
    await navigator.clipboard.writeText(items.join('\n'));
  }

  function clear(){
    setItems([]);
    localStorage.removeItem('gdn-favorites');
  }

  function exportTxt(){
    const blob=new Blob([items.join('\n')],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download='mis-nombres-favoritos.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  if(!items.length)return <div className="rounded-[14px] border border-[#e1e3e7] bg-white px-5 py-14 text-center">
    <span className="mx-auto grid size-10 place-items-center rounded-full bg-[#f2f2f5] text-[#7f838d]"><Heart size={18}/></span>
    <h2 className="mt-4 text-[18px] font-semibold tracking-[-.02em] text-[#2a2c31]">Aún no has guardado nombres</h2>
    <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-[#7a7e88]">Pulsa el corazón en cualquier tarjeta. Tus favoritos se guardan solo en este navegador.</p>
  </div>;

  return <section className="overflow-hidden rounded-[14px] border border-[#e1e3e7] bg-white">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eceef1] px-4 py-4 sm:px-5">
      <div>
        <p className="gdn-eyebrow">Guardados en este dispositivo</p>
        <h2 className="mt-1 text-[18px] font-semibold tracking-[-.02em]">{items.length} favoritos</h2>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button onClick={copyAll} className="inline-flex h-9 items-center gap-1.5 rounded-[9px] border border-[#dfe1e6] bg-white px-3 text-[12px] font-medium text-[#565a63] hover:bg-[#f6f6f8]"><Copy size={13}/>Copiar todos</button>
        <button onClick={exportTxt} className="inline-flex h-9 items-center gap-1.5 rounded-[9px] border border-[#dfe1e6] bg-white px-3 text-[12px] font-medium text-[#565a63] hover:bg-[#f6f6f8]"><Download size={13}/>TXT</button>
        <button onClick={clear} className="inline-flex h-9 items-center gap-1.5 rounded-[9px] border border-[#eadbd9] bg-white px-3 text-[12px] font-medium text-[#a2473d] hover:bg-[#fff5f3]"><Trash2 size={13}/>Vaciar</button>
      </div>
    </div>

    <div className="grid gap-px bg-[#eceef1] sm:grid-cols-2 lg:grid-cols-3">
      {items.map(name=><div key={name} className="bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[14px] font-semibold text-[#2d2f35]">{name}</p>
          <button onClick={()=>remove(name)} aria-label="Quitar" className="grid size-8 shrink-0 place-items-center rounded-[8px] border border-[#e1e3e7] text-[#8a8e97] hover:bg-[#f6f6f8]"><X size={13}/></button>
        </div>
        <div className="mt-3"><CopyButton value={name}/></div>
      </div>)}
    </div>
  </section>
}
