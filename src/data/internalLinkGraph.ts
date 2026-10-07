import{keywordPages,keywordPageByPath,type KeywordPage}from'./keywordMaster';
import{topicClusters}from'./topicClusters';

export type InternalLinkRole='next-intent'|'priority'|'sibling';
export interface InternalLinkSuggestion{page:KeywordPage;role:InternalLinkRole}

export const internalLinkPriority:Record<string,string[]>={
  '/':['/nombres-free-fire','/nombres-de-mujer','/nombres-gatos','/nombres-japoneses','/nombres-para-tiendas','/nombres-roblox'],

  '/nombres-free-fire':['/generador-free-fire','/nombres-ff-unicos','/espacios-invisible-ff','/nombres-ff-mujeres','/nombres-clanes-ff'],
  '/generador-free-fire':['/nombres-ff-unicos','/espacios-invisible-ff','/nombres-free-fire','/nombres-ff-mujeres','/nombres-clanes-ff'],
  '/espacios-invisible-ff':['/generador-free-fire','/nombres-free-fire','/nombres-ff-unicos','/nombres-clanes-ff'],
  '/nombres-ff-unicos':['/generador-free-fire','/nombres-free-fire','/nombres-ff-mujeres','/espacios-invisible-ff','/nombres-clanes-ff'],
  '/nombres-ff-mujeres':['/nombres-ff-unicos','/generador-free-fire','/nombres-free-fire','/nombres-clanes-ff'],
  '/nombres-clanes-ff':['/generador-free-fire','/nombres-free-fire','/nombres-ff-unicos','/nombres-ff-mujeres','/espacios-invisible-ff'],

  '/nombres-roblox':['/nombres-anime','/nombres-instagram','/nombres-free-fire'],
  '/nombres-instagram':['/nombres-roblox','/nombres-anime','/nombres-de-mujer'],
  '/nombres-anime':['/nombres-roblox','/nombres-instagram','/nombres-free-fire','/nombres-japoneses'],

  '/nombres-de-mujer':['/nombres-de-nina','/nombres-unisex','/nombres-raros','/nombres-por-letra','/nombres-de-nino'],
  '/nombres-de-nina':['/nombres-de-mujer','/nombres-raros','/nombres-unisex','/nombres-por-letra','/nombres-de-nino'],
  '/nombres-de-nino':['/nombres-unisex','/nombres-raros','/nombres-por-letra','/nombres-de-mujer','/nombres-de-nina'],
  '/nombres-unisex':['/nombres-raros','/nombres-de-mujer','/nombres-de-nino','/nombres-por-letra','/nombres-de-nina'],
  '/nombres-raros':['/nombres-unisex','/nombres-de-nina','/nombres-de-nino','/nombres-de-mujer','/nombres-por-letra'],
  '/nombres-por-letra':['/nombres-con-a','/nombres-con-m','/nombres-con-en','/nombres-con-z','/nombres-de-mujer','/nombres-de-nino'],

  '/nombres-con-a':['/nombres-por-letra','/nombres-con-b','/nombres-con-c','/nombres-de-mujer'],
  '/nombres-con-b':['/nombres-por-letra','/nombres-con-a','/nombres-con-c','/nombres-de-mujer'],
  '/nombres-con-c':['/nombres-por-letra','/nombres-con-b','/nombres-con-e','/nombres-de-mujer'],
  '/nombres-con-e':['/nombres-por-letra','/nombres-con-f','/nombres-con-c','/nombres-de-mujer'],
  '/nombres-con-f':['/nombres-por-letra','/nombres-con-e','/nombres-con-m','/nombres-de-mujer'],
  '/nombres-con-m':['/nombres-por-letra','/nombres-con-f','/nombres-con-y','/nombres-de-mujer'],
  '/nombres-con-en':['/nombres-por-letra','/nombres-raros','/nombres-de-mujer'],
  '/nombres-con-y':['/nombres-por-letra','/nombres-con-z','/nombres-con-m','/nombres-raros'],
  '/nombres-con-z':['/nombres-por-letra','/nombres-con-y','/nombres-raros','/nombres-de-mujer'],

  '/nombres-japoneses':['/nombres-coreanos','/nombres-chinos','/nombres-ingles','/nombres-franceses','/nombres-de-dioses'],
  '/nombres-coreanos':['/nombres-japoneses','/nombres-chinos','/nombres-ingles','/nombres-franceses'],
  '/nombres-chinos':['/nombres-japoneses','/nombres-coreanos','/nombres-ingles','/nombres-turcos'],
  '/nombres-franceses':['/nombres-italianos','/nombres-ingles','/nombres-japoneses','/nombres-rusos'],
  '/nombres-italianos':['/nombres-franceses','/nombres-griegos','/nombres-ingles','/nombres-turcos'],
  '/nombres-mayas':['/nombres-de-dioses','/nombres-griegos','/nombres-japoneses','/nombres-turcos'],
  '/nombres-de-dioses':['/nombres-griegos','/nombres-mayas','/nombres-rusos','/nombres-japoneses'],
  '/nombres-rusos':['/nombres-griegos','/nombres-turcos','/nombres-ingles','/nombres-franceses'],
  '/nombres-griegos':['/nombres-de-dioses','/nombres-italianos','/nombres-rusos','/nombres-turcos'],
  '/nombres-ingles':['/nombres-franceses','/nombres-italianos','/nombres-japoneses','/nombres-coreanos'],
  '/nombres-turcos':['/nombres-griegos','/nombres-rusos','/nombres-italianos','/nombres-mayas'],

  '/nombres-gatos':['/nombres-gatos-negros','/nombres-gatos-machos','/nombres-perritas','/nombres-perros-machos','/nombres-peluches'],
  '/nombres-gatos-negros':['/nombres-gatos','/nombres-gatos-machos','/nombres-perritas','/nombres-peluches'],
  '/nombres-gatos-machos':['/nombres-gatos','/nombres-gatos-negros','/nombres-perros-machos','/nombres-perritas'],
  '/nombres-perritas':['/perritas-chihuahua','/nombres-perros-machos','/nombres-gatos','/nombres-peluches','/nombres-caballos'],
  '/nombres-perros-machos':['/nombres-perritas','/perritas-chihuahua','/nombres-gatos-machos','/nombres-caballos'],
  '/perritas-chihuahua':['/nombres-perritas','/nombres-perros-machos','/nombres-gatos','/nombres-peluches'],
  '/nombres-caballos':['/nombres-perritas','/nombres-perros-machos','/nombres-gatos','/nombres-peluches'],
  '/nombres-peluches':['/nombres-perritas','/nombres-gatos','/perritas-chihuahua','/nombres-de-nina'],

  '/nombres-para-tiendas':['/nombres-equipos-futbol'],
  '/nombres-equipos-futbol':['/nombres-para-tiendas'],
};

