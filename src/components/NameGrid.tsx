'use client';

import {useEffect,useMemo,useState} from 'react';
import type{NameRecord} from '@/data/nameDataset';
import type{ToolMode} from '@/data/keywordMaster';
import CopyButton from './CopyButton';

const tagLabels:Record<string,string>={
  short:'Corto',modern:'Moderno',classic:'Clásico',cute:'Tierno',small:'Pequeño',
  black:'Negro',mystic:'Místico',strong:'Fuerte',elegant:'Elegante',kawaii:'Kawaii',
  mythology:'Mitológico',anime:'Anime',aesthetic:'Aesthetic',dark:'Dark'
};

export default function NameGrid({items,mode}:{items:NameRecord[];mode:ToolMode}){
  const[query,setQuery]=useState('');
  const[gender,setGender]=useState<'ALL'|'F'|'M'|'U'>('ALL');
  const[activeTag,setActiveTag]=useState('');
  const[favorites,setFavorites]=useState<string[]>([]);

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
    return Object.keys(tagLabels).filter(tag=>all.has(tag)).slice(0,6);
  },[items]);

  const filtered=useMemo(()=>items.filter(item=>{
    const haystack=[item.name,item.origin,item.meaning,...item.tags].filter(Boolean).join(' ').toLocaleLowerCase('es');
    const matchesText=!query||haystack.includes(query.toLocaleLowerCase('es'));
    const matchesGender=gender==='ALL'||item.gender===gender;
    const matchesTag=!activeTag||item.tags.includes(activeTag);
    return matchesText&&matchesGender&&matchesTag;
  }),[items,query,gender,activeTag]);

  if(!items.length)return null;
  const showGender=items.some(item=>item.gender);

  return <section className="mt-12">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="gdn-eyebrow">{mode==='pet'?'Encuentra el que encaja':mode==='culture'?'Explora y compara':'Explora nombres'}</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Ideas para empezar</h2>
      </div>
      <span className="text-xs font-semibold text-[#888b94]">{filtered.length} resultados</span>
    </div>

    <div className="mt-5 rounded-2xl border border-[#e3e4e9] bg-white p-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={query} onChange={e=>setQuery(e.target.value)} className="gdn-input h-11 flex-1 rounded-xl px-3 text-sm" placeholder={mode==='pet'?'Filtra por nombre, color o estilo...':'Filtra por nombre, origen o estilo...'}/>
        {showGender&&<div className="flex gap-2 overflow-x-auto">
          {([['ALL','Todos'],['F','Femenino'],['M','Masculino'],['U','Unisex']] as const).map(([value,label])=><button key={value} onClick={()=>setGender(value)} className={'gdn-chip whitespace-nowrap rounded-xl px-3 py-2 text-xs font-extrabold '+(gender===value?'border-[#8f79ff] bg-[#f0edff] text-[#4f35c9]':'')}>{label}</button>)}
        </div>}
      </div>

      {availableTags.length>0&&<div className="mt-3 flex flex-wrap gap-2 border-t border-[#f0f0f3] pt-3">
        <button onClick={()=>setActiveTag('')} className={'gdn-chip rounded-full px-3 py-1.5 text-xs font-extrabold '+(!activeTag?'border-[#8f79ff] bg-[#f0edff] text-[#4f35c9]':'')}>Todos los estilos</button>
        {availableTags.map(tag=><button key={tag} onClick={()=>setActiveTag(tag)} className={'gdn-chip rounded-full px-3 py-1.5 text-xs font-extrabold '+(activeTag===tag?'border-[#8f79ff] bg-[#f0edff] text-[#4f35c9]':'')}>{tagLabels[tag]}</button>)}
      </div>}
    </div>

    {filtered.length===0&&<div className="mt-4 rounded-2xl border border-dashed border-[#d8d9df] bg-white/60 p-8 text-center text-sm text-[#777b85]">No encontramos resultados con esos filtros. Prueba otra combinación.</div>}

    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.slice(0,18).map(item=>{
        const meta=[item.origin,item.gender==='F'?'Femenino':item.gender==='M'?'Masculino':item.gender==='U'?'Unisex':undefined].filter(Boolean).join(' · ');
        return <article key={item.name+(item.origin??'')} className="gdn-card rounded-2xl p-5 transition hover:-translate-y-0.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black tracking-[-.01em] text-[#202128]">{item.script?(item.name+' · '+item.script):item.name}</h3>
              {meta&&<p className="mt-1 text-xs font-semibold text-[#858994]">{meta}</p>}
            </div>
            <button onClick={()=>toggle(item.name)} aria-label={favorites.includes(item.name)?'Quitar de favoritos':'Guardar en favoritos'} className="grid size-9 place-items-center rounded-xl border border-[#e1e2e7] bg-white text-lg transition hover:bg-[#f5f2ff]">{favorites.includes(item.name)?'♥':'♡'}</button>
          </div>
          <div className="mt-5 min-h-10 text-sm leading-6 text-[#686d78]">
            {item.meaning&&<p><span className="font-bold text-[#353842]">Significado:</span> {item.meaning}</p>}
            {item.pronunciation&&<p><span className="font-bold text-[#353842]">Pronunciación:</span> {item.pronunciation}</p>}
            {!item.meaning&&!item.pronunciation&&<p>{item.tags.slice(0,3).map(tag=>tagLabels[tag]||tag.replace(/-/g,' ')).join(' · ')}</p>}
          </div>
          <div className="mt-4"><CopyButton value={item.name}/></div>
        </article>
      })}
    </div>
  </section>
}
