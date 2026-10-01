import Link from 'next/link';
import {ArrowRight,Baby,Gamepad2,Globe2,PawPrint,Search,Store} from 'lucide-react';
import GeneratorPanel from '@/components/GeneratorPanel';

const categories=[
  {label:'Juegos',href:'/nombres-free-fire',icon:Gamepad2},
  {label:'Personas',href:'/nombres-de-mujer',icon:Baby},
  {label:'Mascotas',href:'/nombres-gatos',icon:PawPrint},
  {label:'Culturas',href:'/nombres-japoneses',icon:Globe2},
  {label:'Negocios',href:'/nombres-para-tiendas',icon:Store},
];

const popular=[
  {label:'Free Fire',href:'/nombres-free-fire',desc:'Nicknames, símbolos, espacios y clanes',accent:'#d97849'},
  {label:'Nombres para gatos',href:'/nombres-gatos',desc:'Tiernos, místicos, cortos y originales',accent:'#6c8977'},
  {label:'Nombres japoneses',href:'/nombres-japoneses',desc:'Escritura, pronunciación y contexto',accent:'#bb8f55'},
  {label:'Nombres para tiendas',href:'/nombres-para-tiendas',desc:'Ideas de marca por sector y estilo',accent:'#435c52'},
];

export default function HomePage(){
  return <>
    <section className="gdn-shell grid gap-10 pb-16 pt-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:pb-24 lg:pt-16">
      <div className="max-w-[620px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#d5cbbb] bg-[#fffaf2] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#657168]">
          <span className="size-1.5 rounded-full bg-[#d97849]"/> Ideas que sí se sienten tuyas
        </span>
        <h1 className="brand-serif mt-6 text-[52px] font-bold leading-[.98] tracking-[-.045em] text-[#17231c] sm:text-[64px] lg:text-[74px]">
          Encuentra un nombre con historia, estilo y personalidad.
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-[#667168]">
          No necesitas otra lista infinita. Empieza por la intención: un nickname que destaque, un nombre que suene bien, una marca que se recuerde o una idea para tu mascota.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map(({label,href,icon:Icon})=><Link key={href} href={href} className="group inline-flex items-center gap-2 rounded-full border border-[#d2c8b9] bg-[#fffaf2] px-4 py-2.5 text-[12px] font-semibold text-[#4f5c54] transition hover:-translate-y-.5 hover:border-[#9eab9f] hover:bg-white">
            <Icon size={14} className="text-[#4d6e5d]"/>{label}
          </Link>)}
        </div>

        <Link href="#generador" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#173128] px-5 py-3 text-[12px] font-bold text-[#fffaf2] transition hover:bg-[#24483b]">
          Empezar a crear <ArrowRight size={14}/>
        </Link>
      </div>

      <div className="relative mx-auto h-[520px] w-full max-w-[560px] lg:h-[610px]">
        <div className="absolute left-0 top-10 h-[300px] w-[56%] overflow-hidden rounded-[34px] border-[7px] border-[#f4efe6] bg-[#c8bba7] shadow-[0_22px_60px_rgba(38,48,40,.16)]">
          <img src="/visuals/hero-gaming.webp" alt="Estilo creativo para nombres de juegos" className="h-full w-full object-cover"/>
          <div className="absolute inset-x-4 bottom-4 rounded-full bg-[#17231c]/90 px-4 py-2 text-[11px] font-bold text-white backdrop-blur">Juegos & nicknames</div>
        </div>
        <div className="absolute right-0 top-0 h-[235px] w-[44%] overflow-hidden rounded-[30px] border-[7px] border-[#f4efe6] bg-[#ddc5af] shadow-[0_20px_50px_rgba(38,48,40,.13)]">
          <img src="/visuals/hero-people.webp" alt="Inspiración para nombres de personas" className="h-full w-full object-cover"/>
          <div className="absolute inset-x-3 bottom-3 rounded-full bg-[#fff8ec]/92 px-3 py-2 text-[10px] font-bold text-[#26362d]">Personas</div>
        </div>
        <div className="absolute bottom-0 right-3 h-[320px] w-[54%] overflow-hidden rounded-[34px] border-[7px] border-[#f4efe6] bg-[#a5b09f] shadow-[0_25px_65px_rgba(38,48,40,.17)]">
          <img src="/visuals/hero-pets.webp" alt="Inspiración para nombres de mascotas" className="h-full w-full object-cover"/>
          <div className="absolute inset-x-4 bottom-4 rounded-full bg-[#fff8ec]/92 px-4 py-2 text-[11px] font-bold text-[#26362d]">Mascotas</div>
        </div>
        <div className="absolute left-[14%] top-[68%] rounded-full border border-[#cbbfae] bg-[#fdf8ef] px-4 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#6b756d] shadow-sm">+40 herramientas</div>
      </div>
    </section>

    <section className="border-y border-[#d9d1c4] bg-[#ebe3d5]">
      <div className="gdn-shell flex flex-col gap-4 py-6 md:flex-row md:items-center">
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#39483f]"><Search size={15}/> ¿Ya sabes qué buscas?</div>
        <div className="flex flex-1 flex-wrap gap-2 md:justify-end">
          {['nombres para free fire','nombres para gatos negros','nombres japoneses','nombres para tiendas'].map((item,index)=><span key={item} className="rounded-full border border-[#cec4b6] bg-[#f8f2e8] px-3.5 py-2 text-[11px] font-semibold text-[#677168]">{index+1}. {item}</span>)}
        </div>
      </div>
    </section>

    <section id="generador" className="gdn-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div>
          <p className="gdn-eyebrow">Estudio de nombres</p>
          <h2 className="brand-serif mt-3 max-w-md text-[42px] font-bold leading-[1.02] tracking-[-.035em] text-[#17231c]">Empieza con una palabra. Nosotros hacemos el resto.</h2>
          <p className="mt-4 max-w-md text-[14px] leading-6 text-[#6b756e]">Prueba estilos, compara resultados y copia tus favoritos. La herramienta responde al instante mientras escribes.</p>
        </div>
        <GeneratorPanel mode="general" defaultValue="Nova"/>
      </div>
    </section>

    <section className="gdn-shell pb-8">
      <div className="flex items-end justify-between gap-5">
        <div>
          <p className="gdn-eyebrow">Explora por intención</p>
          <h2 className="brand-serif mt-2 text-[38px] font-bold tracking-[-.035em] text-[#17231c]">Herramientas populares</h2>
        </div>
        <Link href="/nombres-por-letra" className="hidden items-center gap-2 text-[12px] font-bold text-[#405a4d] sm:inline-flex">Ver directorio <ArrowRight size={14}/></Link>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {popular.map((item,index)=><Link key={item.href} href={item.href} className="group relative overflow-hidden rounded-[26px] border border-[#d7cdbf] bg-[#fffaf2] p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,48,40,.10)]">
          <div className="absolute right-0 top-0 h-full w-[34%] opacity-[.08]" style={{backgroundColor:item.accent}}/>
          <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#879087]">0{index+1}</span>
          <h3 className="brand-serif mt-8 text-[27px] font-bold tracking-[-.025em] text-[#1f2b24]">{item.label}</h3>
          <p className="mt-2 max-w-[320px] text-[12px] leading-5 text-[#748077]">{item.desc}</p>
          <span className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold text-[#405a4d]">Abrir herramienta <ArrowRight size={13} className="transition group-hover:translate-x-1"/></span>
        </Link>)}
      </div>
    </section>
  </>
}
