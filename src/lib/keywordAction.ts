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

  if(/mujer|mujeres|nina|femenin|hembra/.test(value))return pick(['Femeninos','Hembras']);
  if(/hombre|hombres|nino|masculin|macho/.test(value))return pick(['Masculinos','Machos']);
  if(/unisex|neutro|sin genero|androg/.test(value))return pick(['Unisex']);
  if(/3 letras|4 letras|corto|corta|cortos|cortas|cortito/.test(value))return pick(['Cortos','3–4 letras']);
  if(/modern/.test(value))return pick(['Modernos']);
  if(/clasico|clasicos|clasica/.test(value))return pick(['Clásicos']);
  if(/raro|raros|poco comun|poco comunes|exotic|extravag/.test(value))return pick(['Poco comunes']);
  if(/negro|negra|negros|negras|pantera/.test(value))return pick(['Negros']);
  if(/naranja|naranjas/.test(value))return pick(['Naranjas']);
  if(/pequena|pequeno|pequenas|pequenos/.test(value))return pick(['Pequeñas','Pequeños']);
  if(/grande|grandes/.test(value))return pick(['Grandes']);
  if(/tierno|tierna|tiernos|tiernas|bonito|bonita|bonitos|bonitas/.test(value))return pick(['Tiernos']);
  if(/jugueton|juguetona|juguetones|juguetonas/.test(value))return pick(['Juguetones']);
  if(/fuerte|fuertes/.test(value))return pick(['Fuertes']);
  if(/elegante|elegantes/.test(value))return pick(['Elegantes']);
  if(/mistico|mistica|misticos|misticas|bruja|brujas/.test(value))return pick(['Místicos']);
  if(/kawaii/.test(value))return pick(['Kawaii']);
  if(/mitolog|dioses|diosas/.test(value))return pick(['Mitología']);
  if(/significado/.test(value))return pick(['Con significado']);
  if(/pronunciacion|fonetica/.test(value))return pick(['Con pronunciación']);
  if(/kanji/.test(value))return pick(['Kanji','Con escritura']);
  if(/hangul/.test(value))return pick(['Hangul','Con escritura']);
  if(/cirilico/.test(value))return pick(['Cirílico','Con escritura']);
  if(/hanzi/.test(value))return pick(['Hanzi','Con escritura']);
  if(/escritura/.test(value))return pick(['Con escritura']);
  if(/yegua/.test(value))return pick(['Yeguas','Hembras']);

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
