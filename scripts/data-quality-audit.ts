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
  '/nombres-gatos':24,
  '/nombres-gatos-negros':10,
  '/nombres-gatos-machos':10,
  '/nombres-perritas':24,
  '/perritas-chihuahua':8,
  '/nombres-de-mujer':28,
  '/nombres-de-nina':18,
  '/nombres-de-nino':18,
  '/nombres-unisex':8,
  '/nombres-raros':16,
  '/nombres-con-en':4,
  '/nombres-japoneses':8,
  '/nombres-coreanos':7,
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

for(const path of ['/nombres-japoneses','/nombres-coreanos']){
  const items=getNamesForPath(path);
  const missingSource=items.filter(item=>!item.source||!item.sourceUrl);
  if(missingSource.length)errors.push('Sourced cultural page has records without source: '+path+' -> '+missingSource.map(item=>item.name).join(', '));
}

const coverageChecks=[
  {label:'black cats / mystic',items:getNamesForPath('/nombres-gatos-negros'),tag:'mystic',min:6},
  {label:'black cats / female',items:getNamesForPath('/nombres-gatos-negros'),tag:'female',min:3},
  {label:'black cats / male',items:getNamesForPath('/nombres-gatos-negros'),tag:'male',min:3},
  {label:'female dogs / small',items:getNamesForPath('/nombres-perritas'),tag:'small',min:8},
  {label:'female dogs / cute',items:getNamesForPath('/nombres-perritas'),tag:'cute',min:8},
  {label:'Free Fire / unique',items:getNamesForPath('/nombres-free-fire'),tag:'unique',min:6},
  {label:'Free Fire / female',items:getNamesForPath('/nombres-free-fire'),tag:'female',min:6},
  {label:'Free Fire / clan',items:getNamesForPath('/nombres-free-fire'),tag:'clan',min:6},
  {label:'people / modern female',items:getNamesForPath('/nombres-de-mujer'),tag:'modern',min:8},
  {label:'people / classic female',items:getNamesForPath('/nombres-de-mujer'),tag:'classic',min:8},
];

for(const check of coverageChecks){
  const count=check.items.filter(item=>item.tags.includes(check.tag)).length;
  if(count<check.min)errors.push('Intent coverage too thin: '+check.label+' has '+count+', expected at least '+check.min);
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
