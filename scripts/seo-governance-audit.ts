import{readFileSync}from'node:fs';
import{keywordPages}from'../src/data/keywordMaster';
import{topicClusters}from'../src/data/topicClusters';
import{internalLinkPriority}from'../src/data/internalLinkGraph';

const errors:string[]=[];
const paths=new Set<string>();
const ids=new Set<string>();
const primaryKeywords=new Set<string>();
const titles=new Set<string>();
const h1s=new Set<string>();

for(const page of keywordPages){
  if(paths.has(page.path))errors.push('Duplicate path: '+page.path);
  if(ids.has(page.id))errors.push('Duplicate id: '+page.id);
  if(primaryKeywords.has(page.primaryKeyword))errors.push('Duplicate primary keyword: '+page.primaryKeyword);
  if(titles.has(page.title))errors.push('Duplicate title: '+page.title);
  if(h1s.has(page.h1))errors.push('Duplicate H1: '+page.h1);
  paths.add(page.path);
  ids.add(page.id);
  primaryKeywords.add(page.primaryKeyword);
  titles.add(page.title);
  h1s.add(page.h1);
  if(!page.lockedKeyword||page.status!=='VERIFIED')errors.push('Unlocked page: '+page.path);
  if(!page.indexable)errors.push('Approved keyword page unexpectedly noindex: '+page.path);
  if(!topicClusters[page.cluster])errors.push('Missing cluster: '+page.path);
  if(!page.primaryKeyword.trim()||!page.h1.trim()||!page.title.trim()||!page.description.trim())errors.push('Incomplete metadata: '+page.path);
  if(page.title.length<20||page.title.length>65)errors.push('Title length out of bounds: '+page.path+' -> '+page.title.length);
  if(page.description.length<40||page.description.length>160)errors.push('Description length out of bounds: '+page.path+' -> '+page.description.length);
}

const inboundPriority=new Map<string,number>();
for(const page of keywordPages)inboundPriority.set(page.path,0);
for(const page of keywordPages){
  const targets=internalLinkPriority[page.path]||[];
  if(page.path!=='/'&&targets.length===0)errors.push('Missing priority internal links: '+page.path);
  const seen=new Set<string>();
  for(const target of targets){
    if(target===page.path)errors.push('Self internal link: '+page.path);
    if(seen.has(target))errors.push('Duplicate internal link: '+page.path+' -> '+target);
    seen.add(target);
    if(!paths.has(target))errors.push('Unknown internal link target: '+page.path+' -> '+target);
    else inboundPriority.set(target,(inboundPriority.get(target)||0)+1);
  }
}
for(const page of keywordPages){
  const isLetterDetail=page.path.startsWith('/nombres-con-');
  if(page.path!=='/'&&!isLetterDetail&&(inboundPriority.get(page.path)||0)===0)errors.push('No inbound priority link: '+page.path);
}

const read=(path:string)=>readFileSync(new URL(path,import.meta.url),'utf8');
const layout=read('../src/app/layout.tsx');
const home=read('../src/app/page.tsx');
const slug=read('../src/app/[slug]/page.tsx');
const directory=read('../src/app/directorio/page.tsx');
const robots=read('../src/app/robots.ts');
const sitemap=read('../src/app/sitemap.ts');
const favorites=read('../src/app/favoritos/page.tsx');
const llms=read('../src/app/llms.txt/route.ts');

const requiredLayout=[
  "metadataBase:new URL('https://generadordenombres.net')",
  "'@id':'https://generadordenombres.net/#organization'",
  "'@id':'https://generadordenombres.net/#website'",
  "publisher:{'@id':'https://generadordenombres.net/#organization'}",
  'application/ld+json',
];
for(const marker of requiredLayout)if(!layout.includes(marker))errors.push('Root SEO entity marker missing: '+marker);

if(!home.includes("alternates:{canonical:'/'}"))errors.push('Homepage canonical missing');
if(!home.includes("'@id':'https://generadordenombres.net/#webpage'"))errors.push('Homepage WebPage entity missing');
if(!home.includes("'@id':'https://generadordenombres.net/#application'"))errors.push('Homepage WebApplication entity missing');

for(const marker of [
  'canonical:page.path',
  "const pageNodeId=pageUrl+'#webpage'",
  "'@type':'WebApplication'",
  "'@type':'BreadcrumbList'",
  "'@type':'FAQPage'",
  "'@graph':[pageSchema",
])if(!slug.includes(marker))errors.push('Topic template SEO/GEO marker missing: '+marker);

if(!directory.includes("alternates:{canonical:'/directorio'}"))errors.push('Directory canonical missing');
if(!directory.includes("'@type':'CollectionPage'")||!directory.includes("'@type':'ItemList'"))errors.push('Directory entity graph incomplete');

if(!robots.includes("allow: '/'")||!robots.includes('https://generadordenombres.net/sitemap.xml'))errors.push('robots.ts does not expose crawl + sitemap policy');
if(!sitemap.includes("item.indexable && item.status === 'VERIFIED'"))errors.push('Sitemap must include only canonical approved keyword routes');
if(!favorites.includes('robots:{index:false,follow:true}'))errors.push('/favoritos must remain noindex,follow');

for(const marker of ['# GeneradorDeNombres.net','URL canónica','No implica una garantía de indexación, ranking ni citación']){
  if(!llms.includes(marker))errors.push('llms.txt interoperability marker missing: '+marker);
}

if(errors.length){
  console.error('[SEO Governance] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log(`[SEO Governance] PASS — ${keywordPages.length} VERIFIED/LOCKED routes + canonical, crawl, entity-graph and GEO interoperability gates.`);
