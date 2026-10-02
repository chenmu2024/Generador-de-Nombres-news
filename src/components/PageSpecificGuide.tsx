import{CheckCircle2}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import type{NameRecord}from'@/data/nameDataset';
import{getPageBlueprint}from'@/data/pageBlueprints';

export default function PageSpecificGuide({page,items}:{page:KeywordPage;items:NameRecord[]}){
  const blueprint=getPageBlueprint(page.path);
  if(!blueprint)return null;
  const verified=items.filter(item=>item.verified===true&&item.source&&item.sourceUrl).length;
  const short=items.filter(item=>Array.from(item.name.replace(/[^\p{L}]/gu,'')).length<=4).length;
  const sampleIndexes=items.length<=4
    ?items.map((_,index)=>index)
    :[0,Math.floor((items.length-1)/3),Math.floor((items.length-1)*2/3),items.length-1];
  const examples=Array.from(new Set(sampleIndexes)).map(index=>items[index]).filter((item):item is NameRecord=>Boolean(item));

  return <section id="guia" className="mt-12 scroll-mt-24 rounded-[22px] border border-[#e4e1ed] bg-white p-5 shadow-[0_10px_30px_rgba(55,49,91,.04)] sm:p-6">
    <div className="flex flex-col gap-4 border-b border-[#ece9f2] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <p className="gdn-eyebrow">Guía de esta página</p>
        <h2 className="gdn-display mt-2 text-[31px] font-bold tracking-[-.035em] text-[#20212f] sm:text-[36px]">{blueprint.guide.title}</h2>
        <p className="mt-3 text-[11px] leading-5 text-[#7d8090]">{blueprint.guide.summary}</p>
      </div>
      {items.length>0&&<div className="flex shrink-0 gap-2 text-[9px] font-bold text-[#747788]">
        <span className="rounded-full border border-[#e2deec] bg-[#faf9fd] px-3 py-1.5">{items.length} opciones</span>
        {verified>0&&<span className="rounded-full border border-[#e2deec] bg-[#faf9fd] px-3 py-1.5">{verified} con fuente</span>}
        {short>0&&<span className="rounded-full border border-[#e2deec] bg-[#faf9fd] px-3 py-1.5">{short} cortos</span>}
      </div>}
    </div>
    <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
      {blueprint.guide.cards.map((card,index)=><article key={card.title} className="min-w-[82vw] snap-start rounded-[17px] border border-[#e8e4ef] bg-[#fbfaff] p-4 sm:min-w-[320px] md:min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="gdn-theme-chip grid size-8 place-items-center rounded-full border"><CheckCircle2 size={13}/></span>
          <span className="gdn-tech text-[9px] font-black text-[#c5c1d3]">0{index+1}</span>
        </div>
        <h3 className="mt-4 text-[12px] font-bold leading-5 text-[#353644]">{card.title}</h3>
        <p className="mt-1.5 text-[10px] leading-5 text-[#7f8292]">{card.body}</p>
      </article>)}
    </div>

    {examples.length>0&&<div className="mt-5 border-t border-[#ece9f2] pt-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="gdn-tech text-[9px] font-black uppercase tracking-[.11em] text-[#9698a7]">Ejemplos de esta colección</p>
          <h3 className="gdn-editorial mt-1 text-[20px] font-bold text-[#30313f]">Mira candidatos reales antes de abrir todos los filtros</h3>
        </div>
        <p className="text-[9px] leading-4 text-[#9294a3]">Muestra orientativa; no es un ranking de popularidad.</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {examples.map(item=><article key={item.name} className="rounded-[13px] border border-[#e7e3ee] bg-[#fcfbff] px-3.5 py-3">
          <p className="gdn-editorial break-words text-[15px] font-bold text-[#30313f]">{item.name}</p>
          <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-[#858899]">{item.origin||item.script||item.meaning||('Ejemplo incluido en '+page.primaryKeyword)}</p>
        </article>)}
      </div>
    </div>}
  </section>
}
