'use client';

import {useMemo,useState} from 'react';
import {Copy,RefreshCw,Sparkles} from 'lucide-react';
import type{ToolMode} from '@/data/keywordMaster';
import {generateFootballNames,generateStoreNames,generateStyledNames} from '@/lib/generator';

const gamingStyles=['Insano','Dark','Pro','Aesthetic','Minimal'];
const storeStyles=['Premium','Minimal','Juvenil','Artesanal'];
const footballStyles=['Serio','Barrio','Gracioso','Competitivo'];

export default function GeneratorPanel({mode,defaultValue='Nova'}:{mode:ToolMode;defaultValue?:string}){
  const[seed,setSeed]=useState(defaultValue);
  const[style,setStyle]=useState(mode==='store'?'Premium':mode==='football'?'Competitivo':'Insano');
  const[copied,setCopied]=useState('');

  const results=useMemo(()=>{
    const base=style&&seed.trim()?(seed.trim()+' '+(style==='Minimal'?'':style)).trim():seed;
    if(mode==='store')return generateStoreNames(base);
    if(mode==='football')return generateFootballNames(base);
    return generateStyledNames(base);
  },[seed,style,mode]);

  async function copy(value:string){
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(()=>setCopied(''),1200);
  }

  if(mode==='invisible'){
    const chars=[{label:'Invisible corto',value:'ㅤ',note:'U+3164'},{label:'Espacio ancho',value:'　',note:'U+3000'}];
    return <section className="overflow-hidden rounded-[28px] bg-[#173128] text-white shadow-[0_24px_60px_rgba(25,40,32,.16)]">
      <div className="border-b border-white/10 px-6 py-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#b9cbbd]">Caracteres</p><h2 className="brand-serif mt-1 text-[26px] font-bold">Espacios invisibles</h2></div>
      <div className="grid md:grid-cols-2">{chars.map(item=><button key={item.label} onClick={()=>copy(item.value)} className="border-b border-white/10 p-6 text-left transition hover:bg-white/5 md:border-b-0 md:border-r"><span className="block text-[13px] font-bold">{item.label}</span><span className="mt-1 block text-[11px] text-[#94aa9d]">{item.note}</span></button>)}</div>
    </section>
  }

  const styles=mode==='store'?storeStyles:mode==='football'?footballStyles:gamingStyles;

  return <section className="overflow-hidden rounded-[30px] bg-[#173128] text-[#fffaf2] shadow-[0_26px_70px_rgba(25,40,32,.18)]">
    <div className="grid lg:grid-cols-[320px_1fr]">
      <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a9bdaf]">Generador en vivo</p>
        <h3 className="brand-serif mt-2 text-[28px] font-bold leading-tight">Da forma a tu idea.</h3>
        <p className="mt-2 text-[11px] leading-5 text-[#9db0a4]">Escribe una base y cambia el tono hasta encontrar algo que encaje.</p>

        <label className="mt-6 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#a9bdaf]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="h-12 w-full rounded-2xl border border-white/12 bg-[#203d32] px-4 text-[13px] text-white outline-none placeholder:text-[#71887b] focus:border-[#d6b167]" placeholder="Escribe una palabra..."/>
        </label>

        <div className="mt-5">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#a9bdaf]">Estilo</span>
          <div className="flex flex-wrap gap-2">
            {styles.map(item=><button key={item} onClick={()=>setStyle(item)} className={'rounded-full border px-3 py-2 text-[10px] font-bold transition '+(style===item?'border-[#d6b167] bg-[#d6b167] text-[#1b2d24]':'border-white/12 bg-white/5 text-[#c9d5cd] hover:bg-white/10')}>{item}</button>)}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[10px] text-[#84998d]"><RefreshCw size={12}/> Se actualiza mientras escribes</div>
      </div>

      <div className="min-w-0 bg-[#1d382e]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] font-bold"><Sparkles size={13} className="text-[#e0b75d]"/> Resultados</div>
          <span className="rounded-full bg-white/6 px-2.5 py-1 text-[9px] font-bold text-[#8fa497]">{results.length} opciones</span>
        </div>
        <div className="grid sm:grid-cols-2">
          {results.slice(0,12).map(value=><button key={value} onClick={()=>copy(value)} className="group flex min-h-[72px] items-center justify-between gap-3 border-b border-white/8 px-5 text-left transition hover:bg-white/[.045] sm:border-r">
            <span className="min-w-0 break-all text-[13px] font-semibold">{value}</span>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/10 text-[#8fa497] transition group-hover:border-[#d6b167]/70 group-hover:text-[#e0b75d]"><Copy size={13}/></span>
            {copied===value&&<span className="sr-only">Copiado</span>}
          </button>)}
        </div>
      </div>
    </div>
  </section>
}
