import type{Metadata}from'next';
import{notFound}from'next/navigation';
import PageIntro from'@/components/PageIntro';
import GeneratorPanel from'@/components/GeneratorPanel';
import NameGrid from'@/components/NameGrid';
import RelatedLinks from'@/components/RelatedLinks';
import AlphabetMatrix from'@/components/AlphabetMatrix';
import PlatformNameTool from'@/components/PlatformNameTool';
import FreeFireNameTool from'@/components/FreeFireNameTool';
import BrandNameTool from'@/components/BrandNameTool';
import DataQualityNote from'@/components/DataQualityNote';
import{keywordPageBySlug,keywordPages}from'@/data/keywordMaster';
import{getNamesForPath}from'@/data/nameDataset';
import{topicClusters}from'@/data/topicClusters';

export const dynamicParams=false;
export function generateStaticParams(){return keywordPages.filter(i=>i.path!=='/').map(i=>({slug:i.path.slice(1)}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const{slug}=await params;
  const page=keywordPageBySlug.get(slug);
  if(!page)return{title:'Página no encontrada',robots:{index:false,follow:false}};
  return{title:page.title,description:page.description,alternates:{canonical:page.path},openGraph:{title:page.title,description:page.description,url:page.path,type:'website'}};
}

function tips(tool:string){
  if(tool==='pet')return['Prueba nombres cortos y fáciles de reconocer.','Piensa en personalidad, tamaño y color.','Di tus favoritos en voz alta antes de decidir.'];
  if(tool==='culture')return['Compara escritura, romanización y pronunciación.','Revisa el contexto cultural antes de usar un nombre.','Guarda varias opciones antes de elegir.'];
  if(tool==='gaming')return['Prioriza legibilidad además de estilo.','Comprueba qué símbolos acepta tu juego.','Guarda 2–3 variantes antes de cambiar tu nickname.'];
  if(tool==='store')return['Busca que sea fácil de pronunciar y recordar.','Evita confusiones con marcas existentes.','Comprueba dominio y redes antes de decidir.'];
  if(tool==='football')return['Hazlo fácil de gritar y recordar.','Prueba una versión corta para escudos y camisetas.','Evita nombres demasiado parecidos a equipos conocidos.'];
  return['Empieza con una idea clara.','Compara varias opciones.','Guarda las que te funcionen mejor.'];
}

function freeFireVariant(path:string):'general'|'unique'|'women'|'clan'{
  if(path==='/nombres-ff-unicos')return'unique';
  if(path==='/nombres-ff-mujeres')return'women';
  if(path==='/nombres-clanes-ff')return'clan';
  return'general';
}

export default async function KeywordPageView({params}:{params:Promise<{slug:string}>}){
  const{slug}=await params;
  const page=keywordPageBySlug.get(slug);
  if(!page)notFound();

  const items=getNamesForPath(page.path);
  const cluster=topicClusters[page.cluster];
  const isRoblox=page.path==='/nombres-roblox';
  const isInstagram=page.path==='/nombres-instagram';
  const isAlphabet=page.path==='/nombres-por-letra';
  const isStore=page.path==='/nombres-para-tiendas';
  const isFreeFire=page.cluster==='freeFire'&&page.path!=='/espacios-invisible-ff';
  const isToolPage=isRoblox||isInstagram||isStore||isFreeFire||['general','gaming','invisible','store','football'].includes(page.tool);
  const showGenerator=!isRoblox&&!isInstagram&&!isAlphabet&&!isStore&&!isFreeFire&&['general','gaming','invisible','store','football'].includes(page.tool);

  const primarySchema=isToolPage
    ? {'@context':'https://schema.org','@type':'WebApplication',name:page.h1,description:page.description,url:'https://generadordenombres.net'+page.path,applicationCategory:'UtilityApplication',operatingSystem:'All',offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}
    : {'@context':'https://schema.org','@type':'CollectionPage',name:page.h1,description:page.description,url:'https://generadordenombres.net'+page.path,mainEntity:{'@type':'ItemList',itemListElement:items.slice(0,12).map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name}))}};

  const breadcrumbItems=[
    {'@type':'ListItem',position:1,name:'Inicio',item:'https://generadordenombres.net/'},
    ...(cluster.hubPath!==page.path?[{'@type':'ListItem',position:2,name:cluster.label,item:'https://generadordenombres.net'+cluster.hubPath}]:[]),
    {'@type':'ListItem',position:cluster.hubPath!==page.path?3:2,name:page.h1,item:'https://generadordenombres.net'+page.path},
  ];
  const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumbItems};

  return <div className="gdn-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify([primarySchema,breadcrumbSchema])}}/>
    <PageIntro page={page}/>

    {isRoblox&&<PlatformNameTool platform="roblox"/>}
    {isInstagram&&<PlatformNameTool platform="instagram"/>}
    {isAlphabet&&<AlphabetMatrix/>}
    {isStore&&<BrandNameTool/>}
    {isFreeFire&&<FreeFireNameTool variant={freeFireVariant(page.path)}/>}
    {showGenerator&&<GeneratorPanel mode={page.tool} defaultValue={page.tool==='football'?'Barrio':page.tool==='gaming'?'Vortex':'Nova'}/>}

    <NameGrid items={items} mode={page.tool}/>
    {page.tool==='culture'&&<DataQualityNote/>}

    <section className="mt-12 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <article className="gdn-card rounded-[28px] p-6 md:p-8">
        <p className="gdn-eyebrow">Cómo elegir mejor</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">No te quedes con la primera opción</h2>
        <p className="mt-4 max-w-2xl leading-7 text-[#70747e]">Compara varias alternativas, pruébalas en el contexto donde las vas a usar y guarda las que sigan funcionando después de unos minutos. Un buen nombre suele ser fácil de reconocer, recordar y volver a escribir.</p>
      </article>
      <aside className="rounded-[28px] border border-[#e3e4e9] bg-[#f0edff] p-6 md:p-8">
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#6446d8]">{cluster.label}</p>
        <h2 className="mt-2 text-xl font-black">Consejos rápidos</h2>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-[#626675]">
          {tips(page.tool).map(tip=><li key={tip} className="flex gap-3"><span className="text-[#6d4aff]">✓</span><span>{tip}</span></li>)}
        </ul>
      </aside>
    </section>

    <RelatedLinks currentPath={page.path} cluster={page.cluster}/>
  </div>
}
