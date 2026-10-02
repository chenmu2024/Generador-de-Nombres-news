import type{NameRecord}from'@/data/nameDataset';

export type QuickPreset={
  label:string;
  length?:'short'|'medium'|'long';
  style?:string;
  color?:string;
  size?:string;
  personality?:string;
  gender?:'ALL'|'F'|'M'|'U';
  tag?:string;
  cultureFacet?:'ALL'|'script'|'pronunciation'|'verified';
  cultureKind?:'ALL'|'names'|'mythology';
  meaning?:true;
};

export const quickPresetsByPath:Record<string,QuickPreset[]>={
  '/nombres-de-mujer':[
    {label:'Cortos',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Clásicos',style:'classic'},
    {label:'Poco comunes',style:'rare'},
    {label:'Con significado',meaning:true},
    {label:'Con fuente',cultureFacet:'verified'},
  ],
  '/nombres-de-nina':[
    {label:'3–4 letras',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Poco comunes',style:'rare'},
    {label:'Con significado',meaning:true},
    {label:'Con fuente',cultureFacet:'verified'},
  ],
  '/nombres-de-nino':[
    {label:'Cortos',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Clásicos',style:'classic'},
    {label:'Poco comunes',style:'rare'},
    {label:'Con significado',meaning:true},
    {label:'Con fuente',cultureFacet:'verified'},
  ],
  '/nombres-raros':[
    {label:'Cortos',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Poco comunes',style:'rare'},
    {label:'Unisex',gender:'U'},
    {label:'Con significado',meaning:true},
    {label:'Con fuente',cultureFacet:'verified'},
  ],
  '/nombres-con-a':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cortos',length:'short'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-b':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'5–6 letras',length:'medium'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-c':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'5–6 letras',length:'medium'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-e':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cortos',length:'short'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-f':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'5–6 letras',length:'medium'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-m':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'5–6 letras',length:'medium'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-en':[
    {label:'Masculinos',gender:'M'},
    {label:'Femeninos',gender:'F'},
    {label:'Cortos',length:'short'},
    {label:'Clásicos',style:'classic'},
  ],
  '/nombres-con-y':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cortos',length:'short'},
    {label:'Modernos',style:'modern'},
  ],
  '/nombres-con-z':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cortos',length:'short'},
    {label:'Poco comunes',style:'rare'},
  ],
  '/nombres-japoneses':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Unisex',gender:'U'},
    {label:'Kanji',cultureFacet:'script'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-coreanos':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Unisex',gender:'U'},
    {label:'Hangul',cultureFacet:'script'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-franceses':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Unisex',gender:'U'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-italianos':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'7+ letras',length:'long'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-mayas':[
    {label:'Nombres',cultureKind:'names'},
    {label:'Mitología',cultureKind:'mythology'},
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-de-dioses':[
    {label:'Diosas',gender:'F'},
    {label:'Dioses',gender:'M'},
    {label:'Con escritura',cultureFacet:'script'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-rusos':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cirílico',cultureFacet:'script'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-griegos':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Mitología',cultureKind:'mythology'},
    {label:'Nombres',cultureKind:'names'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-ingles':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cortos',length:'short'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-turcos':[
    {label:'Femeninos',gender:'F'},
    {label:'Masculinos',gender:'M'},
    {label:'Cortos',length:'short'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-chinos':[
    {label:'Unisex',gender:'U'},
    {label:'Hanzi',cultureFacet:'script'},
    {label:'Con pronunciación',cultureFacet:'pronunciation'},
    {label:'Cortos',length:'short'},
    {label:'Con significado',meaning:true},
  ],
  '/nombres-gatos':[
    {label:'Negros',color:'black'},
    {label:'Naranjas',color:'orange'},
    {label:'Pequeños',size:'small'},
    {label:'Cortos',length:'short'},
    {label:'Hembras',gender:'F'},
    {label:'Machos',gender:'M'},
    {label:'Tiernos',personality:'cute'},
    {label:'Juguetones',personality:'playful'},
  ],
  '/nombres-perritas':[
    {label:'Pequeñas',size:'small'},
    {label:'Cortos',length:'short'},
    {label:'Tiernas',personality:'cute'},
    {label:'Elegantes',personality:'elegant'},
    {label:'Juguetonas',personality:'playful'},
  ],
  '/nombres-perros-machos':[
    {label:'Fuertes',personality:'strong'},
    {label:'Pequeños',size:'small'},
    {label:'Grandes',size:'large'},
    {label:'Juguetones',personality:'playful'},
  ],
  '/nombres-caballos':[
    {label:'Fuertes',personality:'strong'},
    {label:'Elegantes',personality:'elegant'},
    {label:'Tranquilos',personality:'calm'},
    {label:'Negros',color:'black'},
    {label:'Grandes',size:'large'},
    {label:'Yeguas',gender:'F'},
    {label:'Machos',gender:'M'},
  ],
  '/nombres-peluches':[
    {label:'Tiernos',personality:'cute'},
    {label:'Kawaii',personality:'kawaii'},
    {label:'Pequeños',size:'small'},
    {label:'Juguetones',personality:'playful'},
  ],
  '/perritas-chihuahua':[
    {label:'Cortos',length:'short'},
    {label:'Tiernos',personality:'cute'},
    {label:'Juguetones',personality:'playful'},
  ],
  '/nombres-gatos-negros':[
    {label:'Místicos',personality:'mystic'},
    {label:'Hembras',gender:'F'},
    {label:'Machos',gender:'M'},
    {label:'Cortos',length:'short'},
  ],
  '/nombres-gatos-machos':[
    {label:'Cortos',length:'short'},
    {label:'Negros',color:'black'},
    {label:'Juguetones',personality:'playful'},
    {label:'Tiernos',personality:'cute'},
  ],
  '/nombres-free-fire':[
    {label:'Cortos',tag:'short'},
    {label:'Dark',tag:'dark'},
    {label:'Fuertes',tag:'strong'},
    {label:'Únicos',tag:'unique'},
  ],
  '/generador-free-fire':[
    {label:'Cortos',tag:'short'},
    {label:'Dark',tag:'dark'},
    {label:'Fuertes',tag:'strong'},
    {label:'Únicos',tag:'unique'},
  ],
  '/nombres-unisex':[
    {label:'Cortos',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Poco comunes',style:'rare'},
    {label:'Con significado',meaning:true},
    {label:'Con fuente',cultureFacet:'verified'},
  ],
  '/nombres-ff-mujeres':[
    {label:'Aesthetic',tag:'aesthetic'},
    {label:'Cortos',length:'short'},
    {label:'Fuertes',tag:'strong'},
  ],
  '/nombres-ff-unicos':[
    {label:'Cortos',length:'short'},
    {label:'Dark',tag:'dark'},
    {label:'Fuertes',tag:'strong'},
  ],
  '/nombres-clanes-ff':[
    {label:'Cortos',tag:'short'},
    {label:'Dark',tag:'dark'},
    {label:'Fuertes',tag:'strong'},
  ],
  '/nombres-roblox':[
    {label:'Cortos',tag:'short'},
    {label:'Aesthetic',tag:'aesthetic'},
    {label:'Fuertes',tag:'strong'},
  ],
  '/nombres-instagram':[
    {label:'Aesthetic',tag:'aesthetic'},
    {label:'Modernos',tag:'modern'},
    {label:'Únicos',tag:'unique'},
  ],
  '/nombres-anime':[
    {label:'Aesthetic',tag:'aesthetic'},
    {label:'Dark',tag:'dark'},
    {label:'Únicos',tag:'unique'},
  ],
};

export function getQuickPresets(pagePath?:string){
  return pagePath?quickPresetsByPath[pagePath]??[]:[];
}

function lengthBucket(name:string){
  const length=Array.from(name.replace(/[^\p{L}]/gu,'')).length;
  if(length<=4)return'short';
  if(length<=6)return'medium';
  return'long';
}

function inferredGender(item:NameRecord):'F'|'M'|'U'|undefined{
  return item.gender??(item.tags.includes('female')?'F':item.tags.includes('male')?'M':item.tags.includes('unisex')?'U':undefined);
}

export function matchesQuickPreset(item:NameRecord,preset:QuickPreset){
  return (!preset.length||lengthBucket(item.name)===preset.length)&&
    (!preset.style||item.tags.includes(preset.style))&&
    (!preset.color||item.tags.includes(preset.color))&&
    (!preset.size||item.tags.includes(preset.size))&&
    (!preset.personality||item.tags.includes(preset.personality))&&
    (!preset.gender||preset.gender==='ALL'||inferredGender(item)===preset.gender)&&
    (!preset.tag||item.tags.includes(preset.tag))&&
    (!preset.meaning||Boolean(item.meaning))&&
    (!preset.cultureFacet||preset.cultureFacet==='ALL'||
      (preset.cultureFacet==='script'&&Boolean(item.script))||
      (preset.cultureFacet==='pronunciation'&&Boolean(item.pronunciation))||
      (preset.cultureFacet==='verified'&&item.verified===true&&Boolean(item.source)&&Boolean(item.sourceUrl)))&&
    (!preset.cultureKind||preset.cultureKind==='ALL'||
      (preset.cultureKind==='mythology'&&item.tags.includes('mythology'))||
      (preset.cultureKind==='names'&&!item.tags.includes('mythology')));
}
