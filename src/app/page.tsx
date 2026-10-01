import Link from 'next/link';
import GeneratorPanel from '@/components/GeneratorPanel';
import IntentRouter from '@/components/IntentRouter';

const popular=[
  {label:'Free Fire',href:'/nombres-free-fire',desc:'Nicknames, símbolos y clanes'},
  {label:'Gatos negros',href:'/nombres-gatos-negros',desc:'Místicos, cortos y originales'},
  {label:'Nombres japoneses',href:'/nombres-japoneses',desc:'Kanji, romaji y contexto'},
  {label:'Tiendas',href:'/nombres-para-tiendas',desc:'Ideas para marcas y negocios'},
];

export default function HomePage(){
  return <>
    <section className="gdn-shell pb-10 pt-14 md:pb-14 md:pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="gdn-eyebrow">Nombres para la vida real y digital</p>
        <h1 className="mt-4 text-5xl font-black leading-[.98] tracking-[-.055em] text-[#17171b] md:text-7xl">Genera un nombre que <span className="gdn-gradient">sí quieras usar.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#696d77] md:text-lg">Encuentra nombres para juegos, bebés, mascotas, perfiles y negocios. Empieza por tu intención y llega a opciones que puedas comparar y copiar.</p>
      </div>
      <div className="mx-auto mt-10 max-w-5xl"><IntentRouter/></div>
    </section>

    <section className="gdn-shell grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <GeneratorPanel mode="general" defaultValue="Nova"/>
      <aside className="rounded-[28px] bg-[#17171b] p-6 text-white md:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#b9acff]">Popular ahora</p>
        <h2 className="mt-2 text-2xl font-black">Atajos para empezar rápido</h2>
        <div className="mt-5 space-y-2">
          {popular.map(item=><Link key={item.href} href={item.href} className="block rounded-2xl border border-white/10 bg-white/[.04] p-4 transition hover:bg-white/[.08]">
            <div className="flex items-center justify-between gap-3">
              <div><p className="font-extrabold">{item.label}</p><p className="mt-1 text-xs leading-5 text-[#b7bac4]">{item.desc}</p></div>
              <span className="text-[#b9acff]">↗</span>
            </div>
          </Link>)}
        </div>
      </aside>
    </section>

    <section className="gdn-shell mt-16">
      <div className="max-w-2xl">
        <p className="gdn-eyebrow">Más útil, menos ruido</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-.03em]">Cada tipo de nombre merece una herramienta distinta.</h2>
        <p className="mt-4 leading-7 text-[#70747e]">Un nickname necesita símbolos y estilos; un nombre de bebé necesita origen y significado; una mascota necesita personalidad; una tienda necesita tono de marca. Por eso las herramientas cambian según lo que quieras nombrar.</p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {[['🎮','Para jugar','Combina estilos, símbolos y versiones fáciles de copiar.'],['🐾','Para mascotas','Busca por personalidad, género, color o sensación.'],['👶','Para personas','Compara origen, significado, pronunciación y longitud.']].map(([icon,title,desc])=><div key={title} className="gdn-card rounded-3xl p-6"><span className="text-3xl">{icon}</span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#737782]">{desc}</p></div>)}
      </div>
    </section>
  </>
}
