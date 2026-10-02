import {ArrowDownRight,SearchCheck}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import{getKeywordPlacements}from'@/lib/keywordPlacement';
import{getKeywordAction}from'@/lib/keywordAction';

function displayKeyword(value:string){
  return value.charAt(0).toLocaleUpperCase('es')+value.slice(1);
}



export default function KeywordIntentCoverage({page}:{page:KeywordPage}){
  const placements=getKeywordPlacements(page);
  if(!placements.length)return null;
  return <section id="busquedas" className="mt-10 scroll-mt-24 rounded-[22px] border border-[#e5e2ef] bg-[#fbfaff] p-5 sm:p-6" aria-labelledby={'keyword-intents-'+page.id}>
    <div className="max-w-3xl">
      <p className="gdn-eyebrow">Búsquedas concretas</p>
      <h2 id={'keyword-intents-'+page.id} className="gdn-display mt-2 text-[30px] font-bold tracking-[-.035em] text-[#1d1e2c] sm:text-[34px]">Qué puedes resolver en esta página</h2>
      <p className="mt-3 text-[11px] leading-5 text-[#797c8d]">Elige la búsqueda que más se parezca a lo que necesitas y salta directamente al filtro, resultado o herramienta correspondiente.</p>
    </div>
    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {placements.map(({keyword,description})=>{
        const action=getKeywordAction(page,keyword);
        return <article key={keyword} className="flex min-h-[156px] flex-col rounded-[16px] border border-[#e5e1ef] bg-white p-4 shadow-[0_8px_24px_rgba(55,49,91,.035)]">
        <div className="flex items-start gap-2.5">
          <span className="gdn-theme-chip mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border"><SearchCheck size={13}/></span>
          <div className="min-w-0">
            <h3 className="text-[12px] font-bold leading-5 text-[#373846]">{displayKeyword(keyword)}</h3>
            <p className="mt-1.5 text-[10px] leading-5 text-[#7f8292]">{description}</p>
          </div>
        </div>
        <a href={action.href} className="mt-auto inline-flex min-h-9 items-center gap-1.5 pt-3 text-[10px] font-bold text-[var(--page-accent)] hover:underline">
          {action.label}<ArrowDownRight size={11}/>
        </a>
      </article>})}
    </div>
  </section>
}
