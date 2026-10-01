import Link from 'next/link';

const routes:Record<string,string>={
  A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',
  F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'
};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export default function AlphabetMatrix(){
  return <section className="gdn-card rounded-[28px] p-5 md:p-7">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="gdn-eyebrow">Directorio A–Z</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Explora nombres por inicial</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#737782]">Las letras con página propia ya tienen demanda validada. Las demás se mantienen dentro del directorio hasta justificar una URL independiente.</p>
      </div>
      <span className="text-xs font-semibold text-[#858995]">Sin crear páginas innecesarias</span>
    </div>
    <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-9 md:grid-cols-14">
      {letters.map(letter=>{
        const href=routes[letter];
        return href
          ? <Link key={letter} href={href} className="grid aspect-square place-items-center rounded-2xl border border-[#cfc7ff] bg-[#f2efff] text-sm font-black text-[#5b3bd2] transition hover:-translate-y-0.5 hover:bg-[#ebe6ff]">{letter}</Link>
          : <span key={letter} title="Disponible en el buscador general" className="grid aspect-square place-items-center rounded-2xl border border-[#e5e6ea] bg-[#fafafb] text-sm font-black text-[#a0a3ac]">{letter}</span>;
      })}
    </div>
  </section>
}
