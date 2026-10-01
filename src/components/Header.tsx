import Link from 'next/link';
import { Heart, Menu, Sparkles } from 'lucide-react';

const nav=[
  {label:'Juegos',href:'/nombres-free-fire'},
  {label:'Personas',href:'/nombres-de-mujer'},
  {label:'Mascotas',href:'/nombres-gatos'},
  {label:'Culturas',href:'/nombres-japoneses'},
  {label:'Negocios',href:'/nombres-para-tiendas'},
];

export default function Header(){
  return <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-[#f8f8fa]/92 backdrop-blur-xl">
    <div className="gdn-shell flex h-15 items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-[10px] bg-[#17181c] text-white shadow-sm">
          <Sparkles size={15} strokeWidth={2.2}/>
        </span>
        <span className="text-[15px] font-semibold tracking-[-.02em] text-[#202126]">GeneradorDeNombres</span>
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {nav.map(item=><Link
          key={item.href}
          href={item.href}
          className="rounded-[9px] px-3 py-2 text-[13px] font-medium text-[#666a73] transition hover:bg-white hover:text-[#1f2025]"
        >{item.label}</Link>)}
      </nav>

      <div className="flex items-center gap-2">
        <Link href="/favoritos" className="hidden items-center gap-2 rounded-[9px] border border-[#dde0e5] bg-white px-3 py-2 text-[13px] font-medium text-[#4b4f58] shadow-[0_1px_2px_rgba(0,0,0,.03)] transition hover:border-[#c9ccd2] hover:text-[#22242a] sm:inline-flex">
          <Heart size={14.5}/>
          Favoritos
        </Link>

        <details className="relative md:hidden">
          <summary className="grid size-9 list-none place-items-center rounded-[9px] border border-[#dde0e5] bg-white text-[#4b4f58]">
            <Menu size={17}/>
          </summary>
          <div className="absolute right-0 mt-2 w-58 rounded-[12px] border border-[#e1e3e8] bg-white p-1.5 shadow-[0_16px_40px_rgba(20,22,26,.12)]">
            {nav.map(item=><Link key={item.href} className="block rounded-[8px] px-3 py-2.5 text-[13px] font-medium text-[#555963] hover:bg-[#f5f5f7]" href={item.href}>{item.label}</Link>)}
            <Link className="mt-1 flex items-center gap-2 border-t border-[#eeeeF2] px-3 py-2.5 text-[13px] font-medium text-[#5146c8]" href="/favoritos">
              <Heart size={14}/>
              Mis favoritos
            </Link>
          </div>
        </details>
      </div>
    </div>
  </header>
}
