import {SearchCheck}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import{getKeywordPlacements}from'@/lib/keywordPlacement';

function displayKeyword(value:string){
  return value.charAt(0).toLocaleUpperCase('es')+value.slice(1);
}

export default function KeywordIntentCoverage({page}:{page:KeywordPage}){
  const placements=getKeywordPlacements(page);
  if(!placements.length)return null;

  return <section className="mt-10 rounded-[22px] border border-[#e5e2ef] bg-[#fbfaff] p-5 sm:p-6" aria-labelledby={'keyword-intents-'+page.id}>
    <div className="max-w-3xl">
      <p className="gdn-eyebrow">Explora con más precisión</p>
      <h2 id={'keyword-intents-'+page.id} className="gdn-display mt-2 text-[30px] font-bold tracking-[-.035em] text-[#1d1e2c] sm:text-[34px]">Búsquedas específicas dentro de esta página</h2>
      <p className="mt-3 text-[11px] leading-5 text-[#797c8d]">Cada búsqueda cambia qué conviene filtrar, comprobar o comparar. Estas rutas de exploración están integradas en la misma herramienta para evitar páginas duplicadas con poco valor.</p>
    </div>
    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {placements.map(({keyword,description})=><article key={keyword} className="rounded-[16px] border border-[#e5e1ef] bg-white p-4 shadow-[0_8px_24px_rgba(55,49,91,.035)]">
        <div className="flex items-start gap-2.5">
          <span className="gdn-theme-chip mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border"><SearchCheck size={13}/></span>
          <div className="min-w-0">
            <h3 className="text-[12px] font-bold leading-5 text-[#373846]">{displayKeyword(keyword)}</h3>
            <p className="mt-1.5 text-[10px] leading-5 text-[#7f8292]">{description}</p>
          </div>
        </div>
      </article>)}
    </div>
  </section>
}
