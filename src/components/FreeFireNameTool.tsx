'use client';

import {useEffect,useMemo,useState} from 'react';
import {Copy,Gamepad2,Heart,Layers3,Scissors,Shuffle,Sparkles,Space,Type} from 'lucide-react';
import CopyButton from './CopyButton';
import UnicodeStylePicker from './UnicodeStylePicker';
import NameFramePicker from './NameFramePicker';
import {trackProductAction} from '@/lib/analytics';
import{copyText}from'@/lib/clipboard';
import {
  applyNameFrame,
  applyUnicodeStyle,
  nameFrames,
  unicodeStyles,
  type UnicodeStyleId,
} from '@/lib/styledText';

type Variant='general'|'unique'|'women'|'clan';
type ResultView='mix'|'fonts';
type CompatibilityFilter='all'|'alta'|'media'|'experimental';

function defaultFont(variant:Variant):UnicodeStyleId{
  if(variant==='women')return'script';
  if(variant==='unique')return'frakturBold';
  if(variant==='clan')return'sansBold';
  return'bold';
}

function defaultFrame(variant:Variant){
  if(variant==='women')return'hearts';
  if(variant==='unique')return'insano';
  if(variant==='clan')return'clan';
  return'pro';
}

export default function FreeFireNameTool({variant='general'}:{variant?:Variant}){
  const[seed,setSeed]=useState(variant==='women'?'Luna':variant==='clan'?'Nova':'Vortex');
  const[font,setFont]=useState<UnicodeStyleId>(defaultFont(variant));
  const[frame,setFrame]=useState(defaultFrame(variant));
  const[invisible,setInvisible]=useState(false);
  const[short,setShort]=useState(variant==='unique');
  const[view,setView]=useState<ResultView>('mix');
  const[compatibility,setCompatibility]=useState<CompatibilityFilter>('all');
  const[feedback,setFeedback]=useState('');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);

  async function copyAll(){
    const ok=await copyText(results.map(item=>item.value).join('\n'));
    if(!ok)return;
    setFeedback(results.length+' resultados copiados');
    trackProductAction('copy-all-generated','freefire-tool');
    window.setTimeout(()=>setFeedback(''),1400);
  }

  function surprise(){
    const currentFontIndex=unicodeStyles.findIndex(item=>item.id===font);
    const currentFrameIndex=nameFrames.findIndex(item=>item.id===frame);
    const nextFont=unicodeStyles[(currentFontIndex+3+Math.floor(Math.random()*7))%unicodeStyles.length];
    const nextFrame=nameFrames[(currentFrameIndex+2+Math.floor(Math.random()*5))%nameFrames.length];
    setFont(nextFont.id);
    setFrame(nextFrame.id);
    setFeedback(nextFont.label+' + '+nextFrame.label);
    trackProductAction('surprise-style','freefire-tool');
    window.setTimeout(()=>setFeedback(''),1400);
  }

  function toggleFavorite(value:string){
    const removing=favorites.includes(value);
    const next=removing?favorites.filter(item=>item!==value):Array.from(new Set([...favorites,value]));
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    window.dispatchEvent(new Event('gdn:favorites-updated'));
    trackProductAction(removing?'favorite-remove':'favorite-add','freefire-tool');
  }

  const results=useMemo(()=>{
    const raw=seed.trim()||'Vortex';
    const base=short?raw.replace(/\s+/g,'').slice(0,8):raw;
    const join=invisible?'ㅤ':'';
    const clanBase=variant==='clan'?base.toUpperCase().slice(0,6):base;

    if(view==='fonts'){
      const value=invisible?clanBase.split('').join(join):clanBase;
      return unicodeStyles.filter(style=>compatibility==='all'||style.compatibility===compatibility).map(style=>({
        value:applyNameFrame(applyUnicodeStyle(value,style.id),frame),
        label:style.label,
        compatibility:style.compatibility,
      }));
    }

    const source=variant==='clan'
      ?[clanBase,clanBase+'GG',clanBase+'X',clanBase+'7',clanBase+'PRO',clanBase+'MAX']
      :[base,base.toUpperCase(),base.replace(/a/gi,'4'),base+'7',base+'X',base+'ツ',base+'99',base+'Pro'];

    return Array.from(new Set(source.map(name=>{
      const spaced=invisible?name.split('').join(join):name;
      return applyNameFrame(applyUnicodeStyle(spaced,font),frame);
    }))).map(value=>({value,label:'Combinación',compatibility:(unicodeStyles.find(style=>style.id===font)?.compatibility??'media') as 'alta'|'media'|'experimental'}));
  },[seed,font,frame,invisible,short,variant,view,compatibility]);

  return <section className="overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_24px_66px_rgba(27,24,55,.16)]">
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b border-white/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[12px] bg-[#5b4df5] text-white"><Gamepad2 size={16}/></span>
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.13em] text-[#a99fff]">Free Fire Studio</p>
            <h2 className="gdn-editorial text-[24px] font-bold sm:text-[26px]">{variant==='clan'?'Nombre y tag para clan':'Construye tu nickname'}</h2>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Nombre base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="h-12 w-full rounded-[11px] border border-white/12 bg-[#181c2a] px-4 text-[12px] text-white outline-none focus:border-[#776cff]" placeholder="Tu palabra o nickname..."/>
        </label>

        <div className="mt-5">
          <UnicodeStylePicker
            value={font}
            onChange={value=>{setFont(value);trackProductAction('font-change','freefire-tool')}}
            preview={seed}
            dark
          />
        </div>

        <div className="mt-5">
          <NameFramePicker
            value={frame}
            onChange={value=>{setFrame(value);trackProductAction('frame-change','freefire-tool')}}
            preview={seed}
            dark
          />
        </div>

        <div className="mt-5 grid gap-2">
          <button role="switch" aria-checked={invisible} onClick={()=>{setInvisible(v=>!v);trackProductAction('toggle-invisible','freefire-tool')}} className={'flex min-h-11 items-center justify-between rounded-[10px] border px-4 text-[11px] font-semibold transition '+(invisible?'border-[#756aff] bg-[#5b4df5]/20 text-[#e4e1ff]':'border-white/16 bg-white/[.06] text-[#d0d3df] hover:bg-white/[.1]')}>
            <span className="inline-flex items-center gap-2"><Space size={14}/>Espacio invisible</span>
            <span className={'rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[.08em] '+(invisible?'bg-[#5b4df5] text-white':'bg-white/10 text-[#aeb2c1]')}>{invisible?'Activo':'Inactivo'}</span>
          </button>
          <button role="switch" aria-checked={short} onClick={()=>{setShort(v=>!v);trackProductAction('toggle-short','freefire-tool')}} className={'flex min-h-11 items-center justify-between rounded-[10px] border px-4 text-[11px] font-semibold transition '+(short?'border-[#756aff] bg-[#5b4df5]/20 text-[#e4e1ff]':'border-white/16 bg-white/[.06] text-[#d0d3df] hover:bg-white/[.1]')}>
            <span className="inline-flex items-center gap-2"><Scissors size={14}/>Versión corta</span>
            <span className={'rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[.08em] '+(short?'bg-[#5b4df5] text-white':'bg-white/10 text-[#aeb2c1]')}>{short?'Activo':'Inactivo'}</span>
          </button>
        </div>
      </div>

      <div className="min-w-0 bg-[#151927]">
        <div className="flex flex-col gap-3 border-b border-white/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold"><Sparkles size={13} className="text-[#a99fff]"/>Resultados</div>
            <p className="mt-1 text-[10px] text-[#7f8498]">{view==='fonts'?'Compara la misma base en todas las fuentes.':'Variaciones listas para copiar.'}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-[9px] border border-white/10 bg-white/[.035] p-1">
              <button onClick={()=>setView('mix')} aria-pressed={view==='mix'} className={'inline-flex min-h-9 items-center gap-1.5 rounded-[7px] px-3 text-[10px] font-bold '+(view==='mix'?'bg-[#5b4df5] text-white':'text-[#9da2b5]')}><Layers3 size={11}/>Combinaciones</button>
              <button onClick={()=>setView('fonts')} aria-pressed={view==='fonts'} className={'inline-flex min-h-9 items-center gap-1.5 rounded-[7px] px-3 text-[10px] font-bold '+(view==='fonts'?'bg-[#5b4df5] text-white':'text-[#9da2b5]')}><Type size={11}/>{unicodeStyles.length} fuentes</button>
            </div>
            <button onClick={surprise} className="inline-flex min-h-10 items-center gap-1.5 rounded-[9px] border border-white/10 px-3 text-[10px] font-bold text-[#c4c7d2] hover:bg-white/[.05]"><Shuffle size={11}/>Sorpresa</button>
            <button onClick={copyAll} className="inline-flex min-h-10 items-center gap-1.5 rounded-[9px] border border-white/10 px-3 text-[10px] font-bold text-[#c4c7d2] hover:bg-white/[.05]"><Copy size={11}/>Copiar todo</button>
          </div>
        </div>

        {view==='fonts'&&<div className="flex flex-wrap items-center gap-2 border-b border-white/8 bg-[#121623] px-4 py-3 sm:px-5">
          <span className="gdn-tech mr-1 text-[9px] font-black uppercase tracking-[.1em] text-[#777d91]">Compatibilidad</span>
          {([
            ['all','Todas'],
            ['alta','Alta'],
            ['media','Media'],
            ['experimental','Experimental'],
          ] as const).map(([id,label])=><button
            key={id}
            onClick={()=>{setCompatibility(id);trackProductAction('font-compatibility-'+id,'freefire-tool')}}
            aria-pressed={compatibility===id}
            className={'min-h-9 rounded-full border px-3 text-[10px] font-semibold transition '+(compatibility===id?'border-[#756aff] bg-[#5b4df5] text-white':'border-white/10 bg-white/[.035] text-[#9da2b5] hover:bg-white/[.07]')}
          >{label}</button>)}
          <span className="ml-auto text-[9px] font-semibold text-[#6f7488]">{results.length} estilos</span>
        </div>}

        <div className="grid gap-px bg-white/8 sm:grid-cols-2">
          {results.map((item,index)=>{
            const saved=favorites.includes(item.value);
            return <div key={item.label+'|'+item.value+'|'+index} className="flex min-h-[72px] items-center justify-between gap-3 bg-[#151927] px-4 py-3 transition hover:bg-[#1b2030] sm:px-5">
              <div className="min-w-0">
                <span className="block break-all text-[13px] font-semibold">{item.value}</span>
                {view==='fonts'&&<span className="mt-1 block text-[10px] font-bold uppercase tracking-[.08em] text-[#757a8f]">{item.label} · {item.compatibility}</span>}
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button onClick={()=>toggleFavorite(item.value)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 place-items-center rounded-[9px] border transition sm:size-8 '+(saved?'border-[#8e84ff] bg-[#5b4df5]/20 text-[#c7c2ff]':'border-white/10 text-[#aeb2c1] hover:bg-white/[.05]')}><Heart size={13} fill={saved?'currentColor':'none'}/></button>
                <CopyButton value={item.value} analyticsRole="copy-freefire-name"/>
              </div>
            </div>;
          })}
        </div>

        <div aria-live="polite" className="sr-only">{feedback}</div>

        <p className="border-t border-white/8 px-5 py-4 text-[10px] leading-4 text-[#85899c]">
          Hay {unicodeStyles.length} fuentes Unicode y {nameFrames.length} marcos combinables. La compatibilidad puede variar según el juego, el dispositivo y futuras actualizaciones; prueba el resultado antes de guardarlo.
        </p>
      </div>
    </div>
  </section>
}
