import Link from 'next/link';

const nav=[
  {label:'Juegos',href:'/nombres-free-fire'},
  {label:'Personas',href:'/nombres-de-mujer'},
  {label:'Mascotas',href:'/nombres-gatos'},
  {label:'Culturas',href:'/nombres-japoneses'},
  {label:'Negocios',href:'/nombres-para-tiendas'},
];

export default function Header(){
  return <header className="sticky top-0 z-50 border-b border-[#e8e8ed] bg-[#f7f7f4]/90 backdrop-blur-xl">
    <div className="gdn-shell flex h-17 items-center justify-between gap-4">
      <Link href="/" className="flex items-center gap-3 font-black tracking-[-.02em]">
        <span className="grid size-9 place-items-center rounded-xl bg-[#17171b] text-sm text-white">GDN</span>
        <span className="hidden sm:inline">GeneradorDeNombres</span>
      </Link>
      <nav className="hidden items-center gap-1 text-sm font-semibold text-[#5d616c] md:flex">
        {nav.map(item=><Link key={item.href} className="rounded-xl px-3 py-2 hover:bg-white hover:text-[#17171b]" href={item.href}>{item.label}</Link>)}
      </nav>
      <details className="relative md:hidden">
        <summary className="list-none rounded-xl border border-[#dedfe5] bg-white px-3 py-2 text-sm font-bold">Menú</summary>
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#e1e2e7] bg-white p-2 shadow-xl">
          {nav.map(item=><Link key={item.href} className="block rounded-xl px-3 py-3 text-sm font-semibold text-[#4f545f] hover:bg-[#f5f4fb]" href={item.href}>{item.label}</Link>)}
        </div>
      </details>
    </div>
  </header>
}
