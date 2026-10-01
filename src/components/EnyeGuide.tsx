import {Info} from 'lucide-react';

export default function EnyeGuide(){
  return <aside className="mt-6 flex gap-3 rounded-[12px] border border-[#e0e2e7] bg-white px-4 py-3.5">
    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[8px] bg-[#f2f2f5] text-[#676b75]"><Info size={14}/></span>
    <div>
      <p className="text-[12px] font-semibold text-[#3a3d44]">Sobre la letra Ñ</p>
      <p className="mt-1 text-[12px] leading-5 text-[#747883]">Los nombres que empiezan por Ñ son muy poco frecuentes. Esta página distingue entre nombres que <strong>contienen Ñ</strong>, como Íñigo, Iñaki o Nuño, y formas históricas raras como Ñuflo. “Ñusta” no se trata aquí como nombre corriente porque las fuentes consultadas la describen principalmente como un título histórico inca.</p>
    </div>
  </aside>
}
