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
          <div className="flex items-center gap-2 gdn-theme-accent"><BadgeCheck size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Significados</span></div>
          <p className="mt-2 text-[11px] leading-5 text-[#747789]">{sourced} de {items.length} nombres tienen significado con fuente verificada. Los demás significados, cuando aparecen, se muestran como orientación editorial.</p>
        </div>
        <div className="bg-white/80 p-4">
          <div className="flex items-center gap-2 gdn-theme-accent"><Info size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Origen</span></div>
          <p className="mt-2 text-[11px] leading-5 text-[#747789]">{origins} de {items.length} registros tienen origen documentado en la base actual.</p>
        </div>
        <div className="bg-white/80 p-4">
          <div className="flex items-center gap-2 gdn-theme-accent"><Tags size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Estilo</span></div>
          <p className="mt-2 text-[11px] leading-5 text-[#747789]">“Moderno”, “clásico” y “poco común” son etiquetas editoriales para explorar, no hechos lingüísticos.</p>
        </div>
      </div>
    </aside>
  }

  const colorTags=new Set(['black','orange','white','gray','brown']);
  const sizeTags=new Set(['small','large']);
  const personalityTags=new Set(['cute','playful','calm','strong','elegant','mystic','kawaii']);
  const colorCoverage=items.filter(item=>item.tags.some(tag=>colorTags.has(tag))).length;
  const sizeCoverage=items.filter(item=>item.tags.some(tag=>sizeTags.has(tag))).length;
  const personalityCoverage=items.filter(item=>item.tags.some(tag=>personalityTags.has(tag))).length;

  return <aside className="mt-6 overflow-hidden rounded-[17px] border border-[var(--page-border)] bg-[var(--page-soft)]">
    <div className="grid gap-px bg-[var(--page-border)] sm:grid-cols-3">
      <div className="bg-white/85 p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><Tags size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Personalidad</span></div>
        <p className="mt-2 text-[11px] leading-5 text-[#747789]">{personalityCoverage} de {items.length} nombres tienen al menos una etiqueta como tierno, juguetón, fuerte o tranquilo.</p>
      </div>
      <div className="bg-white/85 p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><Info size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Tamaño</span></div>
        <p className="mt-2 text-[11px] leading-5 text-[#747789]">{sizeCoverage} de {items.length} registros están clasificados como pequeños o grandes para facilitar la exploración.</p>
      </div>
      <div className="bg-white/85 p-4">
        <div className="flex items-center gap-2 gdn-theme-accent"><BadgeCheck size={14}/><span className="gdn-tech text-[10px] font-black uppercase tracking-[.1em]">Color</span></div>
        <p className="mt-2 text-[11px] leading-5 text-[#747789]">{colorCoverage} de {items.length} incluyen una asociación editorial de color. Estas etiquetas son ayudas de búsqueda, no propiedades objetivas del nombre.</p>
      </div>
    </div>
  </aside>
}
