'use client';

import {useMemo,useState} from 'react';
import {SlidersHorizontal,Sparkles} from 'lucide-react';
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
    return <section className="overflow-hidden rounded-[14px] border border-[#272931] bg-[#18191d] text-white shadow-sm">
      <div className="border-b border-white/8 px-5 py-4">
        <p className="text-[12px] font-semibold text-[#a9a2ff]">Espacios invisibles</p>
        <h2 className="mt-1 text-[20px] font-semibold tracking-[-.02em]">Copia el carácter que necesitas</h2>
        <p className="mt-1.5 text-[13px] leading-5 text-[#aeb1ba]">Prueba ambas variantes si una plataforma rechaza una de ellas.</p>
      </div>
      <div className="grid gap-px bg-white/8 sm:grid-cols-2">
        {chars.map(item=><div key={item.label} className="bg-[#18191d] p-5">
          <p className="text-[14px] font-semibold">{item.label}</p>
          <p className="mt-1 text-[12px] text-[#8f939e]">{item.note}</p>
          <div className="mt-4"><CopyButton value={item.value}/></div>
        </div>)}
      </div>
    </section>
  }

  const styles=mode==='store'?storeStyles:mode==='football'?footballStyles:gamingStyles;
  const title=mode==='store'?'Crea una marca recordable':mode==='football'?'Crea el nombre de tu equipo':mode==='gaming'?'Construye tu nickname':'Crea variantes a partir de una palabra';
  const dark=mode==='gaming';

  return <section className={(dark?'border-[#282a31] bg-[#191a1f] text-white':'border-[#dfe1e6] bg-white')+' overflow-hidden rounded-[14px] border shadow-[0_1px_2px_rgba(20,22,26,.03)]'}>
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className={(dark?'border-white/8':'border-[#eceef1]')+' border-b p-5 lg:border-b-0 lg:border-r'}>
        <div className="flex items-center gap-2">
          <span className={(dark?'bg-white/8 text-[#aaa3ff]':'bg-[#eeecff] text-[#5146c8]')+' grid size-8 place-items-center rounded-[9px]'}>
            <SlidersHorizontal size={15}/>
          </span>
          <div>
            <p className={(dark?'text-[#aaa3ff]':'text-[#5b4df5]')+' text-[11px] font-semibold'}>Generador</p>
            <h2 className="text-[16px] font-semibold tracking-[-.015em]">{title}</h2>
          </div>
        </div>

        <label className="mt-5 block">
          <span className={(dark?'text-[#9fa2ad]':'text-[#747883]')+' mb-2 block text-[11px] font-medium'}>Palabra base</span>
          <input
            value={seed}
            onChange={e=>setSeed(e.target.value)}
            placeholder={mode==='store'?'Ej. ropa, café, Luna...':mode==='football'?'Ej. barrio, ciudad, grupo...':'Escribe una palabra...'}
            className={dark
              ?'h-11 w-full rounded-[9px] border border-white/10 bg-white/[.055] px-3 text-[13px] text-white outline-none placeholder:text-[#737680] focus:border-[#756bf3] focus:ring-2 focus:ring-[#5b4df5]/20'
              :'gdn-input h-11 rounded-[9px] px-3 text-[13px]'}
          />
        </label>

        <div className="mt-5">
          <span className={(dark?'text-[#9fa2ad]':'text-[#747883]')+' mb-2 block text-[11px] font-medium'}>Estilo</span>
          <div className="flex flex-wrap gap-1.5">
            {styles.map(item=><button
              key={item}
              onClick={()=>setStyle(item)}
              className={'rounded-[8px] border px-2.5 py-1.5 text-[11px] font-medium transition '+(
                style===item
                  ? dark?'border-[#6e65e7] bg-[#5b4df5]/20 text-[#d9d6ff]':'border-[#c8c2ff] bg-[#eeecff] text-[#4f45c8]'
                  : dark?'border-white/8 bg-white/[.035] text-[#aeb1ba] hover:bg-white/[.07]':'border-[#e1e3e7] bg-white text-[#656973] hover:bg-[#f5f5f7]'
              )}
            >{item}</button>)}
          </div>
        </div>

        <div className={(dark?'border-white/8 text-[#858994]':'border-[#eceef1] text-[#898d96]')+' mt-5 border-t pt-4 text-[11px] leading-5'}>
          Los resultados se actualizan mientras escribes.
        </div>
      </div>

      <div className="min-w-0">
        <div className={(dark?'border-white/8':'border-[#eceef1]')+' flex items-center justify-between border-b px-4 py-3'}>
          <div className="flex items-center gap-2">
            <Sparkles size={14} className={dark?'text-[#aaa3ff]':'text-[#5b4df5]'}/>
            <span className="text-[12px] font-medium">Resultados</span>
          </div>
          <span className={(dark?'text-[#7f838e]':'text-[#92969f]')+' text-[11px]'}>{results.length} opciones</span>
        </div>
        <div className={(dark?'divide-white/8':'divide-[#eceef1]')+' divide-y'}>
          {results.map(value=><div key={value} className={(dark?'hover:bg-white/[.025]':'hover:bg-[#fafafa]')+' flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 transition'}>
            <span className="min-w-0 break-all text-[13px] font-medium">{value}</span>
            <CopyButton value={value}/>
          </div>)}
        </div>
      </div>
    </div>
  </section>
}
