import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

const routes:Record<string,string>={A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export default function AlphabetMatrix(){
  return <section className="overflow-hidden rounded-[28px] border border-[#d5cbbb] bg-[#fffaf2]">
    <div className="border-b border-[#ded5c8] bg-[#efe7da] px-6 py-5"><p className="gdn-eyebrow">Directorio A–Z</p><h2 className="brand-serif mt-1 text-[28px] font-bold text-[#27382f]">Explora por inicial</h2><p className="mt-2 text-[11px] text-[#7b857d]">Las letras con demanda validada tienen página propia.</p></div>
    <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-[repeat(14,minmax(0,1fr))]">
      {letters.map(letter=>{const href=routes[letter];return href?<Link key={letter} href={href} className="group flex aspect-square items-center justify-center gap-1 border-b border-r border-[#e1d8cb] text-[14px] font-bold text-[#3b4e42] transition hover:bg-[#e4ece6]"><span>{letter}</span><ArrowRight size={10} className="opacity-0 transition group-hover:opacity-100"/></Link>:<span key={letter} className="grid aspect-square place-items-center border-b border-r border-[#e1d8cb] bg-[#f6f0e7] text-[13px] font-semibold text-[#b1aa9f]">{letter}</span>})}
    </div>
  </section>
}
