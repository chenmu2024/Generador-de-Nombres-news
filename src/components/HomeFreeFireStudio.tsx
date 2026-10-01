'use client';

import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {Check,Copy,Gamepad2,Heart,Sparkles} from 'lucide-react';

const styles=['Insano','Dark','Pro','Aesthetic','Minimal','Cortos','Clanes'] as const;
type Style=(typeof styles)[number];

const frameSets:Record<Style,Array<(s:string)=>string>>={
  Insano:[s=>'꧁༺'+s+'༻꧂',s=>'×͜× '+s,s=>'亗'+s+'亗'],
  Dark:[s=>'☠︎'+s+'☠︎',s=>'𓆩'+s+'𓆪',s=>'『'+s+'』'],
  Pro:[s=>'乂'+s+'乂',s=>'『'+s+'』',s=>'メ'+s+'メ'],
  Aesthetic:[s=>'✦ '+s+' ✦',s=>'♡ '+s+' ♡',s=>'୨'+s+'୧'],
  Minimal:[s=>s,s=>s.toUpperCase(),s=>s+'X'],
  Cortos:[s=>s.slice(0,6),s=>s.slice(0,4).toUpperCase(),s=>'X'+s.slice(0,5)],
  Clanes:[s=>'VTXㅤ'+s,s=>'NOVAㅤ'+s,s=>'RAVNㅤ'+s],
};

