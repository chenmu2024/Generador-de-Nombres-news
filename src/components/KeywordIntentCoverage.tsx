import {ArrowDownRight,SearchCheck}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import{getKeywordPlacements}from'@/lib/keywordPlacement';

function displayKeyword(value:string){
  return value.charAt(0).toLocaleUpperCase('es')+value.slice(1);
}

function targetFor(page:KeywordPage){
  if(page.path==='/')return'#studio-nombres';
  if(page.path==='/nombres-por-letra')return'#herramienta';
  if(['gaming','general','invisible','store','football'].includes(page.tool))return'#herramienta';
  return'#resultados';
}

export default function KeywordIntentCoverage({page}:{page:KeywordPage}){
  const placements=getKeywordPlacements(page);
  if(!placements.length)return null;
  const target=targetFor(page);
  const actionLabel=target==='#resultados'?'Ver resultados':target==='#studio-nombres'?'Probar herramientas':'Abrir herramienta';

  return <section className="mt-10 rounded-[22px] border border-[#e5e2ef] bg-[#fbfaff] p-5 sm:p-6" aria-labelledby={'keyword-intents-'+page.id}>
    <div className="max-w-3xl">
      <p className="gdn-eyebrow">Búsquedas concretas</p>
      <h2 id={'keyword-intents-'+page.id} className="gdn-display mt-2 text-[30px] font-bold tracking-[-.035em] text-[#1d1e2c] sm:text-[34px]">Qué puedes resolver en esta página</h2>
      <p className="mt-3 text-[11px] leading-5 text-[#797c8d]">Usa estas búsquedas como atajos para decidir qué conviene filtrar, comprobar o comparar. No crean páginas duplicadas: te llevan al mismo flujo útil.</p>
    </div>
    <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {placements.map(({keyword,description})=><article key={keyword} className="flex min-h-[156px] flex-col rounded-[16px] border border-[#e5e1ef] bg-white p-4 shadow-[0_8px_24px_rgba(55,49,91,.035)]">
        <div className="flex items-start gap-2.5">
          <span className="gdn-theme-chip mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border"><SearchCheck size={13}/></span>
          <div className="min-w-0">
            <h3 className="text-[12px] font-bold leading-5 text-[#373846]">{displayKeyword(keyword)}</h3>
            <p className="mt-1.5 text-[10px] leading-5 text-[#7f8292]">{description}</p>
          </div>
        </div>
        <a href={target} className="mt-auto inline-flex min-h-9 items-center gap-1.5 pt-3 text-[10px] font-bold text-[var(--page-accent)] hover:underline">
          {actionLabel}<ArrowDownRight size={11}/>
        </a>
      </article>)}
    </div>
  </section>
}
