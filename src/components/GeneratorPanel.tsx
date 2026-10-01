'use client';

import {useMemo,useState} from 'react';
import type{ToolMode} from '@/data/keywordMaster';
import {generateFootballNames,generateStoreNames,generateStyledNames} from '@/lib/generator';
import CopyButton from './CopyButton';

const gamingStyles=['Insano','Dark','Pro','Aesthetic','Minimal'];
const storeStyles=['Premium','Minimal','Juvenil','Artesanal'];
const footballStyles=['Serio','Barrio','Gracioso','Competitivo'];

export default function GeneratorPanel({mode,defaultValue='Nova'}:{mode:ToolMode;defaultValue?:string}){
  const[seed,setSeed]=useState(defaultValue);
  const[style,setStyle]=useState(mode==='store'?'Premium':mode==='football'?'Competitivo':'Insano');

  const results=useMemo(()=>{
    const base=style&&seed.trim()?(seed.trim()+' '+(style==='Minimal'?'':style)).trim():seed;
    if(mode==='store')return generateStoreNames(base);
    if(mode==='football')return generateFootballNames(base);
    return generateStyledNames(base);
  },[seed,style,mode]);

  if(mode==='invisible'){
    const chars=[
      {label:'Invisible corto',value:'ㅤ',note:'U+3164 · Hangul Filler'},
      {label:'Espacio ancho',value:'　',note:'U+3000 · Ideographic Space'},
    ];
    return <section className="gdn-dark rounded-[28px] p-5 md:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#b9acff]">Espacios invisibles</p>
      <h2 className="mt-2 text-2xl font-black">Copia el carácter que necesitas</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b8bbc5]">Aunque el espacio parezca vacío, el botón copia el carácter real. Prueba ambos si una plataforma rechaza uno.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {chars.map(item=><div key={item.label} className="rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <p className="font-extrabold">{item.label}</p>
          <p className="mt-1 text-xs text-[#a7abb5]">{item.note}</p>
          <div className="mt-4"><CopyButton value={item.value}/></div>
        </div>)}
      </div>
    </section>
  }

  const styles=mode==='store'?storeStyles:mode==='football'?footballStyles:gamingStyles;
  const title=mode==='store'?'Crea una marca que suene recordable':mode==='football'?'Crea el nombre de tu equipo':mode==='gaming'?'Construye tu nickname':'Crea variantes a partir de una palabra';

  return <section className={(mode==='gaming'?'gdn-dark':'gdn-card')+' rounded-[28px] p-5 md:p-7'}>
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className={'text-xs font-extrabold uppercase tracking-[.16em] '+(mode==='gaming'?'text-[#b9acff]':'text-[#6d4aff]')}>Generador</p>
        <h2 className="mt-2 text-2xl font-black">{title}</h2>
      </div>
      <span className={'text-xs font-semibold '+(mode==='gaming'?'text-[#aeb1bb]':'text-[#7b7f89]')}>Genera · compara · copia</span>
    </div>
    <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
      <input value={seed} onChange={e=>setSeed(e.target.value)} placeholder={mode==='store'?'Ej. ropa, café, Luna...':mode==='football'?'Ej. barrio, ciudad, grupo...':'Escribe una palabra o nickname...'} className={'h-14 rounded-2xl px-4 outline-none transition '+(mode==='gaming'?'border border-white/12 bg-white/[.06] text-white placeholder:text-[#838691] focus:border-[#8e78ff]':'gdn-input')}/>
      <div className="flex flex-wrap gap-2 lg:max-w-[390px]">
        {styles.map(item=><button key={item} onClick={()=>setStyle(item)} className={(mode==='gaming'?'border border-white/10 bg-white/[.05] text-[#d6d7de] hover:border-[#8f79ff] hover:bg-[#6d4aff]/15':'gdn-chip')+' rounded-xl px-3 py-2 text-xs font-extrabold '+(style===item?(mode==='gaming'?'border-[#8f79ff] bg-[#6d4aff]/20 text-white':'border-[#8f79ff] bg-[#f0edff] text-[#4f35c9]'):'')}>{item}</button>)}
      </div>
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {results.map(value=><div key={value} className={'flex min-h-16 items-center justify-between gap-3 rounded-2xl px-4 py-3 '+(mode==='gaming'?'border border-white/10 bg-white/[.04]':'border border-[#e6e6eb] bg-[#fbfbfc]')}>
        <span className="min-w-0 break-all font-bold">{value}</span>
        <CopyButton value={value}/>
      </div>)}
    </div>
  </section>
}