function uniquePaths(paths:string[],currentPath:string){
  const seen=new Set<string>();
  return paths.filter(path=>{
    if(path===currentPath||seen.has(path)||!keywordPageByPath.has(path))return false;
    seen.add(path);
    return true;
  });
}

export function getPriorityPaths(currentPath:string){
  return uniquePaths(internalLinkPriority[currentPath]||[],currentPath);
}

export function getInternalLinkSuggestions(currentPath:string,limit=6):InternalLinkSuggestion[]{
  const current=keywordPageByPath.get(currentPath);
  if(!current)return[];

  const priority=getPriorityPaths(currentPath);
  const results:InternalLinkSuggestion[]=priority
    .map((path,index)=>({page:keywordPageByPath.get(path)!,role:index<2?'next-intent' as const:'priority' as const}));

  const hubPath=topicClusters[current.cluster].hubPath;
  if(hubPath!==currentPath&&!results.some(item=>item.page.path===hubPath)){
    const hub=keywordPageByPath.get(hubPath);
    if(hub)results.splice(Math.min(2,results.length),0,{page:hub,role:'priority'});
  }

  for(const page of keywordPages){
    if(page.path===currentPath||page.cluster!==current.cluster||results.some(item=>item.page.path===page.path))continue;
    results.push({page,role:'sibling'});
    if(results.length>=limit)break;
  }

  return results.slice(0,limit);
}

export function getNextIntentPages(currentPath:string,limit=2){
  return getPriorityPaths(currentPath)
    .slice(0,limit)
    .map(path=>keywordPageByPath.get(path)!)
    .filter(Boolean);
}
