import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

const routes:Record<string,string>={A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export default function AlphabetMatrix(){
  return <section className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_10px_28px_rgba(55,49,91,.045)]">
    <div className="border-b border-[#eceaf3] bg-[#faf9ff] px-6 py-5"><p className="gdn-eyebrow">Directorio A–Z</p><h2 className="brand-serif mt-1 text-[28px] font-bold text-[#292a39]">Explora por inicial</h2><p className="mt-2 text-[11px] text-[#858899]">Las letras con demanda validada tienen página propia.</p></div>
    <div className="grid grid-cols-5 gap-px bg-[#eceaf3] sm:grid-cols-9 md:grid-cols-[repeat(14,minmax(0,1fr))]">
      {letters.map(letter=>{const href=routes[letter];return href?<Link key={letter} href={href} className="group flex aspect-square items-center justify-center gap-1 bg-white text-[14px] font-bold text-[#454758] transition hover:bg-[#f2efff] hover:text-[#5b4df5]"><span>{letter}</span><ArrowRight size={10} className="opacity-0 transition group-hover:opacity-100"/></Link>:<span key={letter} className="grid aspect-square place-items-center bg-[#faf9ff] text-[13px] font-semibold text-[#b0b1bd]">{letter}</span>})}
    </div>
  </section>
}
