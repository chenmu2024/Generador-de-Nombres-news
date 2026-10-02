import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {getNamesForPath} from '@/data/nameDataset';

const routes:Record<string,string>={A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
const counts=new Map(Object.values(routes).map(path=>[path,getNamesForPath(path).length] as const));

export default function AlphabetMatrix(){
  return <section className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_10px_28px_rgba(55,49,91,.045)]">
    <div className="border-b border-[#eceaf3] bg-[#faf9ff] px-5 py-5 sm:px-6">
      <p className="gdn-eyebrow">Directorio A–Z</p>
      <h2 className="brand-serif mt-1 text-[28px] font-bold text-[#292a39]">Explora por inicial</h2>
      <p className="mt-2 max-w-2xl text-[11px] leading-5 text-[#858899]">Las letras con demanda validada tienen página propia. El contador muestra cuántos nombres puedes explorar ahora mismo.</p>
    </div>
    <div className="grid grid-cols-5 gap-px bg-[#eceaf3] sm:grid-cols-9 md:grid-cols-[repeat(14,minmax(0,1fr))]">
      {letters.map(letter=>{
        const href=routes[letter];
        if(!href)return <span key={letter} title="Sin página específica validada" className="grid aspect-square place-items-center bg-[#faf9ff] text-[13px] font-semibold text-[#b0b1bd]">{letter}</span>;
        const count=counts.get(href)??0;
        return <Link key={letter} href={href} aria-label={'Nombres con '+letter+', '+count+' disponibles'} className="group flex aspect-square flex-col items-center justify-center gap-1 bg-white text-[#454758] transition hover:bg-[#f2efff] hover:text-[#5b4df5]">
          <span className="flex items-center gap-1 text-[14px] font-bold">{letter}<ArrowRight size={9} className="opacity-0 transition group-hover:opacity-100"/></span>
          <span className="text-[10px] font-semibold text-[#9a9cac]">{count}</span>
        </Link>;
      })}
    </div>
  </section>
}
