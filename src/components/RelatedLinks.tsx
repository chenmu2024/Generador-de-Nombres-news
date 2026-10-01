import Link from'next/link';
import {ArrowUpRight} from 'lucide-react';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function RelatedLinks({currentPath,cluster}:{currentPath:string;cluster:keyof typeof topicClusters}){
  const related=keywordPages.filter(i=>i.cluster===cluster&&i.path!==currentPath).slice(0,6);
  if(!related.length)return null;

  return <section className="mt-14">
    <div className="mb-4">
      <p className="gdn-eyebrow">Sigue explorando</p>
      <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-.03em] text-[#1d1f24]">Herramientas relacionadas</h2>
    </div>

    <div className="divide-y divide-[#eceef1] overflow-hidden rounded-[14px] border border-[#e1e3e7] bg-white">
      {related.map(item=><Link key={item.path} href={item.path} className="group flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-[#fafafa] sm:px-5">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-[#2b2d33] group-hover:text-[#4f45c8]">{item.h1}</p>
          <p className="mt-1 line-clamp-1 text-[12px] text-[#858993]">{item.description}</p>
        </div>
        <ArrowUpRight size={16} className="shrink-0 text-[#a0a4ad] transition group-hover:text-[#5b4df5]"/>
      </Link>)}
    </div>
  </section>
}
