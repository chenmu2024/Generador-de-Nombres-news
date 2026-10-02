import Link from'next/link';
import {Leaf} from 'lucide-react';

const groups=[
  {
    title:'Juegos',
    links:[
      ['Free Fire','/nombres-free-fire'],
      ['Roblox','/nombres-roblox'],
      ['Instagram','/nombres-instagram'],
      ['Anime','/nombres-anime'],
    ],
  },
  {
    title:'Personas',
    links:[
      ['Nombres de mujer','/nombres-de-mujer'],
      ['Nombres de niña','/nombres-de-nina'],
      ['Nombres de niño','/nombres-de-nino'],
      ['Nombres unisex','/nombres-unisex'],
    ],
  },
  {
    title:'Mascotas',
    links:[
      ['Gatos','/nombres-gatos'],
      ['Perritas','/nombres-perritas'],
      ['Perros machos','/nombres-perros-machos'],
      ['Caballos','/nombres-caballos'],
    ],
  },
  {
    title:'Culturas',
    links:[
      ['Japoneses','/nombres-japoneses'],
      ['Coreanos','/nombres-coreanos'],
      ['Franceses','/nombres-franceses'],
      ['Chinos','/nombres-chinos'],
    ],
  },
  {
    title:'Más',
    links:[
      ['Tiendas y negocios','/nombres-para-tiendas'],
      ['Equipos de fútbol','/nombres-equipos-futbol'],
      ['Nombres por letra','/nombres-por-letra'],
      ['Mis favoritos','/favoritos'],
    ],
  },
] as const;

export default function Footer(){
  return <footer className="mt-16 border-t border-[#e9e6f1] bg-[#f7f6fb]">
    <div className="gdn-shell py-10 sm:py-12">
      <div className="grid gap-9 border-b border-[#e5e2ed] pb-9 lg:grid-cols-[1.35fr_3.65fr] lg:gap-12">
        <div className="max-w-[310px]">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-[12px] bg-[#ebe8ff] text-[#5b4df5]"><Leaf size={19} fill="currentColor"/></span>
            <span className="gdn-display text-[19px] font-bold tracking-[-.03em] text-[#20212f]">GeneradorDeNombres</span>
          </Link>
          <p className="mt-4 text-[12px] leading-6 text-[#737688]">Herramientas y colecciones para encontrar nombres que puedas comparar, personalizar, copiar y volver a revisar.</p>
          <p className="gdn-tech mt-5 text-[9px] font-bold uppercase tracking-[.16em] text-[#9a9cab]">Gratis · Sin registro · En español</p>
        </div>

        <nav aria-label="Explorar categorías" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {groups.map(group=><div key={group.title}>
            <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#4e5060]">{group.title}</p>
            <div className="mt-3 grid gap-2.5">
              {group.links.map(([label,href])=><Link key={href} href={href} className="text-[11px] leading-5 text-[#777a8b] transition hover:text-[#5b4df5]">{label}</Link>)}
            </div>
          </div>)}
        </nav>
      </div>

      <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] leading-5 text-[#9698a7]">© {new Date().getFullYear()} GeneradorDeNombres.net</p>
        <nav aria-label="Información y políticas" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium text-[#6b6e7f]">
          <Link href="/sobre-nosotros" className="hover:text-[#5b4df5]">Sobre nosotros</Link>
          <Link href="/politica-de-privacidad" className="hover:text-[#5b4df5]">Privacidad</Link>
          <Link href="/terminos-y-condiciones" className="hover:text-[#5b4df5]">Términos</Link>
          <Link href="/contacto" className="hover:text-[#5b4df5]">Contacto</Link>
        </nav>
      </div>
    </div>
  </footer>
}
