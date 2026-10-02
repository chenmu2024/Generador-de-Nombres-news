'use client';

import{nameFrames}from'@/lib/styledText';

const quickIds=['none','pro','insano','dark','clan','stars','hearts','royal','fire','moon','diamond','skull'];

const frameGroups=[
  {label:'Limpios',ids:['none','pro','clan','blade','cross']},
  {label:'Competitivos',ids:['insano','dark','lightning','fire','skull']},
  {label:'Elegantes',ids:['stars','royal','crown','diamond','arrow']},
  {label:'Suaves',ids:['hearts','kawaii','moon','flower','wave']},
] as const;

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
      {frameGroups.map(group=><optgroup key={group.label} label={group.label}>
        {group.ids.map(id=>{
          const frame=nameFrames.find(item=>item.id===id);
          return frame?<option key={frame.id} value={frame.id}>{frame.label} · {frame.transform(preview||'Nova')}</option>:null;
        })}
      </optgroup>)}
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

    {!compact&&<details className={'mt-3 overflow-hidden rounded-[11px] border '+(dark?'border-white/10 bg-white/[.025]':'border-[#e5e2ed] bg-[#fcfbff]')}>
      <summary className={'flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 text-[10px] font-bold '+(dark?'text-[#c3c7d4]':'text-[#626576]')}>
        <span>Explorar todos los marcos</span>
        <span className={'gdn-tech rounded-full px-2 py-1 text-[9px] '+(dark?'bg-white/[.06] text-[#8f95a8]':'bg-white text-[#8b8d9d]')}>{frameGroups.length} familias · {nameFrames.length} estilos</span>
      </summary>
      <div className={'border-t p-3 '+(dark?'border-white/8':'border-[#ece9f2]')}>
        <div className="space-y-4">
          {frameGroups.map(group=><section key={group.label}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className={'gdn-tech text-[9px] font-black uppercase tracking-[.1em] '+(dark?'text-[#7f8498]':'text-[#9395a4]')}>{group.label}</p>
              <span className={'text-[9px] '+(dark?'text-[#676d82]':'text-[#aaaeba]')}>{group.ids.length}</span>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {group.ids.map(id=>{
                const frame=nameFrames.find(item=>item.id===id);
                if(!frame)return null;
                const active=value===frame.id;
                return <button
                  key={frame.id}
                  type="button"
                  onClick={()=>onChange(frame.id)}
                  aria-pressed={active}
                  className={'rounded-[9px] border px-3 py-2 text-left transition '+(active
                    ?dark?'border-[#7469ff] bg-[#5b4df5]/20':'border-[#c9c1ff] bg-[#f0edff]'
                    :dark?'border-white/8 bg-white/[.025] hover:bg-white/[.06]':'border-[#e8e5ef] bg-white hover:border-[#d8d2f4]')}
                >
                  <span className={'block break-all text-[13px] font-semibold '+(dark?'text-white':'text-[#313241]')}>{frame.transform(preview||'Nova')}</span>
                  <span className={'mt-1 block text-[9px] '+(dark?'text-[#7f8498]':'text-[#9698a7]')}>{frame.label}</span>
                </button>;
              })}
            </div>
          </section>)}
        </div>
      </div>
    </details>}
  </div>
}
