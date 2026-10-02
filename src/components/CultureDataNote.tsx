import {BookOpenCheck,Globe2,Languages,Volume2} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';

function percentage(value:number,total:number){
  return total?Math.round((value/total)*100):0;
}

export default function CultureDataNote({items}:{items:NameRecord[]}){
  const scripts=items.filter(item=>item.script).length;
  const pronunciations=items.filter(item=>item.pronunciation).length;
  const sourced=items.filter(item=>item.source&&item.sourceUrl).length;
  const verified=items.filter(item=>item.verified===true&&item.source&&item.sourceUrl).length;
  const origins=new Set(items.map(item=>item.origin).filter(Boolean)).size;
  const sourceComplete=sourced===items.length&&items.length>0;

  return <aside className="mt-6 overflow-hidden rounded-[18px] border border-[#ded9f6] bg-[#f7f5ff]" aria-labelledby="culture-data-title">
    <div className="border-b border-[#e5e0f7] bg-white/70 px-5 py-4">
      <p className="gdn-eyebrow">Calidad de datos</p>
      <div className="mt-1.5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h2 id="culture-data-title" className="gdn-editorial text-[22px] font-bold tracking-[-.025em] text-[#292a3a]">Qué información puedes comprobar</h2>
        <p className="text-[10px] leading-5 text-[#858799]">{items.length} registros · {origins} {origins===1?'origen':'orígenes'} documentados</p>
      </div>
    </div>

    <div className="grid gap-px bg-[#e5e0f7] sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><Globe2 size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Origen</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{origins?`${origins} ${origins===1?'origen':'orígenes'} distintos en esta colección.`:'El origen se muestra solo cuando está documentado.'}</p>
      </div>
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><Languages size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Escritura</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{scripts?`${scripts} de ${items.length} registros incluyen escritura original (${percentage(scripts,items.length)}%).`:'La escritura original se muestra solo cuando está disponible.'}</p>
      </div>
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><Volume2 size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Pronunciación</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{pronunciations?`${pronunciations} registros incluyen guía de pronunciación (${percentage(pronunciations,items.length)}%).`:'No inferimos pronunciaciones cuando la base no las documenta.'}</p>
      </div>
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><BookOpenCheck size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Fuentes</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{items.length?`${sourced} de ${items.length} tienen enlace de fuente; ${verified} están verificados.`:'No hay registros culturales disponibles.'}</p>
      </div>
    </div>

    <div className={'border-t px-4 py-3 text-[10px] leading-5 '+(sourceComplete?'border-[#d7eedf] bg-[#f4fbf7] text-[#54705f]':'border-[#f0dfc8] bg-[#fffaf3] text-[#7e6a50]')}>
      {sourceComplete
        ?'Cobertura de fuentes completa para los registros mostrados. Puedes filtrar abajo por escritura, pronunciación o fuente verificada.'
        :'Cobertura de fuentes incompleta: los registros sin referencia se muestran sin atribuir significado o pronunciación inventados.'}
    </div>
    <p className="border-t border-[#e5e0f7] bg-white/55 px-4 py-3 text-[10px] leading-5 text-[#858799]">Una misma romanización puede corresponder a distintas escrituras o significados. El sitio separa nombre, escritura, pronunciación y fuente en lugar de asumir que son equivalentes.</p>
  </aside>
}
