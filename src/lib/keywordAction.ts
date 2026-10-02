import type{KeywordPage}from'@/data/keywordMaster';
import{normalizeKeyword}from'@/lib/keywordPlacement';

export interface KeywordAction{
  href:string;
  label:string;
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

  const href=fallbackTarget(page);
  return{
    href,
    label:href==='#resultados'?'Ver resultados':href==='#studio-nombres'?'Probar herramientas':'Abrir herramienta',
  };
}
