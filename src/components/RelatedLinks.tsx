import Link from'next/link';
import {ArrowRight} from 'lucide-react';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function RelatedLinks({currentPath,cluster}:{currentPath:string;cluster:keyof typeof topicClusters}){
  const related=keywordPages.filter(i=>i.cluster===cluster&&i.path!==currentPath).slice(0,6);
  if(!related.length)return null;
  return <section className="mt-16">
    <p className="gdn-eyebrow">Sigue explorando</p>
    <h2 className="brand-serif mt-2 text-[36px] font-bold tracking-[-.035em] text-[#17231c]">Herramientas relacionadas</h2>
    <div className="mt-5 grid gap-3 md:grid-cols-2">
      {related.map(item=><Link key={item.path} href={item.path} className="group flex items-center justify-between gap-5 rounded-[22px] border border-[#d5cbbb] bg-[#fffaf2] p-5 transition hover:-translate-y-.5 hover:bg-white hover:shadow-[0_14px_34px_rgba(42,48,40,.07)]">
        <div className="min-w-0"><p className="truncate text-[13px] font-bold text-[#2f4036]">{item.h1}</p><p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#7a847d]">{item.description}</p></div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#d4cbbb] text-[#52685a] transition group-hover:bg-[#173128] group-hover:text-white"><ArrowRight size={14}/></span>
      </Link>)}
    </div>
  </section>
}
