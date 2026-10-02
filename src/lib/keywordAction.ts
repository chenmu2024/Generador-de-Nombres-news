import type{KeywordPage}from'@/data/keywordMaster';
import{normalizeKeyword}from'@/lib/keywordPlacement';
import{getQuickPresets}from'@/data/nameGridPresets';

export interface KeywordAction{
  href:string;
  label:string;
}

function presetAction(page:KeywordPage,value:string):KeywordAction|null{
  const presets=getQuickPresets(page.path);
  if(!presets.length)return null;
  const normalizedLabels=new Map(presets.map(preset=>[normalizeKeyword(preset.label),preset] as const));

  const pick=(labels:string[])=>{
    for(const label of labels){
      const preset=normalizedLabels.get(normalizeKeyword(label));
      if(preset)return{
        href:page.path+'?preset='+encodeURIComponent(preset.label)+'#resultados',
        label:'Aplicar '+preset.label.toLocaleLowerCase('es'),
      };
    }
    return null;
  };

  const rules:Array<[RegExp,string[]]>= [
    [/griego/,['Griegos']],
    [/nordic/,['Nórdicos']],
    [/diosa|diosas/,['Diosas','Femeninos']],
    [/\bdios\b|\bdioses\b/,['Dioses','Mitología']],
    [/mujer|mujeres|nina|femenin|hembra/,['Femeninos','Hembras']],
    [/hombre|hombres|nino|masculin|macho/,['Masculinos','Machos']],
    [/unisex|neutro|sin genero|androg/,['Unisex']],
    [/3 letras|4 letras|corto|corta|cortos|cortas|cortito/,['Cortos','3–4 letras']],
    [/modern/,['Modernos']],
    [/clasico|clasicos|clasica/,['Clásicos']],
    [/raro|raros|poco comun|poco comunes|exotic|extravag/,['Poco comunes']],
    [/negro|negra|negros|negras|pantera/,['Negros']],
    [/naranja|naranjas/,['Naranjas']],
    [/pequena|pequeno|pequenas|pequenos/,['Pequeñas','Pequeños']],
    [/grande|grandes/,['Grandes']],
    [/tierno|tierna|tiernos|tiernas|bonito|bonita|bonitos|bonitas/,['Tiernos']],
    [/jugueton|juguetona|juguetones|juguetonas/,['Juguetones']],
    [/fuerte|fuertes/,['Fuertes']],
    [/elegante|elegantes/,['Elegantes']],
    [/mistico|mistica|misticos|misticas|bruja|brujas/,['Místicos']],
    [/kawaii|squishmallow/,['Kawaii']],
    [/mitolog/,['Mitología']],
    [/significado/,['Con significado']],
    [/pronunciacion|fonetica/,['Con pronunciación']],
    [/vasco/,['Vascos']],
    [/kanji/,['Kanji','Con escritura']],
    [/hangul/,['Hangul','Con escritura']],
    [/cirilico/,['Cirílico','Con escritura']],
    [/hanzi/,['Hanzi','Con escritura']],
    [/escritura/,['Con escritura']],
    [/yegua/,['Yeguas','Hembras']],
  ];

  for(const[pattern,labels]of rules){
    if(!pattern.test(value))continue;
    const match=pick(labels);
    if(match)return match;
  }
  return null;
}

function fallbackTarget(page:KeywordPage){
  if(page.path==='/')return'#studio-nombres';
  if(page.path==='/nombres-por-letra')return'#herramienta';
  if(['gaming','general','invisible','store','football'].includes(page.tool))return'#herramienta';
  return'#resultados';
}

