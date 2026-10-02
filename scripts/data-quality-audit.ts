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
  '/nombres-ff-unicos':8,
  '/nombres-ff-mujeres':8,
  '/nombres-clanes-ff':8,
  '/nombres-roblox':24,
  '/nombres-instagram':24,
  '/nombres-anime':24,
  '/nombres-gatos':36,
  '/nombres-gatos-negros':12,
  '/nombres-gatos-machos':12,
  '/nombres-perritas':30,
  '/perritas-chihuahua':10,
  '/nombres-caballos':20,
  '/nombres-peluches':20,
  '/nombres-de-mujer':48,
  '/nombres-de-nina':28,
  '/nombres-de-nino':40,
  '/nombres-unisex':10,
  '/nombres-raros':40,
  '/nombres-con-en':4,
  '/nombres-japoneses':8,
  '/nombres-coreanos':7,
  '/nombres-franceses':6,
  '/nombres-italianos':6,
  '/nombres-rusos':6,
  '/nombres-griegos':6,
  '/nombres-turcos':6,
  '/nombres-chinos':6,
  '/nombres-mayas':6,
  '/nombres-ingles':6,
  '/nombres-de-dioses':8,
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
  {label:'Free Fire / unique',items:getNamesForPath('/nombres-free-fire'),tag:'unique',min:6},
  {label:'Free Fire / female',items:getNamesForPath('/nombres-free-fire'),tag:'female',min:6},
  {label:'Free Fire / clan',items:getNamesForPath('/nombres-free-fire'),tag:'clan',min:6},
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
