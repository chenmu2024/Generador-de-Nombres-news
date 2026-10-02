import{EXPERIMENTS}from'../src/data/experiments';

const errors:string[]=[];
const values=Object.values(EXPERIMENTS);
const seen=new Set<string>();

for(const [key,value] of Object.entries(EXPERIMENTS)){
  if(!/^[a-z0-9-]+-v\d+$/.test(value))errors.push('Invalid experiment id format: '+key+' -> '+value);
  if(seen.has(value))errors.push('Duplicate experiment id: '+value);
  seen.add(value);
}

const required=['homeHero','homePopular','homeResume','nextStep','related','emptyFavorites','nav','favoritesNav','searchRoute','productActions','sessionDepth','webVitals','footerNav'] as const;
for(const key of required)if(!EXPERIMENTS[key])errors.push('Missing required experiment: '+key);

if(values.length!==required.length)errors.push('Unexpected experiment count: '+values.length+' expected '+required.length);

if(errors.length){
  console.error('[Analytics Governance] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Analytics Governance] PASS — '+values.length+' stable experiment IDs.');
