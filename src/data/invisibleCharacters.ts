export type InvisibleCharacterLevel='Separador'|'Alternativa'|'Ancho'|'Experimental';

export interface InvisibleCharacter{
  label:string;
  value:string;
  code:string;
  level:InvisibleCharacterLevel;
  note:string;
}

export const invisibleCharacters:InvisibleCharacter[]=[
  {label:'Hangul Filler',value:'ㅤ',code:'U+3164',level:'Separador',note:'Se ve vacío y puede probarse como separador visual; la plataforma puede normalizarlo o rechazarlo.'},
  {label:'Halfwidth Hangul Filler',value:'ﾠ',code:'U+FFA0',level:'Alternativa',note:'Variante de ancho reducido; la plataforma puede normalizarla.'},
  {label:'Braille Blank',value:'⠀',code:'U+2800',level:'Alternativa',note:'Patrón braille vacío que visualmente funciona como espacio.'},
  {label:'Ideographic Space',value:'　',code:'U+3000',level:'Ancho',note:'Espacio Unicode de ancho completo.'},
  {label:'Zero Width Space',value:'​',code:'U+200B',level:'Experimental',note:'No ocupa ancho; algunas plataformas lo eliminan.'},
  {label:'Word Joiner',value:'⁠',code:'U+2060',level:'Experimental',note:'Carácter sin ancho; no está pensado como espacio normal.'},
];
