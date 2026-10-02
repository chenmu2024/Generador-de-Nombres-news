import Link from 'next/link';
import {ArrowRight,Heart,Shuffle} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{getNextIntentPages}from'@/data/internalLinkGraph';

export default function NextStepPanel({page}:{page:KeywordPage}){
  const links=getNextIntentPages(page.path,2);
  if(!links.length)return null;

  return <section className="mt-8 rounded-[20px] border border-[#ded9f5] bg-[#faf9ff] p-5 sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[540px]">
        <p className="gdn-eyebrow">Siguiente paso</p>
        <h2 className="brand-serif mt-2 text-[27px] font-bold tracking-[-.03em] text-[#252634]">No pierdas los nombres que ya te gustaron.</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#787b8d]">Guárdalos para comparar después o continúa con la siguiente búsqueda más cercana a tu intención actual.</p>
        <Link href="/favoritos" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#5b4df5] px-4 text-[10px] font-semibold text-white transition hover:bg-[#5044de]">
          <Heart size={12}/> Abrir mis favoritos
        </Link>
      </div>

      <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 lg:max-w-[560px]">
        {links.map(link=><Link key={link.path} href={link.path} className="group flex min-h-[92px] items-center gap-3 rounded-[15px] border border-[#e2def0] bg-white p-4 transition hover:border-[#cbc4f7] hover:shadow-[0_10px_24px_rgba(67,56,133,.07)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Shuffle size={13}/></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold text-[#404252]">{link.h1}</span>
            <span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-[#86899a]">{link.description}</span>
          </span>
          <ArrowRight size={13} className="shrink-0 text-[#9b9dab] transition group-hover:translate-x-0.5 group-hover:text-[#5b4df5]"/>
        </Link>)}
      </div>
    </div>
  </section>
}
