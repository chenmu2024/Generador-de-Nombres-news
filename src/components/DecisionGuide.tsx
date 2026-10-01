import {Check} from 'lucide-react';
import type {KeywordPage} from '@/data/keywordMaster';
import {getDecisionCards} from '@/data/contentModules';

export default function DecisionGuide({page}:{page:KeywordPage}){
  const cards=getDecisionCards(page);
  return <section className="mt-14">
    <p className="gdn-eyebrow">Antes de decidir</p>
    <h2 className="brand-serif mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">Tres cosas que conviene comparar</h2>
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {cards.map((card,index)=><article key={card.title} className="rounded-[20px] border border-[#e5e2ef] bg-white p-5 shadow-[0_10px_28px_rgba(55,49,91,.045)]">
        <div className="flex items-center justify-between"><span className="grid size-8 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Check size={13}/></span><span className="brand-serif text-[21px] font-bold text-[#d5d1e6]">0{index+1}</span></div>
        <h3 className="mt-5 text-[13px] font-bold text-[#303141]">{card.title}</h3><p className="mt-2 text-[11px] leading-5 text-[#7c7f90]">{card.description}</p>
      </article>)}
    </div>
  </section>
}
