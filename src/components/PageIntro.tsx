import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function PageIntro({page}:{page:KeywordPage}){
  const cluster=topicClusters[page.cluster];
  const showClusterLink=cluster.hubPath!==page.path;

  return <header className="pb-10 pt-10 md:pb-12 md:pt-14">
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.08em] text-[#8a918b]">
      <Link href="/" className="hover:text-[#24483b]">Inicio</Link>
      <ChevronRight size={11}/>
      {showClusterLink&&<><Link href={cluster.hubPath} className="hover:text-[#24483b]">{cluster.label}</Link><ChevronRight size={11}/></>}
      <span className="text-[#5e6961]">{page.h1}</span>
    </nav>

    <div className="grid gap-7 lg:grid-cols-[1fr_280px] lg:items-end">
      <div>
        <span className="inline-flex rounded-full border border-[#d4cbbb] bg-[#fffaf2] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#546158]">{cluster.label}</span>
        <h1 className="brand-serif mt-5 max-w-4xl text-[46px] font-bold leading-[1.01] tracking-[-.045em] text-[#17231c] md:text-[62px]">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#68736b] md:text-[16px]">{page.description}</p>
      </div>
      <div className="hidden border-l border-[#cfc6b8] pl-6 lg:block">
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8b938c]">Herramienta</p>
        <p className="brand-serif mt-2 text-[22px] font-bold leading-tight text-[#294236]">Gratis, directa y sin registro.</p>
        <p className="mt-2 text-[11px] leading-5 text-[#7b847d]">Genera, filtra, compara y guarda en tu navegador.</p>
      </div>
    </div>
  </header>
}
