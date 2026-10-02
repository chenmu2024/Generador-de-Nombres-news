import Link from 'next/link';
import {ChevronRight,Sparkles} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export default function PageIntro({page}:{page:KeywordPage}){
  const cluster=topicClusters[page.cluster];
  const showClusterLink=cluster.hubPath!==page.path;
  const helper=page.tool==='culture'
    ?{eyebrow:'Datos comprobables',title:'Origen, escritura y fuentes.',body:'Busca por origen y filtra los registros con escritura, pronunciación o fuente verificada.'}
    :page.tool==='people'||page.tool==='pet'
      ?{eyebrow:'Herramienta',title:'Filtra, compara y guarda.',body:'Reduce la lista por rasgos, compara hasta cuatro opciones y guarda tus favoritas en el navegador.'}
      :page.tool==='store'
        ?{eyebrow:'Branding',title:'Genera y valida ideas.',body:'Combina sector, canal, tono e idioma antes de comprobar marca, dominio y perfiles sociales.'}
        :page.tool==='gaming'||page.tool==='invisible'||page.tool==='football'
          ?{eyebrow:'Herramienta',title:'Crea, copia y prueba.',body:'Genera variantes rápidas, copia el resultado y comprueba su compatibilidad donde vayas a usarlo.'}
          :{eyebrow:'Herramienta',title:'Gratis, directa y sin registro.',body:'Explora resultados, aplica filtros cuando estén disponibles y guarda tus favoritos localmente.'};

  return <header className="pb-10 pt-10 md:pb-12 md:pt-14">
    <nav aria-label="Breadcrumb" className="mb-6 flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-[11px] font-semibold sm:flex-wrap sm:overflow-visible sm:whitespace-normal text-[#9294a5]">
      <Link href="/" className="hover:text-[#5b4df5]">Inicio</Link><ChevronRight size={11}/>
      {showClusterLink&&<><Link href={cluster.hubPath} className="hover:text-[#5b4df5]">{cluster.label}</Link><ChevronRight size={11}/></>}
      <span className="max-w-[220px] truncate text-[#626577] sm:max-w-none">{page.h1}</span>
    </nav>

    <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end">
      <div>
        <span className="gdn-theme-chip inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold"><Sparkles size={12}/>{cluster.label}</span>
        <h1 className="gdn-display mt-5 max-w-4xl text-[40px] font-bold leading-[1.01] tracking-[-.045em] text-[#171827] md:text-[61px]">{page.h1}</h1>
        <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#6b6e80] md:text-[16px]">{page.description}</p>
      </div>
      <aside className="gdn-theme-panel hidden rounded-[18px] border p-5 shadow-[0_12px_34px_rgba(55,49,91,.06)] lg:block">
        <p className="gdn-tech gdn-theme-accent text-[9px] font-bold uppercase tracking-[.14em]">{helper.eyebrow}</p>
        <p className="gdn-editorial mt-2 text-[22px] font-bold leading-tight text-[#262738]">{helper.title}</p>
        <p className="mt-2 text-[11px] leading-5 text-[#838697]">{helper.body}</p>
      </aside>
    </div>
  </header>
}
