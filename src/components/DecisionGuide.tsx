import {Check} from 'lucide-react';
import type { KeywordPage } from '@/data/keywordMaster';
import { getDecisionCards } from '@/data/contentModules';

export default function DecisionGuide({page}:{page:KeywordPage}){
  const cards=getDecisionCards(page);

  return <section className="mt-12">
    <div className="mb-4">
      <p className="gdn-eyebrow">Antes de decidir</p>
      <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-.03em] text-[#1d1f24]">Tres cosas que conviene comparar</h2>
    </div>

    <div className="grid gap-px overflow-hidden rounded-[14px] border border-[#e1e3e7] bg-[#e9ebef] md:grid-cols-3">
      {cards.map((card,index)=><article key={card.title} className="bg-white p-5">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-[#eeecff] text-[#5146c8]">
            <Check size={12.5} strokeWidth={2.4}/>
          </span>
          <span className="text-[11px] font-medium text-[#999da6]">0{index+1}</span>
        </div>
        <h3 className="mt-4 text-[14px] font-semibold text-[#282a30]">{card.title}</h3>
        <p className="mt-1.5 text-[12px] leading-5 text-[#747883]">{card.description}</p>
      </article>)}
    </div>
  </section>
}
