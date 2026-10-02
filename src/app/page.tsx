import type{Metadata}from'next';
import {ArrowRight,Baby,CheckCircle2,Gamepad2,Landmark,Leaf,PawPrint,ShieldCheck,Store,Zap} from 'lucide-react';
import IntentRouter from '@/components/IntentRouter';
import HomeFreeFireStudio from '@/components/HomeFreeFireStudio';
import HomeSavedNames from '@/components/HomeSavedNames';
import TrackedLink from '@/components/TrackedLink';
import {EXPERIMENTS} from '@/data/experiments';
import{keywordPageByPath}from'@/data/keywordMaster';

const homeSeo=keywordPageByPath.get('/')!;

export const metadata:Metadata={
  title:homeSeo.title,
  description:homeSeo.description,
  alternates:{canonical:'/'},
  openGraph:{
    title:homeSeo.title,
    description:homeSeo.description,
    url:'/',
    type:'website',
  },
};

const websiteSchema={
  '@context':'https://schema.org',
  '@type':'WebSite',
  name:'GeneradorDeNombres.net',
  alternateName:'GDN',
  url:'https://generadordenombres.net/',
  description:homeSeo.description,
  inLanguage:'es',
};

const heroCards=[
  {label:'Juegos',desc:'Free Fire, Roblox, Instagram y más',href:'/nombres-free-fire',image:'/visuals/hero-gaming.webp',icon:Gamepad2,tone:'bg-[#eef0ff] text-[#5146d6]'},
  {label:'Personas',desc:'Bebés, mujer, hombre y significados',href:'/nombres-de-mujer',image:'/visuals/hero-people.webp',icon:Baby,tone:'bg-[#fff0ed] text-[#e36e55]'},
  {label:'Mascotas',desc:'Gatos, perros, caballos y más',href:'/nombres-gatos',image:'/visuals/hero-pets.webp',icon:PawPrint,tone:'bg-[#fff3e8] text-[#f08b2f]'},
  {label:'Culturas',desc:'Japonés, coreano, latino, nórdico y más',href:'/nombres-japoneses',image:'/visuals/hero-culture.svg',icon:Landmark,tone:'bg-[#f8edff] text-[#a242ce]'},
  {label:'Negocios',desc:'Tiendas, marcas, proyectos y más',href:'/nombres-para-tiendas',image:'/visuals/hero-business.svg',icon:Store,tone:'bg-[#e9fbf0] text-[#24a362]'},
];

const popular=[
  {label:'Nombres para Free Fire',desc:'Nicknames, símbolos y clanes más populares',href:'/nombres-free-fire',icon:Gamepad2,tone:'bg-[#eef0ff] text-[#5146d6]'},
  {label:'Nombres de niña',desc:'Bonitos, modernos y con significado',href:'/nombres-de-nina',icon:Baby,tone:'bg-[#fff0ed] text-[#e36e55]'},
  {label:'Nombres de gatos',desc:'Tiernos, originales y únicos',href:'/nombres-gatos',icon:PawPrint,tone:'bg-[#fff3e8] text-[#f08b2f]'},
  {label:'Nombres para Roblox',desc:'Usernames y display names',href:'/nombres-roblox',icon:Zap,tone:'bg-[#edf2ff] text-[#3d70db]'},
  {label:'Nombres para perros',desc:'Por tamaño, color y personalidad',href:'/nombres-perros-machos',icon:PawPrint,tone:'bg-[#fff2e9] text-[#b97442]'},
  {label:'Nombres para tiendas',desc:'Ideas de marcas y negocios',href:'/nombres-para-tiendas',icon:Store,tone:'bg-[#eafaf0] text-[#27965d]'},
];

