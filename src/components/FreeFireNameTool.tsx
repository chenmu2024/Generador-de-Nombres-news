'use client';

import {useMemo,useState} from 'react';
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
      ? [clanBase+'ᴳᴳ',clanBase+'メ',clanBase+'乂',clanBase+'7',clanBase+'PRO',clanBase+'X']
      : [base,base.toUpperCase(),base.replace(/a/gi,'4'),base+'7',base+'X',base+'ツ'];
    const decorators=frames[style];
    return Array.from(new Set(source.flatMap((name,index)=>{
      const value=invisible?name.split('').join(join):name;
      return [value,decorators[index%decorators.length](value)];
    }))).slice(0,12);
  },[seed,style,invisible,short,variant]);

  return <section className="gdn-dark rounded-[28px] p-5 md:p-7">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#b9acff]">Free Fire</p>
        <h2 className="mt-2 text-2xl font-black">{variant==='clan'?'Crea nombre y tag para tu clan':'Construye tu nickname'}</h2>
      </div>
      <span className="text-xs font-semibold text-[#aeb1bb]">Personaliza antes de copiar</span>
    </div>

    <input value={seed} onChange={e=>setSeed(e.target.value)} className="mt-6 h-14 w-full rounded-2xl border border-white/12 bg-white/[.06] px-4 text-white outline-none placeholder:text-[#858894] focus:border-[#8e78ff]" placeholder={variant==='clan'?'Nombre base del clan...':'Tu palabra o nickname base...'}/>

    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <div>
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[.12em] text-[#9599a5]">Estilo</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(frames).map(item=><button key={item} onClick={()=>setStyle(item as keyof typeof frames)} className={'rounded-xl border px-3 py-2 text-xs font-extrabold transition '+(style===item?'border-[#8e78ff] bg-[#6d4aff]/20 text-white':'border-white/10 bg-white/[.04] text-[#c8cad2] hover:border-[#7764d6]')}>{item}</button>)}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[.12em] text-[#9599a5]">Opciones</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setInvisible(v=>!v)} className={'rounded-xl border px-3 py-2 text-xs font-extrabold transition '+(invisible?'border-[#8e78ff] bg-[#6d4aff]/20 text-white':'border-white/10 bg-white/[.04] text-[#c8cad2]')}>Espacio invisible {invisible?'✓':''}</button>
          <button onClick={()=>setShort(v=>!v)} className={'rounded-xl border px-3 py-2 text-xs font-extrabold transition '+(short?'border-[#8e78ff] bg-[#6d4aff]/20 text-white':'border-white/10 bg-white/[.04] text-[#c8cad2]')}>Corto {short?'✓':''}</button>
        </div>
      </div>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {results.map(value=><div key={value} className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3">
        <span className="min-w-0 break-all font-bold">{value}</span>
        <CopyButton value={value}/>
      </div>)}
    </div>

    <p className="mt-5 text-xs leading-5 text-[#9fa2ad]">Los símbolos y espacios pueden comportarse de forma distinta según la versión del juego, el dispositivo o futuros cambios de la plataforma. Prueba la variante antes de guardarla.</p>
  </section>
}
