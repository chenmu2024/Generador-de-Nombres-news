import{keywordPages}from'../src/data/keywordMaster';
import{getNamesForPath,type NameRecord}from'../src/data/nameDataset';

const dataFree=new Set(['/nombres-por-letra','/espacios-invisible-ff','/nombres-para-tiendas','/nombres-equipos-futbol']);
const rows=[] as Array<{
  path:string;tool:string;count:number;verified:number;verifiedRate:number;
  dimensions:number;short:number;genderKinds:number;tagKinds:number;target:number;score:number;
}>;

function letters(name:string){
  return Array.from(name.replace(/[^\p{L}]/gu,'')).length;
}

function relevantTags(items:NameRecord[]){
  const internal=new Set(['cat','dog','pet','horse','plush','gaming','freefire','roblox','instagram','female','male','unisex','enye','clan']);
  return new Set(items.flatMap(item=>item.tags.filter(tag=>!internal.has(tag))));
}

for(const page of keywordPages){
  if(page.path==='/'||dataFree.has(page.path))continue;
  const items=getNamesForPath(page.path);
  const verified=items.filter(item=>item.verified===true&&item.source&&item.sourceUrl).length;
  const verifiedRate=items.length?verified/items.length:0;
  const genderKinds=new Set(items.map(item=>item.gender??(item.tags.includes('female')?'F':item.tags.includes('male')?'M':item.tags.includes('unisex')?'U':undefined)).filter(Boolean)).size;
  const tagKinds=relevantTags(items).size;
  const origins=new Set(items.map(item=>item.origin).filter(Boolean)).size;
  const scripts=items.filter(item=>item.script).length;
  const pronunciations=items.filter(item=>item.pronunciation).length;
  const meanings=items.filter(item=>item.meaning).length;
  const short=items.filter(item=>letters(item.name)<=4).length;
  const dimensions=[
    genderKinds>=2,
    tagKinds>=3,
    origins>=3,
    scripts>=3,
    pronunciations>=3,
    meanings>=Math.min(5,Math.ceil(items.length*.25)),
  ].filter(Boolean).length;
  const countTarget=page.path==='/nombres-con-en'?5:page.tool==='culture'?20:page.tool==='pet'?24:page.tool==='people'?24:28;
  const countScore=Math.min(items.length/countTarget,1)*50;
  const dimensionScore=Math.min(dimensions/4,1)*30;
  const trustScore=(page.tool==='culture'||page.tool==='people')?verifiedRate*20:20;
  const score=Math.round(countScore+dimensionScore+trustScore);
  rows.push({path:page.path,tool:page.tool,count:items.length,verified,verifiedRate,dimensions,short,genderKinds,tagKinds,target:countTarget,score});
}

rows.sort((a,b)=>a.score-b.score||a.count-b.count);
const thin=rows.filter(row=>row.score<72||row.count<row.target);

console.log('[Data Depth] Lowest-depth result pages');
for(const row of rows.slice(0,15)){
  console.log(
    ' - '+row.path+
    ' | '+row.count+' results'+
    ' | '+row.dimensions+' dimensions'+
    ' | '+Math.round(row.verifiedRate*100)+'% verified'+
    ' | score '+row.score
  );
}
if(thin.length){
  console.log('[Data Depth] Routes below target');
  for(const row of thin)console.log(' * '+row.path+' | '+row.count+'/'+row.target+' results | score '+row.score+' | '+Math.round(row.verifiedRate*100)+'% verified');
}
console.log('[Data Depth] '+rows.length+' result-backed topic routes audited; '+thin.length+' routes are below the route-aware depth target.');

const errors:string[]=[];
for(const row of rows){
  if(row.count===0)errors.push('Result-backed route has zero records: '+row.path);
  if(row.tool==='culture'&&row.verifiedRate<.9)errors.push('Cultural route source coverage below 90%: '+row.path+' -> '+Math.round(row.verifiedRate*100)+'%');
  if(row.path.startsWith('/nombres-con-')&&row.path!=='/nombres-con-en'&&row.verifiedRate<.5)errors.push('Letter route source coverage below 50%: '+row.path+' -> '+Math.round(row.verifiedRate*100)+'%');
  if(row.count>=18&&row.dimensions===0)errors.push('Large route has no useful filter dimensions: '+row.path);
}
if(errors.length){
  console.error('[Data Depth] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
