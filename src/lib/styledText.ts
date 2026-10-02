export type UnicodeStyleId=
  |'plain'|'bold'|'italic'|'boldItalic'
  |'sans'|'sansBold'|'sansItalic'|'sansBoldItalic'
  |'monospace'|'double'|'fraktur'|'frakturBold'
  |'script'|'scriptBold'|'circled'|'fullwidth'
  |'smallCaps'|'superscript'|'underline'|'strike'
  |'squared'|'negativeSquared'|'negativeCircled'|'parenthesized'|'regional'
  |'overline'|'doubleUnderline'|'dotted'|'tilde'|'slash'
  |'acute'|'grave'|'macron'|'diaeresis'|'ring'|'dotBelow'
  |'spaced'|'middleDot'|'bullet'|'starSep'|'kanaDot'|'underscoreSep'|'slashSep'|'crossSep'
  |'upsideDown'|'mirrorLite';

export type UnicodeCompatibility='alta'|'media'|'experimental';

export interface UnicodeStyle{
  id:UnicodeStyleId;
  label:string;
  shortLabel:string;
  compatibility:UnicodeCompatibility;
  transform:(value:string)=>string;
}

export interface NameFrame{
  id:string;
  label:string;
  transform:(value:string)=>string;
}

const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const L='abcdefghijklmnopqrstuvwxyz';
const D='0123456789';

function range(start:number,count:number){
  return Array.from({length:count},(_,index)=>String.fromCodePoint(start+index));
}

function makeMap(upper:string[],lower:string[],digits?:string[]){
  const map:Record<string,string>={};
  [...U].forEach((char,index)=>map[char]=upper[index]??char);
  [...L].forEach((char,index)=>map[char]=lower[index]??char);
  if(digits)[...D].forEach((char,index)=>map[char]=digits[index]??char);
  return map;
}

function rangedMap(upperStart:number,lowerStart:number,digitStart?:number){
  return makeMap(range(upperStart,26),range(lowerStart,26),digitStart===undefined?undefined:range(digitStart,10));
}

function replaceLegacy(map:Record<string,string>,values:Record<string,number>){
  for(const[key,codePoint]of Object.entries(values))map[key]=String.fromCodePoint(codePoint);
  return map;
}

function mapped(value:string,map:Record<string,string>){
  return Array.from(value.normalize('NFD')).map(char=>map[char]??char).join('');
}

const bold=rangedMap(0x1d400,0x1d41a,0x1d7ce);
const italic=replaceLegacy(rangedMap(0x1d434,0x1d44e),{h:0x210e});
const boldItalic=rangedMap(0x1d468,0x1d482);
const script=replaceLegacy(rangedMap(0x1d49c,0x1d4b6),{
  B:0x212c,E:0x2130,F:0x2131,H:0x210b,I:0x2110,L:0x2112,M:0x2133,R:0x211b,
  e:0x212f,g:0x210a,o:0x2134,
});
const scriptBold=rangedMap(0x1d4d0,0x1d4ea);
const fraktur=replaceLegacy(rangedMap(0x1d504,0x1d51e),{
  C:0x212d,H:0x210c,I:0x2111,R:0x211c,Z:0x2128,
});
const doubleStruck=replaceLegacy(rangedMap(0x1d538,0x1d552,0x1d7d8),{
  C:0x2102,H:0x210d,N:0x2115,P:0x2119,Q:0x211a,R:0x211d,Z:0x2124,
});
const frakturBold=rangedMap(0x1d56c,0x1d586);
const sans=rangedMap(0x1d5a0,0x1d5ba,0x1d7e2);
const sansBold=rangedMap(0x1d5d4,0x1d5ee,0x1d7ec);
const sansItalic=rangedMap(0x1d608,0x1d622);
const sansBoldItalic=rangedMap(0x1d63c,0x1d656);
const monospace=rangedMap(0x1d670,0x1d68a,0x1d7f6);

const circled=makeMap(range(0x24b6,26),range(0x24d0,26),[
  String.fromCodePoint(0x24ea),...range(0x2460,9),
]);

const fullwidth:Record<string,string>={};
for(let code=33;code<=126;code++)fullwidth[String.fromCharCode(code)]=String.fromCodePoint(code+0xfee0);
fullwidth[' ']=String.fromCodePoint(0x3000);

const smallCapsChars:Record<string,string>={
  a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ꜰ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',k:'ᴋ',l:'ʟ',m:'ᴍ',
  n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'ꜱ',t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ',
};
const smallCaps:Record<string,string>={};
for(const char of L){smallCaps[char]=smallCapsChars[char];smallCaps[char.toUpperCase()]=smallCapsChars[char]}

const superscriptChars:Record<string,string>={
  a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',
  n:'ⁿ',o:'ᵒ',p:'ᵖ',q:'q',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ',
  '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
};
const superscript:Record<string,string>={};
for(const char of L){superscript[char]=superscriptChars[char];superscript[char.toUpperCase()]=superscriptChars[char]}
for(const char of D)superscript[char]=superscriptChars[char];

