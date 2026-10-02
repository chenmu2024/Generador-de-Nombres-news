import{keywordPages}from'../src/data/keywordMaster';
import{getNamesForPath}from'../src/data/nameDataset';
import{alphabetRoutes,getAlphabetDirectoryEntries}from'../src/data/alphabetDirectory';
import{footballContexts,footballStyles,generateFootballNames}from'../src/lib/generator';
import{brandChannels,brandIndustries,brandLanguages,brandStyles,generateBrandNames}from'../src/lib/brandGenerator';
import{invisibleCharacters}from'../src/data/invisibleCharacters';

const errors:string[]=[];
const dedicatedNoList=new Map<string,string>([
  ['/espacios-invisible-ff','invisible'],
  ['/nombres-equipos-futbol','football'],
  ['/nombres-para-tiendas','store'],
  ['/nombres-por-letra','people'],
]);

const specialMinimums:Record<string,number>={
  '/nombres-con-b':18,
  '/nombres-con-e':18,
  '/nombres-con-m':18,
  '/nombres-con-y':18,
  '/nombres-con-z':18,
  '/nombres-con-en':5,
  '/nombres-mayas':20,
  '/nombres-japoneses':18,
  '/nombres-coreanos':22,
  '/nombres-franceses':20,
  '/nombres-italianos':22,
  '/nombres-rusos':17,
  '/nombres-ingles':20,
  '/nombres-chinos':16,
  '/nombres-griegos':17,
  '/nombres-free-fire':50,
  '/generador-free-fire':50,
  '/nombres-ff-unicos':25,
  '/nombres-ff-mujeres':24,
  '/nombres-clanes-ff':24,
  '/nombres-roblox':30,
  '/nombres-instagram':28,
  '/nombres-anime':40,
  '/nombres-perritas':40,
  '/nombres-perros-machos':35,
  '/nombres-gatos':45,
  '/nombres-gatos-negros':24,
  '/nombres-gatos-machos':24,
  '/perritas-chihuahua':24,
  '/nombres-caballos':30,
  '/nombres-peluches':28,
};

function minimumFor(path:string,tool:string){
  if(specialMinimums[path]!==undefined)return specialMinimums[path];
  if(tool==='culture')return 12;
  if(tool==='pet')return 8;
  if(tool==='people')return 8;
  if(tool==='gaming')return 8;
  if(tool==='general')return 8;
  return 0;
}

for(const page of keywordPages){
  if(page.path==='/')continue;
  const items=getNamesForPath(page.path);

  if(dedicatedNoList.has(page.path)){
    if(items.length!==0)errors.push('Dedicated non-list route unexpectedly exposes list records: '+page.path);
    const expectedTool=dedicatedNoList.get(page.path);
    if(page.tool!==expectedTool)errors.push('Dedicated non-list route has wrong tool mode: '+page.path+' -> '+page.tool+', expected '+expectedTool);
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

const alphabetEntries=getAlphabetDirectoryEntries();
for(const entry of alphabetEntries){
  if(alphabetRoutes[entry.letter])continue;
  if(entry.count<5)errors.push('Alphabet quick view is too thin: '+entry.letter+' has '+entry.count+' names, expected at least 5');
  if(entry.names.length!==Math.min(entry.count,18))errors.push('Alphabet quick view preview count mismatch: '+entry.letter);
}

let footballCases=0;
for(const context of footballContexts)for(const style of footballStyles){
  footballCases++;
  const results=generateFootballNames('Horizonte',style,context);
  if(results.length<12)errors.push('Football generator too thin for '+context+' / '+style+': '+results.length);
  if(new Set(results).size!==results.length)errors.push('Football generator duplicates output for '+context+' / '+style);
  if(results.some(value=>!value.includes('Horizonte')))errors.push('Football generator lost the seed for '+context+' / '+style);
}

let brandCases=0;
for(const style of brandStyles)for(const industry of brandIndustries)for(const channel of brandChannels)for(const language of brandLanguages){
  brandCases++;
  const results=generateBrandNames({seed:'Luna',style,industry,channel,language,batch:0});
  if(results.length<10)errors.push('Brand generator too thin: '+[style,industry,channel,language].join(' / ')+' -> '+results.length);
  if(new Set(results.map(item=>item.name.toLocaleLowerCase('es'))).size!==results.length)errors.push('Brand generator duplicate output: '+[style,industry,channel,language].join(' / '));
  if(results.some(item=>!item.name.trim()||!item.handle||item.handle.length>24||item.chars<1||item.words<1))errors.push('Brand generator invalid proposal: '+[style,industry,channel,language].join(' / '));
}

const invisibleValues=new Set<string>();
const invisibleCodes=new Set<string>();
for(const item of invisibleCharacters){
  if(invisibleValues.has(item.value))errors.push('Duplicate invisible character value: '+item.code);
  if(invisibleCodes.has(item.code))errors.push('Duplicate invisible character code: '+item.code);
  invisibleValues.add(item.value);
  invisibleCodes.add(item.code);
  const expected=Number.parseInt(item.code.slice(2),16);
  if(Array.from(item.value).length!==1||item.value.codePointAt(0)!==expected)errors.push('Invisible character code mismatch: '+item.label+' '+item.code);
}
if(invisibleCharacters.length<6)errors.push('Invisible character library is too small: '+invisibleCharacters.length);

const routesWithResults=keywordPages.filter(page=>page.path!=='/'&&!dedicatedNoList.has(page.path));
const totalResults=routesWithResults.reduce((sum,page)=>sum+getNamesForPath(page.path).length,0);

if(errors.length){
  console.error('[Product Readiness] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log(
  '[Product Readiness] PASS — '+
  routesWithResults.length+' result-backed routes + '+
  dedicatedNoList.size+' dedicated non-list routes; '+
  totalResults+' route-level result slots; '+brandCases+' brand configurations, '+footballCases+' football configurations and '+invisibleCharacters.length+' invisible characters validated.'
);
