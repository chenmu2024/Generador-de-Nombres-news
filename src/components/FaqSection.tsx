import {Plus} from 'lucide-react';
import type { KeywordPage } from '@/data/keywordMaster';
import { getFaqs } from '@/data/contentModules';

export default function FaqSection({page}:{page:KeywordPage}){
  const faqs=getFaqs(page);
  if(!faqs.length)return null;

  return <section className="mt-14">
    <div className="mb-4">
      <p className="gdn-eyebrow">Preguntas frecuentes</p>
      <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-.03em] text-[#1d1f24]">Dudas antes de elegir</h2>
    </div>

    <div className="divide-y divide-[#eceef1] overflow-hidden rounded-[14px] border border-[#e1e3e7] bg-white">
      {faqs.map(faq=><details key={faq.question} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-4 py-4 text-[13px] font-semibold text-[#303238] transition hover:bg-[#fafafa] sm:px-5">
          <span>{faq.question}</span>
          <span className="grid size-7 shrink-0 place-items-center rounded-[8px] border border-[#e2e4e8] bg-white text-[#7c8089] transition group-open:rotate-45">
            <Plus size={14}/>
          </span>
        </summary>
        <p className="max-w-3xl px-4 pb-5 text-[13px] leading-6 text-[#6e727c] sm:px-5">{faq.answer}</p>
      </details>)}
    </div>
  </section>
}