const squared:Record<string,string>={};
const negativeSquared:Record<string,string>={};
const negativeCircled:Record<string,string>={};
const parenthesized:Record<string,string>={};
const regional:Record<string,string>={};
[...U].forEach((char,index)=>{
  squared[char]=String.fromCodePoint(0x1f130+index);
  squared[char.toLowerCase()]=String.fromCodePoint(0x1f130+index);
  negativeSquared[char]=String.fromCodePoint(0x1f170+index);
  negativeSquared[char.toLowerCase()]=String.fromCodePoint(0x1f170+index);
  negativeCircled[char]=String.fromCodePoint(0x1f150+index);
  negativeCircled[char.toLowerCase()]=String.fromCodePoint(0x1f150+index);
  parenthesized[char]=String.fromCodePoint(0x249c+index);
  parenthesized[char.toLowerCase()]=String.fromCodePoint(0x249c+index);
  regional[char]=String.fromCodePoint(0x1f1e6+index);
  regional[char.toLowerCase()]=String.fromCodePoint(0x1f1e6+index);
});

function combining(value:string,mark:string){
  return Array.from(value).map(char=>/\s/u.test(char)?char:char+mark).join('');
}

function separated(value:string,separator:string){
  return Array.from(value).map(char=>char===' '?String.fromCodePoint(0x2003):char).join(separator);
}

const upsideDownMap:Record<string,string>={
  a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',m:'ɯ',
  n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',
  A:'∀',B:'𐐒',C:'Ɔ',D:'◖',E:'Ǝ',F:'Ⅎ',G:'⅁',H:'H',I:'I',J:'ſ',K:'⋊',L:'˥',M:'W',
  N:'N',O:'O',P:'Ԁ',Q:'Ό',R:'ᴚ',S:'S',T:'⊥',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',
  '1':'⇂','2':'ᘔ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6','0':'0',
};

const mirrorLiteMap:Record<string,string>={
  a:'ɒ',b:'d',c:'ɔ',d:'b',e:'ɘ',f:'ʇ',g:'ǫ',h:'ʜ',i:'i',j:'ꞁ',k:'ʞ',l:'l',m:'m',
  n:'ᴎ',o:'o',p:'q',q:'p',r:'ɿ',s:'ƨ',t:'ƚ',u:'u',v:'v',w:'w',x:'x',y:'ʏ',z:'ƹ',
  A:'A',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'ꟻ',G:'Ꭾ',H:'H',I:'I',J:'Ⴑ',K:'ꓘ',L:'⅃',M:'M',
  N:'И',O:'O',P:'ꟼ',Q:'Ọ',R:'Я',S:'Ƨ',T:'T',U:'U',V:'V',W:'W',X:'X',Y:'Y',Z:'Ƹ',
};

function reverseMapped(value:string,map:Record<string,string>){
  return Array.from(value).reverse().map(char=>map[char]??char).join('');
}