export default function HomePage(){
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/>
    <section className="home-hero">
      <div className="gdn-shell grid items-center gap-9 py-10 sm:py-14 lg:grid-cols-[1.03fr_.97fr] lg:py-16">
        <div className="max-w-[620px]">
          <p className="gdn-tech text-[11px] font-black uppercase tracking-[.28em] text-[#695cff]">Generador de nombres en español</p>
          <h1 className="gdn-display mt-4 text-[40px] font-bold leading-[.98] tracking-[-.045em] text-[#171827] sm:text-[58px] lg:text-[64px]">
            Encuentra un nombre que <span className="text-[#6558f5]">realmente</span> quieras usar.
          </h1>
          <p className="mt-5 max-w-[590px] text-[16px] leading-7 text-[#66697b]">
            Genera nombres únicos y con significado para juegos, personas, mascotas, negocios y muchas más ideas. Gratis, sin registro y listos para copiar.
          </p>

          <div className="mt-6">
            <IntentRouter/>
          </div>

          <div className="mt-5 grid gap-3 text-[11px] font-medium text-[#555869] sm:grid-cols-2 lg:grid-cols-4">
            <span className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#e9fbf0] text-[#24a362]"><ShieldCheck size={14}/></span>100% gratis</span>
            <span className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#f0edff] text-[#6558f5]"><Zap size={14}/></span>Sin registro</span>
            <span className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#eef2ff] text-[#4967dc]"><CheckCircle2 size={14}/></span>Al instante</span>
            <span className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#fff0f4] text-[#ff5c88]"><Leaf size={14}/></span>Favoritos</span>
          </div>
        </div>

        <div className="grid grid-cols-2 auto-rows-[160px] gap-3 sm:min-h-[390px] sm:grid-cols-12 sm:grid-rows-10 sm:auto-rows-auto">
          {heroCards.map((item,index)=>{
            const Icon=item.icon;
            const area=index===0?'col-span-2 sm:col-span-7 sm:row-span-5':index===1?'col-span-1 sm:col-span-5 sm:row-span-5':index===2?'col-span-1 sm:col-span-4 sm:row-span-5':index===3?'col-span-1 sm:col-span-4 sm:row-span-5':'col-span-1 sm:col-span-4 sm:row-span-5';
            return <TrackedLink key={item.href} href={item.href} placement="home-hero-cards" role={'hero-card-'+item.label.toLowerCase()} experimentId={EXPERIMENTS.homeHero} className={'group relative overflow-hidden rounded-[22px] border-2 border-white shadow-[0_16px_38px_rgba(58,48,112,.14)] '+area}>
              <img src={item.image} alt="" width="900" height="700" loading={index===0?'eager':'lazy'} fetchPriority={index===0?'high':'auto'} decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"/>
              <div className="absolute inset-x-2.5 bottom-2.5 rounded-[13px] sm:inset-x-3 sm:bottom-3 bg-white/94 p-2.5 shadow-[0_8px_20px_rgba(27,25,52,.14)] backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className={'grid size-7 shrink-0 place-items-center rounded-[9px] '+item.tone}><Icon size={14}/></span>
                  <div className="min-w-0">
                    <p className="gdn-editorial truncate text-[13px] font-bold text-[#242532]">{item.label}</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 sm:text-[9px] sm:leading-3.5 text-[#717486]">{item.desc}</p>
                  </div>
                </div>
              </div>
            </TrackedLink>;
          })}
        </div>
      </div>
    </section>

    <section className="gdn-shell mt-2">
      <HomeFreeFireStudio/>
    </section>

    <HomeSavedNames/>

    <section className="gdn-shell grid gap-7 py-12 lg:grid-cols-[220px_1fr] lg:items-start">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="gdn-display text-[31px] font-bold leading-[1.02] tracking-[-.035em] text-[#1c1d2a]">Herramientas populares</h2>
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#dad6f3] text-[#6558f5]"><ArrowRight size={15}/></span>
        </div>
        <p className="mt-4 text-[12px] leading-6 text-[#7c7f91]">Descubre las herramientas más usadas para cada necesidad.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {popular.map(item=>{
          const Icon=item.icon;
          return <TrackedLink key={item.href} href={item.href} placement="home-popular-tools" role={'popular-'+item.href.slice(1)} experimentId={EXPERIMENTS.homePopular} className="group flex min-h-[86px] items-center gap-3 rounded-[15px] border border-[#e6e4ee] bg-white p-3.5 shadow-[0_8px_24px_rgba(55,49,91,.05)] transition hover:-translate-y-0.5 hover:border-[#d7d1f0] hover:shadow-[0_14px_30px_rgba(55,49,91,.09)]">
            <span className={'grid size-12 shrink-0 place-items-center rounded-[14px] '+item.tone}><Icon size={21}/></span>
            <div className="min-w-0 flex-1">
              <p className="gdn-editorial text-[14px] font-bold text-[#292a37]">{item.label}</p>
              <p className="mt-1 text-[10px] leading-4 text-[#86899a]">{item.desc}</p>
            </div>
            <ArrowRight size={15} className="shrink-0 text-[#7e82a0] transition group-hover:translate-x-0.5 group-hover:text-[#6558f5]"/>
          </TrackedLink>;
        })}
      </div>
    </section>
  </>
}
