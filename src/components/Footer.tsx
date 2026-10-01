import Link from'next/link';
import {Sparkles} from 'lucide-react';

export default function Footer(){
  return <footer className="mt-20 border-t border-[#e5e7eb] bg-white">
    <div className="gdn-shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-[#17181c] text-white">
          <Sparkles size={14}/>
        </span>
        <div>
          <p className="text-[13px] font-semibold text-[#303238]">GeneradorDeNombres.net</p>
          <p className="mt-1 max-w-md text-[12px] leading-5 text-[#858993]">Herramientas para explorar, comparar y guardar nombres sin crear una cuenta.</p>
        </div>
      </div>

      <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-[#6f737d]">
        <Link className="hover:text-[#22242a]" href="/sobre-nosotros">Sobre nosotros</Link>
        <Link className="hover:text-[#22242a]" href="/politica-de-privacidad">Privacidad</Link>
        <Link className="hover:text-[#22242a]" href="/terminos-y-condiciones">Términos</Link>
        <Link className="hover:text-[#22242a]" href="/contacto">Contacto</Link>
      </nav>
    </div>
  </footer>
}
