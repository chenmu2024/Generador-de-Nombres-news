import {Plus} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import {getFaqs} from '@/data/contentModules';

export default function FaqSection({page}:{page:KeywordPage}){
  const faqs=getFaqs(page);if(!faqs.length)return null;
  return <section className="mt-16">
    <p className="gdn-eyebrow">Preguntas frecuentes</p>
    <h2 className="brand-serif mt-2 text-[36px] font-bold tracking-[-.035em] text-[#17231c]">Dudas antes de elegir</h2>
    <div className="mt-5 divide-y divide-[#ddd4c7] overflow-hidden rounded-[24px] border border-[#d6ccbd] bg-[#fffaf2]">
      {faqs.map(faq=><details key={faq.question} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-[13px] font-bold text-[#33443a] transition hover:bg-white sm:px-6"><span>{faq.question}</span><span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#d4cbbb] text-[#66736a] transition group-open:rotate-45"><Plus size={14}/></span></summary>
        <p className="max-w-3xl px-5 pb-6 text-[12px] leading-6 text-[#717c74] sm:px-6">{faq.answer}</p>
      </details>)}
    </div>
  </section>
}
