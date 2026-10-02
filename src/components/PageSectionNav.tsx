import{BookOpenCheck,Grid2X2,HelpCircle,Layers3,ListChecks,SearchCheck,Sparkles}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';

export default function PageSectionNav({
  page,
  hasPrimaryTool,
  hasResultCollection,
}:{page:KeywordPage;hasPrimaryTool:boolean;hasResultCollection:boolean}){
  const sections=[
    hasPrimaryTool?{href:'#herramienta',label:'Herramienta',Icon:Sparkles}:null,
    {href:'#guia',label:'Guía',Icon:BookOpenCheck},
    {href:'#criterios',label:'Criterios',Icon:ListChecks},
    hasResultCollection?{href:'#coleccion',label:'Colección',Icon:Layers3}:null,
    {href:'#busquedas',label:'Búsquedas',Icon:SearchCheck},
    {href:'#preguntas',label:'Preguntas',Icon:HelpCircle},
    {href:'#relacionados',label:'Relacionadas',Icon:ListChecks},
  ].filter(Boolean) as {href:string;label:string;Icon:typeof Sparkles}[];

  return <nav aria-label={'Secciones de '+page.h1} className="-mt-4 mb-8">
    <div className="flex items-center gap-2 overflow-x-auto rounded-[15px] border border-[#e8e5ef] bg-white p-2 shadow-[0_8px_24px_rgba(55,49,91,.035)] [scrollbar-width:none]">
      {sections.map(({href,label,Icon})=><a
        key={href}
        href={href}
        className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-[10px] border border-transparent px-2.5 text-[9px] font-bold text-[#66697a] transition hover:border-[var(--page-border)] hover:bg-[var(--page-soft)] hover:text-[var(--page-accent)] sm:px-3 sm:text-[10px]"
      ><Icon size={11}/>{label}</a>)}
      <span className="mx-0.5 h-5 w-px shrink-0 bg-[#ece9f2]"/>
      <TrackedLink
        href="/directorio"
        placement="page-section-nav"
        role="directory"
        experimentId={EXPERIMENTS.nav}
        className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-[10px] bg-[#f4f1ff] px-2.5 text-[9px] font-bold text-[#5b52c2] transition hover:bg-[#ebe7ff] sm:px-3 sm:text-[10px]"
      ><Grid2X2 size={11}/>Directorio</TrackedLink>
    </div>
  </nav>;
}
