import Link from'next/link';
import {Leaf} from 'lucide-react';

export default function Footer(){
  return <footer className="border-t border-[#eceaf2] bg-white">
    <div className="gdn-shell flex flex-col gap-7 py-7 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-[11px] bg-[#f0edff] text-[#5b4df5]"><Leaf size={18} fill="currentColor"/></span>
        <div>
          <p className="font-serif text-[15px] font-bold text-[#222330]">GeneradorDeNombres</p>
          <p className="mt-0.5 text-[10px] text-[#85889a]">Encuentra nombres únicos para juegos, personas, mascotas, culturas, negocios y más.</p>
        </div>
      </div>

      <nav aria-label="Información y políticas" className="flex flex-wrap items-center gap-5 text-[10px] font-medium text-[#64677a]">
        <Link href="/sobre-nosotros" className="hover:text-[#5b4df5]">Sobre nosotros</Link>
        <Link href="/politica-de-privacidad" className="hover:text-[#5b4df5]">Privacidad</Link>
        <Link href="/terminos-y-condiciones" className="hover:text-[#5b4df5]">Términos</Link>
        <Link href="/contacto" className="hover:text-[#5b4df5]">Contacto</Link>
      </nav>
    </div>
  </footer>
}
