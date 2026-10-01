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
  const[invisible,setInvisible]=useState(false);
  const[short,setShort]=useState(variant==='unique');

  const results=useMemo(()=>{
    const raw=seed.trim()||'Vortex';
    const base=short?raw.replace(/\s+/g,'').slice(0,8):raw;
    const join=invisible?'ㅤ':'';
    const clanBase=variant==='clan'?base.toUpperCase().slice(0,6):base;
    const source=variant==='clan'
      ?[clanBase+'ᴳᴳ',clanBase+'メ',clanBase+'乂',clanBase+'7',clanBase+'PRO',clanBase+'X']
      :[base,base.toUpperCase(),base.replace(/a/gi,'4'),base+'7',base+'X',base+'ツ'];
    const decorators=frames[style];

    return Array.from(new Set(source.flatMap((name,index)=>{
      const value=invisible?name.split('').join(join):name;
      return[value,decorators[index%decorators.length](value)];
    }))).slice(0,12);
  },[seed,style,invisible,short,variant]);

  return <section className="overflow-hidden rounded-[14px] border border-[#292b33] bg-[#18191d] text-white shadow-sm">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="border-b border-white/8 p-5 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-[9px] bg-white/[.07] text-[#aaa3ff]"><Gamepad2 size={15}/></span>
          <div>
            <p className="text-[11px] font-semibold text-[#aaa3ff]">Free Fire</p>
            <h2 className="text-[16px] font-semibold tracking-[-.015em]">{variant==='clan'?'Nombre y tag para clan':'Construye tu nickname'}</h2>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[11px] font-medium text-[#9fa2ad]">Nombre base</span>
          <input
            value={seed}
            onChange={e=>setSeed(e.target.value)}
            className="h-11 w-full rounded-[9px] border border-white/10 bg-white/[.055] px-3 text-[13px] text-white outline-none placeholder:text-[#717580] focus:border-[#756bf3] focus:ring-2 focus:ring-[#5b4df5]/20"
            placeholder={variant==='clan'?'Nombre del clan...':'Tu palabra o nickname...'}
          />
        </label>

        <div className="mt-5">
          <span className="mb-2 block text-[11px] font-medium text-[#9fa2ad]">Estilo</span>
          <div className="flex flex-wrap gap-1.5">
            {Object.keys(frames).map(item=><button
              key={item}
              onClick={()=>setStyle(item as keyof typeof frames)}
              className={'rounded-[8px] border px-2.5 py-1.5 text-[11px] font-medium transition '+(style===item?'border-[#6e65e7] bg-[#5b4df5]/20 text-[#dedbff]':'border-white/8 bg-white/[.035] text-[#aeb1ba] hover:bg-white/[.07]')}
            >{item}</button>)}
          </div>
        </div>

        <div className="mt-5 grid gap-2">
          <button onClick={()=>setInvisible(v=>!v)} className={'flex h-9 items-center justify-between rounded-[9px] border px-3 text-[11px] font-medium transition '+(invisible?'border-[#6e65e7] bg-[#5b4df5]/20 text-[#dedbff]':'border-white/8 bg-white/[.035] text-[#aeb1ba]')}>
            <span className="inline-flex items-center gap-2"><Space size={13}/>Espacio invisible</span>
            <span>{invisible?'On':'Off'}</span>
          </button>
          <button onClick={()=>setShort(v=>!v)} className={'flex h-9 items-center justify-between rounded-[9px] border px-3 text-[11px] font-medium transition '+(short?'border-[#6e65e7] bg-[#5b4df5]/20 text-[#dedbff]':'border-white/8 bg-white/[.035] text-[#aeb1ba]')}>
            <span className="inline-flex items-center gap-2"><Scissors size={13}/>Versión corta</span>
            <span>{short?'On':'Off'}</span>
          </button>
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2 text-[12px] font-medium"><Sparkles size={14} className="text-[#aaa3ff]"/>Resultados</div>
          <span className="text-[11px] text-[#7f838e]">{results.length} variantes</span>
        </div>
        <div className="divide-y divide-white/8">
          {results.map(value=><div key={value} className="flex min-h-12 items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-white/[.025]">
            <span className="min-w-0 break-all text-[13px] font-medium">{value}</span>
            <CopyButton value={value}/>
          </div>)}
        </div>
        <p className="border-t border-white/8 px-4 py-3 text-[10px] leading-4 text-[#7e828d]">Los símbolos y espacios pueden dejar de ser compatibles tras cambios del juego. Prueba el resultado antes de guardarlo.</p>
      </div>
    </div>
  </section>
}
