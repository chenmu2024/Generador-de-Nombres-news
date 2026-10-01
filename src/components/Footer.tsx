import Link from'next/link';

export default function Footer(){
  return <footer className="mt-24 border-t border-[#d8d0c4] bg-[#ebe3d5]">
    <div className="gdn-shell grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <p className="brand-serif text-[22px] font-bold text-[#173128]">Generador de Nombres</p>
        <p className="mt-2 max-w-lg text-[12px] leading-5 text-[#68736b]">Ideas con carácter para juegos, personas, mascotas, culturas y negocios. Explora, compara y guarda sin crear una cuenta.</p>
      </div>
      <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#657067]">
        <Link href="/sobre-nosotros">Sobre nosotros</Link>
        <Link href="/politica-de-privacidad">Privacidad</Link>
        <Link href="/terminos-y-condiciones">Términos</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
    </div>
  </footer>
}
