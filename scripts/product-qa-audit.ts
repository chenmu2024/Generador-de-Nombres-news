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
const anime=read('src/components/AnimeNameTool.tsx');
const brand=read('src/components/BrandNameTool.tsx');
const generatorPanel=read('src/components/GeneratorPanel.tsx');
const plush=read('src/components/PlushAdoptionTool.tsx');

if(!slugPage.includes('id="herramienta"'))errors.push('Missing #herramienta target in slug page');
if(!home.includes('id="studio-nombres"'))errors.push('Missing #studio-nombres target on homepage');
const nameGridSource=read('src/components/NameGrid.tsx');
if(!nameGridSource.includes('id="resultados"'))errors.push('Missing #resultados target in NameGrid');
if(!nameGridSource.includes("mode==='people'||mode==='pet'||mode==='culture'"))errors.push('Culture collections must keep compare support');
if(!nameGridSource.includes("get('preset')"))errors.push('NameGrid must consume preset query handoff');
if(!nameGridSource.includes('Con significado')||!nameGridSource.includes('Fuente verificada'))errors.push('People/culture data facets must remain visible');
if(!platform.includes("params.get('intent')")||!platform.includes("params.get('mode')"))errors.push('Platform tool no longer consumes intent/mode query handoff');
if(!freeFire.includes("get('shortcut')"))errors.push('Free Fire tool no longer consumes shortcut query handoff');
if(!anime.includes("get('intent')"))errors.push('Anime tool no longer consumes intent query handoff');
if(!slugPage.includes('<AnimeNameTool/>'))errors.push('Anime route must render AnimeNameTool');
if(!slugPage.includes("const generatorMode: 'football'|'invisible'|null="))errors.push('GeneratorPanel mode must be explicitly narrowed to football/invisible');
if(!slugPage.includes('<GeneratorPanel mode={generatorMode}'))errors.push('GeneratorPanel must consume the narrowed generatorMode');
if(slugPage.includes("<GeneratorPanel mode={page.tool}"))errors.push('Generic ToolMode fallback must remain disabled');
if(!brand.includes("params.get('industry')")||!brand.includes("params.get('channel')"))errors.push('Brand tool must consume industry/channel handoff');
if(!generatorPanel.includes("params.get('context')")||!generatorPanel.includes("params.get('style')"))errors.push('Football tool must consume context/style handoff');
if(!plush.includes("get('doc')"))errors.push('Plush adoption tool must consume document mode handoff');
if(!slugPage.includes('<PlushAdoptionTool'))errors.push('Plush route must render adoption tool');

function routeFromHref(href:string){
  const withoutHash=href.split('#')[0]||'';
  return(withoutHash.split('?')[0]||'').trim();
}

function fragmentFromHref(href:string){
  return href.includes('#')?'#'+href.split('#').pop():'';
}

let presetActionCount=0;
for(const page of keywordPages){
  for(const keyword of page.secondaryKeywords){
    const action=getKeywordAction(page,keyword);
    const route=routeFromHref(action.href);
    const fragment=fragmentFromHref(action.href);
    const targetPath=route||page.path;

    if(route&&route!=='/'&&!routePaths.has(route))errors.push('Keyword action points to unknown route: '+page.path+' -> '+keyword+' -> '+action.href);
    if(fragment&&!['#herramienta','#resultados','#studio-nombres','#adopcion'].includes(fragment))errors.push('Keyword action uses unknown fragment: '+action.href);
    if(fragment==='#studio-nombres'&&targetPath!=='/')errors.push('studio-nombres fragment must target homepage: '+action.href);
    if(fragment==='#adopcion'&&targetPath!=='/nombres-peluches')errors.push('adopcion fragment must target plush route: '+action.href);

    if(fragment==='#resultados'){
      const target=keywordPageByPath.get(targetPath);
      if(!target)errors.push('Result action target missing page: '+action.href);
      else{
        const targetItems=getNamesForPath(target.path);
        if(targetItems.length===0)errors.push('Result action points to route without results: '+action.href);
        const query=action.href.includes('?')?(action.href.split('?')[1]?.split('#')[0]??''):'';
        const presetName=new URLSearchParams(query).get('preset');
        if(presetName){
          presetActionCount++;
          const preset=getQuickPresets(target.path).find(item=>item.label===presetName);
          if(!preset)errors.push('Keyword action points to unknown preset: '+action.href);
          else if(targetItems.filter(item=>matchesQuickPreset(item,preset)).length===0)errors.push('Keyword action preset returns zero results: '+action.href);
        }
      }
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

if(presetActionCount<20)errors.push('Too few keyword intents hand off to validated presets: '+presetActionCount);

if(errors.length){
  console.error('[Product QA] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Product QA] PASS — '+presetCount+' quick presets return results; '+presetActionCount+' long-tail actions open validated presets; '+keywordPages.reduce((sum,page)=>sum+page.secondaryKeywords.length,0)+' keyword actions resolve to valid routes/fragments.');
