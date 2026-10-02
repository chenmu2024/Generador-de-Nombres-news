import{readFileSync}from'node:fs';
import{keywordPageByPath,keywordPages}from'../src/data/keywordMaster';
import{getNamesForPath}from'../src/data/nameDataset';
import{getQuickPresets,matchesQuickPreset,quickPresetsByPath}from'../src/data/nameGridPresets';
import{getKeywordAction}from'../src/lib/keywordAction';

const errors:string[]=[];
const routePaths=new Set(keywordPages.map(page=>page.path));
const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const slugPage=read('src/app/[slug]/page.tsx');
const home=read('src/app/page.tsx');
const platform=read('src/components/PlatformNameTool.tsx');
const freeFire=read('src/components/FreeFireNameTool.tsx');

if(!slugPage.includes('id="herramienta"'))errors.push('Missing #herramienta target in slug page');
if(!home.includes('id="studio-nombres"'))errors.push('Missing #studio-nombres target on homepage');
if(!read('src/components/NameGrid.tsx').includes('id="resultados"'))errors.push('Missing #resultados target in NameGrid');
if(!platform.includes("params.get('intent')")||!platform.includes("params.get('mode')"))errors.push('Platform tool no longer consumes intent/mode query handoff');
if(!freeFire.includes("get('shortcut')"))errors.push('Free Fire tool no longer consumes shortcut query handoff');

function routeFromHref(href:string){
  const withoutHash=href.split('#')[0]||'';
  return(withoutHash.split('?')[0]||'').trim();
}

function fragmentFromHref(href:string){
  return href.includes('#')?'#'+href.split('#').pop():'';
}

for(const page of keywordPages){
  for(const keyword of page.secondaryKeywords){
    const action=getKeywordAction(page,keyword);
    const route=routeFromHref(action.href);
    const fragment=fragmentFromHref(action.href);
    const targetPath=route||page.path;

    if(route&&route!=='/'&&!routePaths.has(route))errors.push('Keyword action points to unknown route: '+page.path+' -> '+keyword+' -> '+action.href);
    if(fragment&&!['#herramienta','#resultados','#studio-nombres'].includes(fragment))errors.push('Keyword action uses unknown fragment: '+action.href);
    if(fragment==='#studio-nombres'&&targetPath!=='/')errors.push('studio-nombres fragment must target homepage: '+action.href);

    if(fragment==='#resultados'){
      const target=keywordPageByPath.get(targetPath);
      if(!target)errors.push('Result action target missing page: '+action.href);
      else if(getNamesForPath(target.path).length===0)errors.push('Result action points to route without results: '+action.href);
    }

    if(fragment==='#herramienta'){
      const target=keywordPageByPath.get(targetPath);
      if(!target)errors.push('Tool action target missing page: '+action.href);
      else{
        const hasTool=target.path==='/nombres-por-letra'||target.path==='/nombres-roblox'||target.path==='/nombres-instagram'||target.path==='/nombres-para-tiendas'||target.cluster==='freeFire'||['general','gaming','invisible','store','football'].includes(target.tool);
        if(!hasTool)errors.push('Tool action points to route without primary tool: '+action.href);
      }
    }
  }
}

let presetCount=0;
for(const page of keywordPages){
  const items=getNamesForPath(page.path);
  if(items.length>0&&['people','pet','culture'].includes(page.tool)&&getQuickPresets(page.path).length<3){
    errors.push('Result-backed '+page.tool+' page needs at least 3 quick presets: '+page.path);
  }
}
for(const [path,presets]of Object.entries(quickPresetsByPath)){
  const page=keywordPageByPath.get(path);
  if(!page){errors.push('Quick preset route is unknown: '+path);continue;}
  const items=getNamesForPath(path);
  const labels=new Set<string>();
  for(const preset of presets){
    presetCount++;
    if(labels.has(preset.label))errors.push('Duplicate quick preset label: '+path+' -> '+preset.label);
    labels.add(preset.label);
    const matches=items.filter(item=>matchesQuickPreset(item,preset));
    if(matches.length===0)errors.push('Quick preset returns zero results: '+path+' -> '+preset.label);
  }
  if(getQuickPresets(path).length!==presets.length)errors.push('Quick preset lookup mismatch: '+path);
}

if(errors.length){
  console.error('[Product QA] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Product QA] PASS — '+presetCount+' quick presets return results and '+keywordPages.reduce((sum,page)=>sum+page.secondaryKeywords.length,0)+' keyword actions resolve to valid routes/fragments.');
