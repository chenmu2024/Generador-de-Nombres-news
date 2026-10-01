'use client';

import {useMemo,useState} from 'react';
import {AtSign,BadgeCheck,ShieldAlert} from 'lucide-react';
import CopyButton from './CopyButton';

type Platform='roblox'|'instagram';
function cleanRoblox(value:string){return value.replace(/[^a-zA-Z0-9_]/g,'').replace(/_+/g,'_').slice(0,20)}
function robloxFormat(value:string){const issues:string[]=[];if(value.length<3||value.length>20)issues.push('Debe tener entre 3 y 20 caracteres.');if(!/^[A-Za-z0-9_]+$/.test(value))issues.push('Usa solo letras, números y como máximo un guion bajo.');if((value.match(/_/g)||[]).length>1)issues.push('Solo se permite un guion bajo.');if(value.startsWith('_')||value.endsWith('_'))issues.push('El guion bajo no puede estar al principio ni al final.');return issues}
function cleanInstagram(value:string){return value.toLowerCase().replace(/[^a-z0-9._]/g,'').replace(/\.{2,}/g,'.').slice(0,30)}

export default function PlatformNameTool({platform}:{platform:Platform}){
  const[seed,setSeed]=useState(platform==='roblox'?'Nova':'luna');const[mode,setMode]=useState<'username'|'display'>('username');
  const suggestions=useMemo(()=>{if(platform==='roblox'){const base=cleanRoblox(seed)||'Nova';if(mode==='display'){const clean=seed.trim().replace(/\s+/g,' ')||'Nova';return Array.from(new Set([clean,clean+' Play',clean+' Pro',clean+' Studio','Team '+clean,clean+' X'])).slice(0,8)}return Array.from(new Set([base,base+'Play',base+'X',base+'7','Pro_'+base,base+'_YT'].map(cleanRoblox))).filter(Boolean)}const base=cleanInstagram(seed)||'luna';return Array.from(new Set([base,base+'.studio',base+'_daily','soy.'+base,base+'.co',base+'_online'].map(cleanInstagram))).filter(Boolean)},[seed,mode,platform]);
  const issues=platform==='roblox'&&mode==='username'?robloxFormat(seed.trim()):[];

  return <section className="overflow-hidden rounded-[28px] border border-[#d5cbbb] bg-[#fffaf2] shadow-[0_18px_45px_rgba(42,48,40,.07)]">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="border-b border-[#dfd6c9] bg-[#eee6d9] p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#173128] text-white"><AtSign size={15}/></span><div><p className="text-[9px] font-bold uppercase tracking-[.14em] text-[#758077]">{platform==='roblox'?'Roblox':'Instagram'}</p><h2 className="brand-serif text-[24px] font-bold text-[#26372e]">{platform==='roblox'?'Crea y revisa tu nombre':'Crea ideas de username'}</h2></div></div>
        {platform==='roblox'&&<div className="mt-5 grid grid-cols-2 rounded-full border border-[#d2c8ba] bg-[#f7f1e8] p-1"><button onClick={()=>setMode('username')} className={'rounded-full px-3 py-2 text-[10px] font-bold '+(mode==='username'?'bg-[#173128] text-white':'text-[#727d75]')}>Username</button><button onClick={()=>setMode('display')} className={'rounded-full px-3 py-2 text-[10px] font-bold '+(mode==='display'?'bg-[#173128] text-white':'text-[#727d75]')}>Display Name</button></div>}
        <label className="mt-5 block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#78827b]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-12 rounded-2xl px-4 text-[12px]" placeholder="Escribe una base..."/></label>
        {platform==='roblox'&&mode==='username'&&<div className={'mt-3 flex gap-2 rounded-2xl px-3 py-3 text-[10px] leading-4 '+(issues.length?'bg-[#fbe7df] text-[#9a4f3c]':'bg-[#e3eee6] text-[#35634b]')}>{issues.length?<ShieldAlert size={14}/>:<BadgeCheck size={14}/>}<span>{issues.length?issues[0]:'El formato cumple las comprobaciones locales.'}</span></div>}
      </div>
      <div className="divide-y divide-[#e3dacd]">{suggestions.map(value=><div key={value} className="flex min-h-[66px] items-center justify-between gap-3 px-5 transition hover:bg-white"><span className="brand-serif text-[18px] font-bold text-[#2a3a31]">{platform==='instagram'?'@':''}{value}</span><CopyButton value={value}/></div>)}</div>
    </div>
  </section>
}
