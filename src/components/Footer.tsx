import Link from'next/link';

export default function Footer(){
  return <footer className="mt-24 border-t border-[#e3e4e8] bg-white/70">
    <div className="gdn-shell grid gap-6 py-10 text-sm text-[#70747d] md:grid-cols-2">
      <div>
        <p className="font-bold text-[#34363e]">GeneradorDeNombres.net</p>
        <p className="mt-2 max-w-md leading-6">Herramientas gratuitas para encontrar nombres, apodos e identidades digitales sin formularios complicados.</p>
      </div>
      <nav className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
        <Link href="/sobre-nosotros">Sobre nosotros</Link>
        <Link href="/politica-de-privacidad">Privacidad</Link>
        <Link href="/terminos-y-condiciones">Términos</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
    </div>
  </footer>
}
