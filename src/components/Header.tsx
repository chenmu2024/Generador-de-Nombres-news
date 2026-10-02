import Link from 'next/link';
import {Leaf,Menu} from 'lucide-react';
import HeaderSearch from './HeaderSearch';
import FavoritesNavLink from './FavoritesNavLink';

const nav=[
  {label:'Juegos',href:'/nombres-free-fire'},
  {label:'Personas',href:'/nombres-de-mujer'},
  {label:'Mascotas',href:'/nombres-gatos'},
  {label:'Culturas',href:'/nombres-japoneses'},
  {label:'Negocios',href:'/nombres-para-tiendas'},
  {label:'Recursos',href:'/nombres-por-letra'},
];

export default function Header(){
  return <header className="sticky top-0 z-50 border-b border-[#eceaf3] bg-white/95 backdrop-blur-xl">
    <div className="gdn-shell flex h-[64px] items-center justify-between gap-5">
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-[11px] bg-[#f0edff] text-[#5b4df5]"><Leaf size={18} fill="currentColor"/></span>
        <span className="font-serif text-[18px] font-bold tracking-[-.025em] text-[#171827]">GeneradorDeNombres</span>
      </Link>

      <nav className="hidden items-center gap-5 xl:flex">
        {nav.map(item=><Link key={item.href} href={item.href} className="text-[12px] font-medium text-[#55576a] transition hover:text-[#5b4df5]">{item.label}</Link>)}
      </nav>

      <div className="ml-auto flex items-center gap-2.5">
        <HeaderSearch/>
        <FavoritesNavLink/>
        <details className="relative xl:hidden">
          <summary className="grid size-10 list-none place-items-center rounded-full border border-[#e4e1ee] bg-white text-[#5b5d70]"><Menu size={17}/></summary>
          <div className="absolute right-0 mt-2 w-56 rounded-[14px] border border-[#e5e2ed] bg-white p-1.5 shadow-[0_18px_50px_rgba(43,39,74,.16)]">
            {nav.map(item=><Link key={item.href} className="block rounded-[10px] px-3 py-2.5 text-[12px] font-medium text-[#55576a] hover:bg-[#f7f5ff]" href={item.href}>{item.label}</Link>)}
            <FavoritesNavLink mobile/>
          </div>
        </details>
      </div>
    </div>
  </header>
}
