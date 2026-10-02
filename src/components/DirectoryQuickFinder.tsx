'use client';

import{useMemo,useState}from'react';
import{ArrowRight,Search}from'lucide-react';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';

type DirectoryPageItem={
  label:string;
  description:string;
  href:string;
  cluster:string;
};

function normalize(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
}

export default function DirectoryQuickFinder({pages}:{pages:DirectoryPageItem[]}){
  const[q,setQ]=useState('');
  const normalized=normalize(q);
  const matches=useMemo(()=>{
    if(normalized.length<2)return[];
    const tokens=normalized.split(' ').filter(Boolean);
    return pages
      .map(page=>{
        const haystack=normalize(page.label+' '+page.description+' '+page.cluster);
        const full=haystack.includes(normalized);
        const matched=tokens.filter(token=>haystack.includes(token)).length;
        return{page,score:full?100:matched*20};
      })
      .filter(entry=>entry.score>0)
      .sort((a,b)=>b.score-a.score||a.page.label.localeCompare(b.page.label,'es'))
      .slice(0,12)
      .map(entry=>entry.page);
  },[normalized,pages]);

  const quick=['Free Fire','niña','gatos','japoneses','letra A','tiendas'];

  return <section className="gdn-shell py-5 sm:py-7">
    <div className="rounded-[22px] border border-[#e2deee] bg-white p-4 shadow-[0_10px_28px_rgba(55,49,91,.045)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="gdn-eyebrow">Encuentra una página</p>
          <h2 className="gdn-display mt-1.5 text-[25px] font-bold tracking-[-.03em] text-[#242532]">Busca dentro de las {pages.length} páginas</h2>
        </div>
        <label className="flex w-full items-center gap-2 rounded-full border border-[#ddd9e8] bg-[#fbfaff] px-4 py-3 lg:max-w-[440px]">
          <Search size={15} className="shrink-0 text-[#777b91]"/>
          <input
            value={q}
            onChange={event=>setQ(event.target.value)}
            className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#333544] outline-none placeholder:text-[#9a9cab]"
            placeholder="Ej. Free Fire, gatos, japonesa, letra A…"
            aria-label="Buscar en el directorio"
          />
          {normalized.length>=2&&<span className="shrink-0 text-[9px] font-bold text-[#8a8c9c]">{matches.length}</span>}
        </label>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {quick.map(term=><button key={term} type="button" onClick={()=>setQ(term)} className="rounded-full border border-[#e6e2ef] bg-[#faf9fd] px-2.5 py-1.5 text-[9px] font-semibold text-[#696c7d] transition hover:border-[#cec7ef] hover:bg-[#f3f0ff]">{term}</button>)}
      </div>

      {normalized.length>=2&&<div className="mt-4 border-t border-[#eeebf3] pt-4">
        {matches.length===0
          ?<p className="rounded-[13px] bg-[#faf9fd] px-4 py-3 text-[10px] leading-5 text-[#858899]">No hay una coincidencia directa. Prueba una categoría más amplia o revisa el directorio completo que aparece debajo.</p>
          :<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((page,index)=><TrackedLink
              key={page.href}
              href={page.href}
              placement="directory-search"
              role={'match-'+(index+1)}
              experimentId={EXPERIMENTS.nav}
              className="group flex min-h-[68px] items-center justify-between gap-3 rounded-[13px] border border-[#e5e1ed] bg-[#fcfbff] px-3.5 py-3 transition hover:border-[#cec7ef] hover:bg-[#f5f2ff]"
            >
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-bold text-[#373846] group-hover:text-[#5b4df5]">{page.label}</span>
                <span className="mt-1 block truncate text-[9px] text-[#9294a4]">{page.cluster}</span>
              </span>
              <ArrowRight size={13} className="shrink-0 text-[#a09cad] transition group-hover:translate-x-0.5 group-hover:text-[#5b4df5]"/>
            </TrackedLink>)}
          </div>}
      </div>}
    </div>
  </section>;
}
