import { nameDataset, getNamesForPath } from '../src/data/nameDataset';
import{keywordPages}from'../src/data/keywordMaster';

const errors:string[]=[];
const warnings:string[]=[];
const seen=new Set<string>();
const trustedSourceHosts=new Set(['behindthename.com','www.behindthename.com']);

for(const item of nameDataset){
  const key=[item.type,item.name,item.origin??''].join('|').toLocaleLowerCase('es');
  if(seen.has(key))errors.push('Duplicate dataset record: '+item.name+' ('+item.type+')');
  seen.add(key);

  if(item.verified===true){
    if(!item.source)errors.push('Verified item missing source: '+item.name);
    if(!item.sourceUrl)errors.push('Verified item missing sourceUrl: '+item.name);
    if(!item.lastReviewed)errors.push('Verified item missing lastReviewed: '+item.name);
    if(item.confidence==='needs-review')errors.push('Verified item cannot be needs-review: '+item.name);
    if(item.sourceUrl){
      try{
        const url=new URL(item.sourceUrl);
        if(url.protocol!=='https:')errors.push('Verified source must use HTTPS: '+item.name+' -> '+item.sourceUrl);
        if(!trustedSourceHosts.has(url.hostname))errors.push('Verified source host is not approved: '+item.name+' -> '+url.hostname);
      }catch{
        errors.push('Verified source URL is invalid: '+item.name+' -> '+item.sourceUrl);
      }
    }
  }

  if(item.type==='culture'&&(item.meaning||item.script)&&!item.source){
    warnings.push('Cultural record with meaning/script still needs a source: '+item.name);
  }
  if(item.type==='person'&&item.verified!==true){
    errors.push('Every person record must be source-verified: '+item.name);
  }
}

const intentionalDataFreeRoutes=new Set([
  '/nombres-por-letra',
  '/espacios-invisible-ff',
  '/nombres-para-tiendas',
  '/nombres-equipos-futbol',
]);

for(const page of keywordPages){
  if(page.path==='/'||!page.indexable||page.status!=='VERIFIED')continue;
  const count=getNamesForPath(page.path).length;
  if(!intentionalDataFreeRoutes.has(page.path)&&count===0){
    errors.push('Locked route has no dedicated dataset: '+page.path);
  }
}
if(getNamesForPath('/__unknown-route__').length!==0){
  errors.push('Unknown routes must not receive a generic fallback dataset');
}

const minimums:Record<string,number>={
  '/nombres-free-fire':20,
  '/nombres-ff-unicos':18,
  '/nombres-ff-mujeres':24,
  '/nombres-clanes-ff':24,
  '/nombres-roblox':24,
  '/nombres-instagram':24,
  '/nombres-anime':24,
  '/nombres-gatos':36,
  '/nombres-gatos-negros':24,
  '/nombres-gatos-machos':24,
  '/nombres-perritas':30,
  '/nombres-perros-machos':30,
  '/perritas-chihuahua':24,
  '/nombres-caballos':20,
  '/nombres-peluches':20,
  '/nombres-de-mujer':48,
  '/nombres-de-nina':28,
  '/nombres-con-a':18,
  '/nombres-con-b':18,
  '/nombres-con-c':18,
  '/nombres-con-e':18,
  '/nombres-con-f':18,
  '/nombres-con-m':18,
  '/nombres-con-y':18,
  '/nombres-con-z':18,
  '/nombres-de-nino':40,
  '/nombres-unisex':20,
  '/nombres-raros':40,
  '/nombres-con-en':4,
  '/nombres-japoneses':15,
  '/nombres-coreanos':22,
  '/nombres-franceses':20,
  '/nombres-italianos':22,
  '/nombres-rusos':15,
  '/nombres-griegos':15,
  '/nombres-turcos':20,
  '/nombres-chinos':15,
  '/nombres-mayas':22,
  '/nombres-ingles':15,
  '/nombres-de-dioses':15,
};

for(const [path,min] of Object.entries(minimums)){
  const count=getNamesForPath(path).length;
  if(count<min)errors.push('Core page dataset too thin: '+path+' has '+count+', expected at least '+min);
}

const alphabetLetters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
for(const letter of alphabetLetters){
  const count=nameDataset.filter(item=>{
    if(item.type!=='person')return false;
    const initial=item.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').charAt(0).toUpperCase();
    return initial===letter;
  }).length;
  if(count<3)errors.push('Alphabet directory too thin: '+letter+' has '+count+', expected at least 3');
}
const enyeCount=nameDataset.filter(item=>item.type==='person'&&item.tags.includes('enye')).length;
if(enyeCount<4)errors.push('Alphabet directory too thin: Ñ has '+enyeCount+', expected at least 4');

