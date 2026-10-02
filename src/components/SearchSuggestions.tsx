'use client';

import{ArrowRight,Grid2X2,LoaderCircle,Search}from'lucide-react';
import Link from'next/link';
import type{SearchResult}from'@/hooks/useSiteSearch';

export default function SearchSuggestions({
  results,
  loading,
  activeIndex,
  onHover,
  onSelect,
  compact=false,
  listboxId,
}:{results:SearchResult[];loading:boolean;activeIndex:number;onHover:(index:number)=>void;onSelect:(item:SearchResult,index:number)=>void;compact?:boolean;listboxId:string}){
  return <div id={listboxId} role="listbox" aria-label="Resultados de búsqueda" className={'absolute left-0 right-0 z-[70] max-h-[min(420px,calc(100dvh-120px))] overflow-y-auto overscroll-contain rounded-[14px] border border-[#e5e3ec] bg-white p-1.5 shadow-[0_18px_44px_rgba(37,32,70,.14)] sm:max-h-[460px] '+(compact?'top-[50px]':'top-[118px] sm:top-[64px]')}>
    {loading&&results.length===0&&<div role="status" className="flex items-center gap-2 px-3 py-3 text-[11px] text-[#888a9a]"><LoaderCircle size={13} className="animate-spin"/>Buscando nombres y herramientas…</div>}
    {!loading&&results.length===0&&<div role="status" className="px-3 py-3">
      <p className="text-[11px] font-semibold text-[#4f5161]">No encontramos coincidencias.</p>
      <p className="mt-1 text-[10px] leading-4 text-[#9092a2]">Prueba un nombre, una categoría o algo como “gato”, “japonés” o “Free Fire”.</p>
      <Link href="/directorio" className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#ddd8f2] bg-[#f6f4ff] px-3 py-1.5 text-[9px] font-bold text-[#5b52c2]">
        <Grid2X2 size={11}/>Abrir directorio completo
      </Link>
    </div>}
    {results.map((item,index)=><button
      key={item.kind+'|'+item.path+'|'+item.title}
      type="button"
      onMouseEnter={()=>onHover(index)}
      onClick={()=>onSelect(item,index)}
      id={listboxId+'-option-'+index}
      role="option"
      aria-selected={activeIndex===index}
      className={'flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition '+(activeIndex===index?'bg-[#f3f0ff]':'hover:bg-[#f7f5ff]')}
    >
      <span className={'grid size-8 shrink-0 place-items-center rounded-[9px] '+(item.kind==='page'?'bg-[#eeeaff] text-[#5b4df5]':'bg-[#fff1f4] text-[#e35d81]')}>
        {item.kind==='page'?<ArrowRight size={13}/>:<Search size={12}/>}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[12px] font-semibold text-[#2b2c38]">{item.title}</span>
          <span className="shrink-0 rounded-full bg-[#f4f2f8] px-2 py-0.5 text-[8px] font-black uppercase tracking-[.08em] text-[#8a8c9d]">{item.kind==='page'?'Página':'Nombre'}</span>
        </span>
        <span className="mt-0.5 block line-clamp-2 text-[10px] leading-4 text-[#8a8c9b]">{item.subtitle}</span>
      </span>
    </button>)}
  </div>
}
