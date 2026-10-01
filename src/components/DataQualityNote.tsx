import {Info} from 'lucide-react';

export default function DataQualityNote(){
  return <aside className="mt-6 flex gap-3 rounded-[12px] border border-[#ddd9ff] bg-[#f7f6ff] px-4 py-3.5">
    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-[8px] bg-[#ece9ff] text-[#5b4df5]"><Info size={14}/></span>
    <div>
      <p className="text-[12px] font-semibold text-[#4e45b8]">Sobre los datos culturales</p>
      <p className="mt-1 text-[12px] leading-5 text-[#6f6b7f]">Un nombre puede tener distintas escrituras, romanizaciones o interpretaciones. La base separa fuente, verificación, confianza y fecha de revisión para distinguir registros confirmados de datos aún pendientes.</p>
    </div>
  </aside>
}
