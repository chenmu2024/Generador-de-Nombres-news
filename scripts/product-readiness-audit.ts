import{keywordPages}from'../src/data/keywordMaster';
import{getNamesForPath}from'../src/data/nameDataset';

const errors:string[]=[];
const toolOnly=new Set([
  '/espacios-invisible-ff',
  '/nombres-equipos-futbol',
  '/nombres-para-tiendas',
]);

const specialMinimums:Record<string,number>={
  '/nombres-con-en':4,
};

function minimumFor(path:string,tool:string){
  if(specialMinimums[path]!==undefined)return specialMinimums[path];
  if(tool==='culture')return 6;
  if(tool==='pet')return 8;
  if(tool==='people')return 8;
  if(tool==='gaming')return 8;
  if(tool==='general')return 8;
  return 0;
}

for(const page of keywordPages){
  if(page.path==='/')continue;
  const items=getNamesForPath(page.path);

  if(toolOnly.has(page.path)){
    if(items.length!==0)errors.push('Tool-only route unexpectedly exposes list records: '+page.path);
    if(!['invisible','football','store'].includes(page.tool))errors.push('Tool-only route has wrong tool mode: '+page.path+' -> '+page.tool);
    continue;
  }

  const minimum=minimumFor(page.path,page.tool);
  if(items.length<minimum){
    errors.push('Product route is too thin: '+page.path+' has '+items.length+', expected at least '+minimum);
  }

  if(page.path==='/nombres-roblox'&&items.some(item=>!item.tags.includes('roblox')))errors.push('Roblox route contains non-Roblox records');
  if(page.path==='/nombres-instagram'&&items.some(item=>!item.tags.includes('instagram')))errors.push('Instagram route contains non-Instagram records');
  if(page.path==='/nombres-caballos'&&items.some(item=>!item.tags.includes('horse')))errors.push('Horse route contains non-horse records');
  if(page.path==='/nombres-peluches'&&items.some(item=>!item.tags.includes('plush')))errors.push('Plush route contains non-plush records');
}

const routesWithResults=keywordPages.filter(page=>page.path!=='/'&&!toolOnly.has(page.path));
const totalResults=routesWithResults.reduce((sum,page)=>sum+getNamesForPath(page.path).length,0);

if(errors.length){
  console.error('[Product Readiness] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log(
  '[Product Readiness] PASS — '+
  routesWithResults.length+' result-backed routes + '+
  toolOnly.size+' dedicated tool routes; '+
  totalResults+' route-level result slots validated.'
);
