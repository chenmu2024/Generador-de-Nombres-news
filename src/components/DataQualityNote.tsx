import {Info} from 'lucide-react';
export default function DataQualityNote(){
  return <aside className="mt-6 flex gap-3 rounded-[16px] border border-[#ddd8ff] bg-[#f5f3ff] px-5 py-4"><span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-[#5b4df5] text-white"><Info size={14}/></span><div><p className="text-[11px] font-bold text-[#5b4df5]">Sobre los datos culturales</p><p className="mt-1 text-[11px] leading-5 text-[#737587]">Un nombre puede tener distintas escrituras, romanizaciones o interpretaciones. La base separa fuente, verificación, confianza y fecha de revisión.</p></div></aside>
}
