'use client';

import {useMemo,useState} from 'react';
import {Copy,RefreshCw,Sparkles} from 'lucide-react';
import type{ToolMode} from '@/data/keywordMaster';
import {generateFootballNames,generateStoreNames} from '@/lib/generator';
import {trackProductAction} from '@/lib/analytics';
import UnicodeStylePicker from './UnicodeStylePicker';
import {
  applyNameFrame,
  applyUnicodeStyle,
  nameFrames,
  type UnicodeStyleId,
} from '@/lib/styledText';

const storeStyles=['Premium','Minimal','Juvenil','Artesanal'];
const footballStyles=['Serio','Barrio','Gracioso','Competitivo'];

export default function GeneratorPanel({mode,defaultValue='Nova'}:{mode:ToolMode;defaultValue?:string}){
  const[seed,setSeed]=useState(defaultValue);
  const[style,setStyle]=useState(mode==='store'?'Premium':mode==='football'?'Competitivo':'');
  const[font,setFont]=useState<UnicodeStyleId>(mode==='gaming'?'bold':'plain');
  const[frame,setFrame]=useState(mode==='gaming'?'pro':'none');
  const[copied,setCopied]=useState('');

  const isStyled=mode==='gaming'||mode==='general';

  const results=useMemo(()=>{
    if(mode==='store'){
      const base=seed.trim()?(seed.trim()+' '+style).trim():seed;
      return generateStoreNames(base);
    }
    if(mode==='football'){
      const base=seed.trim()?(seed.trim()+' '+style).trim():seed;
      return generateFootballNames(base);
    }

    const raw=seed.trim()||'Nova';
    const bases=[
      raw,
      raw.toUpperCase(),
      raw+'X',
      raw+'7',
      raw+'99',
      raw.replace(/\s+/g,'_'),
      raw.replace(/\s+/g,'ㅤ'),
      'The '+raw,
      raw+' Pro',
      raw+' Max',
      'x'+raw+'x',
      raw+' ツ',
    ];
    return Array.from(new Set(bases.map(value=>applyNameFrame(applyUnicodeStyle(value,font),frame))));
  },[seed,style,mode,font,frame]);

  async function copy(value:string){
    await navigator.clipboard.writeText(value);
    trackProductAction('copy-generated','generator-panel');
    setCopied(value);
    window.setTimeout(()=>setCopied(''),1200);
  }

  if(mode==='invisible'){
    const chars=[{label:'Invisible corto',value:'ㅤ',note:'U+3164'},{label:'Espacio ancho',value:'　',note:'U+3000'}];
    return <section className="overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_24px_64px_rgba(27,24,55,.15)]">
      <div className="border-b border-white/8 px-6 py-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#a99fff]">Caracteres</p><h2 className="brand-serif mt-1 text-[26px] font-bold">Espacios invisibles</h2></div>
      <div className="grid gap-px bg-white/8 md:grid-cols-2">{chars.map(item=><button key={item.label} onClick={()=>copy(item.value)} className="min-h-[100px] bg-[#151927] p-6 text-left transition hover:bg-[#1b2030]"><span className="block text-[13px] font-semibold">{item.label}</span><span className="mt-1 block text-[11px] text-[#8f94a8]">{item.note}</span><span className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-white/10 px-3 text-[11px] text-[#d2d5df]"><Copy size={12}/>{copied===item.value?'Copiado':'Copiar'}</span></button>)}</div>
    </section>
  }

  const styles=mode==='store'?storeStyles:footballStyles;

  return <section className="overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_24px_64px_rgba(27,24,55,.15)]">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="border-b border-white/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a99fff]">Generador en vivo</p>
        <h3 className="brand-serif mt-2 text-[28px] font-bold leading-tight">Da forma a tu idea.</h3>
        <p className="mt-2 text-[11px] leading-5 text-[#9da2b5]">{isStyled?'Combina fuente, marco y variaciones sin salir del generador.':'Escribe una base y cambia el tono hasta encontrar algo que encaje.'}</p>

        <label className="mt-6 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="h-12 w-full rounded-[11px] border border-white/12 bg-[#181c2a] px-4 text-[13px] text-white outline-none placeholder:text-[#6f7488] focus:border-[#776cff]" placeholder="Escribe una palabra..."/>
        </label>

        {isStyled?<>
          <div className="mt-5"><UnicodeStylePicker value={font} onChange={value=>{setFont(value);trackProductAction('font-change','generator-panel')}} preview={seed} dark/></div>
          <label className="mt-5 block">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Marco</span>
            <select value={frame} onChange={e=>{setFrame(e.target.value);trackProductAction('frame-change','generator-panel')}} className="h-11 w-full rounded-[10px] border border-white/14 bg-[#181c2a] px-3 text-[11px] text-white outline-none focus:border-[#776cff]">
              {nameFrames.map(item=><option key={item.id} value={item.id}>{item.label} · {item.transform('Nova')}</option>)}
            </select>
          </label>
        </>:<div className="mt-5">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Estilo</span>
          <div className="flex flex-wrap gap-2">
            {styles.map(item=><button key={item} onClick={()=>{setStyle(item);trackProductAction('style-change','generator-panel')}} className={'min-h-11 rounded-[9px] border px-3 text-[11px] font-semibold transition sm:min-h-0 sm:py-2 sm:text-[10px] '+(style===item?'border-[#7469ff] bg-[#5b4df5] text-white':'border-white/18 bg-white/[.07] text-[#e0e2ea] hover:border-[#665ce0] hover:bg-white/[.12]')}>{item}</button>)}
          </div>
        </div>}

        <div className="mt-6 flex items-center gap-2 text-[10px] text-[#858a9d]"><RefreshCw size={12}/> Se actualiza mientras escribes</div>
      </div>

      <div className="min-w-0 bg-[#151927]">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold"><Sparkles size={13} className="text-[#a99fff]"/> Resultados</div>
          <span className="rounded-full bg-white/6 px-2.5 py-1 text-[9px] font-semibold text-[#898ea0]">{results.length} opciones</span>
        </div>
        <div className="grid gap-px bg-white/8 sm:grid-cols-2">
          {results.slice(0,12).map(value=><button key={value} onClick={()=>copy(value)} className="group flex min-h-[72px] items-center justify-between gap-3 bg-[#151927] px-5 text-left transition hover:bg-[#1b2030]">
            <span className="min-w-0 break-all text-[13px] font-semibold">{value}</span>
            <span className="grid size-11 shrink-0 place-items-center rounded-[9px] border border-white/10 text-[#9297a9] transition group-hover:border-[#756aff] group-hover:text-[#bcb7ff] sm:size-8"><Copy size={13}/></span>
            {copied===value&&<span className="sr-only">Copiado</span>}
          </button>)}
        </div>
      </div>
    </div>
  </section>
}
