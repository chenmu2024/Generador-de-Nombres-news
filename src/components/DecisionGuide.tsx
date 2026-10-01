import type { KeywordPage } from '@/data/keywordMaster';
import { getDecisionCards } from '@/data/contentModules';

export default function DecisionGuide({page}:{page:KeywordPage}){
  const cards=getDecisionCards(page);
  return <section className="mt-12">
    <div className="max-w-2xl">
      <p className="gdn-eyebrow">Antes de decidir</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Tres cosas que vale la pena comparar</h2>
    </div>
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {cards.map((card,index)=><article key={card.title} className="gdn-card rounded-2xl p-5">
        <span className="text-xs font-black text-[#6d4aff]">0{index+1}</span>
        <h3 className="mt-3 text-lg font-black">{card.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#727680]">{card.description}</p>
      </article>)}
    </div>
  </section>
}
