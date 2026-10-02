'use client';

import{useEffect,useMemo,useState}from'react';
import{Heart,Sparkles}from'lucide-react';
import CopyButton from'./CopyButton';
import UnicodeStylePicker from'./UnicodeStylePicker';
import NameFramePicker from'./NameFramePicker';
import{applyNameFrame,applyUnicodeStyle,type UnicodeStyleId}from'@/lib/styledText';
import{readFavorites,toggleFavorite as toggleStoredFavorite}from'@/lib/favorites';
import{trackProductAction}from'@/lib/analytics';

type AnimeIntent='general'|'discord'|'roblox'|'genshin'|'blox';

function cleanUsername(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9_]/g,'').slice(0,20);
}

export default function AnimeNameTool(){
  const[seed,setSeed]=useState('Akira');
  const[intent,setIntent]=useState<AnimeIntent>('general');
  const[font,setFont]=useState<UnicodeStyleId>('bold');
  const[frame,setFrame]=useState('none');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{setFavorites(readFavorites())},[]);
  useEffect(()=>{
    const requested=new URLSearchParams(window.location.search).get('intent') as AnimeIntent|null;
    if(requested&&['general','discord','roblox','genshin','blox'].includes(requested))setIntent(requested);
  },[]);

  const intentOptions:{id:AnimeIntent;label:string}[]=[
    {id:'general',label:'General'},
    {id:'discord',label:'Discord'},
    {id:'roblox',label:'Roblox'},
    {id:'genshin',label:'Genshin'},
    {id:'blox',label:'Blox Fruits'},
  ];

  const suggestions=useMemo(()=>{
    const raw=seed.trim()||'Akira';
    if(intent==='roblox'){
      const base=cleanUsername(raw)||'Akira';
      return Array.from(new Set([
        base,base+'Anime',base+'X','Neo'+base,base+'7',base+'Senpai','Its'+base,base+'Arc',base+'Fox',base+'Zero'
      ].map(cleanUsername))).filter(Boolean).slice(0,10);
    }
    if(intent==='blox'){
      const base=cleanUsername(raw)||'Akira';
      return Array.from(new Set([
        base+'Fruit',base+'Pirate',base+'Sea','Captain'+base,base+'Blade',base+'Raid',base+'Crew','Sea'+base,base+'BF',base+'Voyage'
      ].map(cleanUsername))).filter(Boolean).slice(0,10);
    }

    const roots=intent==='discord'
      ?[raw,raw+'.exe','hey.'+raw,raw+'ツ',raw+'夜','the.'+raw,raw+'wave',raw+'void',raw+'mood',raw+'arc']
      :intent==='genshin'
        ?[raw,raw+'Vision',raw+'Astra',raw+'Nova',raw+'Bloom',raw+'Storm',raw+'Luna',raw+'Arc',raw+'Echo',raw+'Wander']
        :[raw,raw+'X',raw+'夜',raw+'零','Neo '+raw,raw+' Moon',raw+' Arc',raw+' Kage',raw+' Nova','The '+raw];

    return Array.from(new Set(roots.map(value=>applyNameFrame(applyUnicodeStyle(value,font),frame)))).slice(0,10);
  },[seed,intent,font,frame]);

  function toggleFavorite(value:string){
    const{items:next,removed}=toggleStoredFavorite(value,favorites);
    setFavorites(next);
    trackProductAction(removed?'favorite-remove':'favorite-add','anime-tool');
  }

  function chooseIntent(value:AnimeIntent){
    setIntent(value);
    if(value==='roblox'||value==='blox'){
      setFont('plain');
      setFrame('none');
    }
    trackProductAction('intent-'+value,'anime-tool');
  }

  const plainOnly=intent==='roblox'||intent==='blox';

  return <section className="overflow-hidden rounded-[22px] border border-[#2b2840] bg-[#111421] text-white shadow-[0_24px_64px_rgba(27,24,55,.14)]">
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b border-white/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-[11px] bg-[#6c5cff]"><Sparkles size={15}/></span>
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.12em] text-[#948bff]">Anime name studio</p>
            <h2 className="gdn-editorial text-[24px] font-bold">Crea según dónde lo vas a usar</h2>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Palabra base</span>
          <input value={seed} onChange={event=>setSeed(event.target.value)} className="h-12 w-full rounded-[11px] border border-white/12 bg-[#181c2a] px-4 text-[12px] text-white outline-none focus:border-[#776cff]" placeholder="Akira"/>
        </label>

        <div className="mt-4">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Contexto</span>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {intentOptions.map(option=><button
              key={option.id}
              type="button"
              onClick={()=>chooseIntent(option.id)}
              aria-pressed={intent===option.id}
              className={'min-h-9 shrink-0 rounded-full border px-3 text-[10px] font-semibold transition '+(intent===option.id?'border-[#776cff] bg-[#6759e8] text-white':'border-white/12 bg-white/[.05] text-[#c5c8d5] hover:border-[#776cff]')}
            >{option.label}</button>)}
          </div>
        </div>

        {!plainOnly&&<div className="mt-5 space-y-5">
          <UnicodeStylePicker value={font} onChange={value=>{setFont(value);trackProductAction('font-change','anime-tool')}} preview={seed} dark/>
          <NameFramePicker value={frame} onChange={value=>{setFrame(value);trackProductAction('frame-change','anime-tool')}} preview={seed} dark/>
        </div>}

        <p className="mt-4 text-[10px] leading-4 text-[#8f94a8]">{plainOnly
          ?'En Roblox y Blox Fruits generamos variantes simples de letras, números y guion bajo. La disponibilidad real debe comprobarse dentro de Roblox.'
          :'Estas son ideas estilizadas para perfiles y juegos. Comprueba límites de caracteres y compatibilidad dentro de la plataforma donde vayas a usarlas.'}</p>
      </div>

      <div className="min-w-0 bg-[#151927]">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.1em] text-[#9fa4b8]">Resultados</p>
            <p className="mt-0.5 text-[9px] font-semibold text-[#777d91]">Modo: {intentOptions.find(option=>option.id===intent)?.label}</p>
          </div>
          <span className="rounded-full bg-white/6 px-2.5 py-1 text-[9px] font-semibold text-[#898ea0]">{suggestions.length} opciones</span>
        </div>
        <div className="grid gap-px bg-white/8 sm:grid-cols-2">
          {suggestions.map(value=>{
            const saved=favorites.includes(value);
            return <div key={value} className="flex min-h-[72px] items-center justify-between gap-3 bg-[#151927] px-4 py-3 transition hover:bg-[#1b2030] sm:px-5">
              <span className="min-w-0 break-all text-[14px] font-semibold">{value}</span>
              <div className="flex shrink-0 items-center gap-1.5">
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-10 place-items-center rounded-[9px] border transition '+(saved?'border-[#776cff] bg-white/[.08] text-[#9c94ff]':'border-white/10 text-[#9297a9] hover:border-[#776cff] hover:text-[#9c94ff]')}><Heart size={13} fill={saved?'currentColor':'none'}/></button>
                <CopyButton value={value} analyticsRole="copy-anime-name"/>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </section>
}
