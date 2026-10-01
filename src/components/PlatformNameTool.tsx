'use client';

import {useMemo,useState} from 'react';
import CopyButton from './CopyButton';

type Platform='roblox'|'instagram';

function cleanRoblox(value:string){
  return value.replace(/[^a-zA-Z0-9_]/g,'').replace(/_+/g,'_').slice(0,20);
}
function robloxFormat(value:string){
  const issues:string[]=[];
  if(value.length<3||value.length>20)issues.push('Debe tener entre 3 y 20 caracteres.');
  if(!/^[A-Za-z0-9_]+$/.test(value))issues.push('Usa solo letras, números y como máximo un guion bajo.');
  if((value.match(/_/g)||[]).length>1)issues.push('Solo se permite un guion bajo.');
  if(value.startsWith('_')||value.endsWith('_'))issues.push('El guion bajo no puede estar al principio ni al final.');
  return issues;
}
function cleanInstagram(value:string){
  return value.toLowerCase().replace(/[^a-z0-9._]/g,'').replace(/\.{2,}/g,'.').slice(0,30);
}

export default function PlatformNameTool({platform}:{platform:Platform}){
  const[seed,setSeed]=useState(platform==='roblox'?'Nova':'luna');
  const[mode,setMode]=useState<'username'|'display'>('username');

  const suggestions=useMemo(()=>{
    if(platform==='roblox'){
      const base=cleanRoblox(seed)||'Nova';
      if(mode==='display'){
        const clean=seed.trim().replace(/\s+/g,' ')||'Nova';
        return Array.from(new Set([clean,clean+' Play',clean+' Pro',clean+' Studio','Team '+clean,clean+' X'])).slice(0,8);
      }
      return Array.from(new Set([base,base+'Play',base+'X',base+'7','Pro_'+base,base+'_YT'].map(cleanRoblox))).filter(Boolean);
    }
    const base=cleanInstagram(seed)||'luna';
    return Array.from(new Set([base,base+'.studio',base+'_daily','soy.'+base,base+'.co',base+'_online'].map(cleanInstagram))).filter(Boolean);
  },[seed,mode,platform]);

  const raw=seed.trim();
  const issues=platform==='roblox'&&mode==='username'?robloxFormat(raw):[];

  return <section className="gdn-card rounded-[28px] p-5 md:p-7">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="gdn-eyebrow">{platform==='roblox'?'Roblox':'Instagram'}</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">{platform==='roblox'?'Crea y revisa tu nombre':'Crea ideas de username'}</h2>
      </div>
      <span className="rounded-full bg-[#f1efff] px-3 py-1.5 text-xs font-bold text-[#5f45cc]">Formato, no disponibilidad real</span>
    </div>

    {platform==='roblox'&&<div className="mt-5 inline-flex rounded-xl border border-[#dedfe5] bg-[#f7f7f9] p-1">
      <button onClick={()=>setMode('username')} className={'rounded-lg px-4 py-2 text-xs font-extrabold '+(mode==='username'?'bg-white text-[#4f35c9] shadow-sm':'text-[#747882]')}>Username</button>
      <button onClick={()=>setMode('display')} className={'rounded-lg px-4 py-2 text-xs font-extrabold '+(mode==='display'?'bg-white text-[#4f35c9] shadow-sm':'text-[#747882]')}>Display Name</button>
    </div>}

    <div className="mt-5">
      <input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-14 rounded-2xl px-4" placeholder={platform==='roblox'?'Escribe una base para Roblox...':'Escribe una palabra para Instagram...'}/>
      {platform==='roblox'&&mode==='username'&&<div className={'mt-3 rounded-xl px-4 py-3 text-sm '+(issues.length?'bg-[#fff3f1] text-[#a04439]':'bg-[#edf8f1] text-[#35704a]')}>
        {issues.length?issues[0]:'El formato cumple las comprobaciones locales.'}
      </div>}
    </div>

    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {suggestions.map(value=><div key={value} className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-[#e4e5e9] bg-[#fbfbfc] px-4 py-3">
        <span className="min-w-0 break-all font-extrabold text-[#292b32]">{platform==='instagram'?'@':''}{value}</span>
        <CopyButton value={value}/>
      </div>)}
    </div>

    <p className="mt-5 text-xs leading-5 text-[#858995]">
      {platform==='roblox'
        ? mode==='username'
          ? 'Reglas de formato revisadas en octubre de 2026. La disponibilidad y el filtro de contenido dependen de Roblox.'
          : 'El Display Name es distinto del Username y puede repetirse. Roblox aplica filtros de contenido y el soporte de caracteres puede variar.'
        : 'Estas sugerencias son una ayuda de formato, no un comprobador oficial. Confirma disponibilidad y reglas vigentes dentro de Instagram.'}
    </p>
  </section>
}
