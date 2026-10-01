'use client';

import {useMemo,useState} from 'react';
import {AtSign,BadgeCheck,ShieldAlert} from 'lucide-react';
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

  return <section className="overflow-hidden rounded-[14px] border border-[#dfe1e6] bg-white shadow-[0_1px_2px_rgba(20,22,26,.03)]">
    <div className="grid lg:grid-cols-[330px_1fr]">
      <div className="border-b border-[#eceef1] p-5 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[9px] bg-[#eeecff] text-[#5146c8]"><AtSign size={15}/></span>
          <div>
            <p className="text-[11px] font-semibold text-[#5b4df5]">{platform==='roblox'?'Roblox':'Instagram'}</p>
            <h2 className="text-[16px] font-semibold tracking-[-.015em]">{platform==='roblox'?'Crea y revisa tu nombre':'Crea ideas de username'}</h2>
          </div>
        </div>

        {platform==='roblox'&&<div className="mt-5 grid grid-cols-2 rounded-[9px] bg-[#f3f4f6] p-1">
          <button onClick={()=>setMode('username')} className={'rounded-[7px] px-3 py-2 text-[11px] font-medium transition '+(mode==='username'?'bg-white text-[#383b43] shadow-sm':'text-[#838791]')}>Username</button>
          <button onClick={()=>setMode('display')} className={'rounded-[7px] px-3 py-2 text-[11px] font-medium transition '+(mode==='display'?'bg-white text-[#383b43] shadow-sm':'text-[#838791]')}>Display Name</button>
        </div>}

        <label className="mt-5 block">
          <span className="mb-2 block text-[11px] font-medium text-[#777b85]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-11 rounded-[9px] px-3 text-[13px]" placeholder={platform==='roblox'?'Escribe una base...':'Escribe una palabra...'}/>
        </label>

        {platform==='roblox'&&mode==='username'&&<div className={'mt-3 flex gap-2 rounded-[9px] px-3 py-2.5 text-[11px] leading-4 '+(issues.length?'bg-[#fff1ef] text-[#9d4036]':'bg-[#ecf8f2] text-[#0f7045]')}>
          {issues.length?<ShieldAlert size={14} className="mt-0.5 shrink-0"/>:<BadgeCheck size={14} className="mt-0.5 shrink-0"/>}
          <span>{issues.length?issues[0]:'El formato cumple las comprobaciones locales.'}</span>
        </div>}

        <p className="mt-4 text-[10px] leading-4 text-[#9599a2]">Solo revisamos formato. La disponibilidad y los filtros reales dependen de la plataforma.</p>
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-[#eceef1] px-4 py-3">
          <span className="text-[12px] font-medium text-[#4e525b]">Sugerencias</span>
          <span className="text-[11px] text-[#92969f]">{suggestions.length} opciones</span>
        </div>
        <div className="divide-y divide-[#eceef1]">
          {suggestions.map(value=><div key={value} className="flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 hover:bg-[#fafafa]">
            <span className="min-w-0 break-all text-[13px] font-medium text-[#2d2f35]">{platform==='instagram'?'@':''}{value}</span>
            <CopyButton value={value}/>
          </div>)}
        </div>
      </div>
    </div>
  </section>
}
