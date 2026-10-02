import {Plus} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import {getFaqs} from '@/data/contentModules';

export default function FaqSection({page}:{page:KeywordPage}){
  const faqs=getFaqs(page);if(!faqs.length)return null;
  return <section className="mt-16">
    <p className="gdn-eyebrow">Preguntas frecuentes</p>
    <h2 className="brand-serif mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">Dudas antes de elegir</h2>
    <div className="mt-5 divide-y divide-[#eceaf3] overflow-hidden rounded-[20px] border border-[#e5e2ef] bg-white shadow-[0_10px_28px_rgba(55,49,91,.04)]">
      {faqs.map(faq=><details key={faq.question} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-[14px] font-semibold sm:px-6 sm:py-5 sm:text-[13px] text-[#333444] transition hover:bg-[#faf9ff]"><span>{faq.question}</span><span className="grid size-11 shrink-0 place-items-center sm:size-8 rounded-full border border-[#ddd9ee] text-[#7169ba] transition group-open:rotate-45"><Plus size={14}/></span></summary>
        <p className="max-w-3xl px-5 pb-6 text-[13px] leading-6 sm:px-6 sm:text-[12px] text-[#777a8b]">{faq.answer}</p>
      </details>)}
    </div>
  </section>
}
