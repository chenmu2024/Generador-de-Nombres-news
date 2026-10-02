import Link from'next/link';
import{ArrowRight,Home,Search}from'lucide-react';

export default function NotFound(){
  return <div className="gdn-shell py-16 md:py-24">
    <div className="mx-auto max-w-[720px] overflow-hidden rounded-[24px] border border-[#e2def0] bg-white text-center shadow-[0_18px_52px_rgba(55,49,91,.08)]">
      <div className="bg-[linear-gradient(135deg,#f8f6ff,#fff)] px-6 py-12 sm:px-10 sm:py-16">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Search size={18}/></span>
        <p className="mt-5 text-[10px] font-black uppercase tracking-[.18em] text-[#8177e9]">Error 404</p>
        <h1 className="brand-serif mt-2 text-[38px] font-bold tracking-[-.04em] text-[#232432] sm:text-[48px]">Esta página no existe.</h1>
        <p className="mx-auto mt-4 max-w-lg text-[13px] leading-6 text-[#787b8d]">El enlace puede haber cambiado o la dirección no es correcta. Vuelve al inicio o usa la búsqueda para encontrar otra herramienta de nombres.</p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[11px] bg-[#5b4df5] px-5 text-[11px] font-semibold text-white transition hover:bg-[#5044de]"><Home size={13}/>Ir al inicio</Link>
          <Link href="/nombres-de-mujer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[11px] border border-[#dedaf0] bg-white px-5 text-[11px] font-semibold text-[#555869] transition hover:border-[#cfc8fb] hover:text-[#5146d6]">Explorar nombres <ArrowRight size={13}/></Link>
        </div>
      </div>
    </div>
  </div>
}
