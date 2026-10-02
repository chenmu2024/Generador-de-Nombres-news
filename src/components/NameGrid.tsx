'use client';

import {useEffect,useMemo,useRef,useState} from 'react';
import {Check,ClipboardCopy,Heart,HeartPlus,RotateCcw,Scale,Search,Shuffle,SlidersHorizontal,X} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';
import type{ToolMode} from '@/data/keywordMaster';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';
import{copyText}from'@/lib/clipboard';
import{consumeNameSearch}from'@/lib/searchHandoff';
import{readFavorites,toggleFavorite as toggleStoredFavorite,writeFavorites}from'@/lib/favorites';
import{getQuickPresets,type QuickPreset}from'@/data/nameGridPresets';

const internalTags=new Set(['cat','dog','pet','horse','plush','gaming','freefire','roblox','instagram','female','male','unisex','enye','clan']);
const tagLabels:Record<string,string>={
  short:'Corto',modern:'Moderno',classic:'Clásico',cute:'Tierno',small:'Pequeño',
  black:'Negro',mystic:'Místico',strong:'Fuerte',elegant:'Elegante',kawaii:'Kawaii',
  mythology:'Mitológico',anime:'Anime',aesthetic:'Aesthetic',dark:'Dark',rare:'Poco común',unique:'Único',
  orange:'Naranja',white:'Blanco',gray:'Gris',brown:'Marrón',playful:'Juguetón',calm:'Tranquilo',large:'Grande'
};

const personStyles=['modern','classic','rare'] as const;
const petColors=['black','orange','white','gray','brown'] as const;
const petSizes=['small','large'] as const;
const petPersonalities=['cute','playful','calm','strong','elegant','mystic','kawaii'] as const;

type LengthFilter='ALL'|'short'|'medium'|'long';
type SortMode='recommended'|'az'|'short';

function lengthBucket(name:string):Exclude<LengthFilter,'ALL'>{
  const length=Array.from(name.replace(/[^\p{L}]/gu,'')).length;
  if(length<=4)return 'short';
  if(length<=6)return 'medium';
  return 'long';
}

const lengthLabels:Record<LengthFilter,string>={
  ALL:'Todas',
  short:'3–4 letras',
  medium:'5–6 letras',
  long:'7+ letras',
};

function resultKicker(mode:ToolMode,pagePath:string|undefined,item:NameRecord){
  if(pagePath==='/nombres-japoneses')return item.script?'Kanji / romaji':'Nombre japonés';
  if(pagePath==='/nombres-coreanos')return item.script?'Hangul / romanización':'Nombre coreano';
  if(pagePath==='/nombres-chinos')return item.script?'Hanzi / romanización':'Nombre chino';
  if(pagePath==='/nombres-rusos')return item.script?'Cirílico / transliteración':'Nombre ruso';
  if(pagePath==='/nombres-mayas')return item.tags.includes('mythology')?'Contexto mitológico':'Contexto maya';
  if(pagePath==='/nombres-de-dioses')return'Figura mitológica';
  if(pagePath==='/nombres-griegos')return item.tags.includes('mythology')?'Mitología griega':'Nombre griego';
  if(pagePath==='/nombres-franceses')return'Nombre francés';
  if(pagePath==='/nombres-italianos')return'Nombre italiano';
  if(pagePath==='/nombres-ingles')return'Forma usada en inglés';
  if(pagePath==='/nombres-turcos')return'Nombre turco';
  if(mode==='culture')return item.script?'Forma original / lectura':'Nombre y contexto';
  if(pagePath==='/nombres-gatos-negros')return'Idea mística u oscura';
  if(pagePath==='/nombres-gatos-machos')return'Idea corta para gato macho';
  if(pagePath==='/nombres-gatos')return'Idea para gato';
  if(pagePath==='/perritas-chihuahua')return'Idea pequeña y expresiva';
  if(pagePath==='/nombres-perritas')return'Idea para perrita';
  if(pagePath==='/nombres-perros-machos')return'Idea para perro macho';
  if(pagePath==='/nombres-caballos')return'Idea para caballo o yegua';
  if(pagePath==='/nombres-peluches')return'Idea tierna para peluche';
  if(mode==='pet')return'Idea para llamar a diario';
  if(pagePath?.startsWith('/nombres-con-')){
    const letter=pagePath.replace('/nombres-con-','').replace('en','Ñ').toUpperCase();
    return'Empieza por '+letter;
  }
  if(mode==='people')return item.verified===true&&item.sourceUrl?'Ficha con fuente':'Ficha para comparar';
  if(pagePath==='/nombres-instagram')return'Idea para perfil';
  if(pagePath==='/nombres-roblox')return'Base para username';
  if(pagePath==='/nombres-anime')return'Base temática';
  if(pagePath==='/nombres-clanes-ff')return'Base para clan';
  if(pagePath==='/nombres-ff-mujeres')return'Nickname femenino';
  if(pagePath==='/nombres-ff-unicos')return'Base poco común';
  if(pagePath?.includes('free-fire')||pagePath?.includes('ff-'))return'Base para nickname';
  return'Idea para personalizar';
}

function petFitSummary(tags:string[]){
  const labels=tags
    .filter(tag=>petColors.includes(tag as typeof petColors[number])||petSizes.includes(tag as typeof petSizes[number])||petPersonalities.includes(tag as typeof petPersonalities[number]))
    .map(tag=>tagLabels[tag])
    .filter(Boolean)
    .slice(0,3);
  return labels.length?labels.join(' · '):'Prueba cómo suena al llamarlo en voz alta.';
}

