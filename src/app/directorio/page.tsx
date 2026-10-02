import type{Metadata}from'next';
import SiteDirectory from'@/components/SiteDirectory';
import DirectoryQuickFinder from'@/components/DirectoryQuickFinder';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

const pages=keywordPages.filter(page=>page.path!=='/');

export const metadata:Metadata={
  title:'Directorio de generadores y nombres | GeneradorDeNombres.net',
  description:'Explora todas las herramientas y páginas de nombres para juegos, personas, mascotas, culturas, letras y negocios desde un único directorio.',
  alternates:{canonical:'/directorio'},
  openGraph:{
    title:'Directorio de generadores y nombres',
    description:'Todas las herramientas y páginas de GeneradorDeNombres.net organizadas por tema.',
    url:'/directorio',
    type:'website',
  },
};

const structuredData={
  '@context':'https://schema.org',
  '@type':'CollectionPage',
  name:'Directorio de generadores y nombres',
  url:'https://generadordenombres.net/directorio',
  inLanguage:'es',
  mainEntity:{
    '@type':'ItemList',
    numberOfItems:pages.length,
    itemListElement:pages.map((page,index)=>({
      '@type':'ListItem',
      position:index+1,
      name:page.h1,
      url:'https://generadordenombres.net'+page.path,
    })),
  },
};

export default function DirectoryPage(){
  const clusterCount=Object.keys(topicClusters).length;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
    <section className="gdn-shell pb-3 pt-10 sm:pt-14">
      <div className="max-w-3xl">
        <p className="gdn-eyebrow">Mapa del sitio útil</p>
        <h1 className="gdn-display mt-3 text-[42px] font-bold leading-[1] tracking-[-.045em] text-[#171827] sm:text-[58px]">Directorio completo de generadores y nombres</h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#686b7c]">Encuentra todas las páginas del sitio sin depender del buscador: juegos, personas, mascotas, culturas, iniciales, equipos y negocios.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#ddd8f2] bg-[#f6f4ff] px-3 py-1.5 text-[10px] font-bold text-[#5c52c2]">{pages.length} páginas</span>
          <span className="rounded-full border border-[#e2dfeb] bg-white px-3 py-1.5 text-[10px] font-bold text-[#696c7d]">{clusterCount} grupos temáticos</span>
          <span className="rounded-full border border-[#e2dfeb] bg-white px-3 py-1.5 text-[10px] font-bold text-[#696c7d]">Acceso directo</span>
        </div>
      </div>
    </section>
    <DirectoryQuickFinder pages={pages.map(page=>({
      label:page.h1,
      description:page.description,
      href:page.path,
      cluster:topicClusters[page.cluster].label,
    }))}/>
    <SiteDirectory/>
  </>;
}
