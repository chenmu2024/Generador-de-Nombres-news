'use client';

import {useEffect,useMemo,useState} from 'react';
import {AtSign,BadgeCheck,Heart,ShieldAlert} from 'lucide-react';
import CopyButton from './CopyButton';
import UnicodeStylePicker from './UnicodeStylePicker';
import {trackProductAction} from '@/lib/analytics';
import {applyUnicodeStyle,type UnicodeStyleId} from '@/lib/styledText';

type Platform='roblox'|'instagram';
type NameMode='username'|'display';

function cleanRoblox(value:string){return value.replace(/[^a-zA-Z0-9_]/g,'').replace(/_+/g,'_').slice(0,20)}
function robloxFormat(value:string){
  const issues:string[]=[];
  if(value.length<3||value.length>20)issues.push('Debe tener entre 3 y 20 caracteres.');
  if(!/^[A-Za-z0-9_]+$/.test(value))issues.push('Usa solo letras, números y como máximo un guion bajo.');
  if((value.match(/_/g)||[]).length>1)issues.push('Solo se permite un guion bajo.');
  if(value.startsWith('_')||value.endsWith('_'))issues.push('El guion bajo no puede estar al principio ni al final.');
  return issues;
}
function cleanInstagram(value:string){return value.toLowerCase().replace(/[^a-z0-9._]/g,'').replace(/\.{2,}/g,'.').slice(0,30)}

export default function PlatformNameTool({platform}:{platform:Platform}){
  const[seed,setSeed]=useState(platform==='roblox'?'Nova':'luna');
  const[mode,setMode]=useState<NameMode>('username');
  const[font,setFont]=useState<UnicodeStyleId>('script');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);

  function toggleFavorite(value:string){
    const removing=favorites.includes(value);
    const next=removing?favorites.filter(item=>item!==value):Array.from(new Set([...favorites,value]));
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    window.dispatchEvent(new Event('gdn:favorites-updated'));
    trackProductAction(removing?'favorite-remove':'favorite-add','platform-tool');
  }

  const suggestions=useMemo(()=>{
    if(platform==='roblox'){
      const base=cleanRoblox(seed)||'Nova';
      if(mode==='display'){
        const clean=seed.trim().replace(/\s+/g,' ')||'Nova';
        return Array.from(new Set([
          clean,clean+' Play',clean+' Pro',clean+' Studio','Team '+clean,clean+' X',
          clean+' World',clean+' Squad','The '+clean,clean+' Live',
        ])).slice(0,10);
      }
      return Array.from(new Set([
        base,base+'Play',base+'X',base+'7','Pro_'+base,base+'_YT',
        'Its'+base,'The'+base,base+'GG','Real'+base,base+'Live','Mr'+base,
      ].map(cleanRoblox))).filter(Boolean).slice(0,12);
    }

    if(mode==='display'){
      const base=seed.trim().replace(/\s+/g,' ')||'Luna';
      const roots=[
        base,base+' Studio',base+' Daily','Soy '+base,base+' Co',base+' Online',
        base+' ✦',base+' ♡','The '+base,base+' Mood',
      ];
      return Array.from(new Set(roots.map(value=>applyUnicodeStyle(value,font)))).slice(0,10);
    }

    const base=cleanInstagram(seed)||'luna';
    return Array.from(new Set([
      base,base+'.studio',base+'_daily','soy.'+base,base+'.co',base+'_online',
      'the.'+base,base+'.mood',base+'_club','hola.'+base,base+'.edit',base+'_life',
    ].map(cleanInstagram))).filter(Boolean).slice(0,12);
  },[seed,mode,platform,font]);

  const issues=platform==='roblox'&&mode==='username'?robloxFormat(seed.trim()):[];

  return <section className="overflow-hidden rounded-[20px] border border-[#e2dfec] bg-white shadow-[0_14px_38px_rgba(55,49,91,.06)]">
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b border-[#eceaf3] bg-[#faf9ff] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-[11px] bg-[#5b4df5] text-white"><AtSign size={15}/></span>
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.12em] text-[#8177e9]">{platform==='roblox'?'Roblox':'Instagram'}</p>
            <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">{platform==='roblox'?'Crea y revisa tu nombre':'Username y nombre visible'}</h2>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 rounded-[11px] border border-[#e0dcea] bg-white p-1">
          <button onClick={()=>{setMode('username');trackProductAction('mode-username','platform-tool')}} aria-pressed={mode==='username'} className={'min-h-10 rounded-[8px] px-3 py-2 text-[10px] font-semibold '+(mode==='username'?'bg-[#5b4df5] text-white':'text-[#787b8c]')}>Username</button>
          <button onClick={()=>{setMode('display');trackProductAction('mode-display','platform-tool')}} aria-pressed={mode==='display'} className={'min-h-10 rounded-[8px] px-3 py-2 text-[10px] font-semibold '+(mode==='display'?'bg-[#5b4df5] text-white':'text-[#787b8c]')}>{platform==='roblox'?'Display Name':'Nombre visible'}</button>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#858899]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-12 rounded-[12px] px-4 text-[12px]" placeholder="Escribe una base..."/>
        </label>

        {platform==='instagram'&&mode==='display'&&<div className="mt-5">
          <UnicodeStylePicker
            value={font}
            onChange={value=>{setFont(value);trackProductAction('font-change','instagram-display')}}
            preview={seed}
          />
        </div>}

        {platform==='roblox'&&mode==='username'&&<div className={'mt-3 flex gap-2 rounded-[12px] px-3 py-3 text-[10px] leading-4 '+(issues.length?'bg-[#fff0f2] text-[#a44d60]':'bg-[#eefaf3] text-[#24734b]')}>
          {issues.length?<ShieldAlert size={14}/>:<BadgeCheck size={14}/>}<span>{issues.length?issues[0]:'El formato cumple las comprobaciones locales.'}</span>
        </div>}

        {platform==='instagram'&&<p className="mt-3 text-[10px] leading-4 text-[#8a8d9e]">{mode==='username'?'El username se genera en formato simple y fácil de copiar.':'El nombre visible admite variantes Unicode; comprueba cómo se renderiza en tu dispositivo antes de usarlo.'}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between border-b border-[#eceaf3] bg-white px-5 py-3">
          <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.1em] text-[#8b8e9d]">Resultados</p>
          <span className="text-[10px] font-semibold text-[#9a9cab]">{suggestions.length} opciones</span>
        </div>
        <div className="divide-y divide-[#eceaf3]">
          {suggestions.map(value=>{
            const saved=favorites.includes(value);
            return <div key={value} className="flex min-h-[66px] items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-[#fcfbff] sm:px-5">
              <span className="gdn-editorial min-w-0 break-all text-[18px] font-bold text-[#2d2e3c]">{platform==='instagram'&&mode==='username'?'@':''}{value}</span>
              <div className="flex shrink-0 items-center gap-1.5">
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 place-items-center rounded-[9px] border transition sm:size-9 '+(saved?'border-[#cfc8fb] bg-[#f0edff] text-[#5b4df5]':'border-[#e0ddea] bg-white text-[#8c8e9d] hover:border-[#cfc8fb]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
                <CopyButton value={value} analyticsRole="copy-platform-name"/>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </section>
}
