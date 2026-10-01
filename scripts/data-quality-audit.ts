import { nameDataset } from '../src/data/nameDataset';

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

console.log('[Data Quality] PASS — '+nameDataset.length+' records checked; verified records respect source rules.');
