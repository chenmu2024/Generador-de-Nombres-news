'use client';

import {useMemo,useState} from 'react';
import {Gamepad2,Scissors,Sparkles,Space} from 'lucide-react';
import CopyButton from './CopyButton';

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

  return <section className="overflow-hidden rounded-[30px] bg-[#14271f] text-[#fffaf2] shadow-[0_26px_70px_rgba(25,40,32,.18)]">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#d97849] text-white"><Gamepad2 size={16}/></span><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#d6b167]">Free Fire</p><h2 className="brand-serif text-[26px] font-bold">{variant==='clan'?'Nombre y tag para clan':'Construye tu nickname'}</h2></div></div>
        <label className="mt-6 block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9db0a4]">Nombre base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="h-12 w-full rounded-2xl border border-white/12 bg-[#203d32] px-4 text-[12px] text-white outline-none focus:border-[#d6b167]" placeholder="Tu palabra o nickname..."/></label>
        <div className="mt-5"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9db0a4]">Estilo</span><div className="flex flex-wrap gap-2">{Object.keys(frames).map(item=><button key={item} onClick={()=>setStyle(item as keyof typeof frames)} className={'rounded-full border px-3 py-2 text-[10px] font-bold '+(style===item?'border-[#d6b167] bg-[#d6b167] text-[#1b2d24]':'border-white/12 bg-white/5 text-[#c6d2ca]')}>{item}</button>)}</div></div>
        <div className="mt-5 grid gap-2">
          <button onClick={()=>setInvisible(v=>!v)} className={'flex h-10 items-center justify-between rounded-full border px-4 text-[10px] font-bold '+(invisible?'border-[#d6b167] bg-[#d6b167]/15 text-[#efcf88]':'border-white/12 bg-white/5 text-[#b8c7bd]')}><span className="inline-flex items-center gap-2"><Space size={13}/>Espacio invisible</span><span>{invisible?'On':'Off'}</span></button>
          <button onClick={()=>setShort(v=>!v)} className={'flex h-10 items-center justify-between rounded-full border px-4 text-[10px] font-bold '+(short?'border-[#d6b167] bg-[#d6b167]/15 text-[#efcf88]':'border-white/12 bg-white/5 text-[#b8c7bd]')}><span className="inline-flex items-center gap-2"><Scissors size={13}/>Versión corta</span><span>{short?'On':'Off'}</span></button>
        </div>
      </div>
      <div className="min-w-0 bg-[#1b342a]"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-2 text-[11px] font-bold"><Sparkles size={13} className="text-[#e0b75d]"/>Resultados</div><span className="text-[9px] font-bold text-[#82978a]">{results.length} variantes</span></div><div className="grid sm:grid-cols-2">{results.map(value=><div key={value} className="flex min-h-[68px] items-center justify-between gap-3 border-b border-r border-white/8 px-5 transition hover:bg-white/[.04]"><span className="text-[12px] font-semibold">{value}</span><CopyButton value={value}/></div>)}</div><p className="border-t border-white/10 px-5 py-4 text-[9px] leading-4 text-[#84998d]">Los símbolos pueden cambiar de compatibilidad tras actualizaciones del juego. Prueba el resultado antes de guardarlo.</p></div>
    </div>
  </section>
}
