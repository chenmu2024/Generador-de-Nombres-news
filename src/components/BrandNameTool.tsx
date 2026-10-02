'use client';

import {useEffect,useMemo,useState} from 'react';
import {ClipboardCopy,Heart,RefreshCw,Store} from 'lucide-react';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';
import{copyText}from'@/lib/clipboard';
import{readFavorites,toggleFavorite as toggleStoredFavorite}from'@/lib/favorites';
import{
  brandChannels as channels,
  brandIndustries as industries,
  brandLanguages as languages,
  brandStyles as styles,
  generateBrandNames,
}from'@/lib/brandGenerator';

export default function BrandNameTool(){export default function BrandNameTool(){
  const[seed,setSeed]=useState('Luna');
  const[style,setStyle]=useState<(typeof styles)[number]>('Premium');
  const[industry,setIndustry]=useState<(typeof industries)[number]>('General');
  const[channel,setChannel]=useState<(typeof channels)[number]>('Tienda online');
  const[language,setLanguage]=useState<(typeof languages)[number]>('Español');
  const[batch,setBatch]=useState(0);
  const[favorites,setFavorites]=useState<string[]>([]);
  const[feedback,setFeedback]=useState('');

  useEffect(()=>{setFavorites(readFavorites())},[]);

  const results=useMemo(()=>generateBrandNames({
    seed,style,industry,channel,language,batch,
  }),[seed,style,industry,channel,language,batch]);

  function toggleFavorite(name:string){
    const{items:next,removed}=toggleStoredFavorite(name,favorites);
    setFavorites(next);
    trackProductAction(removed?'favorite-remove':'favorite-add','brand-tool');
  }

  async function copyAll(){
    const ok=await copyText(results.map(item=>item.name).join('\n'));
    if(!ok)return;
    setFeedback(results.length+' nombres copiados');
    trackProductAction('copy-all-brands','brand-tool');
    window.setTimeout(()=>setFeedback(''),1400);
  }

  function nextBatch(){
    setBatch(value=>value+1);
    trackProductAction('generate-batch','brand-tool');
  }

  return <section className="overflow-hidden rounded-[22px] border border-[var(--page-border)] bg-white shadow-[0_14px_38px_rgba(55,49,91,.06)]">
    <div className="flex flex-col gap-4 border-b border-[#e2eee7] bg-[#f5fbf7] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-[12px] bg-[#27885d] text-white shadow-[0_8px_20px_rgba(39,136,93,.2)]"><Store size={16}/></span>
        <div><p className="gdn-tech text-[10px] font-bold uppercase tracking-[.14em] text-[#27885d]">Branding tool</p><h2 className="gdn-editorial text-[25px] font-bold text-[#26342d] sm:text-[27px]">Crea nombres según sector, canal y tono</h2></div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={nextBatch} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-3 text-[10px] font-semibold text-[#626576]"><RefreshCw size={12}/>Otra tanda</button>
        <button onClick={copyAll} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-3 text-[10px] font-semibold text-[#626576]"><ClipboardCopy size={12}/>Copiar todos</button>
      </div>
    </div>

    <div className="grid gap-3 border-b border-[#e2eee7] bg-[#f7fcf9] p-5 sm:grid-cols-2 lg:grid-cols-5">
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]" placeholder="Luna, café, moda..."/></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Sector · {industries.length}</span><select value={industry} onChange={e=>{setIndustry(e.target.value as (typeof industries)[number]);setBatch(0)}} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Canal</span><select value={channel} onChange={e=>setChannel(e.target.value as (typeof channels)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{channels.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Estilo · {styles.length}</span><select value={style} onChange={e=>{setStyle(e.target.value as (typeof styles)[number]);setBatch(0)}} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{styles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Idioma</span><select value={language} onChange={e=>setLanguage(e.target.value as (typeof languages)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{languages.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>

    <div className="flex items-center justify-between border-b border-[#eceaf3] bg-white px-5 py-3">
      <span className="gdn-tech text-[10px] font-bold uppercase tracking-[.1em] text-[#728278]">{results.length} propuestas</span>
      <span aria-live="polite" className="text-[10px] font-semibold text-[#27885d]">{feedback}</span>
    </div>

    <div className="grid gap-px bg-[#eceaf3] md:grid-cols-2">
      {results.map(item=>{
        const saved=favorites.includes(item.name);
        return <article key={item.name} className="min-h-[148px] bg-white p-5 transition hover:bg-[#fcfbff]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0"><h3 className="gdn-editorial break-words text-[24px] font-bold leading-tight text-[#26342d]">{item.name}</h3><p className="mt-1 text-[10px] font-semibold text-[#9395a4]">{item.pattern} · {industry} · {style}</p></div>
            <button onClick={()=>toggleFavorite(item.name)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 place-items-center rounded-full border transition sm:size-9 '+(saved?'border-[var(--page-border)] bg-[var(--page-soft)] text-[var(--page-accent)]':'border-[#e0ddea] bg-white text-[#8c8e9d] hover:border-[var(--page-border)] hover:bg-[var(--page-soft)]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
          </div>
          <div className="mt-4 grid gap-2 min-[380px]:grid-cols-3">
            <div className="rounded-[10px] border border-[#e2eee7] bg-[#f7fcf9] px-2.5 py-2">
              <span className="gdn-tech block text-[8px] font-bold uppercase tracking-[.08em] text-[#8a958e]">Longitud</span>
              <span className="mt-1 block text-[10px] font-semibold text-[#4f6256]">{item.chars} caracteres</span>
            </div>
            <div className="rounded-[10px] border border-[#e2eee7] bg-[#f7fcf9] px-2.5 py-2">
              <span className="gdn-tech block text-[8px] font-bold uppercase tracking-[.08em] text-[#8a958e]">Estructura</span>
              <span className="mt-1 block text-[10px] font-semibold text-[#4f6256]">{item.words} {item.words===1?'palabra':'palabras'}</span>
            </div>
            <div className="min-w-0 rounded-[10px] border border-[#e2eee7] bg-[#f7fcf9] px-2.5 py-2">
              <span className="gdn-tech block text-[8px] font-bold uppercase tracking-[.08em] text-[#8a958e]">Handle</span>
              <span className="mt-1 block truncate text-[10px] font-semibold text-[#4f6256]">@{item.handle}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2"><CopyButton value={item.name} analyticsRole="copy-brand-name"/><CopyButton value={'@'+item.handle} label="Copiar handle" analyticsRole="copy-brand-handle"/></div>
        </article>;
      })}
    </div>
    <p className="border-t border-[#eceaf3] bg-[#faf9ff] px-5 py-4 text-[10px] leading-4 text-[#9092a1]">Los handles son simulaciones locales. Comprueba marcas, dominio y perfiles sociales antes de usar un nombre comercial.</p>
  </section>
}
