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
import FaqSection from'@/components/FaqSection';
import AdSlot from'@/components/AdSlot';
import EnyeGuide from'@/components/EnyeGuide';
import KeywordIntentCoverage from'@/components/KeywordIntentCoverage';
import PageSpecificGuide from'@/components/PageSpecificGuide';
import CollectionSnapshot from'@/components/CollectionSnapshot';
import AnimeNameTool from'@/components/AnimeNameTool';
import PlushAdoptionTool from'@/components/PlushAdoptionTool';
import CompoundNameTool from'@/components/CompoundNameTool';
import KoreanContextTool from'@/components/KoreanContextTool';
import TopicSubnav from'@/components/TopicSubnav';
import PageSectionNav from'@/components/PageSectionNav';
import PageDataBrief from'@/components/PageDataBrief';
import PageDecisionChecklist from'@/components/PageDecisionChecklist';
import{keywordPageBySlug,keywordPages}from'@/data/keywordMaster';
import{getNamesForPath}from'@/data/nameDataset';
import{topicClusters}from'@/data/topicClusters';
import{getFaqs}from'@/data/contentModules';

export const dynamicParams=false;
export function generateStaticParams(){return keywordPages.filter(i=>i.path!=='/').map(i=>({slug:i.path.slice(1)}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const{slug}=await params;
  const page=keywordPageBySlug.get(slug);
  if(!page)return{title:'Página no encontrada',robots:{index:false,follow:false}};
  const socialImage={url:'/opengraph-image',width:1200,height:630,alt:'GeneradorDeNombres.net — nombres para juegos, personas, mascotas, culturas y negocios'};
  return{
    title:page.title,
    description:page.description,
    alternates:{canonical:page.path},
    openGraph:{title:page.title,description:page.description,url:page.path,type:'website',images:[socialImage]},
    twitter:{card:'summary_large_image',title:page.title,description:page.description,images:[socialImage.url]},
  };
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
  const isAnime=page.path==='/nombres-anime';
  const isAlphabet=page.path==='/nombres-por-letra';
  const isStore=page.path==='/nombres-para-tiendas';
  const isPlush=page.path==='/nombres-peluches';
  const isKorean=page.path==='/nombres-coreanos';
  const isCompoundFemale=page.path==='/nombres-de-mujer'||page.path==='/nombres-de-nina';
  const isCompoundMale=page.path==='/nombres-de-nino';
  const isEnye=page.path==='/nombres-con-en';
  const isFreeFire=page.cluster==='freeFire'&&page.path!=='/espacios-invisible-ff';
  const isToolPage=isRoblox||isInstagram||isAnime||isStore||isFreeFire||['general','gaming','invisible','store','football'].includes(page.tool);
  const generatorMode: 'football'|'invisible'|null=page.tool==='football'?'football':page.tool==='invisible'?'invisible':null;
  const showGenerator=generatorMode!==null;
  const hasPrimaryTool=isRoblox||isInstagram||isAnime||isAlphabet||isStore||isFreeFire||showGenerator;
  const hasResultCollection=!isAlphabet&&items.length>0;

  const alphabetPages=keywordPages.filter(item=>item.path.startsWith('/nombres-con-'));
  const faqs=getFaqs(page);
  const primarySchema=isToolPage
    ? {'@context':'https://schema.org','@type':'WebApplication',name:page.h1,description:page.description,url:'https://generadordenombres.net'+page.path,inLanguage:'es',applicationCategory:'UtilityApplication',operatingSystem:'All',offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}}
    : isAlphabet
      ? {'@context':'https://schema.org','@type':'CollectionPage',name:page.h1,description:page.description,url:'https://generadordenombres.net'+page.path,inLanguage:'es',mainEntity:{'@type':'ItemList',itemListElement:alphabetPages.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.h1,url:'https://generadordenombres.net'+item.path}))}}
      : {'@context':'https://schema.org','@type':'CollectionPage',name:page.h1,description:page.description,url:'https://generadordenombres.net'+page.path,inLanguage:'es',mainEntity:{'@type':'ItemList',itemListElement:items.slice(0,12).map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name}))}};

  const breadcrumbItems=[
    {'@type':'ListItem',position:1,name:'Inicio',item:'https://generadordenombres.net/'},
    ...(cluster.hubPath!==page.path?[{'@type':'ListItem',position:2,name:cluster.label,item:'https://generadordenombres.net'+cluster.hubPath}]:[]),
    {'@type':'ListItem',position:cluster.hubPath!==page.path?3:2,name:page.h1,item:'https://generadordenombres.net'+page.path},
  ];
  const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:breadcrumbItems};
  const faqSchema=faqs.length?{
    '@context':'https://schema.org',
    '@type':'FAQPage',
    inLanguage:'es',
    mainEntity:faqs.map(faq=>({
      '@type':'Question',
      name:faq.question,
      acceptedAnswer:{'@type':'Answer',text:faq.answer},
    })),
  }:null;
  const structuredData=faqSchema?[primarySchema,breadcrumbSchema,faqSchema]:[primarySchema,breadcrumbSchema];

  const pageTheme=isInstagram?'instagram':isRoblox?'roblox':page.tool;

  return <div className="gdn-shell gdn-page" data-tool={page.tool} data-theme={pageTheme}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <PageIntro page={page}/>
    <TopicSubnav page={page}/>
    <PageSectionNav page={page} hasPrimaryTool={hasPrimaryTool} hasResultCollection={hasResultCollection}/>

    {hasPrimaryTool&&<div id="herramienta" className="scroll-mt-24">
      {isRoblox&&<PlatformNameTool platform="roblox"/>}
      {isInstagram&&<PlatformNameTool platform="instagram"/>}
      {isAnime&&<AnimeNameTool/>}
      {isAlphabet&&<AlphabetMatrix/>}
      {isStore&&<BrandNameTool/>}
      {isFreeFire&&<FreeFireNameTool variant={freeFireVariant(page.path)}/>}
      {generatorMode&&<GeneratorPanel mode={generatorMode} defaultValue={generatorMode==='football'?'Barrio':'Nova'}/>}
    </div>}

    <PageSpecificGuide page={page} items={items}/>
    <PageDataBrief page={page} items={items}/>
    {!hasResultCollection&&<PageDecisionChecklist page={page}/>} 

    {page.tool==='culture'&&items.length>0&&<CultureDataNote items={items}/>}
    {isKorean&&<KoreanContextTool items={items}/>}
    {hasResultCollection&&<div id="coleccion" className="scroll-mt-24">
      <CollectionSnapshot items={items} mode={page.tool} pagePath={page.path}/>
      <NameGrid items={items} mode={page.tool} pagePath={page.path} pageLabel={page.primaryKeyword}/>
      <DatasetTrustNote items={items} mode={page.tool}/>
    </div>}
    {hasResultCollection&&<PageDecisionChecklist page={page}/>} 
    {(isCompoundFemale||isCompoundMale)&&<CompoundNameTool
      audience={isCompoundMale?'niño':'niña'}
      suggestions={items.filter(item=>item.verified===true&&Boolean(item.sourceUrl)).map(item=>item.name)}
    />}
    {isPlush&&<PlushAdoptionTool suggestions={items.slice(0,12).map(item=>item.name)}/>}
    {isEnye&&<EnyeGuide/>}
    <KeywordIntentCoverage page={page}/>

    <AdSlot/>
    <FaqSection page={page}/>
    <NextStepPanel page={page}/>
    <RelatedLinks currentPath={page.path}/>
  </div>
}
