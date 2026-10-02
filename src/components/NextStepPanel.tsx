import TrackedLink from './TrackedLink';
import {ArrowRight,Heart,Shuffle} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{getNextIntentPages}from'@/data/internalLinkGraph';
import{EXPERIMENTS}from'@/data/experiments';

export default function NextStepPanel({page}:{page:KeywordPage}){
  const links=getNextIntentPages(page.path,2);
  if(!links.length)return null;
  const supportsFavorites=page.tool!=='invisible'&&page.path!=='/nombres-por-letra';
  const isDirectory=page.path==='/nombres-por-letra';
  const heading=isDirectory
    ?'Elige una inicial para empezar.'
    :page.tool==='store'
      ?'Guarda candidatos antes de revisar marca, dominio y redes.'
      :page.tool==='football'
        ?'Quédate con los nombres que también funcionen como TAG.'
        :page.tool==='culture'
          ?'Guarda los nombres cuyo contexto quieras volver a revisar.'
          :page.tool==='people'
            ?'Haz una lista corta antes de decidir.'
            :page.tool==='pet'
              ?'Guarda los nombres que suenen bien al llamarlos.'
              :supportsFavorites
                ?'Guarda tus mejores candidatos antes de salir.'
                :'Sigue probando tu nickname antes de decidir.';
  const description=isDirectory
    ?'Entra en una de las letras con página propia o continúa con una categoría relacionada.'
    :page.tool==='store'
      ?'Usa favoritos para conservar opciones y vuelve después de comprobar disponibilidad comercial.'
      :page.tool==='football'
        ?'Compara el nombre completo con su abreviatura y guarda solo los que funcionen en camiseta, escudo y marcador.'
        :page.tool==='culture'
          ?'Conserva los candidatos que te interesen y vuelve a sus fuentes, escritura y pronunciación antes de elegir.'
          :page.tool==='people'
            ?'Guarda unos pocos candidatos, compáralos juntos y vuelve a ellos después con más contexto.'
            :page.tool==='pet'
              ?'Prueba los favoritos en voz alta y conserva los que sean fáciles de repetir en el día a día.'
              :supportsFavorites
                ?'Guarda tus mejores resultados o continúa con la búsqueda más cercana a tu intención.'
                :'Copia una variante, pruébala dentro del juego y vuelve a otra herramienta si necesitas cambiar símbolos, nombre base o estilo.';

  return <section className="gdn-theme-panel mt-8 rounded-[20px] border p-5 sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[540px]">
        <p className="gdn-eyebrow">Siguiente paso</p>
        <h2 className="gdn-editorial mt-2 text-[27px] font-bold tracking-[-.03em] text-[#252634]">{heading}</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#787b8d]">{description}</p>
        {supportsFavorites&&<TrackedLink href="/favoritos" placement="next-step" role="open-favorites" experimentId={EXPERIMENTS.nextStep} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[var(--page-accent)] px-4 text-[10px] font-semibold text-white transition hover:brightness-95">
          <Heart size={12}/> Abrir mis favoritos
        </TrackedLink>}
      </div>

      <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 lg:max-w-[560px]">
        {links.map((link,index)=><TrackedLink key={link.path} href={link.path} placement="next-step" role={'next-intent-'+(index+1)} experimentId={EXPERIMENTS.nextStep} className="group flex min-h-[92px] items-center gap-3 rounded-[15px] border border-[#e2def0] bg-white p-4 transition hover:border-[var(--page-border)] hover:bg-[var(--page-soft)] hover:shadow-[0_10px_24px_rgba(67,56,133,.07)]">
          <span className="gdn-theme-chip grid size-9 shrink-0 place-items-center rounded-full border"><Shuffle size={13}/></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold text-[#404252]">{link.h1}</span>
            <span className="mt-1 block line-clamp-2 text-[10px] leading-4 text-[#86899a]">{link.description}</span>
          </span>
          <ArrowRight size={13} className="shrink-0 text-[#9b9dab] transition group-hover:translate-x-0.5 group-hover:text-[var(--page-accent)]"/>
        </TrackedLink>)}
      </div>
    </div>
  </section>
}
