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
};

export const quickPresetsByPath:Record<string,QuickPreset[]>={
  '/nombres-de-mujer':[
    {label:'Cortos',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Clásicos',style:'classic'},
    {label:'Poco comunes',style:'rare'},
  ],
  '/nombres-de-nina':[
    {label:'3–4 letras',length:'short'},
    {label:'Modernos',style:'modern'},
    {label:'Poco comunes',style:'rare'},
  ],
  '/nombres-gatos':[
    {label:'Negros',color:'black'},
    {label:'Naranjas',color:'orange'},
    {label:'Tiernos',personality:'cute'},
    {label:'Juguetones',personality:'playful'},
  ],
  '/nombres-perritas':[
    {label:'Pequeñas',size:'small'},
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
    (!preset.tag||item.tags.includes(preset.tag));
}
