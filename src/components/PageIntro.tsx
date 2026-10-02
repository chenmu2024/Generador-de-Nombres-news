import Link from 'next/link';
import {ChevronRight,Sparkles} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';
import{getPageBlueprint}from'@/data/pageBlueprints';
import PageHeroVisual from'./PageHeroVisual';

export default function PageIntro({page}:{page:KeywordPage}){
  const cluster=topicClusters[page.cluster];
  const showClusterLink=cluster.hubPath!==page.path;
  const blueprint=getPageBlueprint(page.path);
  const helper=blueprint?.hero??{eyebrow:'Herramienta',title:'Explora, compara y decide.',body:'Usa los filtros y herramientas de esta página para reducir opciones y guardar tus favoritas.'};

  return <header className="pb-10 pt-10 md:pb-12 md:pt-14">
    <nav aria-label="Breadcrumb" className="mb-6 flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-[11px] font-semibold sm:flex-wrap sm:overflow-visible sm:whitespace-normal text-[#9294a5]">
      <Link href="/" className="hover:text-[var(--page-accent)]">Inicio</Link><ChevronRight size={11}/>
      {showClusterLink&&<><Link href={cluster.hubPath} className="hover:text-[var(--page-accent)]">{cluster.label}</Link><ChevronRight size={11}/></>}
      <span className="max-w-[220px] truncate text-[#626577] sm:max-w-none">{page.h1}</span>
    </nav>

    <div className="grid gap-8 lg:grid-cols-[1fr_330px] lg:items-end">
      <div>
        <span className="gdn-theme-chip inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold"><Sparkles size={12}/>{cluster.label}</span>
        <h1 className="gdn-display mt-5 max-w-4xl text-[40px] font-bold leading-[1.01] tracking-[-.045em] text-[#171827] md:text-[61px]">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#6b6e80] md:text-[16px]">{page.description}</p>
        <aside className="gdn-theme-panel mt-5 rounded-[14px] border px-4 py-3 lg:hidden">
          <div className="flex items-start gap-3">
            <span className="gdn-theme-chip grid size-8 shrink-0 place-items-center rounded-full border"><Sparkles size={12}/></span>
            <div>
              <p className="gdn-tech gdn-theme-accent text-[8px] font-bold uppercase tracking-[.12em]">{helper.eyebrow}</p>
              <p className="gdn-editorial mt-1 text-[16px] font-bold leading-tight text-[#303141]">{helper.title}</p>
              <p className="mt-1 text-[10px] leading-4 text-[#818495]">{helper.body}</p>
            </div>
          </div>
          <div className="mt-3"><PageHeroVisual page={page} compact/></div>
        </aside>
      </div>
      <aside className="gdn-theme-panel hidden rounded-[20px] border p-4 shadow-[0_12px_34px_rgba(55,49,91,.06)] lg:block">
        <PageHeroVisual page={page}/>
        <div className="px-1 pb-1 pt-4">
          <p className="gdn-tech gdn-theme-accent text-[9px] font-bold uppercase tracking-[.14em]">{helper.eyebrow}</p>
          <p className="gdn-editorial mt-2 text-[22px] font-bold leading-tight text-[#262738]">{helper.title}</p>
          <p className="mt-2 text-[11px] leading-5 text-[#838697]">{helper.body}</p>
        </div>
      </aside>
    </div>
  </header>
}