const definitions:Array<[UnicodeStyleId,string,string,UnicodeCompatibility,(value:string)=>string]>= [
  ['plain','Normal','Normal','alta',value=>value],
  ['bold','Negrita','𝐁','media',value=>mapped(value,bold)],
  ['italic','Cursiva','𝐼','media',value=>mapped(value,italic)],
  ['boldItalic','Negrita cursiva','𝑩𝑰','media',value=>mapped(value,boldItalic)],
  ['sans','Sans Unicode','𝖲','media',value=>mapped(value,sans)],
  ['sansBold','Sans negrita','𝗦','media',value=>mapped(value,sansBold)],
  ['sansItalic','Sans cursiva','𝘚','media',value=>mapped(value,sansItalic)],
  ['sansBoldItalic','Sans negrita cursiva','𝙎','media',value=>mapped(value,sansBoldItalic)],
  ['monospace','Monoespaciada','𝙼','media',value=>mapped(value,monospace)],
  ['double','Doble trazo','𝔻','media',value=>mapped(value,doubleStruck)],
  ['fraktur','Gótica','𝔊','media',value=>mapped(value,fraktur)],
  ['frakturBold','Gótica negrita','𝕲','media',value=>mapped(value,frakturBold)],
  ['script','Manuscrita','𝒮','media',value=>mapped(value,script)],
  ['scriptBold','Manuscrita negrita','𝓢','media',value=>mapped(value,scriptBold)],
  ['circled','Círculos','ⓢ','media',value=>mapped(value,circled)],
  ['fullwidth','Ancha','Ｓ','media',value=>mapped(value,fullwidth)],
  ['smallCaps','Versalitas','ꜱ','alta',value=>mapped(value,smallCaps)],
  ['superscript','Superior','ˢ','experimental',value=>mapped(value,superscript)],
  ['underline','Subrayada','S̲','experimental',value=>combining(value,'\u0332')],
  ['strike','Tachada','S̶','experimental',value=>combining(value,'\u0336')],
  ['squared','Cuadros','🄰','experimental',value=>mapped(value,squared)],
  ['negativeSquared','Bloques','🅰','experimental',value=>mapped(value,negativeSquared)],
  ['negativeCircled','Círculos oscuros','🅐','experimental',value=>mapped(value,negativeCircled)],
  ['parenthesized','Entre paréntesis','⒩','experimental',value=>mapped(value,parenthesized)],
  ['regional','Regional','🇳','experimental',value=>mapped(value,regional)],
  ['overline','Línea superior','N̅','experimental',value=>combining(value,'\u0305')],
  ['doubleUnderline','Doble subrayado','N̳','experimental',value=>combining(value,'\u0333')],
  ['dotted','Punteada','Ṅ','experimental',value=>combining(value,'\u0307')],
  ['tilde','Ondulada','Ñ','experimental',value=>combining(value,'\u0303')],
  ['slash','Cruzada','N̸','experimental',value=>combining(value,'\u0338')],
  ['acute','Acento alto','Ń','experimental',value=>combining(value,'\u0301')],
  ['grave','Acento grave','Ǹ','experimental',value=>combining(value,'\u0300')],
  ['macron','Macrón','N̄','experimental',value=>combining(value,'\u0304')],
  ['diaeresis','Diéresis','N̈','experimental',value=>combining(value,'\u0308')],
  ['ring','Anillo','N̊','experimental',value=>combining(value,'\u030A')],
  ['dotBelow','Punto inferior','Ṇ','experimental',value=>combining(value,'\u0323')],
  ['spaced','Espaciada','N O V A','alta',value=>separated(value,' ')],
  ['middleDot','Puntos medios','N·O·V·A','alta',value=>separated(value,'·')],
  ['bullet','Bullets','N • O','alta',value=>separated(value,' • ')],
  ['starSep','Estrellas','N ⋆ O','alta',value=>separated(value,' ⋆ ')],
  ['kanaDot','Punto japonés','N・O','alta',value=>separated(value,'・')],
  ['underscoreSep','Guion bajo','N_O','alta',value=>separated(value,'_')],
  ['slashSep','Diagonal','N／O','alta',value=>separated(value,'／')],
  ['crossSep','Cruces','N×O','alta',value=>separated(value,'×')],
  ['upsideDown','Invertida','ɐʌoN','experimental',value=>reverseMapped(value,upsideDownMap)],
  ['mirrorLite','Espejo','ᴎɒvO','experimental',value=>reverseMapped(value,mirrorLiteMap)],
];

export const unicodeStyles:UnicodeStyle[]=definitions.map(([id,label,shortLabel,compatibility,transform])=>({
  id,label,shortLabel,compatibility,transform,
}));

export const unicodeStyleById=new Map(unicodeStyles.map(style=>[style.id,style] as const));

export function applyUnicodeStyle(value:string,id:UnicodeStyleId){
  return (unicodeStyleById.get(id)??unicodeStyles[0]).transform(value);
}

export const nameFrames:NameFrame[]=[
  {id:'none',label:'Sin marco',transform:value=>value},
  {id:'pro',label:'Pro',transform:value=>'『'+value+'』'},
  {id:'insano',label:'Insano',transform:value=>'꧁༺'+value+'༻꧂'},
  {id:'dark',label:'Dark',transform:value=>'𓆩'+value+'𓆪'},
  {id:'clan',label:'Clan',transform:value=>'亗'+value+'亗'},
  {id:'blade',label:'Blade',transform:value=>'乂'+value+'乂'},
  {id:'cross',label:'Cross',transform:value=>'×͜× '+value},
  {id:'stars',label:'Stars',transform:value=>'✦ '+value+' ✦'},
  {id:'hearts',label:'Hearts',transform:value=>'♡ '+value+' ♡'},
  {id:'royal',label:'Royal',transform:value=>'♛ '+value+' ♛'},
  {id:'lightning',label:'Volt',transform:value=>'⚡'+value+'⚡'},
  {id:'kawaii',label:'Kawaii',transform:value=>'୨'+value+'୧'},
  {id:'crown',label:'Corona',transform:value=>'♔ '+value+' ♔'},
  {id:'fire',label:'Fuego',transform:value=>'🔥 '+value+' 🔥'},
  {id:'moon',label:'Luna',transform:value=>'☾ '+value+' ☽'},
  {id:'flower',label:'Flor',transform:value=>'✿ '+value+' ✿'},
  {id:'diamond',label:'Diamante',transform:value=>'◇ '+value+' ◇'},
  {id:'arrow',label:'Flechas',transform:value=>'➳ '+value+' ➳'},
  {id:'wave',label:'Wave',transform:value=>'≈ '+value+' ≈'},
  {id:'skull',label:'Skull',transform:value=>'☠ '+value+' ☠'},
];

export function applyNameFrame(value:string,id:string){
  return (nameFrames.find(frame=>frame.id===id)??nameFrames[0]).transform(value);
}

export function generateUnicodeVariants(value:string,styleIds:UnicodeStyleId[]=unicodeStyles.map(style=>style.id)){
  return styleIds.map(id=>({id,value:applyUnicodeStyle(value,id),style:unicodeStyleById.get(id)!}));
}
