export const brandStyles=['Premium','Minimal','Juvenil','Artesanal','Elegante','Natural'] as const;
export const brandIndustries=['Ropa','Belleza','Comida','Hogar','Tecnología','Accesorios','Mascotas','Papelería','Café','General'] as const;
export const brandChannels=['Tienda online','Boutique','Bazar','Local físico','General'] as const;
export const brandLanguages=['Español','Mixto','Internacional'] as const;

export type BrandStyle=(typeof brandStyles)[number];
export type BrandIndustry=(typeof brandIndustries)[number];
export type BrandChannel=(typeof brandChannels)[number];
export type BrandLanguage=(typeof brandLanguages)[number];

const spanish:Record<BrandStyle,string[]>={
  Premium:['Aura','Noble','Alma','Casa','Imperio','Selecta'],
  Minimal:['Nexo','Luma','Noma','Uno','Linea','Punto'],
  Juvenil:['Viva','Mimo','Hola','Chispa','Boom','Club'],
  Artesanal:['Casa','Taller','Raíz','Origen','Manos','Patio'],
  Elegante:['Élan','Dalia','Serena','Velia','Siena','Perla'],
  Natural:['Verde','Brisa','Bosque','Lino','Oliva','Río'],
};
const international:Record<BrandStyle,string[]>={
  Premium:['Maison','Atelier','Noble','Aura','Select','Prime'],
  Minimal:['Noma','Nexo','Luma','Mono','Line','Form'],
  Juvenil:['Viva','Milo','Hey','Pop','Glow','Club'],
  Artesanal:['Craft','Atelier','Root','Origin','Handmade','Workshop'],
  Elegante:['Maison','Élan','Siena','Velvet','Pearl','Muse'],
  Natural:['Leaf','Moss','Olive','River','Bloom','Terra'],
};

const sectorSpanish:Record<BrandIndustry,string[]>={
  Ropa:['Moda','Vestir','Prenda','Estudio','Closet','Textil'],
  Belleza:['Belleza','Piel','Brillo','Estudio','Aura','Ritual'],
  Comida:['Sabor','Mesa','Cocina','Mercado','Bocado','Despensa'],
  Hogar:['Hogar','Casa','Nido','Interior','Espacio','Rincón'],
  Tecnología:['Digital','Nexo','Código','Laboratorio','Pixel','Sistemas'],
  Accesorios:['Detalle','Complemento','Estilo','Joyero','Colección','Taller'],
  Mascotas:['Huella','Mimo','Patitas','Manada','Nido','Cola'],
  Papelería:['Papel','Tinta','Trazo','Agenda','Estudio','Letra'],
  Café:['Café','Taza','Grano','Origen','Barra','Tostador'],
  General:['Tienda','Mercado','Casa','Estudio','Bazar','Colectivo'],
};
const sectorInternational:Record<BrandIndustry,string[]>={
  Ropa:['Studio','Wear','Closet','Mode','Label','Textile'],
  Belleza:['Glow','Beauty','Skin','Lab','Aura','Ritual'],
  Comida:['Bite','Table','Kitchen','Market','Pantry','Taste'],
  Hogar:['Home','Living','Nest','Studio','Space','House'],
  Tecnología:['Tech','Labs','Digital','Works','Pixel','Systems'],
  Accesorios:['Details','Style','Edit','Collection','Studio','Atelier'],
  Mascotas:['Paws','Pet','Pack','Nest','Buddy','Tail'],
  Papelería:['Paper','Ink','Note','Studio','Letter','Desk'],
  Café:['Coffee','Bean','Roast','Brew','Cup','Origin'],
  General:['Store','Co.','Market','Studio','House','Collective'],
};

function handleFrom(name:string){
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24);
}
function rotate<T>(items:T[],amount:number){
  const offset=((amount%items.length)+items.length)%items.length;
  return [...items.slice(offset),...items.slice(0,offset)];
}
function fuseBrand(left:string,right:string){
  const a=left.trim().replace(/\s+/g,'');
  const b=right.trim().replace(/\s+/g,'');
  if(!a||!b)return(left+' '+right).trim();
  if(Array.from(a+b).length>20)return(left+' '+right).trim();
  return a+b.charAt(0).toLocaleUpperCase('es')+b.slice(1);
}

export interface BrandProposal{
  name:string;
  pattern:string;
  handle:string;
  chars:number;
  words:number;
}

export function generateBrandNames({
  seed,
  style,
  industry,
  channel,
  language,
  batch=0,
}:{
  seed:string;
  style:BrandStyle;
  industry:BrandIndustry;
  channel:BrandChannel;
  language:BrandLanguage;
  batch?:number;
}):BrandProposal[]{
  const base=seed.trim()||'Luna';
  const prefixSource=language==='Internacional'?international[style]:spanish[style];
  const suffixSource=language==='Español'?sectorSpanish[industry]:sectorInternational[industry];
  const prefixes=rotate(prefixSource,batch);
  const suffixes=rotate(suffixSource,batch*2);
  const mixed=language==='Mixto'
    ?[
      sectorSpanish[industry][batch%6],
      sectorInternational[industry][(batch+1)%6],
      sectorSpanish[industry][(batch+2)%6],
      sectorInternational[industry][(batch+3)%6],
      sectorSpanish[industry][(batch+4)%6],
      sectorInternational[industry][(batch+5)%6],
    ]
    :suffixes;
  const channelWord=channel==='Boutique'?'Boutique':channel==='Bazar'?'Bazar':channel==='Local físico'?'Casa':channel==='Tienda online'?'Online':'';
  const collective=language==='Español'?'Colectivo':'Collective';
  const proposals=[
    {name:prefixes[0]+' '+base,pattern:'Concepto + base'},
    {name:base+' '+mixed[0],pattern:'Base + sector'},
    {name:fuseBrand(base,mixed[1]),pattern:'Marca compacta'},
    {name:prefixes[1]+' '+mixed[2],pattern:'Concepto + sector'},
    {name:channelWord?base+' '+channelWord:prefixes[2]+' '+base,pattern:'Base + canal'},
    {name:prefixes[3]+' '+base,pattern:'Concepto + base'},
    {name:base+' '+collective,pattern:'Base + comunidad'},
    {name:prefixes[4]+' '+mixed[3],pattern:'Concepto + sector'},
    {name:base+' '+mixed[4],pattern:'Base + sector'},
    {name:fuseBrand(prefixes[5],base),pattern:'Marca compacta'},
    {name:prefixes[0]+' '+mixed[5],pattern:'Concepto + sector'},
    {name:prefixes[2]+' '+base+' '+mixed[0],pattern:'Concepto + base + sector'},
  ];
  const seen=new Set<string>();
  return proposals.filter(item=>{
    const key=item.name.toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
    if(seen.has(key))return false;
    seen.add(key);
    return true;
  }).map(item=>({
    ...item,
    handle:handleFrom(item.name),
    chars:Array.from(item.name).length,
    words:item.name.trim().split(/\s+/).length,
  }));
}
