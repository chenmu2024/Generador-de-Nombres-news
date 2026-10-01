import Link from 'next/link';
import {ArrowUpRight,CheckCircle2,Sparkles} from 'lucide-react';
import GeneratorPanel from '@/components/GeneratorPanel';
import IntentRouter from '@/components/IntentRouter';

const popular=[
  {label:'Free Fire',href:'/nombres-free-fire',desc:'Nicknames, símbolos y clanes'},
  {label:'Gatos negros',href:'/nombres-gatos-negros',desc:'Místicos, cortos y originales'},
  {label:'Nombres japoneses',href:'/nombres-japoneses',desc:'Escritura, pronunciación y contexto'},
  {label:'Tiendas',href:'/nombres-para-tiendas',desc:'Nombres para marcas y negocios'},
];

export default function HomePage(){
  return <>
    <section className="gdn-shell pb-12 pt-16 md:pb-16 md:pt-24">
      <div className="max-w-[760px]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e1e3e8] bg-white px-3 py-1.5 text-[12px] font-medium text-[#626670] shadow-[0_1px_2px_rgba(20,22,26,.025)]">
          <Sparkles size={13.5} className="text-[#5b4df5]"/>
          Generador de nombres en español
        </div>
        <h1 className="text-[46px] font-semibold leading-[.98] tracking-[-.055em] text-[#17181c] sm:text-[58px] md:text-[68px]">
          Encuentra un nombre que realmente quieras usar.
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-7 text-[#666a74] md:text-[17px]">
          Herramientas específicas para juegos, personas, mascotas, perfiles y negocios. Busca, genera, compara y guarda sin crear una cuenta.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-[#777b85]">
          {['Gratis','Sin registro','Favoritos locales'].map(item=><span key={item} className="inline-flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#5b4df5]"/>{item}</span>)}
        </div>
      </div>

      <div className="mt-10 max-w-5xl">
        <IntentRouter/>
      </div>
    </section>

    <section className="gdn-shell">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="gdn-eyebrow">Prueba rápida</p>
          <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-.03em] text-[#1d1f24]">Genera una primera tanda</h2>
        </div>
        <span className="hidden text-[12px] font-medium text-[#8b8f98] sm:block">Escribe una palabra base y compara variantes</span>
      </div>
      <GeneratorPanel mode="general" defaultValue="Nova"/>
    </section>

    <section className="gdn-shell mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="gdn-eyebrow">Explora</p>
          <h2 className="mt-1.5 text-[24px] font-semibold tracking-[-.03em]">Puntos de entrada populares</h2>
        </div>
      </div>

      <div className="mt-5 divide-y divide-[#eceef1] overflow-hidden rounded-[14px] border border-[#e1e3e7] bg-white">
        {popular.map(item=><Link key={item.href} href={item.href} className="group flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-[#fafafa] sm:px-5">
          <div>
            <p className="text-[14px] font-semibold text-[#2b2d33] group-hover:text-[#4f45c8]">{item.label}</p>
            <p className="mt-1 text-[12px] text-[#858993]">{item.desc}</p>
          </div>
          <ArrowUpRight size={16} className="shrink-0 text-[#a0a4ad] transition group-hover:text-[#5b4df5]"/>
        </Link>)}
      </div>
    </section>
  </>
}
