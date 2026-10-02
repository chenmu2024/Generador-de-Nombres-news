import Link from 'next/link';
import {ArrowRight,Heart,Shuffle} from 'lucide-react';
import type{KeywordPage} from '@/data/keywordMaster';
import{keywordPageByPath}from'@/data/keywordMaster';

type NextLink={href:string;label:string;description:string};

const map:Record<string,NextLink[]>={
  '/nombres-de-mujer':[
    {href:'/nombres-de-nina',label:'Ver nombres de niña',description:'Más ideas cortas, modernas y poco comunes.'},
    {href:'/nombres-unisex',label:'Explorar nombres unisex',description:'Opciones neutras para ampliar la búsqueda.'},
  ],
  '/nombres-de-nina':[
    {href:'/nombres-de-mujer',label:'Comparar nombres de mujer',description:'Amplía la selección con estilos clásicos y modernos.'},
    {href:'/nombres-raros',label:'Buscar nombres poco comunes',description:'Opciones menos previsibles y más distintivas.'},
  ],
  '/nombres-gatos':[
    {href:'/nombres-gatos-negros',label:'Nombres para gatos negros',description:'Ideas oscuras, elegantes y místicas.'},
    {href:'/nombres-gatos-machos',label:'Nombres para gatos machos',description:'Opciones cortas, fuertes y originales.'},
  ],
  '/nombres-perritas':[
    {href:'/perritas-chihuahua',label:'Nombres para chihuahua',description:'Opciones pequeñas, tiernas y fáciles de llamar.'},
    {href:'/nombres-perros-machos',label:'Nombres para perros machos',description:'Compara con opciones fuertes y cortas.'},
  ],
  '/nombres-free-fire':[
    {href:'/generador-free-fire',label:'Abrir generador Free Fire',description:'Crea variantes a partir de una palabra base.'},
    {href:'/espacios-invisible-ff',label:'Copiar espacio invisible',description:'Prueba caracteres invisibles para tu nickname.'},
  ],
  '/nombres-japoneses':[
    {href:'/nombres-coreanos',label:'Explorar nombres coreanos',description:'Hangul, romanización y fuentes verificadas.'},
    {href:'/nombres-chinos',label:'Explorar nombres chinos',description:'Hanzi, romanización y significados documentados.'},
  ],
  '/nombres-para-tiendas':[
    {href:'/nombres-equipos-futbol',label:'Probar nombres para equipos',description:'Otro generador de identidad para grupos y proyectos.'},
  ],
};

export default function NextStepPanel({page}:{page:KeywordPage}){
  const links=(map[page.path]||[]).filter(item=>keywordPageByPath.has(item.href));
  if(!links.length)return null;

  return <section className="mt-8 rounded-[20px] border border-[#ded9f5] bg-[#faf9ff] p-5 sm:p-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[540px]">
        <p className="gdn-eyebrow">Siguiente paso</p>
        <h2 className="brand-serif mt-2 text-[27px] font-bold tracking-[-.03em] text-[#252634]">No pierdas los nombres que ya te gustaron.</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#787b8d]">Guárdalos para comparar después o continúa con una búsqueda relacionada sin empezar de cero.</p>
        <Link href="/favoritos" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#5b4df5] px-4 text-[10px] font-semibold text-white transition hover:bg-[#5044de]">
          <Heart size={12}/> Abrir mis favoritos
        </Link>
      </div>

      <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2 lg:max-w-[560px]">
        {links.map(item=><Link key={item.href} href={item.href} className="group flex min-h-[92px] items-center gap-3 rounded-[15px] border border-[#e2def0] bg-white p-4 transition hover:border-[#cbc4f7] hover:shadow-[0_10px_24px_rgba(67,56,133,.07)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Shuffle size={13}/></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold text-[#404252]">{item.label}</span>
            <span className="mt-1 block text-[10px] leading-4 text-[#86899a]">{item.description}</span>
          </span>
          <ArrowRight size={13} className="shrink-0 text-[#9b9dab] transition group-hover:translate-x-0.5 group-hover:text-[#5b4df5]"/>
        </Link>)}
      </div>
    </div>
  </section>
}
