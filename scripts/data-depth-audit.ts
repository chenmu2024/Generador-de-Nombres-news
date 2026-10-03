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
  const tags=relevantTags(items);
  const tagKinds=tags.size;
  const origins=new Set(items.map(item=>item.origin).filter(Boolean)).size;
  const scripts=items.filter(item=>item.script).length;
  const pronunciations=items.filter(item=>item.pronunciation).length;
  const meanings=items.filter(item=>item.meaning).length;
  const short=items.filter(item=>letters(item.name)<=4).length;
  const lengthKinds=new Set(items.map(item=>letters(item.name)<=4?'short':letters(item.name)<=6?'medium':'long')).size;
  const petColors=new Set(['black','orange','white','gray','brown']);
  const petSizes=new Set(['small','large']);
  const petPersonalities=new Set(['cute','playful','calm','strong','elegant','mystic','kawaii']);
  const colorKinds=new Set(items.flatMap(item=>item.tags.filter(tag=>petColors.has(tag)))).size;
  const sizeKinds=new Set(items.flatMap(item=>item.tags.filter(tag=>petSizes.has(tag)))).size;
  const personalityKinds=new Set(items.flatMap(item=>item.tags.filter(tag=>petPersonalities.has(tag)))).size;
  const styleKinds=new Set(items.flatMap(item=>item.tags.filter(tag=>['modern','classic','rare'].includes(tag)))).size;
  const gameStyleKinds=new Set(items.flatMap(item=>item.tags.filter(tag=>['short','dark','strong','unique','aesthetic','anime'].includes(tag)))).size;

  const petGenderIntent=page.path.includes('perritas')||page.path.includes('machos');
  const petColorIntent=page.path.includes('gatos-negros');
  const petSizeIntent=page.path.includes('chihuahua');
  const petGenderPurity=page.path.includes('perritas')
    ?items.every(item=>(item.gender??(item.tags.includes('female')?'F':undefined))==='F')
    :page.path.includes('machos')
      ?items.every(item=>(item.gender??(item.tags.includes('male')?'M':undefined))==='M')
      :genderKinds>=2;
  const petColorPurity=petColorIntent
    ?items.every(item=>item.tags.includes('black'))
    :colorKinds>=2;
  const petSizePurity=petSizeIntent
    ?items.every(item=>item.tags.includes('small')&&item.tags.includes('chihuahua'))
    :sizeKinds>=2;

  const cultureUsesDistinctScript=[
    '/nombres-japoneses','/nombres-coreanos','/nombres-rusos','/nombres-griegos','/nombres-chinos',
  ].includes(page.path);
  const cultureNeedsMixedOrigins=page.path==='/nombres-de-dioses';
  const cultureRoutePurity=items.every(item=>item.type==='culture');
  const cultureMeaningTarget=Math.min(5,Math.ceil(items.length*.25));
  const culturePronunciationTarget=Math.min(5,Math.ceil(items.length*.2));

  const dimensionFlags=page.tool==='culture'
    ?[
      genderKinds>=2,
      cultureNeedsMixedOrigins?origins>=3:cultureRoutePurity,
      cultureUsesDistinctScript?scripts>=Math.min(5,Math.ceil(items.length*.3)):lengthKinds>=2,
      pronunciations>=culturePronunciationTarget,
      meanings>=cultureMeaningTarget,
      verifiedRate>=.9,
    ]
    :page.tool==='people'
      ?[
        genderKinds>=2,
        origins>=3,
        styleKinds>=2,
        lengthKinds>=2,
        meanings>=Math.min(5,Math.ceil(items.length*.25)),
        verifiedRate>=.7,
      ]
      :page.tool==='pet'
        ?page.path==='/nombres-caballos'
          ?[
            genderKinds>=2,
            colorKinds>=2,
            items.every(item=>item.type==='pet'&&item.tags.includes('horse')),
            personalityKinds>=3,
            lengthKinds>=2,
            short>=3,
          ]
          :page.path==='/nombres-peluches'
            ?[
              items.every(item=>item.type==='pet'&&item.tags.includes('plush')),
              items.filter(item=>item.tags.includes('cute')).length>=18,
              items.filter(item=>item.tags.includes('kawaii')).length>=10,
              items.filter(item=>item.tags.includes('calm')||item.tags.includes('playful')).length>=10,
              lengthKinds>=2,
              short>=5,
            ]
            :[
              petGenderIntent?petGenderPurity:genderKinds>=2,
              petColorIntent?petColorPurity:colorKinds>=2,
              petSizeIntent?petSizePurity:sizeKinds>=2,
              personalityKinds>=3,
              lengthKinds>=2,
              short>=Math.min(5,Math.ceil(items.length*.15)),
            ]
        :[
          gameStyleKinds>=3,
          lengthKinds>=2,
          short>=Math.min(5,Math.ceil(items.length*.15)),
          tagKinds>=3,
        ];
  const dimensions=dimensionFlags.filter(Boolean).length;
  const countTarget=page.path==='/nombres-con-en'?5:page.tool==='culture'?20:page.tool==='pet'?24:page.tool==='people'?24:28;
  const countScore=Math.min(items.length/countTarget,1)*50;
  const dimensionTarget=page.tool==='culture'||page.tool==='people'||page.tool==='pet'?5:4;
  const dimensionScore=Math.min(dimensions/dimensionTarget,1)*30;
  const trustScore=(page.tool==='culture'||page.tool==='people')?verifiedRate*20:20;
  const score=Math.round(countScore+dimensionScore+trustScore);
  rows.push({path:page.path,tool:page.tool,count:items.length,verified,verifiedRate,dimensions,short,genderKinds,tagKinds,target:countTarget,score});
}

rows.sort((a,b)=>a.score-b.score||a.count-b.count);
const thin=rows.filter(row=>row.score<72);
const errors:string[]=[];

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
console.log('[Data Depth] '+rows.length+' result-backed topic routes audited; '+thin.length+' routes are below the quality depth target.');
if(thin.length)errors.push('Routes below quality depth target: '+thin.map(row=>row.path+' ('+row.score+')').join(', '));

for(const row of rows){
  if(row.count===0)errors.push('Result-backed route has zero records: '+row.path);
  if(row.tool==='culture'&&row.verifiedRate<.9)errors.push('Cultural route source coverage below 90%: '+row.path+' -> '+Math.round(row.verifiedRate*100)+'%');
  if(row.path.startsWith('/nombres-con-')&&row.path!=='/nombres-con-en'&&row.verifiedRate<.5)errors.push('Letter route source coverage below 50%: '+row.path+' -> '+Math.round(row.verifiedRate*100)+'%');
  if(row.count>=18&&row.dimensions<2)errors.push('Large route has too few useful filter dimensions: '+row.path+' -> '+row.dimensions);
  if(row.tool==='pet'&&row.count>=20&&row.dimensions<4)errors.push('Pet route lacks practical filtering depth: '+row.path+' -> '+row.dimensions+' dimensions');
  if((row.tool==='gaming'||row.tool==='general')&&row.count>=20&&row.dimensions<3)errors.push('Gaming/social route lacks style or length depth: '+row.path+' -> '+row.dimensions+' dimensions');
}
if(errors.length){
  console.error('[Data Depth] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
