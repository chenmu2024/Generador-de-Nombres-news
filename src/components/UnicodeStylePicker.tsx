'use client';

import type{UnicodeStyleId}from'@/lib/styledText';
import{applyUnicodeStyle,unicodeStyles}from'@/lib/styledText';

const quickIds:UnicodeStyleId[]=['plain','bold','fraktur','script','sansBold','monospace','circled','smallCaps','double','fullwidth','starSep','upsideDown'];

export default function UnicodeStylePicker({
  value,
  onChange,
  preview='Nova',
  dark=false,
  compact=false,
}:{
  value:UnicodeStyleId;
  onChange:(value:UnicodeStyleId)=>void;
  preview?:string;
  dark?:boolean;
  compact?:boolean;
}){
  const selected=unicodeStyles.find(style=>style.id===value)??unicodeStyles[0];
  const quick=quickIds.slice(0,compact?6:quickIds.length).map(id=>unicodeStyles.find(style=>style.id===id)!).filter(Boolean);

  return <div>
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className={'text-[10px] font-bold uppercase tracking-[.12em] '+(dark?'text-[#9fa4b8]':'text-[#858899]')}>Fuente Unicode</span>
      <span className={'rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[.08em] '+(dark?'bg-white/[.07] text-[#aeb2c1]':'bg-[#f0edff] text-[#6558f5]')}>{unicodeStyles.length} estilos</span>
    </div>

    <select
      value={value}
      onChange={event=>onChange(event.target.value as UnicodeStyleId)}
      aria-label="Elegir fuente Unicode"
      className={'h-11 w-full rounded-[10px] border px-3 text-[11px] outline-none transition '+(dark?'border-white/14 bg-[#181c2a] text-white focus:border-[#776cff]':'border-[#dedbe8] bg-white text-[#4f5162] focus:border-[#8e83ff]')}
    >
      {unicodeStyles.map(style=><option key={style.id} value={style.id}>{style.label} · compatibilidad {style.compatibility}</option>)}
    </select>

    <div className={'mt-2 flex min-h-11 items-center justify-between gap-3 rounded-[10px] border px-3 '+(dark?'border-white/10 bg-white/[.045]':'border-[#e6e2ef] bg-[#faf9ff]')}>
      <span className={'min-w-0 truncate text-[15px] font-semibold '+(dark?'text-white':'text-[#292a39]')}>{applyUnicodeStyle(preview||'Nova',selected.id)}</span>
      <span className={'shrink-0 text-[10px] font-bold uppercase tracking-[.08em] '+(dark?'text-[#7f8498]':'text-[#9294a3]')}>{selected.compatibility}</span>
    </div>

    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
      {quick.map(style=><button
        key={style.id}
        type="button"
        onClick={()=>onChange(style.id)}
        aria-pressed={value===style.id}
        title={style.label}
        className={'min-h-9 min-w-[44px] shrink-0 rounded-[8px] border px-2 text-[12px] font-semibold transition '+(value===style.id
          ?dark?'border-[#7469ff] bg-[#5b4df5] text-white':'border-[#c9c1ff] bg-[#f0edff] text-[#5146d6]'
          :dark?'border-white/12 bg-white/[.04] text-[#d6d9e3] hover:bg-white/[.08]':'border-[#e3e0eb] bg-white text-[#66697a] hover:bg-[#f7f5ff]')}
      >{style.shortLabel}</button>)}
    </div>
  </div>
}
