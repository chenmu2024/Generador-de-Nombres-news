'use client';

import{nameFrames}from'@/lib/styledText';

const quickIds=['none','pro','insano','dark','clan','stars','hearts','royal','fire','moon','diamond','skull'];

export default function NameFramePicker({
  value,
  onChange,
  preview='Nova',
  dark=false,
  compact=false,
}:{
  value:string;
  onChange:(value:string)=>void;
  preview?:string;
  dark?:boolean;
  compact?:boolean;
}){
  const selected=nameFrames.find(frame=>frame.id===value)??nameFrames[0];
  const quick=quickIds.slice(0,compact?6:quickIds.length).map(id=>nameFrames.find(frame=>frame.id===id)).filter(Boolean) as typeof nameFrames;

  return <div>
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className={'gdn-tech text-[10px] font-bold uppercase tracking-[.1em] '+(dark?'text-[#9fa4b8]':'text-[#858899]')}>Marco decorativo</span>
      <span className={'rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[.06em] '+(dark?'bg-white/[.07] text-[#aeb2c1]':'bg-[#f0edff] text-[#6558f5]')}>{nameFrames.length} estilos</span>
    </div>

    <select
      value={value}
      onChange={event=>onChange(event.target.value)}
      aria-label="Elegir marco decorativo"
      className={'h-11 w-full rounded-[10px] border px-3 text-[11px] outline-none transition '+(dark?'border-white/14 bg-[#181c2a] text-white focus:border-[#776cff]':'border-[#dedbe8] bg-white text-[#4f5162] focus:border-[#8e83ff]')}
    >
      {nameFrames.map(frame=><option key={frame.id} value={frame.id}>{frame.label} · {frame.transform(preview||'Nova')}</option>)}
    </select>

    <div className={'mt-2 flex min-h-12 items-center justify-between gap-3 rounded-[10px] border px-3 '+(dark?'border-white/10 bg-white/[.045]':'border-[#e6e2ef] bg-[#faf9ff]')}>
      <span className={'min-w-0 break-all text-[14px] font-semibold '+(dark?'text-white':'text-[#292a39]')}>{selected.transform(preview||'Nova')}</span>
      <span className={'gdn-tech shrink-0 text-[9px] font-bold uppercase tracking-[.08em] '+(dark?'text-[#777d93]':'text-[#9294a3]')}>{selected.label}</span>
    </div>

    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
      {quick.map(frame=><button
        key={frame.id}
        type="button"
        onClick={()=>onChange(frame.id)}
        aria-pressed={value===frame.id}
        title={frame.label}
        className={'min-h-9 shrink-0 rounded-[8px] border px-2.5 text-[11px] font-semibold transition '+(value===frame.id
          ?dark?'border-[#7469ff] bg-[#5b4df5] text-white':'border-[#c9c1ff] bg-[#f0edff] text-[#5146d6]'
          :dark?'border-white/12 bg-white/[.04] text-[#d6d9e3] hover:bg-white/[.08]':'border-[#e3e0eb] bg-white text-[#66697a] hover:bg-[#f7f5ff]')}
      >{frame.transform('N')}</button>)}
    </div>
  </div>
}
