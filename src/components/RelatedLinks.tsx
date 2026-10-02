import TrackedLink from './TrackedLink';
import {ArrowRight} from 'lucide-react';
import{getInternalLinkSuggestions}from'@/data/internalLinkGraph';
import{EXPERIMENTS}from'@/data/experiments';

export default function RelatedLinks({currentPath}:{currentPath:string}){
  const related=getInternalLinkSuggestions(currentPath,6);
  if(!related.length)return null;

  return <section className="mt-16">
    <p className="gdn-eyebrow">Sigue explorando</p>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="gdn-display mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">Herramientas relacionadas</h2>
      <p className="max-w-[360px] text-[10px] leading-5 text-[#8a8c9b]">Ordenadas por cercanía con la intención de esta página; después se completan con herramientas del mismo tema.</p>
    </div>
    <div className="mt-5 grid gap-3 md:grid-cols-2">
      {related.map(({page,role},index)=><TrackedLink key={page.path} href={page.path} placement="related-links" role={role+'-'+(index+1)} experimentId={EXPERIMENTS.related} className="group flex items-center justify-between gap-5 rounded-[18px] border border-[#e5e2ef] bg-white p-5 shadow-[0_8px_24px_rgba(55,49,91,.04)] transition hover:-translate-y-.5 hover:border-[#d5cff7] hover:shadow-[0_14px_32px_rgba(55,49,91,.08)]">
        <div className="min-w-0">
          {role==='next-intent'&&<span className="gdn-theme-chip gdn-tech mb-1.5 inline-flex rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[.08em]">Más relacionado</span>}
          <p className="truncate text-[13px] font-semibold text-[#343545]">{page.h1}</p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#858899]">{page.description}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#dedaf0] text-[#6558f5] transition group-hover:bg-[#5b4df5] group-hover:text-white"><ArrowRight size={14}/></span>
      </TrackedLink>)}
    </div>
  </section>
}
