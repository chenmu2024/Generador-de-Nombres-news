'use client';

import {useEffect,useMemo,useState} from 'react';
import {AtSign,BadgeCheck,ExternalLink,Heart,ShieldAlert} from 'lucide-react';
import CopyButton from './CopyButton';
import UnicodeStylePicker from './UnicodeStylePicker';
import {trackProductAction} from '@/lib/analytics';
import {applyUnicodeStyle,type UnicodeStyleId} from '@/lib/styledText';
import{readFavorites,toggleFavorite as toggleStoredFavorite}from'@/lib/favorites';

type Platform='roblox'|'instagram';
type NameMode='username'|'display';
type PlatformIntent='general'|'blox'|'brookhaven'|'aesthetic'|'creator'|'short'|'letters';

function cleanRoblox(value:string){
  const normalized=value.replace(/[^a-zA-Z0-9_]/g,'').replace(/^_+|_+$/g,'');
  const firstUnderscore=normalized.indexOf('_');
  const singleUnderscore=firstUnderscore<0
    ?normalized
    :normalized.slice(0,firstUnderscore+1)+normalized.slice(firstUnderscore+1).replace(/_/g,'');
  return singleUnderscore.slice(0,20).replace(/_$/,'');
}
function robloxFormat(value:string){
  const issues:string[]=[];
  if(value.length<3||value.length>20)issues.push('Debe tener entre 3 y 20 caracteres.');
  if(!/^[A-Za-z0-9_]+$/.test(value))issues.push('Usa solo letras, números y guion bajo.');
  if((value.match(/_/g)||[]).length>1)issues.push('Solo se permite un guion bajo.');
  if(value.startsWith('_')||value.endsWith('_'))issues.push('El guion bajo no puede estar al principio ni al final.');
  return issues;
}
function cleanInstagram(value:string){return value.toLowerCase().replace(/[^a-z0-9._]/g,'').replace(/\.{2,}/g,'.').slice(0,30)}

