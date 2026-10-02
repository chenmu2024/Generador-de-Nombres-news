import{readFileSync}from'node:fs';
import{keywordPages}from'../src/data/keywordMaster';
import{internalLinkPriority}from'../src/data/internalLinkGraph';
import{topicClusters}from'../src/data/topicClusters';
import{footerNavigationGroups,indexableStaticRoutes,legalNavigation,noindexStaticRoutes,primaryNavigation,staticAppRoutes}from'../src/data/siteNavigation';

const errors:string[]=[];
const keywordPaths=new Set(keywordPages.map(page=>page.path));
const staticPaths=new Set<string>(staticAppRoutes);
const validPaths=new Set<string>([...keywordPaths,...staticPaths]);

function routePart(path:string){
  const base=(path.split('#')[0]||'/').split('?')[0]||'/';
  return base||'/';
}
function assertRoute(path:string,context:string){
  const route=routePart(path);
  if(!validPaths.has(route))errors.push(context+' points to unknown route: '+path);
}

const primarySeen=new Set<string>();
for(const item of primaryNavigation){
  assertRoute(item.href,'Primary navigation');
  if(primarySeen.has(item.href))errors.push('Duplicate primary navigation route: '+item.href);
  primarySeen.add(item.href);
}

const footerSeen=new Set<string>();
for(const group of footerNavigationGroups){
  for(const[,href]of group.links){
    assertRoute(href,'Footer navigation');
    if(footerSeen.has(href))errors.push('Duplicate footer navigation route: '+href);
    footerSeen.add(href);
  }
}
for(const item of legalNavigation)assertRoute(item.href,'Legal navigation');

const indexableStatic=new Set<string>(indexableStaticRoutes);
for(const path of noindexStaticRoutes){
  if(indexableStatic.has(path))errors.push('Static route cannot be both indexable and noindex: '+path);
}
const sitemapSource=readFileSync(new URL('../src/app/sitemap.ts',import.meta.url),'utf8');
if(!sitemapSource.includes('indexableStaticRoutes'))errors.push('Sitemap must use shared indexableStaticRoutes');
const favoritesSource=readFileSync(new URL('../src/app/favoritos/page.tsx',import.meta.url),'utf8');
if(!favoritesSource.includes('index:false')||!favoritesSource.includes('follow:true'))errors.push('/favoritos must remain noindex,follow');

for(const cluster of Object.values(topicClusters)){
  if(!keywordPaths.has(cluster.hubPath))errors.push('Topic cluster hub is not a keyword route: '+cluster.hubPath);
}

const home=readFileSync(new URL('../src/app/page.tsx',import.meta.url),'utf8');
if(!home.includes('id="todas-las-herramientas"')&&!readFileSync(new URL('../src/components/SiteDirectory.tsx',import.meta.url),'utf8').includes('id="todas-las-herramientas"'))errors.push('Missing #todas-las-herramientas directory target');
const homeRoutes=[...home.matchAll(/href:'(\/[^']*)'/g)].map(match=>match[1]);
for(const href of homeRoutes)assertRoute(href,'Homepage card');

const reached=new Set<string>(['/']);
const queue=['/'];
while(queue.length){
  const current=queue.shift()!;
  for(const target of internalLinkPriority[current]??[]){
    if(!keywordPaths.has(target)||reached.has(target))continue;
    reached.add(target);
    queue.push(target);
  }
}
for(const page of keywordPages){
  if(!reached.has(page.path))errors.push('Keyword route is not reachable from homepage priority graph: '+page.path);
}

for(const [source,targets]of Object.entries(internalLinkPriority)){
  if(!keywordPaths.has(source))errors.push('Internal-link graph has unknown source: '+source);
  for(const target of targets)if(!keywordPaths.has(target))errors.push('Internal-link graph has unknown target: '+source+' -> '+target);
}

if(errors.length){
  console.error('[Navigation Audit] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Navigation Audit] PASS — '+keywordPages.length+' keyword routes are reachable from home; '+primaryNavigation.length+' primary, '+footerSeen.size+' footer and '+legalNavigation.length+' legal routes validated.');
