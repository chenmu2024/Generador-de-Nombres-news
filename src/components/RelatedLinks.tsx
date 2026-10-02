import TrackedLink from './TrackedLink';
import {ArrowRight} from 'lucide-react';
import{getInternalLinkSuggestions,getNextIntentPages}from'@/data/internalLinkGraph';
import{keywordPageByPath,type KeywordPage}from'@/data/keywordMaster';
import{EXPERIMENTS}from'@/data/experiments';

function relationLabel(current:KeywordPage|undefined,target:KeywordPage,role:string){
  if(role==='next-intent')return'Siguiente paso';
  if(!current)return'Más opciones';
  if(current.cluster==='letras'&&target.cluster==='letras')return'Cambia de inicial';
  if(current.cluster==='culturas'&&target.cluster==='culturas')return'Compara otra tradición';
  if(current.cluster==='mascotas'&&target.cluster==='mascotas')return'Otra búsqueda de mascotas';
  if(current.cluster==='personasBebes'&&target.cluster==='personasBebes')return'Amplía la comparación';
  if(current.cluster==='freeFire'&&target.cluster==='freeFire')return'Otro flujo de Free Fire';
  if(current.cluster==='gamingSocial'&&target.cluster==='gamingSocial')return'Otro contexto digital';
  if(current.cluster==='negociosEquipos'&&target.cluster==='negociosEquipos')return'Otro caso de naming';
  if(current.cluster===target.cluster)return'Mismo tema';
  return'Ruta complementaria';
}

export default function RelatedLinks({currentPath}:{currentPath:string}){
  const current=keywordPageByPath.get(currentPath);
  const excluded=new Set(getNextIntentPages(currentPath,2).map(page=>page.path));
  const related=getInternalLinkSuggestions(currentPath,8).filter(item=>!excluded.has(item.page.path)).slice(0,4);
  if(!related.length)return null;

  return <section id="relacionados" className="mt-16 scroll-mt-24">
    <p className="gdn-eyebrow">Sigue explorando</p>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="gdn-display mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">Herramientas relacionadas</h2>
      <p className="max-w-[360px] text-[10px] leading-5 text-[#8a8c9b]">Más rutas útiles del mismo tema, sin repetir las sugerencias del bloque anterior.</p>
    </div>
    <div className="mt-5 grid gap-3 md:grid-cols-2">
      {related.map(({page,role},index)=><TrackedLink key={page.path} href={page.path} placement="related-links" role={role+'-'+(index+1)} experimentId={EXPERIMENTS.related} className="group flex items-center justify-between gap-5 rounded-[18px] border border-[#e5e2ef] bg-white p-5 shadow-[0_8px_24px_rgba(55,49,91,.04)] transition hover:-translate-y-.5 hover:border-[var(--page-border)] hover:shadow-[0_14px_32px_rgba(55,49,91,.08)]">
        <div className="min-w-0">
          <span className="gdn-theme-chip gdn-tech mb-1.5 inline-flex rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[.08em]">{relationLabel(current,page,role)}</span>
          <p className="truncate text-[13px] font-semibold text-[#343545]">{page.h1}</p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#858899]">{page.description}</p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--page-border)] text-[var(--page-accent)] transition group-hover:bg-[var(--page-accent)] group-hover:text-white"><ArrowRight size={14}/></span>
      </TrackedLink>)}
    </div>
  </section>
}
