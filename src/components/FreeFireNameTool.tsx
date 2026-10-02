'use client';

import {useMemo,useState} from 'react';
import {Gamepad2,Scissors,Sparkles,Space} from 'lucide-react';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';

type Variant='general'|'unique'|'women'|'clan';
const frames={
  Minimal:[(s:string)=>s,(s:string)=>'亗'+s+'亗'],
  Pro:[(s:string)=>'乂'+s+'乂',(s:string)=>'『'+s+'』'],
  Dark:[(s:string)=>'☠︎'+s+'☠︎',(s:string)=>'𓆩'+s+'𓆪'],
  Insano:[(s:string)=>'꧁༺'+s+'༻꧂',(s:string)=>'×͜× '+s],
  Aesthetic:[(s:string)=>'✦ '+s+' ✦',(s:string)=>'♡ '+s+' ♡'],
};

export default function FreeFireNameTool({variant='general'}:{variant?:Variant}){
  const[seed,setSeed]=useState(variant==='women'?'Luna':variant==='clan'?'Nova':'Vortex');
  const[style,setStyle]=useState<keyof typeof frames>(variant==='women'?'Aesthetic':variant==='unique'?'Insano':'Pro');
  const[invisible,setInvisible]=useState(false);const[short,setShort]=useState(variant==='unique');
  const results=useMemo(()=>{const raw=seed.trim()||'Vortex';const base=short?raw.replace(/\s+/g,'').slice(0,8):raw;const join=invisible?'ㅤ':'';const clanBase=variant==='clan'?base.toUpperCase().slice(0,6):base;const source=variant==='clan'?[clanBase+'ᴳᴳ',clanBase+'メ',clanBase+'乂',clanBase+'7',clanBase+'PRO',clanBase+'X']:[base,base.toUpperCase(),base.replace(/a/gi,'4'),base+'7',base+'X',base+'ツ'];const decorators=frames[style];return Array.from(new Set(source.flatMap((name,index)=>{const value=invisible?name.split('').join(join):name;return[value,decorators[index%decorators.length](value)]}))).slice(0,12)},[seed,style,invisible,short,variant]);

  return <section className="overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_24px_66px_rgba(27,24,55,.16)]">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-[12px] bg-[#5b4df5] text-white"><Gamepad2 size={16}/></span><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#a99fff]">Free Fire</p><h2 className="brand-serif text-[26px] font-bold">{variant==='clan'?'Nombre y tag para clan':'Construye tu nickname'}</h2></div></div>
        <label className="mt-6 block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Nombre base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="h-12 w-full rounded-[11px] border border-white/12 bg-[#181c2a] px-4 text-[12px] text-white outline-none focus:border-[#776cff]" placeholder="Tu palabra o nickname..."/></label>
        <div className="mt-5"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Estilo</span><div className="flex flex-wrap gap-2">{Object.keys(frames).map(item=><button key={item} onClick={()=>{setStyle(item as keyof typeof frames);trackProductAction('style-change','freefire-tool')}} aria-pressed={style===item} className={'rounded-[9px] border px-3 py-2 text-[10px] font-semibold '+(style===item?'border-[#7469ff] bg-[#5b4df5] text-white':'border-white/18 bg-white/[.07] text-[#e1e3ec] hover:border-[#665ce0] hover:bg-white/[.12]')}>{item}</button>)}</div></div>
        <div className="mt-5 grid gap-2">
          <button onClick={()=>{setInvisible(v=>!v);trackProductAction('toggle-invisible','freefire-tool')}} aria-pressed={invisible} className={'flex min-h-11 items-center justify-between rounded-[10px] border px-4 text-[11px] font-semibold transition '+(invisible?'border-[#756aff] bg-[#5b4df5]/20 text-[#e4e1ff]':'border-white/16 bg-white/[.06] text-[#d0d3df] hover:bg-white/[.1]')}><span className="inline-flex items-center gap-2"><Space size={14}/>Espacio invisible</span><span className={'rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[.08em] '+(invisible?'bg-[#5b4df5] text-white':'bg-white/10 text-[#aeb2c1]')}>{invisible?'Activo':'Inactivo'}</span></button>
          <button onClick={()=>{setShort(v=>!v);trackProductAction('toggle-short','freefire-tool')}} aria-pressed={short} className={'flex min-h-11 items-center justify-between rounded-[10px] border px-4 text-[11px] font-semibold transition '+(short?'border-[#756aff] bg-[#5b4df5]/20 text-[#e4e1ff]':'border-white/16 bg-white/[.06] text-[#d0d3df] hover:bg-white/[.1]')}><span className="inline-flex items-center gap-2"><Scissors size={14}/>Versión corta</span><span className={'rounded-full px-2 py-1 text-[9px] font-black uppercase tracking-[.08em] '+(short?'bg-[#5b4df5] text-white':'bg-white/10 text-[#aeb2c1]')}>{short?'Activo':'Inactivo'}</span></button>
        </div>
      </div>
      <div className="min-w-0 bg-[#151927]"><div className="flex items-center justify-between border-b border-white/8 px-5 py-4"><div className="flex items-center gap-2 text-[11px] font-semibold"><Sparkles size={13} className="text-[#a99fff]"/>Resultados</div><span className="text-[9px] font-semibold text-[#85899c]">{results.length} variantes</span></div><div className="grid gap-px bg-white/8 sm:grid-cols-2">{results.map(value=><div key={value} className="flex min-h-[68px] items-center justify-between gap-3 bg-[#151927] px-5 transition hover:bg-[#1b2030]"><span className="text-[12px] font-semibold">{value}</span><CopyButton value={value} analyticsRole="copy-freefire-name"/></div>)}</div><p className="border-t border-white/8 px-5 py-4 text-[9px] leading-4 text-[#85899c]">Los símbolos pueden cambiar de compatibilidad tras actualizaciones del juego. Prueba el resultado antes de guardarlo.</p></div>
    </div>
  </section>
}
