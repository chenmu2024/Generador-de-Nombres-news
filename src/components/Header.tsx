import Link from 'next/link';
import {Heart,Menu} from 'lucide-react';

const nav=[
  {label:'Juegos',href:'/nombres-free-fire'},
  {label:'Personas',href:'/nombres-de-mujer'},
  {label:'Mascotas',href:'/nombres-gatos'},
  {label:'Culturas',href:'/nombres-japoneses'},
  {label:'Negocios',href:'/nombres-para-tiendas'},
];

export default function Header(){
  return <header className="sticky top-0 z-50 border-b border-[#d9d1c4]/80 bg-[#f4efe6]/92 backdrop-blur-xl">
    <div className="gdn-shell flex h-[70px] items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-[#173128] text-[14px] font-bold text-[#f5efe4]">G</span>
        <div className="leading-none">
          <span className="brand-serif block text-[18px] font-bold tracking-[-.025em] text-[#17231c]">Generador</span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.2em] text-[#7c857e]">de nombres</span>
        </div>
      </Link>

      <nav className="hidden items-center gap-7 lg:flex">
        {nav.map(item=><Link key={item.href} href={item.href} className="text-[12px] font-semibold text-[#5c675f] transition hover:text-[#173128]">{item.label}</Link>)}
      </nav>

      <div className="flex items-center gap-2">
        <Link href="/favoritos" className="hidden items-center gap-2 rounded-full border border-[#cdc4b6] bg-[#fffaf2] px-4 py-2.5 text-[12px] font-semibold text-[#445149] transition hover:bg-white sm:inline-flex">
          <Heart size={14}/> Favoritos
        </Link>
        <details className="relative lg:hidden">
          <summary className="grid size-10 list-none place-items-center rounded-full border border-[#cdc4b6] bg-[#fffaf2] text-[#445149]"><Menu size={17}/></summary>
          <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[#d8d0c4] bg-[#fffdf8] p-2 shadow-xl">
            {nav.map(item=><Link key={item.href} href={item.href} className="block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-[#4e5b52] hover:bg-[#f3ede3]">{item.label}</Link>)}
            <Link href="/favoritos" className="mt-1 flex items-center gap-2 border-t border-[#ebe4d9] px-3 py-3 text-[13px] font-semibold text-[#24483b]"><Heart size={14}/>Favoritos</Link>
          </div>
        </details>
      </div>
    </div>
  </header>
}
