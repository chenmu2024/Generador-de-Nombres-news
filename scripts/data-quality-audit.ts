import { nameDataset, getNamesForPath } from '../src/data/nameDataset';

const errors:string[]=[];
const warnings:string[]=[];
const seen=new Set<string>();

for(const item of nameDataset){
  const key=[item.type,item.name,item.origin??''].join('|').toLocaleLowerCase('es');
  if(seen.has(key))warnings.push('Potential duplicate: '+item.name+' ('+item.type+')');
  seen.add(key);

  if(item.verified===true){
    if(!item.source)errors.push('Verified item missing source: '+item.name);
    if(!item.lastReviewed)errors.push('Verified item missing lastReviewed: '+item.name);
    if(item.confidence==='needs-review')errors.push('Verified item cannot be needs-review: '+item.name);
  }

  if(item.type==='culture'&&(item.meaning||item.script)&&!item.source){
    warnings.push('Cultural record with meaning/script still needs a source: '+item.name);
  }
}

const minimums:Record<string,number>={
  '/nombres-free-fire':20,
  '/nombres-ff-unicos':18,
  '/nombres-ff-mujeres':8,
  '/nombres-clanes-ff':16,
  '/nombres-roblox':24,
  '/nombres-instagram':24,
  '/nombres-anime':24,
  '/nombres-gatos':36,
  '/nombres-gatos-negros':12,
  '/nombres-gatos-machos':12,
  '/nombres-perritas':30,
  '/nombres-perros-machos':30,
  '/perritas-chihuahua':10,
  '/nombres-caballos':20,
  '/nombres-peluches':20,
  '/nombres-de-mujer':48,
  '/nombres-de-nina':28,
  '/nombres-con-a':18,
  '/nombres-con-b':12,
  '/nombres-con-c':10,
  '/nombres-con-e':10,
  '/nombres-con-f':18,
  '/nombres-con-m':12,
  '/nombres-con-y':10,
  '/nombres-con-z':10,
  '/nombres-de-nino':40,
  '/nombres-unisex':10,
  '/nombres-raros':40,
  '/nombres-con-en':4,
  '/nombres-japoneses':12,
  '/nombres-coreanos':11,
  '/nombres-franceses':10,
  '/nombres-italianos':10,
  '/nombres-rusos':10,
  '/nombres-griegos':10,
  '/nombres-turcos':10,
  '/nombres-chinos':10,
  '/nombres-mayas':10,
  '/nombres-ingles':10,
  '/nombres-de-dioses':12,
};

for(const [path,min] of Object.entries(minimums)){
  const count=getNamesForPath(path).length;
  if(count<min)errors.push('Core page dataset too thin: '+path+' has '+count+', expected at least '+min);
}

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
  {label:'Free Fire / female',items:getNamesForPath('/nombres-free-fire'),tag:'female',min:6},
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


const sourcedPeopleChecks=[
  {label:'people / sourced female meanings',items:getNamesForPath('/nombres-de-mujer'),min:24},
  {label:'people / sourced girl meanings',items:getNamesForPath('/nombres-de-nina'),min:12},
  {label:'people / sourced male meanings',items:getNamesForPath('/nombres-de-nino'),min:24},
];

for(const check of sourcedPeopleChecks){
  const count=check.items.filter(item=>item.type==='person'&&Boolean(item.meaning)&&Boolean(item.sourceUrl)&&item.verified===true).length;
  if(count<check.min)errors.push('Sourced people coverage too thin: '+check.label+' has '+count+', expected at least '+check.min);
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
