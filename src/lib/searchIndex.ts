import{keywordPages,keywordPageByPath}from'@/data/keywordMaster';
import{nameDataset,type NameRecord}from'@/data/nameDataset';

export interface SiteSearchItem{
  kind:'page'|'name';
  title:string;
  subtitle:string;
  path:string;
  titleKey:string;
  searchText:string;
}

const cultureRoutes:Record<string,string>={
  japanese:'/nombres-japoneses',
  korean:'/nombres-coreanos',
  french:'/nombres-franceses',
  italian:'/nombres-italianos',
  maya:'/nombres-mayas',
  russian:'/nombres-rusos',
  greek:'/nombres-griegos',
  english:'/nombres-ingles',
  turkish:'/nombres-turcos',
  chinese:'/nombres-chinos',
  mythology:'/nombres-de-dioses',
};

export function normalizeSearch(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
}

function has(item:NameRecord,tag:string){return item.tags.includes(tag)}

export function routeForName(item:NameRecord){
  if(item.type==='culture'){
    for(const [tag,path] of Object.entries(cultureRoutes))if(has(item,tag))return path;
    return '/nombres-de-mujer';
  }

  if(item.type==='pet'){
    if(has(item,'plush'))return'/nombres-peluches';
    if(has(item,'horse'))return'/nombres-caballos';
    if(has(item,'cat')&&has(item,'black'))return'/nombres-gatos-negros';
    if(has(item,'cat')&&has(item,'male'))return'/nombres-gatos-machos';
    if(has(item,'cat'))return'/nombres-gatos';
    if(has(item,'dog')&&has(item,'chihuahua'))return'/perritas-chihuahua';
    if(has(item,'dog')&&has(item,'female'))return'/nombres-perritas';
    if(has(item,'dog')&&has(item,'male'))return'/nombres-perros-machos';
    return'/nombres-gatos';
  }

  if(item.type==='game'){
    if(has(item,'roblox'))return'/nombres-roblox';
    if(has(item,'instagram'))return'/nombres-instagram';
    if(has(item,'anime'))return'/nombres-anime';
    if(has(item,'freefire')&&has(item,'female'))return'/nombres-ff-mujeres';
    if(has(item,'freefire')&&has(item,'clan'))return'/nombres-clanes-ff';
    if(has(item,'freefire')&&has(item,'unique'))return'/nombres-ff-unicos';
    if(has(item,'freefire'))return'/nombres-free-fire';
    return'/nombres-free-fire';
  }

  if(has(item,'rare'))return'/nombres-raros';
  if(item.gender==='U')return'/nombres-unisex';
  if(item.gender==='M')return'/nombres-de-nino';
  return'/nombres-de-mujer';
}

function nameSubtitle(item:NameRecord){
  const parts=[item.origin,item.meaning].filter(Boolean) as string[];
  return parts.join(' · ').slice(0,150)||(
    item.type==='pet'?'Nombre para mascota':
    item.type==='game'?'Nombre para juego':
    item.type==='culture'?'Nombre cultural':
    'Nombre'
  );
}

export function buildSearchIndex():SiteSearchItem[]{
  const pages:SiteSearchItem[]=keywordPages.filter(page=>page.path!=='/').map(page=>({
    kind:'page',
    title:page.h1,
    subtitle:page.description,
    path:page.path,
    titleKey:normalizeSearch(page.h1),
    searchText:normalizeSearch([page.h1,page.primaryKeyword,...page.secondaryKeywords,page.description].join(' ')),
  }));

  const seen=new Set<string>();
  const names:SiteSearchItem[]=[];
  for(const item of nameDataset){
    const path=routeForName(item);
    if(!keywordPageByPath.has(path))continue;
    const key=normalizeSearch(item.name)+'|'+path;
    if(seen.has(key))continue;
    seen.add(key);
    names.push({
      kind:'name',
      title:item.name,
      subtitle:nameSubtitle(item),
      path,
      titleKey:normalizeSearch(item.name),
      searchText:normalizeSearch([item.name,item.origin,item.meaning,item.script,item.pronunciation,...item.tags].filter(Boolean).join(' ')),
    });
  }

  return[...pages,...names];
}
