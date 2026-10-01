'use client';

import {useEffect,useMemo,useState} from 'react';
import {Heart,Search} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';
import type{ToolMode} from '@/data/keywordMaster';
import CopyButton from './CopyButton';

const internalTags=new Set(['cat','dog','pet','horse','plush','gaming','freefire','roblox','instagram','female','male','unisex','enye','clan']);
const tagLabels:Record<string,string>={
  short:'Corto',modern:'Moderno',classic:'Clásico',cute:'Tierno',small:'Pequeño',
  black:'Negro',mystic:'Místico',strong:'Fuerte',elegant:'Elegante',kawaii:'Kawaii',
  mythology:'Mitológico',anime:'Anime',aesthetic:'Aesthetic',dark:'Dark',rare:'Poco común',
  orange:'Naranja',white:'Blanco',gray:'Gris',brown:'Marrón',playful:'Juguetón',calm:'Tranquilo',large:'Grande'
};

export default function NameGrid({items,mode}:{items:NameRecord[];mode:ToolMode}){
  const[query,setQuery]=useState('');
  const[gender,setGender]=useState<'ALL'|'F'|'M'|'U'>('ALL');
  const[activeTag,setActiveTag]=useState('');
  const[favorites,setFavorites]=useState<string[]>([]);
  const[limit,setLimit]=useState(18);

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);
  function toggle(name:string){const next=favorites.includes(name)?favorites.filter(x=>x!==name):[...favorites,name];setFavorites(next);localStorage.setItem('gdn-favorites',JSON.stringify(next))}
  const availableTags=useMemo(()=>{const all=new Set(items.flatMap(item=>item.tags));return Object.keys(tagLabels).filter(tag=>all.has(tag)).slice(0,7)},[items]);
  useEffect(()=>{setLimit(18)},[query,gender,activeTag]);
  const inferredGender=(item:NameRecord):'F'|'M'|'U'|undefined=>item.gender??(item.tags.includes('female')?'F':item.tags.includes('male')?'M':item.tags.includes('unisex')?'U':undefined);
  const filtered=useMemo(()=>items.filter(item=>{
    const haystack=[item.name,item.origin,item.meaning,...item.tags].filter(Boolean).join(' ').toLocaleLowerCase('es');
    return(!query||haystack.includes(query.toLocaleLowerCase('es')))&&(gender==='ALL'||inferredGender(item)===gender)&&(!activeTag||item.tags.includes(activeTag));
  }),[items,query,gender,activeTag]);

  if(!items.length)return null;
  const showGender=items.some(item=>inferredGender(item));

  return <section className="mt-10 md:mt-12">
    <div className="mb-5 flex items-end justify-between gap-4">
      <div><p className="gdn-eyebrow">{mode==='pet'?'Explora por rasgos':mode==='culture'?'Explora y compara':'Explora nombres'}</p><h2 className="brand-serif mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">Resultados</h2></div>
      <span className="text-[11px] font-semibold text-[#9294a4]">{filtered.length} disponibles</span>
    </div>

    <div className="overflow-hidden rounded-[20px] border border-[#e3e0ec] bg-white shadow-[0_12px_34px_rgba(55,49,91,.05)]">
      <div className="border-b border-[#eceaf3] bg-[#faf9ff] p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative min-w-0 flex-1"><Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9698a8]"/><input value={query} onChange={e=>setQuery(e.target.value)} className="gdn-input h-11 rounded-[11px] pl-10 pr-4 text-[12px]" placeholder={mode==='pet'?'Buscar por nombre, color o estilo...':'Buscar por nombre, origen o estilo...'}/></label>
          {showGender&&<div className="flex gap-2 overflow-x-auto">
            {([['ALL','Todos'],['F','Femenino'],['M','Masculino'],['U','Unisex']] as const).map(([value,label])=><button key={value} onClick={()=>setGender(value)} data-active={gender===value} className="gdn-chip h-11 whitespace-nowrap rounded-full px-4 text-[12px] font-semibold sm:text-[10px]">{label}</button>)}
          </div>}
        </div>
        {availableTags.length>0&&<div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"><button onClick={()=>setActiveTag('')} data-active={!activeTag} className="gdn-chip min-h-11 shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold sm:min-h-0 sm:px-3 sm:text-[10px]">Todos</button>{availableTags.map(tag=><button key={tag} onClick={()=>setActiveTag(tag)} data-active={activeTag===tag} className="gdn-chip min-h-11 shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold sm:min-h-0 sm:px-3 sm:text-[10px]">{tagLabels[tag]}</button>)}</div>}
      </div>

      {filtered.length===0
        ?<div className="px-6 py-14 text-center text-[13px] text-[#7d8091]">No encontramos resultados con esos filtros.</div>
        :<div className="grid gap-px bg-[#eceaf3] md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0,limit).map(item=>{
            const itemGender=inferredGender(item);
            const meta=[item.origin,itemGender==='F'?'Femenino':itemGender==='M'?'Masculino':itemGender==='U'?'Unisex':undefined].filter(Boolean).join(' · ');
            const saved=favorites.includes(item.name);
            return <article key={item.name+(item.origin??'')} className="min-h-[186px] bg-white p-5 transition hover:bg-[#fcfbff]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><h3 className="brand-serif truncate text-[23px] font-bold tracking-[-.025em] text-[#252634]">{item.script?(item.name+' · '+item.script):item.name}</h3>{meta&&<p className="mt-1 text-[11px] font-bold uppercase sm:text-[9px] tracking-[.08em] text-[#9294a4]">{meta}</p>}</div>
                <button onClick={()=>toggle(item.name)} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 shrink-0 place-items-center rounded-full sm:size-9 border transition '+(saved?'border-[#cfc8fb] bg-[#f0edff] text-[#5b4df5]':'border-[#e1ddea] bg-white text-[#8f91a0] hover:border-[#cfc8fb] hover:bg-[#f7f5ff]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
              </div>
              <div className="mt-4 min-h-12 text-[12px] leading-5 text-[#747788]">
                {item.meaning&&<p><strong className="text-[#444655]">Significado:</strong> {item.meaning}</p>}
                {item.pronunciation&&<p><strong className="text-[#444655]">Pronunciación:</strong> {item.pronunciation}</p>}
                {!item.meaning&&!item.pronunciation&&<p>{item.tags.filter(tag=>!internalTags.has(tag)).slice(0,3).map(tag=>tagLabels[tag]||tag.replace(/-/g,' ')).join(' · ')}</p>}
                {item.source&&<p className="mt-2 text-[11px] text-[#9698a6] sm:text-[10px]">Fuente: {item.sourceUrl?<a className="font-semibold text-[#5b4df5] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>:item.source}{item.verified===false?' · pendiente de revisión':''}</p>}
              </div>
              <div className="mt-4"><CopyButton value={item.name}/></div>
            </article>
          })}
        </div>
      }

      {filtered.length>limit&&<div className="border-t border-[#eceaf3] bg-[#faf9ff] p-4 text-center"><button onClick={()=>setLimit(v=>v+18)} className="min-h-11 rounded-[10px] border border-[#dedaf0] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#5f6273] hover:border-[#cfc8fb] hover:text-[#5146d6]">Mostrar más</button></div>}
    </div>
  </section>
}