function collectionCopy(mode:ToolMode,pagePath:string|undefined,pageLabel:string|undefined){
  if(pagePath==='/nombres-de-mujer')return{eyebrow:'Compara con contexto',heading:'Nombres de mujer por origen, estilo y significado',sub:'Filtra la colección y abre las fuentes cuando el significado sea importante para tu decisión.',empty:'No hay nombres de mujer que coincidan con esos filtros.'};
  if(pagePath==='/nombres-de-nina')return{eyebrow:'Reduce la lista',heading:'Nombres de niña cortos, modernos y poco comunes',sub:'Combina longitud, estilo y origen hasta quedarte con una lista corta que puedas comparar.',empty:'No hay nombres de niña que coincidan con esa combinación.'};
  if(pagePath==='/nombres-de-nino')return{eyebrow:'Filtra y compara',heading:'Nombres de niño con significado y contexto de origen',sub:'Prioriza las fichas con fuente si vas a usar el significado como criterio de elección.',empty:'No hay nombres de niño que coincidan con esos filtros.'};
  if(pagePath==='/nombres-unisex')return{eyebrow:'Compara uso y origen',heading:'Nombres unisex para revisar con más contexto',sub:'El uso puede cambiar según idioma y región; revisa la ficha antes de asumir que un nombre es neutro en todos los países.',empty:'No hay nombres unisex que coincidan con esos filtros.'};
  if(pagePath==='/nombres-raros')return{eyebrow:'Explora sin asumir frecuencia',heading:'Nombres poco comunes para comparar con calma',sub:'“Poco común” es una etiqueta de exploración; no equivale a una estadística oficial de rareza.',empty:'No hay nombres poco comunes que coincidan con esos filtros.'};
  if(pagePath?.startsWith('/nombres-con-'))return{eyebrow:'Explora esta inicial',heading:'Compara '+(pageLabel??'nombres por inicial'),sub:'Usa la letra como primera criba y después compara longitud, género, origen y significado.',empty:'No hay nombres de esta inicial que coincidan con esos filtros.'};
  if(pagePath==='/nombres-japoneses')return{eyebrow:'Kanji, romaji y fuente',heading:'Compara nombres japoneses sin mezclar escritura y lectura',sub:'Cuando existe una escritura documentada, la mostramos separada de la romanización y de la explicación del significado.',empty:'No hay nombres japoneses que coincidan con esos filtros.'};
  if(pagePath==='/nombres-coreanos')return{eyebrow:'Hangul y romanización',heading:'Compara nombres coreanos con su escritura y contexto',sub:'Usa Hangul, romanización y fuente como datos distintos antes de interpretar el nombre fuera de su contexto.',empty:'No hay nombres coreanos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-chinos')return{eyebrow:'Hanzi y lectura',heading:'Compara nombres chinos conservando los caracteres originales',sub:'La romanización no sustituye al Hanzi: revisa ambos cuando el significado sea importante.',empty:'No hay nombres chinos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-de-dioses')return{eyebrow:'Mitologías separadas por contexto',heading:'Deidades y figuras mitológicas para explorar por tradición',sub:'La presencia en esta colección indica contexto mitológico; no significa que sea un nombre personal habitual.',empty:'No hay figuras mitológicas que coincidan con esos filtros.'};
  if(pagePath==='/nombres-mayas')return{eyebrow:'Contexto antes que cantidad',heading:'Registros mayas y prehispánicos con referencia clara',sub:'La colección prioriza separar nombres, términos históricos y figuras mitológicas en lugar de inflar la lista.',empty:'No hay registros mayas que coincidan con esos filtros.'};
  if(pagePath==='/nombres-franceses')return{eyebrow:'Grafía y pronunciación',heading:'Nombres franceses para comparar forma, origen y lectura',sub:'Conserva acentos y grafía documentada y revisa la pronunciación cuando la ficha la incluya.',empty:'No hay nombres franceses que coincidan con esos filtros.'};
  if(pagePath==='/nombres-italianos')return{eyebrow:'Clásicos y modernos',heading:'Nombres italianos para comparar sin perder su forma original',sub:'Usa origen, pronunciación y significado para distinguir formas italianas de equivalentes en otros idiomas.',empty:'No hay nombres italianos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-rusos')return{eyebrow:'Cirílico y transliteración',heading:'Nombres rusos con su forma original y lectura latina',sub:'Una transliteración distinta no implica necesariamente un nombre distinto; revisa la escritura y la fuente.',empty:'No hay nombres rusos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-griegos')return{eyebrow:'Uso moderno y contexto mitológico',heading:'Nombres griegos para separar tradición, escritura y mitología',sub:'No mezcles automáticamente figuras mitológicas con nombres personales de uso actual.',empty:'No hay nombres griegos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-ingles')return{eyebrow:'Uso en inglés, no origen único',heading:'Nombres usados en inglés para comparar forma y procedencia',sub:'Algunos nombres llegaron al inglés desde otras lenguas; la ficha conserva ese contexto cuando está documentado.',empty:'No hay nombres en inglés que coincidan con esos filtros.'};
  if(pagePath==='/nombres-turcos')return{eyebrow:'Grafía turca primero',heading:'Nombres turcos conservando letras y forma documentada',sub:'Caracteres como ı, İ, ş, ç, ö, ü y ğ forman parte de la escritura, no son decoración.',empty:'No hay nombres turcos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-gatos-negros')return{eyebrow:'Místicos, oscuros y elegantes',heading:'Nombres para gatos negros filtrados por estilo',sub:'El color inspira la búsqueda, pero las etiquetas son editoriales y no definen la personalidad real del gato.',empty:'No hay nombres para gatos negros que coincidan con esos filtros.'};
  if(pagePath==='/nombres-gatos')return{eyebrow:'Color, sexo y personalidad',heading:'Nombres para gatos que puedes filtrar antes de decidir',sub:'Combina rasgos editoriales con cómo suena realmente el nombre al llamarlo.',empty:'No hay nombres para gatos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-gatos-machos')return{eyebrow:'Cortos y fáciles de llamar',heading:'Nombres para gatos machos organizados para comparar rápido',sub:'Usa longitud y rasgos como primera criba y prueba tus finalistas en voz alta.',empty:'No hay nombres para gatos machos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-perritas')return{eyebrow:'Tamaño, personalidad y sonido',heading:'Nombres para perritas para probar en el uso diario',sub:'Las etiquetas ayudan a explorar; la decisión final funciona mejor cuando el nombre es claro al repetirlo.',empty:'No hay nombres para perritas que coincidan con esos filtros.'};
  if(pagePath==='/nombres-perros-machos')return{eyebrow:'Fuertes, cortos o tranquilos',heading:'Nombres para perros machos por tamaño y estilo',sub:'Filtra por rasgos y compara cómo suena cada opción antes de guardarla.',empty:'No hay nombres para perros machos que coincidan con esos filtros.'};
  if(pagePath==='/perritas-chihuahua')return{eyebrow:'Cortos, tiernos y fáciles de repetir',heading:'Nombres para chihuahua hembra pensados para uso diario',sub:'Combina tamaño, personalidad y longitud y después prueba tus finalistas en voz alta.',empty:'No hay nombres para chihuahua que coincidan con esos filtros.'};
  if(pagePath==='/nombres-caballos')return{eyebrow:'Presencia y sonoridad',heading:'Nombres para caballos y yeguas por estilo y rasgos',sub:'Prueba cada opción al llamarla y evita inferir raza o aptitud a partir del nombre.',empty:'No hay nombres para caballos que coincidan con esos filtros.'};
  if(pagePath==='/nombres-peluches')return{eyebrow:'Tiernos, kawaii y fáciles de adoptar',heading:'Nombres para peluches con estilos fáciles de explorar',sub:'Elige una idea, guárdala y úsala después en el acta o certificado de adopción de la página.',empty:'No hay nombres para peluches que coincidan con esos filtros.'};
  if(mode==='culture')return{eyebrow:'Lee el contexto antes de elegir',heading:'Escritura, lectura, origen y fuente en una sola ficha',sub:'La forma latina, la escritura original y la pronunciación se muestran por separado cuando están documentadas.',empty:'No hay registros culturales que coincidan con esos filtros.'};
  if(mode==='pet')return{eyebrow:'Prueba cómo suena',heading:'Nombres para mascota organizados por rasgos prácticos',sub:'Las etiquetas de color, tamaño y personalidad son ayudas editoriales para explorar ideas.',empty:'No hay nombres de mascota que coincidan con esos filtros.'};
  if(pagePath==='/nombres-roblox')return{eyebrow:'Username y Display Name parten de reglas distintas',heading:'Bases de Roblox para llevar al generador',sub:'Usa estas ideas como punto de partida y prueba después el flujo de Username o Display Name según lo que necesites.',empty:'No hay bases de Roblox que coincidan con ese filtro.'};
  if(pagePath==='/nombres-instagram')return{eyebrow:'Ideas para username y nombre visible',heading:'Bases para Instagram que puedes simplificar o estilizar',sub:'La disponibilidad real debe comprobarse dentro de Instagram; aquí trabajas la forma del nombre.',empty:'No hay bases para Instagram que coincidan con ese filtro.'};
  if(pagePath==='/nombres-anime')return{eyebrow:'Bases temáticas para juegos y perfiles',heading:'Ideas inspiradas en estética anime para personalizar',sub:'Lleva una base al generador y adáptala al juego, red o comunidad donde vayas a usarla.',empty:'No hay bases anime que coincidan con ese filtro.'};
  if(pagePath==='/nombres-clanes-ff')return{eyebrow:'Identidad de grupo primero',heading:'Bases para clanes y escuadras de Free Fire',sub:'Busca una raíz reconocible y prueba después una versión corta que también funcione como tag.',empty:'No hay bases de clan que coincidan con ese filtro.'};
  if(pagePath==='/nombres-ff-mujeres')return{eyebrow:'Femeninos, aesthetic y competitivos',heading:'Bases para nicknames femeninos de Free Fire',sub:'Elige una raíz y llévala al generador para combinar fuente, marco, versión corta o espacio invisible.',empty:'No hay bases femeninas que coincidan con ese filtro.'};
  if(pagePath==='/nombres-ff-unicos')return{eyebrow:'Poco comunes sin prometer exclusividad',heading:'Bases raras para construir un nickname más distintivo',sub:'“Único” aquí describe intención creativa; la disponibilidad real se comprueba dentro del juego.',empty:'No hay bases poco comunes que coincidan con ese filtro.'};
  if(pagePath==='/nombres-free-fire')return{eyebrow:'Base primero, decoración después',heading:'Ideas para Free Fire listas para llevar al estudio de estilos',sub:'Escoge una raíz reconocible y después prueba símbolos, marcos, longitud y compatibilidad.',empty:'No hay bases de Free Fire que coincidan con ese filtro.'};
  if(pagePath==='/generador-free-fire')return{eyebrow:'Inspírate o escribe tu propia base',heading:'Ideas de partida para el generador de Free Fire',sub:'Puedes copiar una opción o volver al generador y trabajar con una palabra completamente tuya.',empty:'No hay bases que coincidan con ese filtro.'};
  if(mode==='gaming'||mode==='general')return{eyebrow:'Bases listas para copiar',heading:'Ideas que puedes llevar al generador y personalizar',sub:'Copia una base o vuelve a la herramienta para probar símbolos, estilos y variantes.',empty:'No hay bases que coincidan con ese filtro.'};
  return{eyebrow:'Explora resultados',heading:pageLabel?'Explora '+pageLabel:'Resultados',sub:'Ajusta los filtros hasta encontrar opciones que encajen con tu objetivo.',empty:'No encontramos resultados con esa combinación.'};
}

