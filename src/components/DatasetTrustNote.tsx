import {BadgeCheck,Info,Tags} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';
import type{ToolMode} from '@/data/keywordMaster';

export default function DatasetTrustNote({items,mode}:{items:NameRecord[];mode:ToolMode}){
  if(mode!=='people'&&mode!=='pet')return null;

  if(mode==='people'){
    const sourced=items.filter(item=>item.meaning&&item.sourceUrl&&item.verified===true).length;
    const origins=items.filter(item=>item.origin).length;
    return <aside className="mt-6 overflow-hidden rounded-[17px] border border-[#e3def5] bg-[#faf9ff]">
      <div className="grid gap-px bg-[#e8e4f4] sm:grid-cols-3">
        <div className="bg-white/80 p-4">
          <div className="flex items-center gap-2 text-[#5b4df5]"><BadgeCheck size={14}/><span className="text-[10px] font-black uppercase tracking-[.12em]">Significados</span></div>
          <p className="mt-2 text-[11px] leading-5 text-[#747789]">{sourced} de {items.length} nombres tienen significado con fuente verificada.</p>
        </div>
        <div className="bg-white/80 p-4">
          <div className="flex items-center gap-2 text-[#5b4df5]"><Info size={14}/><span className="text-[10px] font-black uppercase tracking-[.12em]">Origen</span></div>
          <p className="mt-2 text-[11px] leading-5 text-[#747789]">{origins} de {items.length} registros tienen origen documentado en la base actual.</p>
        </div>
        <div className="bg-white/80 p-4">
          <div className="flex items-center gap-2 text-[#5b4df5]"><Tags size={14}/><span className="text-[10px] font-black uppercase tracking-[.12em]">Estilo</span></div>
          <p className="mt-2 text-[11px] leading-5 text-[#747789]">“Moderno”, “clásico” y “poco común” son etiquetas editoriales para explorar, no hechos lingüísticos.</p>
        </div>
      </div>
    </aside>
  }

  return <aside className="mt-6 flex gap-3 rounded-[17px] border border-[#e3def5] bg-[#faf9ff] px-5 py-4">
    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Tags size={15}/></span>
    <div>
      <p className="text-[11px] font-bold text-[#424456]">Cómo interpretar los filtros de mascotas</p>
      <p className="mt-1 text-[11px] leading-5 text-[#777a8c]">Color, tamaño y personalidad son etiquetas editoriales para ayudarte a encontrar nombres que encajen con una mascota. No describen una propiedad objetiva del nombre ni una regla de comportamiento animal.</p>
    </div>
  </aside>
}
