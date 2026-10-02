'use client';

import{useMemo,useState}from'react';
import{ArrowRight,X}from'lucide-react';
import TrackedLink from'./TrackedLink';
import CopyButton from'./CopyButton';
import{EXPERIMENTS}from'@/data/experiments';
import{trackProductAction}from'@/lib/analytics';

export interface AlphabetEntry{
  letter:string;
  href?:string;
  count:number;
  names:string[];
}

export default function AlphabetExplorer({entries}:{entries:AlphabetEntry[]}){
  const[previewLetter,setPreviewLetter]=useState('');
  const active=useMemo(()=>entries.find(entry=>entry.letter===previewLetter),[entries,previewLetter]);

  function togglePreview(letter:string){
    const opening=previewLetter!==letter;
    setPreviewLetter(opening?letter:'');
    if(opening)trackProductAction('preview-letter-'+letter.toLocaleLowerCase('es'),'alphabet-directory');
  }

  return <>
    <div className="grid grid-cols-5 gap-px bg-[#eceaf3] sm:grid-cols-9 md:grid-cols-[repeat(14,minmax(0,1fr))]">
      {entries.map(entry=>{
        if(entry.href)return <TrackedLink
          key={entry.letter}
          href={entry.href}
          aria-label={'Nombres con '+entry.letter+', '+entry.count+' disponibles'}
          placement="alphabet-directory"
          role={'letter-'+entry.letter.toLocaleLowerCase('es')}
          experimentId={EXPERIMENTS.alphabetNav}
          className="group flex aspect-square flex-col items-center justify-center gap-1 bg-white text-[#454758] transition hover:bg-[var(--page-soft)] hover:text-[var(--page-accent)]"
        >
          <span className="flex items-center gap-1 text-[14px] font-bold">{entry.letter}<ArrowRight size={9} className="opacity-0 transition group-hover:opacity-100"/></span>
          <span className="gdn-tech text-[10px] font-semibold text-[#9a9cac]">{entry.count}</span>
        </TrackedLink>;

        return <button
          key={entry.letter}
          type="button"
          onClick={()=>togglePreview(entry.letter)}
          aria-pressed={previewLetter===entry.letter}
          aria-label={'Ver nombres con '+entry.letter+', '+entry.count+' disponibles en este directorio'}
          className={'flex aspect-square flex-col items-center justify-center gap-1 transition '+(previewLetter===entry.letter?'bg-[var(--page-soft)] text-[var(--page-accent)]':'bg-[#faf9ff] text-[#77798a] hover:bg-white hover:text-[var(--page-accent)]')}
        >
          <span className="text-[14px] font-bold">{entry.letter}</span>
          <span className="gdn-tech text-[10px] font-semibold text-[#a0a2b0]">{entry.count}</span>
        </button>;
      })}
    </div>

    {active&&<div className="border-t border-[var(--page-border)] bg-[var(--page-soft)] px-4 py-4 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="gdn-tech text-[9px] font-black uppercase tracking-[.1em] text-[var(--page-accent)]">Vista rápida</p>
          <h3 className="gdn-editorial mt-1 text-[20px] font-bold text-[#303141]">Nombres con {active.letter}</h3>
        </div>
        <button type="button" onClick={()=>setPreviewLetter('')} aria-label="Cerrar vista rápida" className="grid size-9 place-items-center rounded-full border border-[var(--page-border)] bg-white text-[#77798a] hover:text-[var(--page-accent)]"><X size={13}/></button>
      </div>

      {active.names.length>0
        ?<div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {active.names.map(name=><div key={name} className="flex items-center justify-between gap-3 rounded-[11px] border border-[var(--page-border)] bg-white px-3 py-2.5">
            <span className="gdn-editorial min-w-0 truncate text-[14px] font-bold text-[#393a49]">{name}</span>
            <CopyButton value={name} analyticsRole="copy-alphabet-preview"/>
          </div>)}
        </div>
        :<p className="mt-4 text-[11px] leading-5 text-[#777a8b]">La base actual todavía no tiene nombres con esta inicial.</p>
      }
    </div>}
  </>;
}
