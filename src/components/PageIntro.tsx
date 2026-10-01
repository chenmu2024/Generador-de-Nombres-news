import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function PageIntro({page}:{page:KeywordPage}){
  const cluster=topicClusters[page.cluster];
  const showClusterLink=cluster.hubPath!==page.path;

  return <header className="pb-8 pt-10 md:pb-10 md:pt-14">
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[12px] font-medium text-[#8a8e97]">
      <Link href="/" className="transition hover:text-[#4f45c8]">Inicio</Link>
      <ChevronRight size={12}/>
      {showClusterLink&&<>
        <Link href={cluster.hubPath} className="transition hover:text-[#4f45c8]">{cluster.label}</Link>
        <ChevronRight size={12}/>
      </>}
      <span className="text-[#62666f]">{page.h1}</span>
    </nav>

    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-[#eeecff] px-2.5 py-1 text-[11px] font-semibold text-[#5146c8]">{cluster.label}</span>
      <span className="text-[12px] font-medium text-[#858993]">Gratis · Sin registro</span>
    </div>

    <h1 className="max-w-4xl text-[38px] font-semibold leading-[1.08] tracking-[-.045em] text-[#18191d] md:text-[52px]">{page.h1}</h1>
    <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#666a74] md:text-[16px]">{page.description}</p>
  </header>
}
