'use client';

import {useEffect,useMemo,useRef,useState} from 'react';
import {Check,ClipboardCopy,Heart,HeartPlus,RotateCcw,Scale,Search,Shuffle,SlidersHorizontal,X} from 'lucide-react';
import type{NameRecord} from '@/data/nameDataset';
import type{ToolMode} from '@/data/keywordMaster';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';
import{consumeNameSearch}from'@/lib/searchHandoff';

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

function FacetRow({label,children}:{label:string;children:React.ReactNode}){
  return <div className="grid gap-2 border-t border-[#eceaf3] pt-3 sm:grid-cols-[92px_1fr] sm:items-center">
    <span className="text-[10px] font-black uppercase tracking-[.12em] text-[#9294a5]">{label}</span>
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">{children}</div>
  </div>
}

export default function NameGrid({items,mode,pagePath}:{items:NameRecord[];mode:ToolMode;pagePath?:string}){
  const[query,setQuery]=useState('');
  const[gender,setGender]=useState<'ALL'|'F'|'M'|'U'>('ALL');
  const[activeTag,setActiveTag]=useState('');
  const[lengthFilter,setLengthFilter]=useState<LengthFilter>('ALL');
  const[styleFilter,setStyleFilter]=useState('');
  const[originFilter,setOriginFilter]=useState('');
  const[colorFilter,setColorFilter]=useState('');
  const[sizeFilter,setSizeFilter]=useState('');
  const[personalityFilter,setPersonalityFilter]=useState('');
  const[cultureFacet,setCultureFacet]=useState<'ALL'|'script'|'pronunciation'|'verified'>('ALL');
  const[sortMode,setSortMode]=useState<SortMode>('recommended');
  const[favorites,setFavorites]=useState<string[]>([]);
  const[randomPick,setRandomPick]=useState('');
  const[actionFeedback,setActionFeedback]=useState('');
  const[compareNames,setCompareNames]=useState<string[]>([]);
  const[limit,setLimit]=useState(18);
  const filterTrackingReady=useRef(false);

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);

  useEffect(()=>{
    if(!pagePath)return;
    const pending=consumeNameSearch(pagePath);
    if(!pending)return;
    const match=items.find(item=>item.name.toLocaleLowerCase('es')===pending.toLocaleLowerCase('es'));
    if(match){
      setQuery(match.name);
      setLimit(18);
    }
  },[items,pagePath]);

  useEffect(()=>{
    if(!filterTrackingReady.current){filterTrackingReady.current=true;return;}
    trackProductAction('filter-change','name-grid');
  },[gender,activeTag,lengthFilter,styleFilter,originFilter,colorFilter,sizeFilter,personalityFilter,cultureFacet]);

  function toggle(name:string){
    const removing=favorites.includes(name);
    const next=removing?favorites.filter(x=>x!==name):[...favorites,name];
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    window.dispatchEvent(new Event('gdn:favorites-updated'));
    trackProductAction(removing?'favorite-remove':'favorite-add','name-grid');
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

  type QuickPreset={label:string;length?:LengthFilter;style?:string;color?:string;size?:string;personality?:string};
  const quickPresets:QuickPreset[]=pagePath==='/nombres-de-mujer'
    ?[
      {label:'Cortos',length:'short'},
      {label:'Modernos',style:'modern'},
      {label:'Clásicos',style:'classic'},
      {label:'Poco comunes',style:'rare'},
    ]
    :pagePath==='/nombres-de-nina'
      ?[
        {label:'3–4 letras',length:'short'},
        {label:'Modernos',style:'modern'},
        {label:'Poco comunes',style:'rare'},
      ]
      :pagePath==='/nombres-gatos'
        ?[
          {label:'Negros',color:'black'},
          {label:'Naranjas',color:'orange'},
          {label:'Tiernos',personality:'cute'},
          {label:'Juguetones',personality:'playful'},
        ]
        :pagePath==='/nombres-perritas'
          ?[
            {label:'Pequeñas',size:'small'},
            {label:'Tiernas',personality:'cute'},
            {label:'Elegantes',personality:'elegant'},
            {label:'Juguetonas',personality:'playful'},
          ]
          :pagePath==='/nombres-perros-machos'
            ?[
              {label:'Fuertes',personality:'strong'},
              {label:'Pequeños',size:'small'},
              {label:'Grandes',size:'large'},
              {label:'Juguetones',personality:'playful'},
            ]
            :pagePath==='/nombres-caballos'
              ?[
                {label:'Fuertes',personality:'strong'},
                {label:'Elegantes',personality:'elegant'},
                {label:'Tranquilos',personality:'calm'},
                {label:'Grandes',size:'large'},
              ]
              :pagePath==='/nombres-peluches'
                ?[
                  {label:'Tiernos',personality:'cute'},
                  {label:'Kawaii',personality:'kawaii'},
                  {label:'Pequeños',size:'small'},
                  {label:'Juguetones',personality:'playful'},
                ]
                :[];

  function applyQuickPreset(preset:QuickPreset){
    setQuery('');
    setGender('ALL');
    setActiveTag('');
    setLengthFilter(preset.length??'ALL');
    setStyleFilter(preset.style??'');
    setOriginFilter('');
    setColorFilter(preset.color??'');
    setSizeFilter(preset.size??'');
    setPersonalityFilter(preset.personality??'');
    setRandomPick('');
    setActionFeedback('');
  }

  function isQuickPresetActive(preset:QuickPreset){
    return !query&&gender==='ALL'&&!activeTag&&!originFilter&&
      lengthFilter===(preset.length??'ALL')&&
      styleFilter===(preset.style??'')&&
      colorFilter===(preset.color??'')&&
      sizeFilter===(preset.size??'')&&
      personalityFilter===(preset.personality??'');
  }

  const hasActiveFilters=
    Boolean(query)||gender!=='ALL'||Boolean(activeTag)||lengthFilter!=='ALL'||Boolean(styleFilter)||
    Boolean(originFilter)||Boolean(colorFilter)||Boolean(sizeFilter)||Boolean(personalityFilter)||cultureFacet!=='ALL';

  function clearFilters(){
    trackProductAction('filter-clear','name-grid');
    setQuery('');
    setGender('ALL');
    setActiveTag('');
    setLengthFilter('ALL');
    setStyleFilter('');
    setOriginFilter('');
    setColorFilter('');
    setSizeFilter('');
    setPersonalityFilter('');
    setCultureFacet('ALL');
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
    await navigator.clipboard.writeText(sortedFiltered.map(item=>item.name).join('\n'));
    trackProductAction('copy-filtered','name-grid');
    setRandomPick('');
    flash(sortedFiltered.length+' nombres copiados');
  }

  function saveFiltered(){
    if(!sortedFiltered.length||!hasActiveFilters)return;
    trackProductAction('save-filtered','name-grid');
    const next=Array.from(new Set([...favorites,...sortedFiltered.map(item=>item.name)]));
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    window.dispatchEvent(new Event('gdn:favorites-updated'));
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
  },[query,gender,activeTag,lengthFilter,styleFilter,originFilter,colorFilter,sizeFilter,personalityFilter,cultureFacet,sortMode]);

  const filtered=useMemo(()=>items.filter(item=>{
    const haystack=[item.name,item.origin,item.meaning,item.script,item.pronunciation,item.source,...item.tags].filter(Boolean).join(' ').toLocaleLowerCase('es');
    const matchesQuery=!query||haystack.includes(query.toLocaleLowerCase('es'));
    const matchesGender=gender==='ALL'||inferredGender(item)===gender;
    const matchesTag=!activeTag||item.tags.includes(activeTag);
    const matchesLength=lengthFilter==='ALL'||lengthBucket(item.name)===lengthFilter;
    const matchesStyle=!styleFilter||item.tags.includes(styleFilter);
    const matchesOrigin=!originFilter||item.origin===originFilter;
    const matchesColor=!colorFilter||item.tags.includes(colorFilter);
    const matchesSize=!sizeFilter||item.tags.includes(sizeFilter);
    const matchesPersonality=!personalityFilter||item.tags.includes(personalityFilter);
    const matchesCulture=cultureFacet==='ALL'||
      (cultureFacet==='script'&&Boolean(item.script))||
      (cultureFacet==='pronunciation'&&Boolean(item.pronunciation))||
      (cultureFacet==='verified'&&item.verified===true&&Boolean(item.source)&&Boolean(item.sourceUrl));
    return matchesQuery&&matchesGender&&matchesTag&&matchesLength&&matchesStyle&&matchesOrigin&&matchesColor&&matchesSize&&matchesPersonality&&matchesCulture;
  }),[items,query,gender,activeTag,lengthFilter,styleFilter,originFilter,colorFilter,sizeFilter,personalityFilter,cultureFacet]);

  const sortedFiltered=useMemo(()=>{
    if(sortMode==='az')return [...filtered].sort((a,b)=>a.name.localeCompare(b.name,'es'));
    if(sortMode==='short')return [...filtered].sort((a,b)=>{
      const lengthDiff=Array.from(a.name).length-Array.from(b.name).length;
      return lengthDiff||a.name.localeCompare(b.name,'es');
    });
    return filtered;
  },[filtered,sortMode]);

  const compareRecords=useMemo(
    ()=>compareNames.map(name=>items.find(item=>item.name===name)).filter((item):item is NameRecord=>Boolean(item)),
    [compareNames,items]
  );

  if(!items.length)return null;
  const genderOptions=new Set(items.map(item=>inferredGender(item)).filter(Boolean));
  const showGender=genderOptions.size>1;

  return <section className="mt-8 sm:mt-10 md:mt-12">
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div>
        <p className="gdn-eyebrow">{mode==='pet'?'Explora por rasgos':mode==='culture'?'Explora por origen y datos':'Explora nombres'}</p>
        <h2 className="gdn-display mt-2 text-[31px] font-bold tracking-[-.035em] text-[#1b1c2b] sm:text-[35px]">Resultados</h2>
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
            <input value={query} onChange={e=>setQuery(e.target.value)} className="gdn-input h-11 rounded-[11px] pl-10 pr-4 text-[12px]" placeholder={mode==='pet'?'Buscar por nombre, color o estilo...':mode==='culture'?'Buscar por nombre, origen, escritura o fuente...':'Buscar por nombre, origen o estilo...'} aria-label="Buscar nombres"/>
          </label>
          <label className="shrink-0">
            <span className="sr-only">Ordenar resultados</span>
            <select
              value={sortMode}
              onChange={event=>{const next=event.target.value as SortMode;setSortMode(next);trackProductAction('sort-'+next,'name-grid')}}
              aria-label="Ordenar resultados"
              className="gdn-input h-11 min-w-[160px] rounded-[11px] px-3 text-[11px] font-semibold"
            >
              <option value="recommended">Orden recomendado</option>
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

        {quickPresets.length>0&&<div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[10px] font-black uppercase tracking-[.12em] text-[#9a9bac]">Atajos</span>
          {quickPresets.map(preset=><button
            key={preset.label}
            onClick={()=>applyQuickPreset(preset)}
            aria-pressed={isQuickPresetActive(preset)}
            className={'min-h-10 rounded-full border px-3.5 text-[10px] font-semibold transition '+(isQuickPresetActive(preset)?'border-[#c8c0ff] bg-[#5b4df5] text-white shadow-[0_5px_14px_rgba(91,77,245,.18)]':'border-[#dfdbea] bg-white text-[#66697b] hover:border-[#cfc8fb] hover:bg-[#f7f5ff] hover:text-[#5146d6]')}
          >{preset.label}</button>)}
        </div>}

        {(hasPersonFacets||hasPetFacets||hasCultureFacets)&&<div className="mt-4 rounded-[14px] border border-[#e6e2f3] bg-white/75 p-3">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold text-[#6f7190]"><SlidersHorizontal size={13} className="text-[#6558f5]"/>Filtros avanzados</div>

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
            <FacetRow label="Datos">
              {([
                ['ALL','Todos'],
                ['script','Con escritura'],
                ['pronunciation','Con pronunciación'],
                ['verified','Fuente verificada'],
              ] as const).map(([value,label])=><button
                key={value}
                onClick={()=>setCultureFacet(value)}
                aria-pressed={cultureFacet===value}
                data-active={cultureFacet===value}
                className="gdn-chip min-h-10 shrink-0 rounded-full px-3.5 text-[10px] font-semibold"
              >{label}</button>)}
            </FacetRow>
          </>}
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
          <button onClick={pickRandom} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dedaf0] bg-[#faf9ff] px-3.5 text-[10px] font-semibold text-[#5d6072] transition hover:border-[#cfc8fb] hover:text-[#5146d6]">
            <Shuffle size={13}/>Elegir uno
          </button>
          <button onClick={copyFiltered} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dedaf0] bg-white px-3.5 text-[10px] font-semibold text-[#5d6072] transition hover:border-[#cfc8fb] hover:text-[#5146d6]">
            <ClipboardCopy size={13}/>Copiar resultados
          </button>
          <button onClick={saveFiltered} disabled={!hasActiveFilters} title={!hasActiveFilters?'Aplica al menos un filtro para guardar este conjunto':undefined} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d8d2ff] bg-[#f4f2ff] px-3.5 text-[10px] font-semibold text-[#5b4df5] transition hover:bg-[#ece8ff] disabled:cursor-not-allowed disabled:border-[#e5e2ec] disabled:bg-[#f7f6f9] disabled:text-[#aaacb8]">
            <HeartPlus size={13}/>Guardar filtrados
          </button>
        </div>

        <div aria-live="polite" className="min-h-7 text-right">
          {randomPick&&<span className="inline-flex items-center gap-2 rounded-full bg-[#eefaf3] px-3 py-1.5 text-[10px] font-bold text-[#2d7650]"><Check size={11}/>Sugerencia: {randomPick}</span>}
          {!randomPick&&actionFeedback&&<span className="text-[10px] font-semibold text-[#2d7650]">{actionFeedback}</span>}
        </div>
      </div>}

      {(mode==='people'||mode==='pet')&&compareRecords.length>0&&<div className="border-b border-[#e7e2f3] bg-[#f8f6ff] px-4 py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.12em] text-[#6b60d7]">Comparador</p>
            <p className="mt-1 text-[11px] text-[#77798b]">{compareRecords.length} de 4 nombres seleccionados</p>
          </div>
          <button onClick={clearCompare} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#ddd8ee] bg-white px-3 text-[10px] font-semibold text-[#696b7d] hover:border-[#cfc8fb] hover:text-[#5146d6]"><X size={11}/>Limpiar comparación</button>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="flex min-w-max gap-3">
            {compareRecords.map(item=>{
              const itemGender=inferredGender(item);
              const personStyle=item.tags.find(tag=>personStyles.includes(tag as typeof personStyles[number]));
              const petColor=item.tags.find(tag=>petColors.includes(tag as typeof petColors[number]));
              const petSize=item.tags.find(tag=>petSizes.includes(tag as typeof petSizes[number]));
              const petPersonality=item.tags.find(tag=>petPersonalities.includes(tag as typeof petPersonalities[number]));
              const rows=mode==='people'
                ?[
                  ['Longitud',lengthLabels[lengthBucket(item.name)]],
                  ['Origen',item.origin||'No documentado'],
                  ['Estilo',personStyle?tagLabels[personStyle]:'Sin clasificar'],
                  ['Género',itemGender==='F'?'Femenino':itemGender==='M'?'Masculino':itemGender==='U'?'Unisex':'No documentado'],
                ]
                :[
                  ['Color',petColor?tagLabels[petColor]:'No especificado'],
                  ['Tamaño',petSize?tagLabels[petSize]:'No especificado'],
                  ['Personalidad',petPersonality?tagLabels[petPersonality]:'Sin clasificar'],
                  ['Género',itemGender==='F'?'Hembra':itemGender==='M'?'Macho':itemGender==='U'?'Unisex':'No documentado'],
                ];

              return <article key={item.name} className="w-[190px] shrink-0 rounded-[15px] border border-[#e2ddf1] bg-white p-4 shadow-[0_8px_22px_rgba(69,58,129,.05)]">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="brand-serif truncate text-[20px] font-bold text-[#292a3a]">{item.name}</h3>
                  <button onClick={()=>toggleCompare(item.name)} aria-label={'Quitar '+item.name+' de la comparación'} className="grid size-7 shrink-0 place-items-center rounded-full border border-[#e3dfec] text-[#8a8c9b] hover:bg-[#f7f5ff]"><X size={11}/></button>
                </div>
                <dl className="mt-3 divide-y divide-[#efedf5]">
                  {rows.map(([label,value])=><div key={label} className="flex items-start justify-between gap-3 py-2">
                    <dt className="text-[10px] font-bold uppercase tracking-[.08em] text-[#a0a1af]">{label}</dt>
                    <dd className="max-w-[105px] text-right text-[10px] font-semibold leading-4 text-[#565869]">{value}</dd>
                  </div>)}
                </dl>
                <div className="mt-3"><CopyButton value={item.name}/></div>
              </article>;
            })}
          </div>
        </div>
      </div>}

      {filtered.length===0
        ?<div className="px-6 py-14 text-center">
          <p className="text-[13px] font-semibold text-[#5c5f70]">No encontramos resultados con esa combinación.</p>
          <button onClick={clearFilters} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dcd7f0] bg-[#f7f5ff] px-4 text-[10px] font-semibold text-[#5b4df5]"><RotateCcw size={12}/>Restablecer filtros</button>
        </div>
        :<div className="grid gap-px bg-[#eceaf3] md:grid-cols-2 lg:grid-cols-3">
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

            return <article key={item.name+(item.origin??'')} className={'min-h-[164px] bg-white p-4 transition hover:bg-[#fcfbff] sm:min-h-[186px] sm:p-5 '+(mode==='culture'?'relative':'')}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="gdn-editorial truncate text-[21px] font-bold tracking-[-.025em] text-[#252634] sm:text-[23px]">{item.name}</h3>
                  {(item.origin||genderLabel)&&<div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-[10px] font-semibold text-[#9294a4] sm:text-[10px]">
                    {item.origin&&<span><span className="font-black uppercase tracking-[.08em]">Origen:</span> {item.origin}</span>}
                    {genderLabel&&<span>{genderLabel}</span>}
                  </div>}
                </div>
                <button onClick={()=>toggle(item.name)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 shrink-0 place-items-center rounded-full border transition sm:size-9 '+(saved?'border-[#cfc8fb] bg-[#f0edff] text-[#5b4df5]':'border-[#e1ddea] bg-white text-[#8f91a0] hover:border-[#cfc8fb] hover:bg-[#f7f5ff]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
              </div>

              {(personBadges.length>0||petBadges.length>0)&&<div className="mt-3 flex flex-wrap gap-1.5">
                {[...personBadges,...petBadges].map(label=><span key={label} className="rounded-full border border-[#e6e2f3] bg-[#faf9ff] px-2.5 py-1 text-[10px] font-semibold text-[#74758a]">{label}</span>)}
              </div>}

              {mode==='culture'&&item.script&&<div className="mt-3 rounded-[13px] border border-[#e6e1f7] bg-[#f8f6ff] px-4 py-3 sm:mt-4">
                <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#8a80d8]">Escritura</p>
                <p className="gdn-editorial mt-1.5 break-words text-[21px] font-semibold leading-tight text-[#302b5f] sm:text-[24px]">{item.script}</p>
              </div>}

              <div className="mt-3 min-h-0 text-[12px] leading-5 text-[#747788] sm:mt-4 sm:min-h-12">
                {item.meaning&&<p><strong className="text-[#444655]">Significado:</strong> {item.meaning}</p>}
                {item.pronunciation&&<p className={item.meaning?'mt-1':''}><strong className="text-[#444655]">Pronunciación:</strong> {item.pronunciation}</p>}
                {!item.meaning&&!item.pronunciation&&mode!=='culture'&&mode!=='people'&&mode!=='pet'&&<p>{item.tags.filter(tag=>!internalTags.has(tag)).slice(0,3).map(tag=>tagLabels[tag]||tag.replace(/-/g,' ')).join(' · ')}</p>}
                {mode==='culture'&&item.source&&<div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className={'rounded-full px-2.5 py-1 text-[10px] font-bold '+(item.verified===true?'bg-[#eaf8f0] text-[#27764d]':item.verified===false?'bg-[#fff3e8] text-[#a86328]':'bg-[#f2f1f7] text-[#727486]')}>{item.verified===true?'Fuente verificada':item.verified===false?'En revisión':'Fuente documentada'}</span>
                  {item.sourceUrl?<a className="text-[10px] font-semibold text-[#5b4df5] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>:<span className="text-[10px] text-[#8e90a0]">{item.source}</span>}
                </div>}
                {mode==='people'&&item.sourceUrl&&item.verified===true&&<div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#eaf8f0] px-2.5 py-1 text-[10px] font-bold text-[#27764d]">Significado verificado</span>
                  <a className="text-[10px] font-semibold text-[#5b4df5] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">Ver fuente</a>
                </div>}
                {mode!=='culture'&&mode!=='people'&&item.source&&<p className="mt-2 text-[11px] text-[#9698a6] sm:text-[10px]">Fuente: {item.sourceUrl?<a className="font-semibold text-[#5b4df5] hover:underline" href={item.sourceUrl} target="_blank" rel="noreferrer">{item.source}</a>:item.source}{item.verified===false?' · pendiente de revisión':''}</p>}
              </div>

              <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
                <CopyButton value={item.name} label={mode==='culture'&&item.script?'Copiar nombre':'Copiar'} analyticsRole={mode==='culture'?'copy-romanized-name':'copy-name'}/>
                {mode==='culture'&&item.script&&<CopyButton value={item.script} label="Copiar escritura" analyticsRole="copy-original-script"/>}
                {(mode==='people'||mode==='pet')&&<button
                  onClick={()=>toggleCompare(item.name)}
                  aria-pressed={compareNames.includes(item.name)}
                  disabled={compareNames.length>=4&&!compareNames.includes(item.name)}
                  className={'inline-flex min-h-11 items-center gap-1.5 rounded-[10px] border px-4 text-[12px] font-semibold transition sm:min-h-8 sm:px-3 sm:text-[10px] '+(compareNames.includes(item.name)?'border-[#cfc8fb] bg-[#f0edff] text-[#5b4df5]':'border-[#d9d5e6] bg-white text-[#5f6273] hover:border-[#cfc8fb] hover:text-[#5146d6] disabled:cursor-not-allowed disabled:opacity-40')}
                ><Scale size={12}/>{compareNames.includes(item.name)?'Comparando':'Comparar'}</button>}
              </div>
            </article>;
          })}
        </div>
      }

      {filtered.length>limit&&<div className="border-t border-[#eceaf3] bg-[#faf9ff] p-4 text-center">
        <button onClick={()=>setLimit(v=>v+18)} className="min-h-11 rounded-[10px] border border-[#dedaf0] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#5f6273] hover:border-[#cfc8fb] hover:text-[#5146d6]">Mostrar más</button>
      </div>}
    </div>
  </section>
}
