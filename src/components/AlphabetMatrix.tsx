'use client';

import{useMemo,useState}from'react';
import TrackedLink from './TrackedLink';
import CopyButton from './CopyButton';
import{EXPERIMENTS}from'@/data/experiments';
import {ArrowRight,X} from 'lucide-react';
import {getNamesForPath,nameDataset} from '@/data/nameDataset';

const routes:Record<string,string>={A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const counts=new Map(Object.values(routes).map(path=>[path,getNamesForPath(path).length] as const));

function normalizeInitial(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').charAt(0).toUpperCase();
}

export default function AlphabetMatrix(){
  const[previewLetter,setPreviewLetter]=useState('');

  const previewNames=useMemo(()=>{
    if(!previewLetter)return[];
    if(previewLetter==='Ñ'){
      return nameDataset.filter(item=>item.type==='person'&&item.tags.includes('enye')).map(item=>item.name).slice(0,18);
    }
    return nameDataset
      .filter(item=>item.type==='person'&&normalizeInitial(item.name)===previewLetter)
      .map(item=>item.name)
      .slice(0,18);
  },[previewLetter]);

  const liveCounts=useMemo(()=>{
    const map=new Map<string,number>();
    for(const letter of letters){
      const count=letter==='Ñ'
        ?nameDataset.filter(item=>item.type==='person'&&item.tags.includes('enye')).length
        :nameDataset.filter(item=>item.type==='person'&&normalizeInitial(item.name)===letter).length;
      map.set(letter,count);
    }
    return map;
  },[]);

  return <section className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_10px_28px_rgba(55,49,91,.045)]">
    <div className="border-b border-[#eceaf3] bg-[#faf9ff] px-5 py-5 sm:px-6">
      <p className="gdn-eyebrow">Directorio A–Z</p>
      <h2 className="gdn-display mt-1 text-[28px] font-bold text-[#292a39]">Explora por inicial</h2>
      <p className="mt-2 max-w-2xl text-[11px] leading-5 text-[#858899]">Las letras con demanda validada tienen página propia. Las demás también se pueden explorar aquí sin crear páginas SEO innecesarias.</p>
    </div>

    <div className="grid grid-cols-5 gap-px bg-[#eceaf3] sm:grid-cols-9 md:grid-cols-[repeat(14,minmax(0,1fr))]">
      {letters.map(letter=>{
        const href=routes[letter];
        const count=href?(counts.get(href)??0):(liveCounts.get(letter)??0);

        if(href)return <TrackedLink
          key={letter}
          href={href}
          aria-label={'Nombres con '+letter+', '+count+' disponibles'}
          placement="alphabet-directory"
          role={'letter-'+letter.toLocaleLowerCase('es')}
          experimentId={EXPERIMENTS.alphabetNav}
          className="group flex aspect-square flex-col items-center justify-center gap-1 bg-white text-[#454758] transition hover:bg-[var(--page-soft)] hover:text-[var(--page-accent)]"
        >
          <span className="flex items-center gap-1 text-[14px] font-bold">{letter}<ArrowRight size={9} className="opacity-0 transition group-hover:opacity-100"/></span>
          <span className="gdn-tech text-[10px] font-semibold text-[#9a9cac]">{count}</span>
        </TrackedLink>;

        return <button
          key={letter}
          type="button"
          onClick={()=>setPreviewLetter(current=>current===letter?'':letter)}
          aria-pressed={previewLetter===letter}
          aria-label={'Ver nombres con '+letter+', '+count+' disponibles en este directorio'}
          className={'flex aspect-square flex-col items-center justify-center gap-1 transition '+(previewLetter===letter?'bg-[var(--page-soft)] text-[var(--page-accent)]':'bg-[#faf9ff] text-[#77798a] hover:bg-white hover:text-[var(--page-accent)]')}
        >
          <span className="text-[14px] font-bold">{letter}</span>
          <span className="gdn-tech text-[10px] font-semibold text-[#a0a2b0]">{count}</span>
        </button>;
      })}
    </div>

    {previewLetter&&<div className="border-t border-[var(--page-border)] bg-[var(--page-soft)] px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="gdn-tech text-[9px] font-black uppercase tracking-[.1em] text-[var(--page-accent)]">Vista rápida</p>
          <h3 className="gdn-editorial mt-1 text-[20px] font-bold text-[#303141]">Nombres con {previewLetter}</h3>
        </div>
        <button type="button" onClick={()=>setPreviewLetter('')} aria-label="Cerrar vista rápida" className="grid size-9 place-items-center rounded-full border border-[var(--page-border)] bg-white text-[#77798a] hover:text-[var(--page-accent)]"><X size={13}/></button>
      </div>

      {previewNames.length>0
        ?<div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {previewNames.map(name=><div key={name} className="flex items-center justify-between gap-3 rounded-[11px] border border-[var(--page-border)] bg-white px-3 py-2.5">
            <span className="gdn-editorial min-w-0 truncate text-[14px] font-bold text-[#393a49]">{name}</span>
            <CopyButton value={name} analyticsRole="copy-alphabet-preview"/>
          </div>)}
        </div>
        :<p className="mt-4 text-[11px] leading-5 text-[#777a8b]">La base actual todavía no tiene nombres con esta inicial. La letra sigue disponible en el directorio sin crear una página vacía.</p>
      }
    </div>}
  </section>
}
