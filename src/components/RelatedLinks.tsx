import Link from'next/link';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function RelatedLinks({currentPath,cluster}:{currentPath:string;cluster:keyof typeof topicClusters}){
  const related=keywordPages.filter(i=>i.cluster===cluster&&i.path!==currentPath).slice(0,6);
  if(!related.length)return null;
  return <section className="mt-14">
    <div className="mb-5">
      <p className="gdn-eyebrow">Sigue explorando</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Herramientas relacionadas</h2>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {related.map(item=><Link key={item.path} href={item.path} className="gdn-card group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-[#c7bfff]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-extrabold text-[#22232a] group-hover:text-[#5c3bd4]">{item.h1}</p>
            <p className="mt-2 text-sm leading-6 text-[#737782]">{item.description}</p>
          </div>
          <span className="text-xl text-[#a4a7b0]">↗</span>
        </div>
      </Link>)}
    </div>
  </section>
}
