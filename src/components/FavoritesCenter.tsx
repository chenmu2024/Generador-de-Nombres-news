'use client';

import {useEffect,useState} from 'react';
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

  if(!items.length)return <div className="gdn-card rounded-[28px] p-8 text-center"><div className="text-4xl">♡</div><h2 className="mt-4 text-2xl font-black">Todavía no has guardado nombres</h2><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#747883]">Pulsa el corazón en cualquier tarjeta de nombre y aparecerá aquí. Los favoritos se guardan en este navegador.</p></div>;

  return <section className="gdn-card rounded-[28px] p-5 md:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="gdn-eyebrow">Guardados en este dispositivo</p><h2 className="mt-2 text-2xl font-black">Mis nombres favoritos</h2></div>
      <div className="flex flex-wrap gap-2"><button onClick={copyAll} className="rounded-xl border border-[#dedfe5] bg-white px-3 py-2 text-xs font-extrabold">Copiar todos</button><button onClick={exportTxt} className="rounded-xl border border-[#dedfe5] bg-white px-3 py-2 text-xs font-extrabold">Exportar TXT</button><button onClick={clear} className="rounded-xl border border-[#ead8d6] bg-[#fff7f6] px-3 py-2 text-xs font-extrabold text-[#9c4a41]">Vaciar</button></div>
    </div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(name=><div key={name} className="rounded-2xl border border-[#e4e5e9] bg-[#fbfbfc] p-4">
        <p className="font-black">{name}</p>
        <div className="mt-4 flex gap-2"><CopyButton value={name}/><button onClick={()=>remove(name)} className="rounded-xl border border-[#e1e2e7] bg-white px-3 py-2 text-xs font-bold text-[#777b84]">Quitar</button></div>
      </div>)}
    </div>
  </section>
}
