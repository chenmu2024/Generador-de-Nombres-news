'use client';

import Link from 'next/link';
import {useMemo,useState} from 'react';
import {AtSign,Baby,Gamepad2,Languages,PawPrint,Search,Store} from 'lucide-react';
import {keywordPages} from '@/data/keywordMaster';

const intents=[
  {icon:Gamepad2,label:'Juegos',href:'/nombres-free-fire',hint:'Free Fire, Roblox, anime'},
  {icon:Baby,label:'Bebés',href:'/nombres-de-nina',hint:'Niña, niño, unisex'},
  {icon:PawPrint,label:'Mascotas',href:'/nombres-gatos',hint:'Gatos, perros, caballos'},
  {icon:AtSign,label:'Usuarios',href:'/nombres-instagram',hint:'Instagram y perfiles'},
  {icon:Store,label:'Negocios',href:'/nombres-para-tiendas',hint:'Tiendas, marcas y equipos'},
  {icon:Languages,label:'Culturas',href:'/nombres-japoneses',hint:'Japoneses, coreanos y más'},
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

  return <section className="overflow-visible rounded-[14px] border border-[#dfe1e6] bg-white shadow-[0_1px_2px_rgba(20,22,26,.03)]">
    <div className="relative border-b border-[#eceef1] p-2">
      <Search size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#979ba4]"/>
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        className="h-12 w-full rounded-[10px] border-0 bg-[#f6f6f8] pl-11 pr-4 text-[14px] font-medium text-[#202126] outline-none ring-0 placeholder:text-[#9da1aa] focus:bg-[#f3f2ff]"
        placeholder="Busca un tipo de nombre o herramienta..."
      />
      {matches.length>0&&<div className="absolute left-2 right-2 top-[62px] z-40 overflow-hidden rounded-[12px] border border-[#dfe1e6] bg-white p-1.5 shadow-[0_18px_48px_rgba(20,22,26,.14)]">
        {matches.map(item=><Link key={item.path} href={item.path} className="block rounded-[8px] px-3 py-2.5 transition hover:bg-[#f5f5f7]">
          <p className="text-[13px] font-semibold text-[#24262b]">{item.h1}</p>
          <p className="mt-0.5 truncate text-[12px] text-[#858993]">{item.description}</p>
        </Link>)}
      </div>}
    </div>

    <div className="grid grid-cols-2 gap-px bg-[#eceef1] md:grid-cols-3 lg:grid-cols-6">
      {intents.map(item=>{
        const Icon=item.icon;
        return <Link key={item.href} href={item.href} className="group bg-white p-4 transition hover:bg-[#fafafa]">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-[9px] bg-[#f2f2f5] text-[#5e626c] transition group-hover:bg-[#eeecff] group-hover:text-[#5146c8]">
              <Icon size={16}/>
            </span>
            <span className="text-[13px] font-semibold text-[#2e3036]">{item.label}</span>
          </div>
          <p className="mt-2 text-[11px] leading-4 text-[#91959e]">{item.hint}</p>
        </Link>
      })}
    </div>
  </section>
}
