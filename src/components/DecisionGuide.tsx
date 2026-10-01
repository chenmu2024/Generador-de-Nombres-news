import {Check} from 'lucide-react';
import type {KeywordPage} from '@/data/keywordMaster';
import {getDecisionCards} from '@/data/contentModules';

export default function DecisionGuide({page}:{page:KeywordPage}){
  const cards=getDecisionCards(page);
  return <section className="mt-14">
    <p className="gdn-eyebrow">Antes de decidir</p>
    <h2 className="brand-serif mt-2 text-[36px] font-bold tracking-[-.035em] text-[#17231c]">Tres cosas que conviene comparar</h2>
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {cards.map((card,index)=><article key={card.title} className="rounded-[24px] border border-[#d6ccbd] bg-[#efe7da] p-5">
        <div className="flex items-center justify-between"><span className="grid size-8 place-items-center rounded-full bg-[#173128] text-white"><Check size={13}/></span><span className="brand-serif text-[22px] font-bold text-[#b2a793]">0{index+1}</span></div>
        <h3 className="mt-5 text-[13px] font-bold text-[#2d4035]">{card.title}</h3><p className="mt-2 text-[11px] leading-5 text-[#6f7a72]">{card.description}</p>
      </article>)}
    </div>
  </section>
}