export default function HomeFreeFireStudio(){
  const[seed,setSeed]=useState('Nova');
  const[style,setStyle]=useState<Style>('Insano');
  const[symbols,setSymbols]=useState(true);
  const[invisible,setInvisible]=useState(true);
  const[shortOnly,setShortOnly]=useState(false);
  const[copied,setCopied]=useState('');
  const[batch,setBatch]=useState(0);
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{
    try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}
  },[]);

  const results=useMemo(()=>{
    const raw=(seed.trim()||'Nova').replace(/\s+/g,'');
    const shouldShort=shortOnly||style==='Cortos';
    const base=shouldShort?raw.slice(0,6):raw;
    const gap=invisible?'ㅤ':'';
    const suffixPools=[
      ['99','X','7','God','Pro','YT','Z','Max'],
      ['47','FX','8','King','GG','TV','K','One'],
      ['21','RX','9','Boss','Elite','Live','Q','Prime'],
    ];
    const suffixes=suffixPools[batch%suffixPools.length];
    const roots=style==='Clanes'
      ?[base,base+' Squad',base+' Crew',base+' Team',base+' Elite',base+' Pro',base+' X',base+' 7']
      :[base,...suffixes.map(s=>base+s)];
    const frames=symbols?frameSets[style]:[(s:string)=>s];
    const normalized=roots.flatMap((item,index)=>{
      const visible=invisible&&!item.includes('ㅤ')?item.split('').join(gap):item;
      return [visible,frames[index%frames.length](visible)];
    });
    return Array.from(new Set(normalized)).slice(0,10);
  },[seed,style,symbols,invisible,shortOnly,batch]);

  async function copy(value:string){
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(()=>setCopied(''),1000);
  }

  function toggleFavorite(value:string){
    const next=favorites.includes(value)?favorites.filter(item=>item!==value):[...favorites,value];
    setFavorites(next);
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
  }

  return <section className="gdn-studio overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_26px_65px_rgba(27,24,55,.18)]">
    <div className="grid lg:grid-cols-[1.05fr_1.12fr_.67fr]">
      <div className="border-b border-white/8 p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[12px] bg-[#5b4df5] text-white shadow-[0_8px_22px_rgba(91,77,245,.32)]"><Gamepad2 size={19}/></span>
          <div>
            <h2 className="brand-serif text-[23px] font-bold tracking-[-.02em]">Generador de nombres para Free Fire</h2>
            <p className="mt-0.5 text-[12px] text-[#a8adc0]">Crea nicknames únicos, con símbolos y estilos profesionales.</p>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-[11px] font-semibold text-[#d1d4df]">Palabra base</span>
          <input value={seed} onChange={e=>setSeed(e.target.value)} className="h-11 w-full rounded-[9px] border border-white/13 bg-[#181c2a] px-3 text-[13px] outline-none focus:border-[#6d61ff]" placeholder="Nova"/>
        </label>

        <div className="mt-4">
          <span className="mb-2 block text-[11px] font-semibold text-[#d1d4df]">Estilo</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-3">
            {styles.map(item=><button key={item} onClick={()=>setStyle(item)} aria-pressed={style===item} className={'h-11 rounded-[8px] border text-[12px] font-medium transition sm:h-9 sm:text-[11px] '+(style===item?'border-[#7469ff] bg-[#5b4df5] text-white':'border-white/16 bg-[#1a1f2e] text-[#d8dbe5] hover:border-[#665ce0] hover:bg-[#22283a]')}>{item}</button>)}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <button onClick={()=>setSymbols(v=>!v)} aria-pressed={symbols} className="flex w-full items-center justify-between text-[12px] text-[#d7d9e2]">
            <span>Usar símbolos</span><span className={'relative h-6 w-10 rounded-full transition '+(symbols?'bg-[#5b4df5]':'bg-[#303546]')}><span className={'absolute top-1 size-4 rounded-full bg-white transition '+(symbols?'left-5':'left-1')}/></span>
          </button>
          <button onClick={()=>setInvisible(v=>!v)} aria-pressed={invisible} className="flex w-full items-center justify-between text-[12px] text-[#d7d9e2]">
            <span>Incluir espacios invisibles</span><span className={'relative h-6 w-10 rounded-full transition '+(invisible?'bg-[#5b4df5]':'bg-[#303546]')}><span className={'absolute top-1 size-4 rounded-full bg-white transition '+(invisible?'left-5':'left-1')}/></span>
          </button>
          <button onClick={()=>setShortOnly(v=>!v)} aria-pressed={shortOnly} className="flex w-full items-center justify-between text-[12px] text-[#d7d9e2]">
            <span>Solo nombres cortos</span><span className={'relative h-6 w-10 rounded-full transition '+(shortOnly?'bg-[#5b4df5]':'bg-[#303546]')}><span className={'absolute top-1 size-4 rounded-full bg-white transition '+(shortOnly?'left-5':'left-1')}/></span>
          </button>
        </div>

        <button onClick={()=>setBatch(value=>value+1)} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#5b4df5] text-[13px] font-semibold shadow-[0_10px_30px_rgba(91,77,245,.3)] transition hover:bg-[#4f43db]">
          <Sparkles size={15}/> Generar otra tanda
        </button>
      </div>

      <div className="border-b border-white/8 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-4">
          <div><p className="text-[13px] font-semibold">Resultados</p><p className="mt-0.5 text-[10px] text-[#7f8498]">Nombres listos para copiar y guardar.</p></div>
          <span className="rounded-[8px] border border-white/10 bg-white/[.04] px-3 py-2 text-[10px] text-[#aeb2c1]">{style}</span>
        </div>
        <div className="divide-y divide-white/7">
          {results.map((value,index)=>{
            const saved=favorites.includes(value);
            return <div key={value} className="grid grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-2 px-4 py-2.5 hover:bg-white/[.025]">
              <span className="grid size-6 place-items-center rounded-full bg-white/[.045] text-[10px] text-[#8c91a4]">{index+1}</span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium">{value}</p>
                <div className="mt-1 flex gap-1"><span className="rounded-full bg-[#3e2f71] px-2 py-0.5 text-[10px] text-[#cfc8ff] sm:text-[9px]">{style}</span><span className="rounded-full bg-[#123d3d] px-2 py-0.5 text-[10px] text-[#7fe0cc] sm:text-[9px]">{index%2?'Popular':'Único'}</span></div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} className={'grid size-10 place-items-center rounded-[9px] border transition sm:size-7 sm:rounded-[7px] '+(saved?'border-[#8e84ff] bg-[#5b4df5]/20 text-[#c7c2ff]':'border-white/10 text-[#aeb2c1] hover:bg-white/[.05]')} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'}><Heart size={12} fill={saved?'currentColor':'none'}/></button>
                <button onClick={()=>copy(value)} className="inline-flex h-10 items-center gap-1.5 rounded-[9px] border border-white/10 px-3 text-[11px] text-[#d3d6df] hover:bg-white/[.05] sm:h-7 sm:rounded-[7px] sm:px-2 sm:text-[10px]">
                  {copied===value?<Check size={11}/>:<Copy size={11}/>} {copied===value?'Copiado':'Copiar'}
                </button>
              </div>
            </div>;
          })}
        </div>
      </div>

      <div className="relative min-h-[360px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1700087322375-8bdb366b6c60?auto=format&fit=crop&w=900&q=82" alt="Mujer gamer con auriculares" width="900" height="1200" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center"/>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,22,.08),rgba(10,12,22,.86))]"/>
        <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-5">
          <p className="text-[10px] font-black tracking-[.42em] text-white/90">FREE FIRE</p>
          <div>
            <h3 className="brand-serif max-w-[190px] text-[31px] font-bold leading-[1.02]">Nombres únicos para tu estilo</h3>
            <div className="mt-4 space-y-2 text-[11px] text-white/90">{['Con símbolos','Para clanes','Cortos y limpios','100% gratis'].map(item=><p key={item} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-white/14"><Check size={11}/></span>{item}</p>)}</div>
            <Link href="/nombres-free-fire" className="mt-5 inline-flex items-center gap-2 rounded-[9px] bg-[#5b4df5] px-4 py-3 text-[11px] font-semibold text-white">Explorar más →</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
}
