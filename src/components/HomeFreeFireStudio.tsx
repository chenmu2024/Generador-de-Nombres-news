'use client';

import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {Check,Copy,Gamepad2,Heart,Sparkles} from 'lucide-react';
import {trackProductAction} from '@/lib/analytics';
import UnicodeStylePicker from './UnicodeStylePicker';
import {
  applyNameFrame,
  applyUnicodeStyle,
  nameFrames,
  unicodeStyleById,
  unicodeStyles,
  type UnicodeStyleId,
} from '@/lib/styledText';

export default function HomeFreeFireStudio(){
  const[seed,setSeed]=useState('Nova');
  const[font,setFont]=useState<UnicodeStyleId>('bold');
  const[frame,setFrame]=useState('insano');
  const[invisible,setInvisible]=useState(true);
  const[shortOnly,setShortOnly]=useState(false);
  const[copied,setCopied]=useState('');
  const[batch,setBatch]=useState(0);
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{
    try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}
  },[]);

  const results=useMemo(()=>{
    const raw=(seed.trim()||'Nova').replace(/\s+/g,'');
    const base=shortOnly?raw.slice(0,6):raw;
    const gap=invisible?'ㅤ':'';
    const suffixPools=[
      ['99','X','7','God','Pro','YT','Z','Max'],
      ['47','FX','8','King','GG','TV','K','One'],
      ['21','RX','9','Boss','Elite','Live','Q','Prime'],
    ];
    const suffixes=suffixPools[batch%suffixPools.length];
    const roots=[base,...suffixes.map(s=>base+s)];
    return Array.from(new Set(roots.map(item=>{
      const spaced=invisible?item.split('').join(gap):item;
      return applyNameFrame(applyUnicodeStyle(spaced,font),frame);
    }))).slice(0,10);
  },[seed,font,frame,invisible,shortOnly,batch]);

  const selectedFont=unicodeStyleById.get(font)??unicodeStyles[0];
  const selectedFrame=nameFrames.find(item=>item.id===frame)??nameFrames[0];

  async function copy(value:string){
    await navigator.clipboard.writeText(value);
    trackProductAction('copy-generated','home-freefire');
    setCopied(value);
    window.setTimeout(()=>setCopied(''),1000);
  }

  function toggleFavorite(value:string){
    const removing=favorites.includes(value);
    const next=removing?favorites.filter(item=>item!==value):[...favorites,value];
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    window.dispatchEvent(new Event('gdn:favorites-updated'));
    trackProductAction(removing?'favorite-remove':'favorite-add','home-freefire');
  }

  return <section className="gdn-studio overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_26px_65px_rgba(27,24,55,.18)]">
    <div className="grid lg:grid-cols-[1.05fr_1.12fr_.67fr]">
      <div className="border-b border-white/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[12px] bg-[#5b4df5] text-white shadow-[0_8px_22px_rgba(91,77,245,.32)]"><Gamepad2 size={19}/></span>
          <div>
            <h2 className="brand-serif text-[23px] font-bold tracking-[-.02em]">Generador de nombres para Free Fire</h2>
            <p className="mt-0.5 text-[12px] text-[#a8adc0]">{unicodeStyles.length} fuentes Unicode · {nameFrames.length} marcos.</p>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[11px] font-semibold text-[#d1d4df]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="h-11 w-full rounded-[9px] border border-white/13 bg-[#181c2a] px-3 text-[13px] outline-none focus:border-[#6d61ff]" placeholder="Nova"/>
        </label>

        <div className="mt-4">
          <UnicodeStylePicker
            value={font}
            onChange={value=>{setFont(value);trackProductAction('font-change','home-freefire')}}
            preview={seed}
            dark
            compact
          />
        </div>

        <label className="mt-4 block">
          <span className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#d1d4df]"><span>Marco</span><span className="text-[9px] font-medium text-[#7f8498]">{nameFrames.length} opciones</span></span>
          <select value={frame} onChange={e=>{setFrame(e.target.value);trackProductAction('frame-change','home-freefire')}} className="h-11 w-full rounded-[9px] border border-white/13 bg-[#181c2a] px-3 text-[11px] text-white outline-none focus:border-[#6d61ff]">
            {nameFrames.map(item=><option key={item.id} value={item.id}>{item.label} · {item.transform('Nova')}</option>)}
          </select>
        </label>

        <div className="mt-4 space-y-1">
          <button role="switch" aria-checked={invisible} onClick={()=>{setInvisible(v=>!v);trackProductAction('toggle-invisible','home-freefire')}} className="flex min-h-11 w-full items-center justify-between py-1 text-[12px] text-[#d7d9e2]">
            <span>Incluir espacios invisibles</span><span className={'relative h-6 w-10 rounded-full transition '+(invisible?'bg-[#5b4df5]':'bg-[#303546]')}><span className={'absolute top-1 size-4 rounded-full bg-white transition '+(invisible?'left-5':'left-1')}/></span>
          </button>
          <button role="switch" aria-checked={shortOnly} onClick={()=>{setShortOnly(v=>!v);trackProductAction('toggle-short','home-freefire')}} className="flex min-h-11 w-full items-center justify-between py-1 text-[12px] text-[#d7d9e2]">
            <span>Solo nombres cortos</span><span className={'relative h-6 w-10 rounded-full transition '+(shortOnly?'bg-[#5b4df5]':'bg-[#303546]')}><span className={'absolute top-1 size-4 rounded-full bg-white transition '+(shortOnly?'left-5':'left-1')}/></span>
          </button>
        </div>

        <button onClick={()=>{setBatch(value=>value+1);trackProductAction('generate-batch','home-freefire')}} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#5b4df5] text-[13px] font-semibold shadow-[0_10px_30px_rgba(91,77,245,.3)] transition hover:bg-[#4f43db]">
          <Sparkles size={15}/> Generar otra tanda
        </button>
      </div>

      <div className="border-b border-white/8 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-4">
          <div><p className="text-[13px] font-semibold">Resultados</p><p className="mt-0.5 text-[10px] text-[#7f8498]">Nombres listos para copiar y guardar.</p></div>
          <span className="rounded-[8px] border border-white/10 bg-white/[.04] px-3 py-2 text-[9px] text-[#aeb2c1]">{selectedFont.label} · {selectedFrame.label}</span>
        </div>
        <div className="divide-y divide-white/7">
          {results.map((value,index)=>{
            const saved=favorites.includes(value);
            return <div key={value} className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-2 px-4 py-2.5 hover:bg-white/[.025]">
              <span className="grid size-6 place-items-center rounded-full bg-white/[.045] text-[10px] text-[#8c91a4]">{index+1}</span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium">{value}</p>
                <div className="mt-1 flex gap-1"><span className="rounded-full bg-[#3e2f71] px-2 py-0.5 text-[9px] text-[#cfc8ff]">{selectedFont.label}</span><span className="rounded-full bg-[#123d3d] px-2 py-0.5 text-[9px] text-[#7fe0cc]">{index%2?'Popular':'Único'}</span></div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} className={'grid size-11 place-items-center rounded-[9px] border transition sm:size-7 sm:rounded-[7px] '+(saved?'border-[#8e84ff] bg-[#5b4df5]/20 text-[#c7c2ff]':'border-white/10 text-[#aeb2c1] hover:bg-white/[.05]')} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'}><Heart size={12} fill={saved?'currentColor':'none'}/></button>
                <button onClick={()=>copy(value)} className="inline-flex h-11 items-center gap-1.5 rounded-[9px] border border-white/10 px-3 text-[11px] text-[#d3d6df] hover:bg-white/[.05] sm:h-7 sm:rounded-[7px] sm:px-2 sm:text-[10px]">
                  {copied===value?<Check size={11}/>:<Copy size={11}/>} {copied===value?'Copiado':'Copiar'}
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>

      <div className="relative min-h-[360px] overflow-hidden">
        <img src="/visuals/hero-gaming.webp" alt="" width="900" height="1200" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center"/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,22,.08),rgba(10,12,22,.86))]"/>
        <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-5">
          <p className="text-[10px] font-black tracking-[.42em] text-white/90">FREE FIRE</p>
          <div>
            <h3 className="brand-serif max-w-[190px] text-[31px] font-bold leading-[1.02]">Nombres únicos para tu estilo</h3>
            <div className="mt-4 space-y-2 text-[11px] text-white/90">{['22 fuentes Unicode','12 marcos','Espacios invisibles','100% gratis'].map(item=><p key={item} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-white/14"><Check size={11}/></span>{item}</p>)}</div>
            <Link href="/nombres-free-fire" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-[9px] bg-[#5b4df5] px-4 py-3 text-[11px] font-semibold text-white">Explorar todas →</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
}
