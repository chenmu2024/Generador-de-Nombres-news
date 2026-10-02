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
import CultureDataNote from'@/components/CultureDataNote';
import DatasetTrustNote from'@/components/DatasetTrustNote';
import NextStepPanel from'@/components/NextStepPanel';
import DecisionGuide from'@/components/DecisionGuide';
import FaqSection from'@/components/FaqSection';
import AdSlot from'@/components/AdSlot';
import IntentCollections from'@/components/IntentCollections';
import EnyeGuide from'@/components/EnyeGuide';
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
  const isEnye=page.path==='/nombres-con-en';
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

    {page.tool==='culture'&&<CultureDataNote items={items}/>}
    <NameGrid items={items} mode={page.tool} pagePath={page.path}/>
    <DatasetTrustNote items={items} mode={page.tool}/>
    <NextStepPanel page={page}/>
    {isEnye&&<EnyeGuide/>}
    <IntentCollections page={page} items={items}/>

    <DecisionGuide page={page}/>
    <AdSlot/>

    <FaqSection page={page}/>
    <RelatedLinks currentPath={page.path}/>
  </div>
}