const culturalPaths=[
  '/nombres-japoneses','/nombres-coreanos','/nombres-franceses','/nombres-italianos',
  '/nombres-mayas','/nombres-rusos','/nombres-griegos','/nombres-ingles',
  '/nombres-turcos','/nombres-chinos','/nombres-de-dioses',
];
for(const path of culturalPaths){
  const wrongType=getNamesForPath(path).filter(item=>item.type!=='culture');
  if(wrongType.length)errors.push('Cultural page contains non-cultural records: '+path+' -> '+wrongType.map(item=>item.name).join(', '));
}

for(const path of [
  '/nombres-japoneses','/nombres-coreanos','/nombres-franceses','/nombres-italianos',
  '/nombres-rusos','/nombres-griegos','/nombres-turcos','/nombres-chinos','/nombres-mayas',
  '/nombres-ingles','/nombres-de-dioses',
]){
  const items=getNamesForPath(path);
  const missingSource=items.filter(item=>!item.source||!item.sourceUrl);
  if(missingSource.length)errors.push('Sourced cultural page has records without source: '+path+' -> '+missingSource.map(item=>item.name).join(', '));
  const notVerified=items.filter(item=>item.verified!==true);
  if(notVerified.length)errors.push('Sourced cultural page has unverified records: '+path+' -> '+notVerified.map(item=>item.name).join(', '));
}

const chineseMasculine=getNamesForPath('/nombres-chinos').filter(item=>item.gender==='M');
if(chineseMasculine.length<10)errors.push('Chinese masculine coverage too thin: '+chineseMasculine.length+', expected at least 10');

const coverageChecks=[
  {label:'cats / cute',items:getNamesForPath('/nombres-gatos'),tag:'cute',min:12},
  {label:'cats / black',items:getNamesForPath('/nombres-gatos'),tag:'black',min:12},
  {label:'cats / orange',items:getNamesForPath('/nombres-gatos'),tag:'orange',min:4},
  {label:'cats / playful',items:getNamesForPath('/nombres-gatos'),tag:'playful',min:4},
  {label:'black cats / mystic',items:getNamesForPath('/nombres-gatos-negros'),tag:'mystic',min:10},
  {label:'black cats / female',items:getNamesForPath('/nombres-gatos-negros'),tag:'female',min:3},
  {label:'black cats / male',items:getNamesForPath('/nombres-gatos-negros'),tag:'male',min:3},
  {label:'female dogs / small',items:getNamesForPath('/nombres-perritas'),tag:'small',min:15},
  {label:'female dogs / cute',items:getNamesForPath('/nombres-perritas'),tag:'cute',min:15},
  {label:'female dogs / elegant',items:getNamesForPath('/nombres-perritas'),tag:'elegant',min:5},
  {label:'female dogs / playful',items:getNamesForPath('/nombres-perritas'),tag:'playful',min:4},
  {label:'male dogs / strong',items:getNamesForPath('/nombres-perros-machos'),tag:'strong',min:10},
  {label:'male dogs / small',items:getNamesForPath('/nombres-perros-machos'),tag:'small',min:6},
  {label:'male dogs / large',items:getNamesForPath('/nombres-perros-machos'),tag:'large',min:10},
  {label:'male dogs / playful',items:getNamesForPath('/nombres-perros-machos'),tag:'playful',min:6},
  {label:'male dogs / calm',items:getNamesForPath('/nombres-perros-machos'),tag:'calm',min:5},
  {label:'Free Fire / unique',items:getNamesForPath('/nombres-free-fire'),tag:'unique',min:18},
  {label:'Free Fire / female',items:getNamesForPath('/nombres-free-fire'),tag:'female',min:20},
  {label:'Free Fire / clan',items:getNamesForPath('/nombres-free-fire'),tag:'clan',min:16},
  {label:'Roblox / dedicated ideas',items:getNamesForPath('/nombres-roblox'),tag:'roblox',min:24},
  {label:'Instagram / dedicated ideas',items:getNamesForPath('/nombres-instagram'),tag:'instagram',min:24},
  {label:'Anime / dedicated gaming ideas',items:getNamesForPath('/nombres-anime'),tag:'anime',min:20},
  {label:'Horses / strong',items:getNamesForPath('/nombres-caballos'),tag:'strong',min:6},
  {label:'Horses / elegant',items:getNamesForPath('/nombres-caballos'),tag:'elegant',min:8},
  {label:'Plush / cute',items:getNamesForPath('/nombres-peluches'),tag:'cute',min:18},
  {label:'Plush / kawaii',items:getNamesForPath('/nombres-peluches'),tag:'kawaii',min:10},
  {label:'people / female short',items:getNamesForPath('/nombres-de-mujer'),tag:'short',min:18},
  {label:'people / modern female',items:getNamesForPath('/nombres-de-mujer'),tag:'modern',min:15},
  {label:'people / classic female',items:getNamesForPath('/nombres-de-mujer'),tag:'classic',min:15},
  {label:'people / rare female',items:getNamesForPath('/nombres-de-mujer'),tag:'rare',min:6},
  {label:'people / male short',items:getNamesForPath('/nombres-de-nino'),tag:'short',min:20},
  {label:'people / modern male',items:getNamesForPath('/nombres-de-nino'),tag:'modern',min:12},
  {label:'people / classic male',items:getNamesForPath('/nombres-de-nino'),tag:'classic',min:10},
];

