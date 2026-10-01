import Link from'next/link';
import {ArrowRight} from 'lucide-react';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function RelatedLinks({currentPath,cluster}:{currentPath:string;cluster:keyof typeof topicClusters}){
  const related=keywordPages.filter(i=>i.cluster===cluster&&i.path!==currentPath).slice(0,6);
  if(!related.length)return null;
  return <section className="mt-16">
    <p className="gdn-eyebrow">Sigue explorando</p>
    <h2 className="brand-serif mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">Herramientas relacionadas</h2>
    <div className="mt-5 grid gap-3 md:grid-cols-2">
      {related.map(item=><Link key={item.path} href={item.path} className="group flex items-center justify-between gap-5 rounded-[18px] border border-[#e5e2ef] bg-white p-5 shadow-[0_8px_24px_rgba(55,49,91,.04)] transition hover:-translate-y-.5 hover:border-[#d5cff7] hover:shadow-[0_14px_32px_rgba(55,49,91,.08)]">
        <div className="min-w-0"><p className="truncate text-[13px] font-semibold text-[#343545]">{item.h1}</p><p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#858899]">{item.description}</p></div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#dedaf0] text-[#6558f5] transition group-hover:bg-[#5b4df5] group-hover:text-white"><ArrowRight size={14}/></span>
      </Link>)}
    </div>
  </section>
}
