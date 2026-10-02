import{LayoutGrid}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';
import{EXPERIMENTS}from'@/data/experiments';
import TrackedLink from'./TrackedLink';

function label(value:string){
  return value.charAt(0).toLocaleUpperCase('es')+value.slice(1);
}

export default function TopicSubnav({page}:{page:KeywordPage}){
  const siblings=keywordPages.filter(item=>item.path!=='/'&&item.cluster===page.cluster);
  if(siblings.length<2)return null;
  const cluster=topicClusters[page.cluster];

  return <nav aria-label={'Más páginas de '+cluster.label} className="-mt-3 mb-8 border-y border-[#ece9f2] py-3">
    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
      <span className="mr-1 inline-flex shrink-0 items-center gap-1.5 text-[9px] font-black uppercase tracking-[.11em] text-[#a09cab]">
        <LayoutGrid size={12}/>{cluster.label}
      </span>
      {siblings.map((item,index)=>item.path===page.path
        ?<span key={item.path} aria-current="page" className="inline-flex min-h-8 shrink-0 items-center rounded-full border border-[var(--page-border)] bg-[var(--page-soft)] px-3 text-[9px] font-bold text-[var(--page-accent)]">{label(item.primaryKeyword)}</span>
        :<TrackedLink key={item.path} href={item.path} placement="topic-subnav" role={page.cluster+'-'+(index+1)} experimentId={EXPERIMENTS.nav} className="inline-flex min-h-8 shrink-0 items-center rounded-full border border-[#e0ddea] bg-white px-3 text-[9px] font-semibold text-[#6d7080] transition hover:border-[var(--page-border)] hover:bg-[var(--page-soft)] hover:text-[var(--page-accent)]">{label(item.primaryKeyword)}</TrackedLink>
      )}
      <TrackedLink href="/directorio" placement="topic-subnav" role="all-topics" experimentId={EXPERIMENTS.nav} className="inline-flex min-h-8 shrink-0 items-center rounded-full border border-dashed border-[#d7d2e4] px-3 text-[9px] font-semibold text-[#858899] transition hover:border-[var(--page-border)] hover:text-[var(--page-accent)]">Todas</TrackedLink>
    </div>
  </nav>
}
