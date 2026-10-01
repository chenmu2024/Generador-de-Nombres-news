import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';

const routes:Record<string,string>={
  A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',
  F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'
};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export default function AlphabetMatrix(){
  return <section className="overflow-hidden rounded-[14px] border border-[#e1e3e7] bg-white">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#eceef1] px-5 py-4">
      <div>
        <p className="gdn-eyebrow">Directorio A–Z</p>
        <h2 className="mt-1 text-[18px] font-semibold tracking-[-.02em]">Explora por inicial</h2>
      </div>
      <span className="text-[11px] font-medium text-[#8a8e97]">Las letras activas tienen página propia</span>
    </div>

    <div className="grid grid-cols-5 gap-px bg-[#eceef1] sm:grid-cols-9 md:grid-cols-[repeat(14,minmax(0,1fr))]">
      {letters.map(letter=>{
        const href=routes[letter];
        return href
          ?<Link key={letter} href={href} className="group flex aspect-square items-center justify-center gap-1 bg-white text-[13px] font-semibold text-[#393c43] transition hover:bg-[#f3f2ff] hover:text-[#5146c8]">
            {letter}<ArrowUpRight size={10} className="opacity-0 transition group-hover:opacity-100"/>
          </Link>
          :<span key={letter} title="Disponible en el directorio general" className="grid aspect-square place-items-center bg-[#fafafa] text-[13px] font-medium text-[#b1b4bb]">{letter}</span>;
      })}
    </div>
  </section>
}
