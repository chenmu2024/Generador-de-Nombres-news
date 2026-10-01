import Link from 'next/link';
import type{KeywordPage} from '@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function PageIntro({page}:{page:KeywordPage}){
  const cluster=topicClusters[page.cluster];
  const showClusterLink=cluster.hubPath!==page.path;

  return <header className="py-10 md:py-14">
    <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8a8d95]">
      <Link href="/" className="hover:text-[#5b3bd2]">Inicio</Link>
      <span>›</span>
      {showClusterLink&&<>
        <Link href={cluster.hubPath} className="hover:text-[#5b3bd2]">{cluster.label}</Link>
        <span>›</span>
      </>}
      <span className="text-[#5e626c]">{page.h1}</span>
    </nav>

    <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold">
      <span className="rounded-full bg-[#eeeaff] px-3 py-1.5 text-[#5b3bd2]">{cluster.label}</span>
      <span className="rounded-full border border-[#e1e2e8] bg-white px-3 py-1.5 text-[#656a75]">Gratis · Sin registro</span>
    </div>
    <h1 className="max-w-4xl text-4xl font-black leading-[1.04] tracking-[-.035em] text-[#17171b] md:text-6xl">{page.h1}</h1>
    <p className="mt-5 max-w-3xl text-base leading-7 text-[#666b76] md:text-lg">{page.description}</p>
  </header>
}