export function getKeywordAction(page:KeywordPage,keyword:string):KeywordAction{
  const value=normalizeKeyword(keyword);

  if(page.path==='/'){
    if(value.includes('espacio invisible'))return{href:'/espacios-invisible-ff#herramienta',label:'Abrir espacio invisible'};
    if(value.includes('letras raras')||value.includes('simbolos unicode'))return{href:'/nombres-free-fire?shortcut=symbols#herramienta',label:'Probar símbolos'};
    if(value.includes('creador de apodos'))return{href:'/nombres-free-fire#herramienta',label:'Crear apodos'};
  }

  if(page.path==='/nombres-roblox'){
    if(value.includes('blox fruits'))return{href:page.path+'?intent=blox#herramienta',label:'Usar modo Blox Fruits'};
    if(value.includes('brookhaven'))return{href:page.path+'?intent=brookhaven#herramienta',label:'Usar modo Brookhaven'};
    if(value.includes('aesthetic'))return{href:page.path+'?intent=aesthetic#herramienta',label:'Usar modo Aesthetic'};
    if(value.includes('display name'))return{href:page.path+'?mode=display#herramienta',label:'Abrir Display Name'};
    if(value.includes('validador'))return{href:page.path+'?mode=username#herramienta',label:'Revisar username'};
  }

  if(page.path==='/nombres-instagram'){
    if(value.includes('letras'))return{href:page.path+'?intent=letters#herramienta',label:'Probar letras'};
    if(value.includes('aesthetic')||value.includes('bonitos'))return{href:page.path+'?intent=aesthetic#herramienta',label:'Usar modo Aesthetic'};
    if(value.includes('usuario')||value.includes('username')||value.includes('validador'))return{href:page.path+'?mode=username#herramienta',label:'Crear username'};
  }

  if(page.path==='/nombres-coreanos'){
    if(value.includes('kpop'))return{href:page.path+'?context=kpop#contexto-coreano',label:'Probar modo K-pop'};
    if(value.includes('dorama'))return{href:page.path+'?context=dorama#contexto-coreano',label:'Probar modo Dorama'};
    if(value.includes('estetic'))return{href:page.path+'?context=aesthetic#contexto-coreano',label:'Probar modo Aesthetic'};
  }

  if(page.path==='/nombres-anime'){
    if(value.includes('discord'))return{href:page.path+'?intent=discord#herramienta',label:'Usar modo Discord'};
    if(value.includes('genshin'))return{href:page.path+'?intent=genshin#herramienta',label:'Usar modo Genshin'};
    if(value.includes('blox fruits'))return{href:page.path+'?intent=blox#herramienta',label:'Usar modo Blox Fruits'};
    if(value.includes('roblox'))return{href:page.path+'?intent=roblox#herramienta',label:'Usar modo Roblox'};
  }

  if(page.path==='/nombres-para-tiendas'){
    if(value.includes('boutique'))return{href:page.path+'?channel=Boutique#herramienta',label:'Usar modo Boutique'};
    if(value.includes('en linea'))return{href:page.path+'?channel=Tienda%20online#herramienta',label:'Usar modo tienda online'};
    if(value.includes('bazar'))return{href:page.path+'?channel=Bazar#herramienta',label:'Usar modo Bazar'};
    if(value.includes('ropa'))return{href:page.path+'?industry=Ropa#herramienta',label:'Usar sector Ropa'};
  }

  if((page.path==='/nombres-de-mujer'||page.path==='/nombres-de-nino')&&value.includes('compuest')){
    return{href:page.path+'#compuestos',label:'Abrir combinador de nombres'};
  }

  if(page.path==='/nombres-peluches'){
    if(value.includes('acta de adopcion'))return{href:page.path+'?doc=acta#adopcion',label:'Crear acta de adopción'};
    if(value.includes('certificado de adopcion'))return{href:page.path+'?doc=certificado#adopcion',label:'Crear certificado'};
  }

  if(page.path==='/nombres-equipos-futbol'){
    if(value.includes('gracios'))return{href:page.path+'?style=Gracioso#herramienta',label:'Usar tono gracioso'};
    if(value.includes('futbol 5'))return{href:page.path+'?context=F%C3%BAtbol%205#herramienta',label:'Usar modo Fútbol 5'};
    if(value.includes('femenin'))return{href:page.path+'?context=Femenino#herramienta',label:'Usar modo femenino'};
    if(value.includes('torneo'))return{href:page.path+'?context=Torneo#herramienta',label:'Crear nombre de torneo'};
  }

  if(page.cluster==='freeFire'){
    if(value.includes('espacio')||value.includes('letra invisible')||value.includes('unicode u+3000')){
      return{href:'/espacios-invisible-ff#herramienta',label:'Abrir caracteres invisibles'};
    }
    if(value.includes('simbolo')||value.includes('insano'))return{href:page.path+'?shortcut=symbols#herramienta',label:'Probar símbolos'};
    if(value.includes('duo'))return{href:page.path+'?shortcut=duo#herramienta',label:'Crear nombres para dúo'};
    if(value.includes('3 letras')||value.includes('corto'))return{href:page.path+'?shortcut=short#herramienta',label:'Crear versión corta'};
    if(value.includes('clan')||value.includes('escuadra')||value.includes('tag')||value.includes('prefijo')){
      return{href:'/nombres-clanes-ff#herramienta',label:'Abrir generador de clanes'};
    }
  }

  const preset=presetAction(page,value);
  if(preset)return preset;

  const href=fallbackTarget(page);
  return{
    href,
    label:href==='#resultados'?'Ver resultados':href==='#studio-nombres'?'Probar herramientas':'Abrir herramienta',
  };
}