for(const check of coverageChecks){
  const count=check.items.filter(item=>item.tags.includes(check.tag)).length;
  if(count<check.min)errors.push('Intent coverage too thin: '+check.label+' has '+count+', expected at least '+check.min);
}

const practicalShortChecks=[
  {label:'Roblox real 3–4 letter bases',items:getNamesForPath('/nombres-roblox'),min:6},
  {label:'Instagram real 3–4 letter bases',items:getNamesForPath('/nombres-instagram'),min:6},
];
for(const check of practicalShortChecks){
  const count=check.items.filter(item=>Array.from(item.name.replace(/[^\p{L}]/gu,'')).length<=4).length;
  if(count<check.min)errors.push('Practical short-name coverage too thin: '+check.label+' has '+count+', expected at least '+check.min);
}

for(const [path,requiredTag,forbiddenTag] of [
  ['/nombres-roblox','roblox','instagram'],
  ['/nombres-instagram','instagram','roblox'],
] as const){
  const items=getNamesForPath(path);
  const missing=items.filter(item=>!item.tags.includes(requiredTag));
  if(missing.length)errors.push('Route-specific dataset leaked into '+path+': '+missing.map(item=>item.name).join(', '));
  const forbidden=items.filter(item=>item.tags.includes(forbiddenTag));
  if(forbidden.length)errors.push('Cross-platform dataset contamination on '+path+': '+forbidden.map(item=>item.name).join(', '));
}


const unisexItems=getNamesForPath('/nombres-unisex');
const incompleteUnisex=unisexItems.filter(item=>!item.meaning||!item.source||!item.sourceUrl||item.verified!==true);
if(incompleteUnisex.length){
  errors.push('Unisex collection requires fully sourced records: '+incompleteUnisex.map(item=>item.name).join(', '));
}

const sourcedPeopleChecks=[
  {label:'people / sourced female meanings',items:getNamesForPath('/nombres-de-mujer'),min:87},
  {label:'people / sourced girl meanings',items:getNamesForPath('/nombres-de-nina'),min:41},
  {label:'people / sourced male meanings',items:getNamesForPath('/nombres-de-nino'),min:77},
  {label:'people / sourced unisex meanings',items:getNamesForPath('/nombres-unisex'),min:22},
];

for(const check of sourcedPeopleChecks){
  const count=check.items.filter(item=>item.type==='person'&&Boolean(item.meaning)&&Boolean(item.sourceUrl)&&item.verified===true).length;
  if(count<check.min)errors.push('Sourced people coverage too thin: '+check.label+' has '+count+', expected at least '+check.min);
}

function sourceCoverage(items:ReturnType<typeof getNamesForPath>){
  if(!items.length)return 0;
  return items.filter(item=>item.verified===true&&Boolean(item.source)&&Boolean(item.sourceUrl)).length/items.length;
}

const peopleSourceCoverageChecks=[
  {label:'women',path:'/nombres-de-mujer',min:1},
  {label:'girls',path:'/nombres-de-nina',min:1},
  {label:'boys',path:'/nombres-de-nino',min:1},
  {label:'unisex',path:'/nombres-unisex',min:1},
  {label:'rare',path:'/nombres-raros',min:1},
];

for(const check of peopleSourceCoverageChecks){
  const items=getNamesForPath(check.path);
  const rate=sourceCoverage(items);
  if(rate<check.min){
    errors.push(
      'People source coverage below floor: '+check.label+' '+Math.round(rate*100)+'%, expected at least '+Math.round(check.min*100)+'%'
    );
  }
}

if(warnings.length){
  console.warn('[Data Quality] WARNINGS');
  for(const warning of warnings.slice(0,30))console.warn(' - '+warning);
  if(warnings.length>30)console.warn(' - ... '+(warnings.length-30)+' more warnings');
}

if(errors.length){
  console.error('[Data Quality] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Data Quality] PASS — '+nameDataset.length+' records checked; core-page coverage and verified-source rules passed.');