function FacetRow({label,children}:{label:string;children:React.ReactNode}){
  return <div className="grid gap-2 border-t border-[#eceaf3] pt-3 sm:grid-cols-[92px_1fr] sm:items-center">
    <span className="text-[10px] font-black uppercase tracking-[.12em] text-[#9294a5]">{label}</span>
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">{children}</div>
  </div>
}

export default function NameGrid({items,mode,pagePath,pageLabel}:{items:NameRecord[];mode:ToolMode;pagePath?:string;pageLabel?:string}){
  const[query,setQuery]=useState('');
  const[gender,setGender]=useState<'ALL'|'F'|'M'|'U'>('ALL');
  const[activeTag,setActiveTag]=useState('');
  const[lengthFilter,setLengthFilter]=useState<LengthFilter>('ALL');
  const[styleFilter,setStyleFilter]=useState('');
  const[originFilter,setOriginFilter]=useState('');
  const[originContainsFilter,setOriginContainsFilter]=useState('');
  const[colorFilter,setColorFilter]=useState('');
  const[sizeFilter,setSizeFilter]=useState('');
  const[personalityFilter,setPersonalityFilter]=useState('');
  const[cultureFacet,setCultureFacet]=useState<'ALL'|'script'|'pronunciation'|'verified'>('ALL');
  const[cultureKind,setCultureKind]=useState<'ALL'|'names'|'mythology'>('ALL');
  const[meaningOnly,setMeaningOnly]=useState(false);
  const[sortMode,setSortMode]=useState<SortMode>('recommended');
  const[favorites,setFavorites]=useState<string[]>([]);
  const[randomPick,setRandomPick]=useState('');
  const[arrivalName,setArrivalName]=useState('');
  const[actionFeedback,setActionFeedback]=useState('');
  const[compareNames,setCompareNames]=useState<string[]>([]);
  const[advancedOpen,setAdvancedOpen]=useState(false);
  const[limit,setLimit]=useState(18);
  const resultsRef=useRef<HTMLElement|null>(null);
  const filterTrackingReady=useRef(false);

  useEffect(()=>{setFavorites(readFavorites())},[]);

  useEffect(()=>{
    if(!pagePath)return;
    const pending=consumeNameSearch(pagePath);
    if(!pending)return;
    const match=items.find(item=>item.name.toLocaleLowerCase('es')===pending.toLocaleLowerCase('es'));
    if(match){
      setQuery(match.name);
      setArrivalName(match.name);
      setLimit(18);
      window.setTimeout(()=>resultsRef.current?.scrollIntoView({block:'start'}),60);
    }
  },[items,pagePath]);

  useEffect(()=>{
    if(!filterTrackingReady.current){filterTrackingReady.current=true;return;}
    trackProductAction('filter-change','name-grid');
  },[gender,activeTag,lengthFilter,styleFilter,originFilter,originContainsFilter,colorFilter,sizeFilter,personalityFilter,cultureFacet,cultureKind,meaningOnly]);

  function toggle(name:string){
    const{items:next,removed}=toggleStoredFavorite(name,favorites);
    setFavorites(next);
    trackProductAction(removed?'favorite-remove':'favorite-add','name-grid');
  }

  const inferredGender=(item:NameRecord):'F'|'M'|'U'|undefined=>
    item.gender??(item.tags.includes('female')?'F':item.tags.includes('male')?'M':item.tags.includes('unisex')?'U':undefined);

  const availableTags=useMemo(()=>{
    const all=new Set(items.flatMap(item=>item.tags));
    return Object.keys(tagLabels).filter(tag=>all.has(tag)).slice(0,7);
  },[items]);

  const availablePersonStyles=useMemo(()=>{
    const all=new Set(items.flatMap(item=>item.tags));
    return personStyles.filter(tag=>all.has(tag));
  },[items]);

  const availablePetColors=useMemo(()=>{
    const all=new Set(items.flatMap(item=>item.tags));
    return petColors.filter(tag=>all.has(tag));
  },[items]);

  const availablePetSizes=useMemo(()=>{
    const all=new Set(items.flatMap(item=>item.tags));
    return petSizes.filter(tag=>all.has(tag));
  },[items]);

  const availablePetPersonalities=useMemo(()=>{
    const all=new Set(items.flatMap(item=>item.tags));
    return petPersonalities.filter(tag=>all.has(tag));
  },[items]);

  const origins=useMemo(
    ()=>Array.from(new Set(items.map(item=>item.origin).filter((value):value is string=>Boolean(value)))).sort((a,b)=>a.localeCompare(b,'es')),
    [items]
  );

  const hasPersonFacets=mode==='people';
  const hasPetFacets=mode==='pet';
  const hasCultureFacets=mode==='culture';
  const hasMythologicalCulture=hasCultureFacets&&items.some(item=>item.tags.includes('mythology'));
  const hasNonMythologicalCulture=hasCultureFacets&&items.some(item=>!item.tags.includes('mythology'));

  const quickPresets=getQuickPresets(pagePath);
  const collection=collectionCopy(mode,pagePath,pageLabel);

  function applyQuickPreset(preset:QuickPreset){
    setQuery('');
    setGender(preset.gender??'ALL');
    setActiveTag(preset.tag??'');
    setLengthFilter(preset.length??'ALL');
    setStyleFilter(preset.style??'');
    setOriginFilter('');
    setOriginContainsFilter(preset.originIncludes??'');
    setColorFilter(preset.color??'');
    setSizeFilter(preset.size??'');
    setPersonalityFilter(preset.personality??'');
    setCultureFacet(preset.cultureFacet??'ALL');
    setCultureKind(preset.cultureKind??'ALL');
    setMeaningOnly(Boolean(preset.meaning));
    setRandomPick('');
    setActionFeedback('');
  }

  useEffect(()=>{
    if(!pagePath)return;
    const requested=new URLSearchParams(window.location.search).get('preset');
    if(!requested)return;
    const preset=quickPresets.find(item=>item.label===requested);
    if(!preset)return;
    applyQuickPreset(preset);
    trackProductAction('preset-handoff','name-grid');
    window.setTimeout(()=>resultsRef.current?.scrollIntoView({block:'start'}),60);
  },[pagePath]);

  function isQuickPresetActive(preset:QuickPreset){
    return !query&&gender===(preset.gender??'ALL')&&activeTag===(preset.tag??'')&&!originFilter&&
      originContainsFilter===(preset.originIncludes??'')&&
      lengthFilter===(preset.length??'ALL')&&
      styleFilter===(preset.style??'')&&
      colorFilter===(preset.color??'')&&
      sizeFilter===(preset.size??'')&&
      personalityFilter===(preset.personality??'')&&
      cultureFacet===(preset.cultureFacet??'ALL')&&
      cultureKind===(preset.cultureKind??'ALL')&&
      meaningOnly===Boolean(preset.meaning);
  }

  const hasActiveFilters=
    Boolean(query)||gender!=='ALL'||Boolean(activeTag)||lengthFilter!=='ALL'||Boolean(styleFilter)||
    Boolean(originFilter)||Boolean(originContainsFilter)||Boolean(colorFilter)||Boolean(sizeFilter)||Boolean(personalityFilter)||cultureFacet!=='ALL'||cultureKind!=='ALL'||meaningOnly;

  function clearFilters(){
    trackProductAction('filter-clear','name-grid');
    setQuery('');
    setGender('ALL');
    setActiveTag('');
    setLengthFilter('ALL');
    setStyleFilter('');
    setOriginFilter('');
    setOriginContainsFilter('');
    setColorFilter('');
    setSizeFilter('');
    setPersonalityFilter('');
    setCultureFacet('ALL');
    setCultureKind('ALL');
    setMeaningOnly(false);
    setRandomPick('');
    setActionFeedback('');
  }

  function flash(message:string){
    setActionFeedback(message);
    window.setTimeout(()=>setActionFeedback(''),1400);
  }

  function pickRandom(){
    if(!filtered.length)return;
    trackProductAction('random-pick','name-grid');
    const chosen=filtered[Math.floor(Math.random()*filtered.length)].name;
    setRandomPick(chosen);
    flash('Nombre elegido');
  }

  async function copyFiltered(){
    if(!sortedFiltered.length)return;
    const ok=await copyText(sortedFiltered.map(item=>item.name).join('\n'));
    if(!ok)return;
    trackProductAction('copy-filtered','name-grid');
    setRandomPick('');
    flash(sortedFiltered.length+' nombres copiados');
  }

  function saveFiltered(){
    if(!sortedFiltered.length||!hasActiveFilters)return;
    trackProductAction('save-filtered','name-grid');
    const next=writeFavorites([...favorites,...sortedFiltered.map(item=>item.name)]);
    setFavorites(next);
    setRandomPick('');
    flash(sortedFiltered.length+' nombres guardados');
  }

  function toggleCompare(name:string){
    if(compareNames.includes(name)){
      trackProductAction('compare-remove','name-grid');
      setCompareNames(compareNames.filter(item=>item!==name));
      return;
    }
    if(compareNames.length>=4){
      setRandomPick('');
      flash('Puedes comparar hasta 4 nombres');
      return;
    }
    trackProductAction('compare-add','name-grid');
    setCompareNames([...compareNames,name]);
  }

  function clearCompare(){
    trackProductAction('compare-clear','name-grid');
    setCompareNames([]);
  }

  useEffect(()=>{
    setLimit(18);
  },[query,gender,activeTag,lengthFilter,styleFilter,originFilter,originContainsFilter,colorFilter,sizeFilter,personalityFilter,cultureFacet,cultureKind,meaningOnly,sortMode]);

  const filtered=useMemo(()=>items.filter(item=>{
    const haystack=[item.name,item.origin,item.meaning,item.script,item.pronunciation,item.source,...item.tags].filter(Boolean).join(' ').toLocaleLowerCase('es');
    const matchesQuery=!query||haystack.includes(query.toLocaleLowerCase('es'));
    const matchesGender=gender==='ALL'||inferredGender(item)===gender;
    const matchesTag=!activeTag||item.tags.includes(activeTag);
    const matchesLength=lengthFilter==='ALL'||lengthBucket(item.name)===lengthFilter;
    const matchesStyle=!styleFilter||item.tags.includes(styleFilter);
    const matchesOrigin=(!originFilter||item.origin===originFilter)&&(!originContainsFilter||(item.origin??'').toLocaleLowerCase('es').includes(originContainsFilter.toLocaleLowerCase('es')));
    const matchesColor=!colorFilter||item.tags.includes(colorFilter);
    const matchesSize=!sizeFilter||item.tags.includes(sizeFilter);
    const matchesPersonality=!personalityFilter||item.tags.includes(personalityFilter);
    const matchesMeaning=!meaningOnly||Boolean(item.meaning);
    const matchesCulture=cultureFacet==='ALL'||
      (cultureFacet==='script'&&Boolean(item.script))||
      (cultureFacet==='pronunciation'&&Boolean(item.pronunciation))||
      (cultureFacet==='verified'&&item.verified===true&&Boolean(item.source)&&Boolean(item.sourceUrl));
    const matchesCultureKind=cultureKind==='ALL'||
      (cultureKind==='mythology'&&item.tags.includes('mythology'))||
      (cultureKind==='names'&&!item.tags.includes('mythology'));
    return matchesQuery&&matchesGender&&matchesTag&&matchesLength&&matchesStyle&&matchesOrigin&&matchesColor&&matchesSize&&matchesPersonality&&matchesMeaning&&matchesCulture&&matchesCultureKind;
  }),[items,query,gender,activeTag,lengthFilter,styleFilter,originFilter,originContainsFilter,colorFilter,sizeFilter,personalityFilter,cultureFacet,cultureKind,meaningOnly]);

  function pageIntentBoost(item:NameRecord){
    const path=pagePath??'';
    const nameLength=Array.from(item.name.replace(/[^\p{L}]/gu,'')).length;
    if(path==='/nombres-de-nina')return(item.tags.includes('modern')?4:0)+(item.tags.includes('rare')?3:0)+(nameLength<=4?3:0);
    if(path==='/nombres-de-nino')return(item.tags.includes('modern')?4:0)+(item.tags.includes('rare')?3:0)+(nameLength<=5?2:0);
    if(path==='/nombres-raros')return(item.tags.includes('rare')?7:0)+(item.gender==='U'?2:0)+(nameLength<=4?1:0);
    if(path==='/nombres-unisex')return(item.verified===true?3:0)+(item.meaning?2:0);
    if(path.startsWith('/nombres-con-'))return(item.verified===true?3:0)+(item.meaning?2:0)+(nameLength<=5?1:0);
    if(path==='/nombres-gatos-negros')return(item.tags.includes('mystic')?5:0)+(item.tags.includes('black')?4:0);
    if(path==='/nombres-gatos-machos')return(item.tags.includes('male')?4:0)+(nameLength<=5?2:0);
    if(path==='/nombres-perritas')return(item.tags.includes('cute')?3:0)+(item.tags.includes('small')?2:0);
    if(path==='/nombres-perros-machos')return(item.tags.includes('strong')?3:0)+(item.tags.includes('male')?2:0);
    if(path==='/perritas-chihuahua')return(item.tags.includes('small')?5:0)+(item.tags.includes('cute')?3:0);
    if(path==='/nombres-caballos')return(item.tags.includes('elegant')?4:0)+(item.tags.includes('strong')?2:0);
    if(path==='/nombres-peluches')return(item.tags.includes('kawaii')?5:0)+(item.tags.includes('cute')?4:0);
    return 0;
  }

  function recommendationScore(item:NameRecord){
    const intentBoost=pageIntentBoost(item);
    if(mode==='culture'){
      return intentBoost+(item.verified===true?8:0)+(item.sourceUrl?5:0)+(item.script?4:0)+(item.pronunciation?3:0)+(item.meaning?2:0);
    }
    if(mode==='people'){
      return intentBoost+(item.verified===true&&item.sourceUrl?7:0)+(item.meaning?4:0)+(item.origin?2:0)+item.tags.filter(tag=>personStyles.includes(tag as typeof personStyles[number])).length;
    }
    if(mode==='pet'){
      return intentBoost+item.tags.filter(tag=>petColors.includes(tag as typeof petColors[number])||petSizes.includes(tag as typeof petSizes[number])||petPersonalities.includes(tag as typeof petPersonalities[number])).length;
    }
    return 0;
  }

  const sortedFiltered=useMemo(()=>{
    if(sortMode==='az')return [...filtered].sort((a,b)=>a.name.localeCompare(b.name,'es'));
    if(sortMode==='short')return [...filtered].sort((a,b)=>{
      const lengthDiff=Array.from(a.name).length-Array.from(b.name).length;
      return lengthDiff||a.name.localeCompare(b.name,'es');
    });
    if(mode==='people'||mode==='pet'||mode==='culture'){
      return [...filtered].sort((a,b)=>{
        const scoreDiff=recommendationScore(b)-recommendationScore(a);
        if(scoreDiff)return scoreDiff;
        return items.indexOf(a)-items.indexOf(b);
      });
    }
    return filtered;
  },[filtered,sortMode,mode,items,pagePath]);

  const compareRecords=useMemo(
    ()=>compareNames.map(name=>items.find(item=>item.name===name)).filter((item):item is NameRecord=>Boolean(item)),
    [compareNames,items]
  );

  if(!items.length)return null;
  const genderOptions=new Set(items.map(item=>inferredGender(item)).filter(Boolean));
  const showGender=genderOptions.size>1;

  return <section id="resultados" ref={resultsRef} className="mt-8 scroll-mt-20 sm:mt-10 md:mt-12">
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="gdn-eyebrow">{collection.eyebrow}</p>
        <h2 className="gdn-display mt-2 text-[31px] font-bold tracking-[-.035em] text-[#1b1c2b] sm:text-[35px]">{collection.heading}</h2>
        <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#858899] sm:text-[11px]">{collection.sub}</p>
      </div>
      <div className="text-left sm:text-right">
        <span aria-live="polite" className="block text-[11px] font-semibold text-[#747789]">{hasActiveFilters?`${filtered.length} de ${items.length} disponibles`:`${items.length} disponibles`}</span>
        {hasActiveFilters&&<button onClick={clearFilters} className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-[#6558f5] hover:underline"><RotateCcw size={10}/>Limpiar filtros</button>}
      </div>
    </div>

    <div className="overflow-hidden rounded-[20px] border border-[#e3e0ec] bg-white shadow-[0_12px_34px_rgba(55,49,91,.05)]">
      <div className="border-b border-[#eceaf3] bg-[#faf9ff] p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9698a8]"/>
            <input value={query} onChange={e=>{setQuery(e.target.value);setArrivalName('')}} className="gdn-input h-11 rounded-[11px] pl-10 pr-4 text-[12px]" placeholder={mode==='pet'?'Buscar por nombre, color o estilo...':mode==='culture'?'Buscar por nombre, origen, escritura o fuente...':'Buscar por nombre, origen o estilo...'} aria-label="Buscar nombres"/>
          </label>
          <label className="shrink-0">
            <span className="sr-only">Ordenar resultados</span>
            <select
              value={sortMode}
              onChange={event=>{const next=event.target.value as SortMode;setSortMode(next);trackProductAction('sort-'+next,'name-grid')}}
              aria-label="Ordenar resultados"
              className="gdn-input h-11 min-w-[160px] rounded-[11px] px-3 text-[11px] font-semibold"
            >
              <option value="recommended">Mejor ajuste a esta página</option>
              <option value="az">A–Z</option>
              <option value="short">Más cortos</option>
            </select>
          </label>
          {showGender&&<div className="flex gap-2 overflow-x-auto">
            {([['ALL','Todos'],['F','Femenino'],['M','Masculino'],['U','Unisex']] as const).map(([value,label])=>
              <button key={value} onClick={()=>setGender(value)} aria-pressed={gender===value} data-active={gender===value} className="gdn-chip h-11 whitespace-nowrap rounded-full px-4 text-[12px] font-semibold sm:text-[10px]">{label}</button>
            )}
          </div>}
        </div>
        <p className="mt-2 text-[9px] leading-4 text-[#8d8f9f]">“Mejor ajuste” prioriza coincidencia con esta página y, cuando existe, calidad de datos. No mide popularidad ni frecuencia real.</p>

        {quickPresets.length>0&&<div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[10px] font-black uppercase tracking-[.12em] text-[#9a9bac]">Atajos</span>
          {quickPresets.map(preset=><button
            key={preset.label}
            onClick={()=>applyQuickPreset(preset)}
            aria-pressed={isQuickPresetActive(preset)}
            className={'min-h-10 rounded-full border px-3.5 text-[10px] font-semibold transition '+(isQuickPresetActive(preset)?'border-[var(--page-accent)] bg-[var(--page-accent)] text-white shadow-[0_5px_14px_rgba(91,77,245,.12)]':'border-[#dfdbea] bg-white text-[#66697b] hover:border-[var(--page-border)] hover:bg-[var(--page-soft)] hover:text-[var(--page-ink)]')}
          >{preset.label}</button>)}
        </div>}

        {(hasPersonFacets||hasPetFacets||hasCultureFacets)&&<div className="mt-4 overflow-hidden rounded-[14px] border border-[#e6e2f3] bg-white/75">
          <button
            type="button"
            onClick={()=>setAdvancedOpen(value=>!value)}
            aria-expanded={advancedOpen}
            className="flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left transition hover:bg-[var(--page-soft)]"
          >
            <span className="flex items-center gap-2 text-[10px] font-bold text-[#6f7190]"><SlidersHorizontal size={13} className="text-[var(--page-accent)]"/>Filtros avanzados</span>
            <span className="gdn-tech rounded-full bg-[var(--page-soft)] px-2 py-1 text-[9px] font-bold text-[var(--page-ink)]">{advancedOpen?'Ocultar':'Mostrar'}</span>
          </button>
          {advancedOpen&&<div className="border-t border-[#eceaf3] p-3">
          {hasPersonFacets&&<>
            <FacetRow label="Longitud">
              {(Object.keys(lengthLabels) as LengthFilter[]).map(value=>
                <button key={value} onClick={()=>setLengthFilter(value)} aria-pressed={lengthFilter===value} data-active={lengthFilter===value} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">{lengthLabels[value]}</button>
              )}
            </FacetRow>

            {availablePersonStyles.length>0&&<FacetRow label="Estilo">
              <button onClick={()=>setStyleFilter('')} aria-pressed={!styleFilter} data-active={!styleFilter} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Todos</button>
              {availablePersonStyles.map(tag=>
                <button key={tag} onClick={()=>setStyleFilter(tag)} aria-pressed={styleFilter===tag} data-active={styleFilter===tag} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">{tagLabels[tag]}</button>
              )}
            </FacetRow>}

            {origins.length>=3&&<FacetRow label="Origen">
              <select aria-label="Filtrar por origen" value={originFilter} onChange={e=>setOriginFilter(e.target.value)} className="gdn-input h-10 min-w-[210px] rounded-full px-3 text-[10px] font-semibold">
                <option value="">Todos los orígenes</option>
                {origins.map(origin=><option key={origin} value={origin}>{origin}</option>)}
              </select>
            </FacetRow>}
            <FacetRow label="Datos">
              <button onClick={()=>{setMeaningOnly(false);setCultureFacet('ALL')}} aria-pressed={!meaningOnly&&cultureFacet==='ALL'} data-active={!meaningOnly&&cultureFacet==='ALL'} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Todos</button>
              <button onClick={()=>{setMeaningOnly(true);setCultureFacet('ALL')}} aria-pressed={meaningOnly} data-active={meaningOnly} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Con significado</button>
              <button onClick={()=>{setMeaningOnly(false);setCultureFacet('verified')}} aria-pressed={cultureFacet==='verified'} data-active={cultureFacet==='verified'} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Fuente verificada</button>
            </FacetRow>
          </>}

          {hasPetFacets&&<>
            {availablePetColors.length>0&&<FacetRow label="Color">
              <button onClick={()=>setColorFilter('')} aria-pressed={!colorFilter} data-active={!colorFilter} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Todos</button>
              {availablePetColors.map(tag=>
                <button key={tag} onClick={()=>setColorFilter(tag)} aria-pressed={colorFilter===tag} data-active={colorFilter===tag} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">{tagLabels[tag]}</button>
              )}
            </FacetRow>}

            {availablePetSizes.length>=2&&<FacetRow label="Tamaño">
              <button onClick={()=>setSizeFilter('')} aria-pressed={!sizeFilter} data-active={!sizeFilter} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Todos</button>
              {availablePetSizes.map(tag=>
                <button key={tag} onClick={()=>setSizeFilter(tag)} aria-pressed={sizeFilter===tag} data-active={sizeFilter===tag} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">{tagLabels[tag]}</button>
              )}
            </FacetRow>}

            {availablePetPersonalities.length>0&&<FacetRow label="Personalidad">
              <button onClick={()=>setPersonalityFilter('')} aria-pressed={!personalityFilter} data-active={!personalityFilter} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Todas</button>
              {availablePetPersonalities.map(tag=>
                <button key={tag} onClick={()=>setPersonalityFilter(tag)} aria-pressed={personalityFilter===tag} data-active={personalityFilter===tag} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">{tagLabels[tag]}</button>
              )}
            </FacetRow>}
          </>}

          {hasCultureFacets&&<>
            {origins.length>=2&&<FacetRow label="Origen">
              <select aria-label="Filtrar por origen" value={originFilter} onChange={e=>setOriginFilter(e.target.value)} className="gdn-input h-10 min-w-[210px] rounded-full px-3 text-[10px] font-semibold">
                <option value="">Todos los orígenes</option>
                {origins.map(origin=><option key={origin} value={origin}>{origin}</option>)}
              </select>
            </FacetRow>}
            {hasMythologicalCulture&&hasNonMythologicalCulture&&<FacetRow label="Tipo">
              {([
                ['ALL','Todos'],
                ['names','Nombres'],
                ['mythology','Mitología'],
              ] as const).map(([value,label])=><button
                key={value}
                onClick={()=>setCultureKind(value)}
                aria-pressed={cultureKind===value}
                data-active={cultureKind===value}
                className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold"
              >{label}</button>)}
            </FacetRow>}
            <FacetRow label="Datos">
              <button onClick={()=>{setMeaningOnly(false);setCultureFacet('ALL')}} aria-pressed={!meaningOnly&&cultureFacet==='ALL'} data-active={!meaningOnly&&cultureFacet==='ALL'} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Todos</button>
              <button onClick={()=>{setMeaningOnly(true);setCultureFacet('ALL')}} aria-pressed={meaningOnly} data-active={meaningOnly} className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold">Con significado</button>
              {([
                ['script','Con escritura'],
                ['pronunciation','Con pronunciación'],
                ['verified','Fuente verificada'],
              ] as const).map(([value,label])=><button
                key={value}
                onClick={()=>{setMeaningOnly(false);setCultureFacet(value)}}
                aria-pressed={!meaningOnly&&cultureFacet===value}
                data-active={!meaningOnly&&cultureFacet===value}
                className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold"
              >{label}</button>)}
            </FacetRow>
          </>}
          </div>}
        </div>}

        {!hasPersonFacets&&!hasPetFacets&&!hasCultureFacets&&availableTags.length>0&&
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
            <button onClick={()=>setActiveTag('')} aria-pressed={!activeTag} data-active={!activeTag} className="gdn-chip min-h-11 shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold sm:min-h-0 sm:px-3 sm:text-[10px]">Todos</button>
            {availableTags.map(tag=>
              <button key={tag} onClick={()=>setActiveTag(tag)} aria-pressed={activeTag===tag} data-active={activeTag===tag} className="gdn-chip min-h-11 shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold sm:min-h-0 sm:px-3 sm:text-[10px]">{tagLabels[tag]}</button>
            )}
          </div>
        }
      </div>

      {(mode==='people'||mode==='pet')&&filtered.length>0&&<div className="flex flex-col gap-3 border-b border-[#eceaf3] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button onClick={pickRandom} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--page-border)] bg-[var(--page-soft)] px-3.5 text-[10px] font-semibold text-[#5d6072] transition hover:text-[var(--page-ink)]">
            <Shuffle size={13}/>Elegir uno
          </button>
          <button onClick={copyFiltered} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dedaf0] bg-white px-3.5 text-[10px] font-semibold text-[#5d6072] transition hover:border-[var(--page-border)] hover:text-[var(--page-ink)]">
            <ClipboardCopy size={13}/>Copiar resultados
          </button>
          <button onClick={saveFiltered} disabled={!hasActiveFilters} title={!hasActiveFilters?'Aplica al menos un filtro para guardar este conjunto':undefined} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--page-border)] bg-[var(--page-soft)] px-3.5 text-[10px] font-semibold text-[var(--page-ink)] transition hover:brightness-[.98] disabled:cursor-not-allowed disabled:border-[#e5e2ec] disabled:bg-[#f7f6f9] disabled:text-[#aaacb8]">
            <HeartPlus size={13}/>Guardar filtrados
          </button>
        </div>

        <div aria-live="polite" className="min-h-7 text-right">
          {randomPick&&<span className="inline-flex items-center gap-2 rounded-full bg-[#eefaf3] px-3 py-1.5 text-[10px] font-bold text-[#2d7650]"><Check size={11}/>Sugerencia: {randomPick}</span>}
          {!randomPick&&actionFeedback&&<span className="text-[10px] font-semibold text-[#2d7650]">{actionFeedback}</span>}
        </div>
      </div>}

      {(mode==='people'||mode==='pet'||mode==='culture')&&compareRecords.length>0&&<div className="border-b border-[var(--page-border)] bg-[var(--page-soft)] px-4 py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="gdn-tech text-[10px] font-black uppercase tracking-[.1em] text-[var(--page-accent)]">Comparador</p>
            <p className="mt-1 text-[11px] text-[#77798b]">{compareRecords.length} de 4 nombres seleccionados <span className="sm:hidden">· desliza para comparar</span></p>
          </div>
          <button onClick={clearCompare} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--page-border)] bg-white px-3 text-[10px] font-semibold text-[#696b7d] hover:bg-[var(--page-soft)] hover:text-[var(--page-accent)]"><X size={11}/>Limpiar comparación</button>
        </div>

        <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
          <div className="flex min-w-max snap-x snap-mandatory gap-3">
            {compareRecords.map(item=>{
              const itemGender=inferredGender(item);
              const personStyle=item.tags.find(tag=>personStyles.includes(tag as typeof personStyles[number]));
              const petColor=item.tags.find(tag=>petColors.includes(tag as typeof petColors[number]));
              const petSize=item.tags.find(tag=>petSizes.includes(tag as typeof petSizes[number]));
              const petPersonality=item.tags.find(tag=>petPersonalities.includes(tag as typeof petPersonalities[number]));
              const meaningSummary=item.meaning
                ?(item.meaning.length>54?item.meaning.slice(0,51).trimEnd()+'…':item.meaning)
                :'No documentado';
              const rows=mode==='people'
                ?[
                  ['Origen',item.origin||'No documentado'],
                  ['Significado',meaningSummary],
                  ['Estilo',personStyle?tagLabels[personStyle]:'Sin clasificar'],
                  ['Longitud',lengthLabels[lengthBucket(item.name)]],
                  ['Género',itemGender==='F'?'Femenino':itemGender==='M'?'Masculino':itemGender==='U'?'Unisex':'No documentado'],
                  ['Fuente',item.verified===true&&item.sourceUrl?'Verificada':'Sin verificar'],
                ]
                :mode==='culture'
                  ?[
                    ['Escritura',item.script||'No documentada'],
                    ['Pronunciación',item.pronunciation||'No documentada'],
                    ['Origen',item.origin||'No documentado'],
                    ['Significado',meaningSummary],
                    ['Tipo',item.tags.includes('mythology')?'Mitología':'Nombre'],
                    ['Fuente',item.verified===true&&item.sourceUrl?'Verificada':'Documentada'],
                  ]
                  :[
                    ['Personalidad',petPersonality?tagLabels[petPersonality]:'Sin clasificar'],
                    ['Tamaño',petSize?tagLabels[petSize]:'No especificado'],
                    ['Color',petColor?tagLabels[petColor]:'No especificado'],
                    ['Longitud',lengthLabels[lengthBucket(item.name)]],
                    ['Género',itemGender==='F'?'Hembra':itemGender==='M'?'Macho':itemGender==='U'?'Unisex':'No documentado'],
                  ];

              return <article key={item.name} className="w-[230px] shrink-0 snap-start rounded-[16px] border border-[var(--page-border)] bg-white p-4 shadow-[0_8px_22px_rgba(69,58,129,.05)]">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="gdn-editorial truncate text-[21px] font-bold text-[#292a3a]">{item.name}</h3>
                  <button onClick={()=>toggleCompare(item.name)} aria-label={'Quitar '+item.name+' de la comparación'} className="grid size-7 shrink-0 place-items-center rounded-full border border-[#e3dfec] text-[#8a8c9b] hover:bg-[#f7f5ff]"><X size={11}/></button>
                </div>
                <dl className="mt-3 divide-y divide-[#efedf5]">
                  {rows.map(([label,value])=><div key={label} className="flex items-start justify-between gap-3 py-2">
                    <dt className="gdn-tech text-[9px] font-bold uppercase tracking-[.07em] text-[#a0a1af]">{label}</dt>
                    <dd className="max-w-[135px] text-right text-[10px] font-semibold leading-4 text-[#565869]">{value}</dd>
                  </div>)}
                </dl>
                <div className="mt-3 flex flex-wrap gap-2">
                  <CopyButton value={item.name} label={mode==='culture'?'Copiar nombre':'Copiar'}/>
                  {mode==='culture'&&item.script&&<CopyButton value={item.script} label="Copiar escritura"/>}
                </div>
              </article>;
            })}
          </div>
        </div>
      </div>}

      {filtered.length===0
        ?<div className="px-6 py-14 text-center">
          <p className="text-[13px] font-semibold text-[#5c5f70]">{collection.empty}</p>
          <button onClick={clearFilters} className="gdn-theme-chip mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[10px] font-semibold"><RotateCcw size={12}/>Restablecer filtros</button>
        </div>
        :<div className={'grid gap-px bg-[#eceaf3] md:grid-cols-2 '+(mode==='culture'?'xl:grid-cols-2':'lg:grid-cols-3')}>
          {sortedFiltered.slice(0,limit).map(item=>{
            const itemGender=inferredGender(item);
            const genderLabel=itemGender==='F'?'Femenino':itemGender==='M'?'Masculino':itemGender==='U'?'Unisex':undefined;
            const saved=favorites.includes(item.name);
            const personBadges=mode==='people'
              ?[tagLabels[item.tags.find(tag=>personStyles.includes(tag as typeof personStyles[number]))||''],lengthLabels[lengthBucket(item.name)]].filter(Boolean)
              :[];
            const petBadges=mode==='pet'
              ?[
                item.tags.find(tag=>petColors.includes(tag as typeof petColors[number])),
                item.tags.find(tag=>petSizes.includes(tag as typeof petSizes[number])),
                item.tags.find(tag=>petPersonalities.includes(tag as typeof petPersonalities[number])),
              ].filter((tag):tag is string=>Boolean(tag)).map(tag=>tagLabels[tag])
              :[];
            const isMythological=mode==='culture'&&item.tags.includes('mythology');
            const verifiedSource=item.verified===true&&Boolean(item.sourceUrl);
            const gameBadges=(mode==='gaming'||mode==='general')
              ?item.tags.filter(tag=>!internalTags.has(tag)).slice(0,3).map(tag=>tagLabels[tag]||tag.replace(/-/g,' '))
              :[];
            const kicker=resultKicker(mode,pagePath,item);
            const petFit=mode==='pet'?petFitSummary(item.tags):'';
            const cardSurface=mode==='culture'?'bg-[#fffdfb] hover:bg-[#fffaf5]':mode==='pet'?'bg-[#fffefa] hover:bg-[#fffaf2]':(mode==='gaming'||mode==='general')?'bg-[#fdfcff] hover:bg-[#faf8ff]':'bg-white hover:bg-[#fcfbff]';

            const highlighted=randomPick===item.name||(arrivalName===item.name&&query===arrivalName);
            return <article key={item.name+(item.origin??'')} aria-current={highlighted?'true':undefined} className={'min-h-[164px] p-4 transition sm:min-h-[186px] sm:p-5 '+(highlighted?'bg-[var(--page-soft)] ring-1 ring-inset ring-[var(--page-border)]':cardSurface)+' '+(mode==='culture'?'relative':'')}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="gdn-tech text-[8px] font-black uppercase tracking-[.12em] text-[var(--page-accent)]">{kicker}</p>
                  <h3 className="gdn-editorial mt-1 break-words text-[21px] font-bold leading-tight tracking-[-.025em] text-[#252634] sm:text-[23px]">{item.name}</h3>
                  {(item.origin||genderLabel)&&<div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-semibold text-[#9294a4] sm:text-[10px]">
                    {item.origin&&<span><span className="font-black uppercase tracking-[.08em]">Origen:</span> {item.origin}</span>}
                    {genderLabel&&<span>{genderLabel}</span>}
                    {isMythological&&<span className="rounded-full border border-[#ead8f5] bg-[#faf1ff] px-2 py-0.5 font-bold text-[#7b4ca5]">Figura mitológica</span>}
                  </div>}
                </div>
                <button onClick={()=>toggle(item.name)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 shrink-0 place-items-center rounded-full border transition sm:size-9 '+(saved?'border-[var(--page-border)] bg-[var(--page-soft)] text-[var(--page-accent)]':'border-[#e1ddea] bg-white text-[#8f91a0] hover:border-[var(--page-border)] hover:bg-[var(--page-soft)]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
              </div>

              {(personBadges.length>0||petBadges.length>0||gameBadges.length>0)&&<div className="mt-3 flex flex-wrap gap-1.5">
                {[...personBadges,...petBadges,...gameBadges].map(label=><span key={label} className="rounded-full border border-[#e6e2f3] bg-[#faf9ff] px-2.5 py-1 text-[10px] font-semibold text-[#74758a]">{label}</span>)}
              </div>}

              {mode==='people'&&<div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-[11px] border border-[#e7e3f0] bg-[#faf9fd] px-3 py-2.5">
                  <span className="gdn-tech block text-[8px] font-black uppercase tracking-[.09em] text-[#9a9cab]">Datos</span>
                  <span className="mt-1 block text-[10px] font-semibold text-[#565869]">{verifiedSource?'Fuente verificada':'Ficha básica'}</span>
                </div>
                <div className="rounded-[11px] border border-[#e7e3f0] bg-[#faf9fd] px-3 py-2.5">
                  <span className="gdn-tech block text-[8px] font-black uppercase tracking-[.09em] text-[#9a9cab]">Longitud</span>
                  <span className="mt-1 block text-[10px] font-semibold text-[#565869]">{lengthLabels[lengthBucket(item.name)]}</span>
                </div>
              </div>}

              {mode==='pet'&&<div className="mt-3 rounded-[12px] border border-[#eee5d9] bg-[#fffaf3] px-3 py-2.5">
                <span className="gdn-tech block text-[8px] font-black uppercase tracking-[.09em] text-[#a38a6e]">Encaja con</span>
                <span className="mt-1 block text-[10px] font-semibold leading-4 text-[#6d6257]">{petFit}</span>
              </div>}

              {(mode==='gaming'||mode==='general')&&<div className="mt-3 rounded-[12px] border border-[#e6e1f7] bg-[#f8f6ff] px-3 py-2.5">
                <span className="gdn-tech block text-[8px] font-black uppercase tracking-[.09em] text-[#8a80d8]">Uso rápido</span>
                <span className="mt-1 block text-[10px] font-semibold leading-4 text-[#5e5877]">Copia esta base y personalízala en la herramienta de la página.</span>
              </div>}

              {mode==='culture'&&item.script&&<div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="rounded-[13px] border border-[#e6e1f7] bg-[#f8f6ff] px-4 py-3">
                  <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#8a80d8]">Escritura original</p>
                  <p className="gdn-editorial mt-1.5 break-words text-[21px] font-semibold leading-tight text-[#302b5f] sm:text-[24px]">{item.script}</p>
                </div>
                {item.pronunciation&&<div className="rounded-[13px] border border-[#eee7dc] bg-[#fffaf3] px-3 py-3 sm:max-w-[180px]">
                  <p className="gdn-tech text-[8px] font-black uppercase tracking-[.1em] text-[#a58b6d]">Lectura</p>
                  <p className="mt-1.5 break-words text-[10px] font-semibold leading-4 text-[#655c52]">{item.pronunciation}</p>
                </div>}
              </div>}

              <div className="mt-3 min-h-0 text-[12px] leading-5 text-[#747788] sm:mt-4 sm:min-h-12">
                {item.meaning&&<p><strong className="text-[#444655]">{mode==='people'&&!(item.verified===true&&item.sourceUrl)?'Significado orientativo:':'Significado:'}</strong> {item.meaning}</p>}
                {item.pronunciation&&mode!=='culture'&&<p className={item.meaning?'mt-1':''}><strong className="text-[#444655]">Pronunciación:</strong> {item.pronunciation}</p>}
                {!item.meaning&&!item.pronunciation&&mode!=='culture'&&mode!=='people'&&mode!=='pet'&&<p>{item.tags.filter(tag=>!internalTags.has(tag)).slice(0,3).map(tag=>tagLabels[tag]||tag.replace(/-/g,' ')).join(' · ')}</p>}
                {mode==='culture'&&item.source&&<div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={'rounded-full px-2.5 py-1 text-[10px] font-bold '+(item.verified===true?'bg-[#eaf8f0] text-[#27764d]':item.verified===false?'bg-[#fff3e8] text-[#a86328]':'bg-[#f2f1f7] text-[#727486]')}>{item.verified===true?'Fuente verificada':item.verified===false?'En revisión':'Fuente documentada'}</span>
                  {item.sourceUrl?<a className="text-[10px] font-semibold text-[var(--page-accent)] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>:<span className="text-[10px] text-[#8e90a0]">{item.source}</span>}
                </div>}
                {mode==='people'&&item.meaning&&item.sourceUrl&&item.verified===true&&<div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#eaf8f0] px-2.5 py-1 text-[10px] font-bold text-[#27764d]">Significado verificado</span>
                  <a className="text-[10px] font-semibold text-[var(--page-accent)] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">Ver fuente</a>
                </div>}
                {mode!=='culture'&&mode!=='people'&&item.source&&<p className="mt-2 text-[11px] text-[#9698a6] sm:text-[10px]">Fuente: {item.sourceUrl?<a className="font-semibold text-[var(--page-accent)] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>:item.source}{item.verified===false?' · pendiente de revisión':''}</p>}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                <CopyButton value={item.name} label={mode==='culture'&&item.script?'Copiar nombre':'Copiar'} analyticsRole={mode==='culture'?'copy-romanized-name':'copy-name'}/>
                {mode==='culture'&&item.script&&<CopyButton value={item.script} label="Copiar escritura" analyticsRole="copy-original-script"/>}
                {(mode==='gaming'||mode==='general')&&<a href="#herramienta" className="inline-flex min-h-11 items-center rounded-[10px] border border-[var(--page-border)] bg-[var(--page-soft)] px-4 text-[12px] font-semibold text-[var(--page-accent)] transition hover:brightness-[.98] sm:min-h-8 sm:px-3 sm:text-[10px]">Personalizar</a>}
                {(mode==='people'||mode==='pet'||mode==='culture')&&<button
                  onClick={()=>toggleCompare(item.name)}
                  aria-pressed={compareNames.includes(item.name)}
                  disabled={compareNames.length>=4&&!compareNames.includes(item.name)}
                  className={'inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border px-4 text-[12px] font-semibold transition sm:min-h-8 sm:px-3 sm:text-[10px] '+(compareNames.includes(item.name)?'border-[var(--page-border)] bg-[var(--page-soft)] text-[var(--page-accent)]':'border-[#d9d5e6] bg-white text-[#5f6273] hover:border-[var(--page-border)] hover:text-[var(--page-accent)] disabled:cursor-not-allowed disabled:opacity-40')}
                ><Scale size={12}/>{compareNames.includes(item.name)?'Comparando':'Comparar'}</button>}
              </div>
            </article>;
          })}
        </div>
      }

      {filtered.length>limit&&<div className="border-t border-[#eceaf3] bg-[#faf9ff] p-4 text-center">
        <button onClick={()=>setLimit(v=>v+18)} className="min-h-11 rounded-[10px] border border-[#dedaf0] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#5f6273] hover:border-[var(--page-border)] hover:text-[var(--page-accent)]">Mostrar más</button>
      </div>}
    </div>
  </section>
}
