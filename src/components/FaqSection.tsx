import type { KeywordPage } from '@/data/keywordMaster';
import { getFaqs } from '@/data/contentModules';

export default function FaqSection({page}:{page:KeywordPage}){
  const faqs=getFaqs(page);
  if(!faqs.length)return null;

  return <section className="mt-14">
    <div className="max-w-2xl">
      <p className="gdn-eyebrow">Preguntas frecuentes</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Dudas antes de elegir</h2>
    </div>
    <div className="mt-5 divide-y divide-[#ececf0] overflow-hidden rounded-[28px] border border-[#e2e3e8] bg-white">
      {faqs.map((faq,index)=><details key={faq.question} className="group p-5 md:px-6">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-extrabold text-[#292b32]">
          <span>{faq.question}</span>
          <span className="text-xl font-normal text-[#8a8e98] transition group-open:rotate-45">+</span>
        </summary>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6f737e]">{faq.answer}</p>
      </details>)}
    </div>
  </section>
}