export default function PlatformNameTool({platform}:{platform:Platform}){
  const[seed,setSeed]=useState(platform==='roblox'?'Nova':'luna');
  const[mode,setMode]=useState<NameMode>('username');
  const[intent,setIntent]=useState<PlatformIntent>('general');
  const[font,setFont]=useState<UnicodeStyleId>('script');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{setFavorites(readFavorites())},[]);

  function toggleFavorite(value:string){
    const{items:next,removed}=toggleStoredFavorite(value,favorites);
    setFavorites(next);
    trackProductAction(removed?'favorite-remove':'favorite-add','platform-tool');
  }

  const suggestions=useMemo(()=>{
    if(platform==='roblox'){
      const base=cleanRoblox(seed)||'Nova';
      if(mode==='display'){
        const clean=seed.trim().replace(/\s+/g,' ')||'Nova';
        const roots=intent==='blox'
          ?[clean,clean+' Pirate',clean+' Crew',clean+' Blade',clean+' Sea','Captain '+clean,clean+' Raid',clean+' Fruit']
          :intent==='brookhaven'
            ?[clean,clean+' RP',clean+' Home',clean+' House','City '+clean,clean+' Life',clean+' Town',clean+' Family']
            :intent==='aesthetic'
              ?[clean,clean+' Dream',clean+' Cloud',clean+' Moon','Soft '+clean,clean+' Glow',clean+' Bloom',clean+' Mood']
              :intent==='short'
                ?[clean.slice(0,10),clean.slice(0,8)+' X',clean.slice(0,7)+' Pro',clean.slice(0,8)+' 7']
                :[clean,clean+' Play',clean+' Pro',clean+' Studio','Team '+clean,clean+' X',clean+' World',clean+' Squad','The '+clean,clean+' Live'];
        return Array.from(new Set(roots)).slice(0,10);
      }
      const roots=intent==='blox'
        ?[base,base+'Fruit',base+'Blade',base+'Sea','Pirate'+base,base+'Raid',base+'Crew','Sea'+base,base+'Pirate',base+'BF']
        :intent==='brookhaven'
          ?[base,base+'RP',base+'Home',base+'House','City'+base,base+'Life',base+'Town','Its'+base,base+'BH',base+'Role']
          :intent==='aesthetic'
            ?[base,'soft'+base,base+'dream',base+'cloud','lil'+base,base+'mood',base+'glow','hey'+base,base+'moon',base+'vibe']
            :intent==='short'
              ?[base.slice(0,8),base.slice(0,6)+'X',base.slice(0,6)+'7','x'+base.slice(0,6),base.slice(0,5)+'GG',base.slice(0,6)+'YT']
              :[base,base+'Play',base+'X',base+'7','Pro_'+base,base+'_YT','Its'+base,'The'+base,base+'GG','Real'+base,base+'Live','Mr'+base];
      return Array.from(new Set(roots.map(cleanRoblox))).filter(Boolean).slice(0,12);
    }

    if(mode==='display'){
      const base=seed.trim().replace(/\s+/g,' ')||'Luna';
      const roots=intent==='letters'
        ?[base,base+' ✦',base+' ♡','✦ '+base,base+' ౨ৎ',base+' Mood','The '+base,base+' Studio']
        :intent==='aesthetic'
          ?[base,base+' Mood',base+' Dream',base+' Glow',base+' ♡','Soft '+base,base+' Diary',base+' Studio']
          :intent==='creator'
            ?[base,base+' Studio',base+' Daily','Soy '+base,base+' Creator',base+' Lab',base+' Media',base+' Edit']
            :[base,base+' Studio',base+' Daily','Soy '+base,base+' Co',base+' Online',base+' ✦',base+' ♡','The '+base,base+' Mood'];
      return Array.from(new Set(roots.map(value=>applyUnicodeStyle(value,font)))).slice(0,10);
    }

    const base=cleanInstagram(seed)||'luna';
    const roots=intent==='aesthetic'
      ?[base,base+'.mood',base+'_dream','soft.'+base,base+'.glow',base+'_diary','the.'+base,base+'.cloud',base+'_vibe',base+'.edit']
      :intent==='creator'
        ?[base,base+'.studio',base+'_daily','soy.'+base,base+'.media',base+'_creator',base+'.lab',base+'_edit','hola.'+base,base+'.co']
        :intent==='short'
          ?[base.slice(0,10),base.slice(0,8)+'.x',base.slice(0,8)+'_7','the.'+base.slice(0,7),base.slice(0,8)+'.co',base.slice(0,8)+'_ig']
          :[base,base+'.studio',base+'_daily','soy.'+base,base+'.co',base+'_online','the.'+base,base+'.mood',base+'_club','hola.'+base,base+'.edit',base+'_life'];
    return Array.from(new Set(roots.map(cleanInstagram))).filter(Boolean).slice(0,12);
  },[seed,mode,platform,font,intent]);

  const intentOptions:{id:PlatformIntent;label:string}[]=platform==='roblox'
    ?[
      {id:'general',label:'General'},
      {id:'blox',label:'Blox Fruits'},
      {id:'brookhaven',label:'Brookhaven'},
      {id:'aesthetic',label:'Aesthetic'},
      {id:'short',label:'Corto'},
    ]
    :[
      {id:'general',label:'General'},
      {id:'aesthetic',label:'Aesthetic'},
      {id:'creator',label:'Creador'},
      {id:'short',label:'Corto'},
      {id:'letters',label:'Letras'},
    ];

  function applyIntent(value:PlatformIntent){
    setIntent(value);
    if(platform==='instagram'&&value==='letters')setMode('display');
    if(value==='short')setMode('username');
    trackProductAction('intent-'+value,'platform-tool');
  }

  const issues=platform==='roblox'&&mode==='username'?robloxFormat(seed.trim()):[];
  const normalizedRoblox=platform==='roblox'&&mode==='username'?(cleanRoblox(seed)||'Nova'):'';

  const accent=platform==='roblox'?'#3f6edb':'#b85a78';
  const soft=platform==='roblox'?'#f2f6ff':'#fff4f7';
  const border=platform==='roblox'?'#dbe5f7':'#f0d9e2';

  return <section className="overflow-hidden rounded-[20px] border bg-white shadow-[0_14px_38px_rgba(55,49,91,.06)]" style={{borderColor:border}}>
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b p-5 sm:p-6 lg:border-b-0 lg:border-r" style={{borderColor:border,background:soft}}>
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-[11px] text-white shadow-[0_8px_20px_rgba(36,42,68,.14)]" style={{background:accent}}><AtSign size={15}/></span>
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.12em]" style={{color:accent}}>{platform==='roblox'?'Roblox':'Instagram'}</p>
            <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">{platform==='roblox'?'Crea y revisa tu nombre':'Username y nombre visible'}</h2>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 rounded-[11px] border border-[#e0dcea] bg-white p-1">
          <button onClick={()=>{setMode('username');trackProductAction('mode-username','platform-tool')}} aria-pressed={mode==='username'} style={mode==='username'?{background:accent}:undefined} className={'min-h-10 rounded-[8px] px-3 py-2 text-[10px] font-semibold transition '+(mode==='username'?'text-white':'text-[#787b8c]')}>Username</button>
          <button onClick={()=>{setMode('display');trackProductAction('mode-display','platform-tool')}} aria-pressed={mode==='display'} style={mode==='display'?{background:accent}:undefined} className={'min-h-10 rounded-[8px] px-3 py-2 text-[10px] font-semibold transition '+(mode==='display'?'text-white':'text-[#787b8c]')}>{platform==='roblox'?'Display Name':'Nombre visible'}</button>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#858899]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-12 rounded-[12px] px-4 text-[12px]" placeholder="Escribe una base..."/>
        </label>

        <div className="mt-4">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#858899]">Atajos por intención</span>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {intentOptions.map(option=><button
              key={option.id}
              type="button"
              onClick={()=>applyIntent(option.id)}
              aria-pressed={intent===option.id}
              style={intent===option.id?{background:accent,borderColor:accent}:undefined}
              className={'min-h-9 shrink-0 rounded-full border px-3 text-[10px] font-semibold transition '+(intent===option.id?'text-white':'border-[#dedbe8] bg-white text-[#777a8a] hover:border-[#c9c4db]')}
            >{option.label}</button>)}
          </div>
        </div>

        {platform==='instagram'&&mode==='display'&&<div className="mt-5">
          <UnicodeStylePicker
            value={font}
            onChange={value=>{setFont(value);trackProductAction('font-change','instagram-display')}}
            preview={seed}
          />
        </div>}

        {platform==='roblox'&&mode==='username'&&<div className={'mt-3 rounded-[12px] px-3 py-3 text-[10px] leading-4 '+(issues.length?'bg-[#fff0f2] text-[#a44d60]':'bg-[#eefaf3] text-[#24734b]')}>
          <div className="flex gap-2">
            {issues.length?<ShieldAlert size={14} className="mt-0.5 shrink-0"/>:<BadgeCheck size={14} className="mt-0.5 shrink-0"/>}
            <div className="min-w-0">
              <p className="font-bold">{issues.length?'Tu texto necesita ajustes.':'El formato local cumple las reglas básicas.'}</p>
              {issues.length
                ?<><ul className="mt-1 list-disc space-y-0.5 pl-4">{issues.map(issue=><li key={issue}>{issue}</li>)}</ul><p className="mt-2">Sugerencia normalizada: <strong className="break-all">{normalizedRoblox}</strong></p></>
                :<p className="mt-1">La herramienta solo revisa formato; no comprueba disponibilidad ni moderación.</p>}
            </div>
          </div>
          <a href="https://en.help.roblox.com/hc/es/articles/4412614080532-Error-901-de-Xbox" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 font-bold underline decoration-current/30 underline-offset-2">
            Reglas oficiales de Roblox<ExternalLink size={10}/>
          </a>
        </div>}

        {platform==='instagram'&&<p className="mt-3 text-[10px] leading-4 text-[#8a8d9e]">{mode==='username'?'El username se genera en formato simple y fácil de copiar.':'El nombre visible admite variantes Unicode; comprueba cómo se renderiza en tu dispositivo antes de usarlo.'}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between border-b bg-white px-5 py-3" style={{borderColor:border}}>
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.1em] text-[#8b8e9d]">Resultados</p>
            <p className="mt-0.5 text-[9px] font-semibold text-[#aaa8b7]">Intención: {intentOptions.find(option=>option.id===intent)?.label}</p>
          </div>
          <span className="text-[10px] font-semibold text-[#9a9cab]">{suggestions.length} opciones</span>
        </div>
        <div className="divide-y divide-[#eceaf3]">
          {suggestions.map(value=>{
            const saved=favorites.includes(value);
            return <div key={value} className="flex min-h-[66px] items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-[#fcfbff] sm:px-5">
              <span className="gdn-editorial min-w-0 break-all text-[18px] font-bold text-[#2d2e3c]">{platform==='instagram'&&mode==='username'?'@':''}{value}</span>
              <div className="flex shrink-0 items-center gap-1.5">
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} style={saved?{background:soft,borderColor:border,color:accent}:{}} className={'grid size-11 place-items-center rounded-[9px] border transition sm:size-9 '+(saved?'':'border-[#e0ddea] bg-white text-[#8c8e9d]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
                <CopyButton value={value} analyticsRole="copy-platform-name"/>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </section>
}
