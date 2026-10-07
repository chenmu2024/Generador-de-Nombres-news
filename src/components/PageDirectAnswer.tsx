import{CheckCircle2,Info}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import type{NameRecord}from'@/data/nameDataset';
import{getPageAnswer}from'@/lib/pageAnswer';

export default function PageDirectAnswer({page,items}:{page:KeywordPage;items:NameRecord[]}){
  const content=getPageAnswer(page,items);
  return <section
    id="respuesta"
    data-geo-answer="true"
    aria-labelledby={'respuesta-'+page.id}
    className="mb-8 scroll-mt-24 rounded-[20px] border border-[var(--page-border)] bg-[linear-gradient(135deg,#fff_0%,var(--page-soft)_100%)] p-5 shadow-[0_10px_28px_rgba(55,49,91,.04)] sm:p-6"
  >
    <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr] lg:items-start">
      <div>
        <p className="gdn-eyebrow">Respuesta rápida</p>
        <h2 id={'respuesta-'+page.id} className="gdn-display mt-2 text-[29px] font-bold leading-tight tracking-[-.03em] text-[#20212f] sm:text-[34px]">{content.question}</h2>
        <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#66697a]">{content.answer}</p>
      </div>
      <dl className="grid grid-cols-3 gap-2">
        {content.facts.map(fact=><div key={fact.label} className="rounded-[13px] border border-[var(--page-border)] bg-white/90 p-3">
          <dt className="text-[8px] font-black uppercase tracking-[.08em] text-[#9799a8]">{fact.label}</dt>
          <dd className="gdn-editorial mt-1.5 text-[15px] font-bold leading-tight text-[#333442]">{fact.value}</dd>
        </div>)}
      </dl>
    </div>
    <div className="mt-4 flex items-start gap-2 rounded-[13px] border border-[#e5e1ef] bg-white/75 px-3.5 py-3 text-[10px] leading-5 text-[#777a8a]">
      <Info size={13} className="mt-0.5 shrink-0 text-[var(--page-accent)]"/>
      <p><strong className="text-[#555867]">Límite importante:</strong> {content.limitation}</p>
    </div>
    <p className="mt-3 flex items-center gap-1.5 text-[9px] font-semibold text-[#8b8e9e]"><CheckCircle2 size={11} className="text-[var(--page-accent)]"/>Resumen calculado a partir del contenido y los datos visibles de esta misma página.</p>
  </section>;
}
