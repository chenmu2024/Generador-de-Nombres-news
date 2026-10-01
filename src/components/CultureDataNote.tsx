import {BookOpenCheck,Languages,Volume2} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';

export default function CultureDataNote({items}:{items:NameRecord[]}){
  const scripts=items.filter(item=>item.script).length;
  const pronunciations=items.filter(item=>item.pronunciation).length;
  const sourced=items.filter(item=>item.source).length;

  return <aside className="mt-6 overflow-hidden rounded-[18px] border border-[#ded9f6] bg-[#f7f5ff]">
    <div className="grid gap-px bg-[#e5e0f7] sm:grid-cols-3">
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 text-[#5b4df5]"><Languages size={14}/><span className="text-[10px] font-black uppercase tracking-[.12em]">Escritura</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{scripts?`${scripts} de ${items.length} registros incluyen escritura original.`:'La escritura original se muestra solo cuando está disponible.'}</p>
      </div>
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 text-[#5b4df5]"><Volume2 size={14}/><span className="text-[10px] font-black uppercase tracking-[.12em]">Pronunciación</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{pronunciations?`${pronunciations} registros incluyen una guía de pronunciación.`:'No inferimos pronunciaciones cuando la base no las documenta.'}</p>
      </div>
      <div className="bg-[#f8f7ff] p-4">
        <div className="flex items-center gap-2 text-[#5b4df5]"><BookOpenCheck size={14}/><span className="text-[10px] font-black uppercase tracking-[.12em]">Fuentes</span></div>
        <p className="mt-2 text-[12px] leading-5 text-[#696c7e]">{sourced?'Los registros con referencia enlazan su fuente y estado de revisión.':'No mostramos una fuente inventada cuando todavía no está documentada.'}</p>
      </div>
    </div>
    <p className="border-t border-[#e5e0f7] bg-white/55 px-4 py-3 text-[10px] leading-5 text-[#858799]">Una misma romanización puede corresponder a distintas escrituras o significados. El sitio separa nombre, escritura, pronunciación y fuente en lugar de asumir que son equivalentes.</p>
  </aside>
}
