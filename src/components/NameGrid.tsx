'use client';

import {useEffect,useMemo,useState} from 'react';
import {Heart,Search} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';
import type{ToolMode} from '@/data/keywordMaster';
import CopyButton from './CopyButton';

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

  useEffect(()=>{
    try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}
  },[]);

  function toggle(name:string){
    const next=favorites.includes(name)?favorites.filter(x=>x!==name):[...favorites,name];
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
  }

  const availableTags=useMemo(()=>{
    const all=new Set(items.flatMap(item=>item.tags));
    return Object.keys(tagLabels).filter(tag=>all.has(tag)).slice(0,7);
  },[items]);

  useEffect(()=>{setLimit(18)},[query,gender,activeTag]);

  const inferredGender=(item:NameRecord):'F'|'M'|'U'|undefined=>item.gender??(item.tags.includes('female')?'F':item.tags.includes('male')?'M':item.tags.includes('unisex')?'U':undefined);

  const filtered=useMemo(()=>items.filter(item=>{
    const haystack=[item.name,item.origin,item.meaning,...item.tags].filter(Boolean).join(' ').toLocaleLowerCase('es');
    return (!query||haystack.includes(query.toLocaleLowerCase('es')))
      &&(gender==='ALL'||inferredGender(item)===gender)
      &&(!activeTag||item.tags.includes(activeTag));
  }),[items,query,gender,activeTag]);

  if(!items.length)return null;
  const showGender=items.some(item=>inferredGender(item));

  return <section className="mt-12">
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <p className="gdn-eyebrow">{mode==='pet'?'Explora por rasgos':mode==='culture'?'Explora y compara':'Explora nombres'}</p>
        <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-.03em] text-[#1d1f24]">Resultados</h2>
      </div>
      <span className="text-[12px] font-medium text-[#8b8f98]">{filtered.length} disponibles</span>
    </div>

    <div className="rounded-[14px] border border-[#dfe1e6] bg-white">
      <div className="border-b border-[#eceef1] p-3">
        <div className="flex flex-col gap-2.5 lg:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999da6]"/>
            <input
              value={query}
              onChange={e=>setQuery(e.target.value)}
              className="gdn-input h-10 rounded-[9px] pl-9 pr-3 text-[12px]"
              placeholder={mode==='pet'?'Buscar por nombre, color o estilo...':'Buscar por nombre, origen o estilo...'}
            />
          </label>

          {showGender&&<div className="flex gap-1.5 overflow-x-auto">
            {([['ALL','Todos'],['F','Femenino'],['M','Masculino'],['U','Unisex']] as const).map(([value,label])=><button
              key={value}
              onClick={()=>setGender(value)}
              data-active={gender===value}
              className="gdn-chip h-10 whitespace-nowrap rounded-[9px] px-3 text-[11px] font-medium"
            >{label}</button>)}
          </div>}
        </div>

        {availableTags.length>0&&<div className="mt-2.5 flex flex-wrap gap-1.5">
          <button onClick={()=>setActiveTag('')} data-active={!activeTag} className="gdn-chip rounded-full px-2.5 py-1.5 text-[11px] font-medium">Todos</button>
          {availableTags.map(tag=><button key={tag} onClick={()=>setActiveTag(tag)} data-active={activeTag===tag} className="gdn-chip rounded-full px-2.5 py-1.5 text-[11px] font-medium">{tagLabels[tag]}</button>)}
        </div>}
      </div>

      {filtered.length===0
        ?<div className="px-5 py-12 text-center text-[13px] text-[#7c808a]">No encontramos resultados con esos filtros.</div>
        :<div className="grid gap-px bg-[#eceef1] sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0,limit).map(item=>{
            const itemGender=inferredGender(item);
            const meta=[item.origin,itemGender==='F'?'Femenino':itemGender==='M'?'Masculino':itemGender==='U'?'Unisex':undefined].filter(Boolean).join(' · ');
            const saved=favorites.includes(item.name);
            return <article key={item.name+(item.origin??'')} className="bg-white p-4 transition hover:bg-[#fcfcfd]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-[16px] font-semibold tracking-[-.02em] text-[#202126]">{item.script?(item.name+' · '+item.script):item.name}</h3>
                  {meta&&<p className="mt-1 text-[11px] font-medium text-[#8a8e97]">{meta}</p>}
                </div>
                <button
                  onClick={()=>toggle(item.name)}
                  aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'}
                  className={'grid size-8 shrink-0 place-items-center rounded-[8px] border transition '+(saved?'border-[#d8d3ff] bg-[#eeecff] text-[#5549d7]':'border-[#e1e3e7] bg-white text-[#8b8f98] hover:bg-[#f5f5f7]')}
                >
                  <Heart size={14} fill={saved?'currentColor':'none'}/>
                </button>
              </div>

              <div className="mt-3 min-h-10 text-[12px] leading-5 text-[#686c76]">
                {item.meaning&&<p><span className="font-medium text-[#3e4148]">Significado:</span> {item.meaning}</p>}
                {item.pronunciation&&<p><span className="font-medium text-[#3e4148]">Pronunciación:</span> {item.pronunciation}</p>}
                {!item.meaning&&!item.pronunciation&&<p>{item.tags.filter(tag=>tag!=='enye').slice(0,3).map(tag=>tagLabels[tag]||tag.replace(/-/g,' ')).join(' · ')}</p>}
                {item.source&&<p className="mt-1.5 text-[11px] text-[#92969f]">Fuente: {item.sourceUrl?<a className="font-medium text-[#5549d7] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>:item.source}{item.verified===false?' · pendiente de revisión':''}</p>}
              </div>

              <div className="mt-3"><CopyButton value={item.name}/></div>
            </article>
          })}
        </div>
      }

      {filtered.length>limit&&<div className="border-t border-[#eceef1] p-3 text-center">
        <button onClick={()=>setLimit(value=>value+18)} className="rounded-[9px] border border-[#dfe1e6] bg-white px-4 py-2 text-[12px] font-medium text-[#525660] transition hover:bg-[#f6f6f8]">Mostrar más</button>
      </div>}
    </div>
  </section>
}
