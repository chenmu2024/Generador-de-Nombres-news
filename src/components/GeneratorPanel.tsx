'use client';

import{useEffect,useMemo,useState}from'react';
import{Copy,Heart,RefreshCw,Sparkles}from'lucide-react';
import{generateFootballNames}from'@/lib/generator';
import{invisibleCharacters}from'@/data/invisibleCharacters';
import{trackProductAction}from'@/lib/analytics';
import{copyText}from'@/lib/clipboard';
import{readFavorites,toggleFavorite as toggleStoredFavorite}from'@/lib/favorites';

const footballStyles=['Serio','Barrio','Gracioso','Competitivo'];

function footballCode(value:string){
  const stop=new Set(['de','del','la','las','los','el','fc','cf','club']);
  const words=value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9 ]+/g,' ').trim().split(/\s+/).filter(Boolean);
  const meaningful=words.filter(word=>!stop.has(word.toLowerCase()));
  if(meaningful.length>=3)return meaningful.slice(0,3).map(word=>word[0]).join('').toUpperCase();
  if(meaningful.length===2)return(meaningful[0].slice(0,2)+meaningful[1][0]).toUpperCase();
  return(meaningful[0]||words[0]||'TEAM').slice(0,3).toUpperCase();
}

export default function GeneratorPanel({mode,defaultValue}:{mode:'football'|'invisible';defaultValue:string}){
  const[seed,setSeed]=useState(defaultValue);
  const[style,setStyle]=useState('Competitivo');
  const[copied,setCopied]=useState('');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{setFavorites(readFavorites())},[]);

  const results=useMemo(
    ()=>mode==='football'?generateFootballNames(seed,style):[],
    [seed,style,mode]
  );

  async function copy(value:string){
    const ok=await copyText(value);
    if(!ok)return;
    trackProductAction('copy-generated','generator-panel');
    setCopied(value);
    window.setTimeout(()=>setCopied(''),1200);
  }

  function toggleFavorite(value:string){
    const{items:next,removed}=toggleStoredFavorite(value,favorites);
    setFavorites(next);
    trackProductAction(removed?'favorite-remove':'favorite-add','generator-panel');
  }

  if(mode==='invisible'){
    const base=seed.trim()||'Nova';
    const separator=invisibleCharacters[0]?.value??'ㅤ';
    const quickCopies=[
      {label:'1 espacio',value:separator},
      {label:'2 espacios',value:separator.repeat(2)},
      {label:'3 espacios',value:separator.repeat(3)},
      {label:'Entre palabras',value:base+separator+'X'},
    ];

    return <section className="overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_24px_64px_rgba(27,24,55,.15)]">
      <div className="border-b border-white/8 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.13em] text-[var(--page-accent)]">Laboratorio Unicode</p>
            <h2 className="gdn-editorial mt-1 text-[26px] font-bold">Espacios y caracteres invisibles</h2>
            <p className="mt-2 max-w-2xl text-[10px] leading-5 text-[#8f94a8]">Prueba tu propio nickname, copia uno o varios espacios y compara alternativas Unicode. El juego puede filtrar o normalizar algunos caracteres.</p>
          </div>
          <label className="block w-full lg:max-w-[300px]">
            <span className="mb-2 block text-[9px] font-bold uppercase tracking-[.1em] text-[#8f94a8]">Nickname de prueba</span>
            <input value={seed} onChange={event=>setSeed(event.target.value)} className="h-11 w-full rounded-[10px] border border-white/12 bg-[#181c2a] px-3 text-[12px] text-white outline-none placeholder:text-[#666b7e] focus:border-[var(--page-accent)]" placeholder="Nova"/>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickCopies.map(item=><button key={item.label} onClick={()=>copy(item.value)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[.045] px-3.5 text-[10px] font-semibold text-[#d1d4df] transition hover:border-[var(--page-accent)] hover:bg-white/[.075]">
            <Copy size={11}/>{copied===item.value?'Copiado':item.label}
          </button>)}
        </div>
      </div>
      <div className="grid gap-px bg-white/8 md:grid-cols-2 xl:grid-cols-3">
        {invisibleCharacters.map(item=>{
          const example=base+item.value+'X';
          return <article key={item.code} className="bg-[#151927] p-5 transition hover:bg-[#1b2030]">
            <div className="flex items-start justify-between gap-3">
              <div><span className="block text-[13px] font-semibold">{item.label}</span><span className="mt-1 block text-[10px] font-semibold text-[#8f94a8]">{item.code}</span></div>
              <span className={'rounded-full px-2 py-1 text-[8px] font-black uppercase tracking-[.08em] '+(item.level==='Separador'?'bg-[#153b31] text-[#85dec0]':item.level==='Experimental'?'bg-[#493333] text-[#efb1b1]':'bg-[#302e4e] text-[#bbb5ff]')}>{item.level}</span>
            </div>
            <p className="mt-3 min-h-10 text-[9px] leading-4 text-[#8f94a8]">{item.note}</p>
            <div className="mt-3 rounded-[9px] border border-white/8 bg-black/10 px-3 py-2">
              <span className="text-[8px] uppercase tracking-[.1em] text-[#676c80]">Ejemplo</span>
              <p className="mt-1 text-[13px] font-semibold text-white">{example}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={()=>copy(item.value)} className="inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-white/10 px-3 text-[10px] text-[#d2d5df] hover:bg-white/[.05]"><Copy size={12}/>{copied===item.value?'Copiado':'Copiar carácter'}</button>
              <button onClick={()=>copy(example)} className="inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-white/10 px-3 text-[10px] text-[#d2d5df] hover:bg-white/[.05]"><Copy size={12}/>Copiar ejemplo</button>
            </div>
          </article>;
        })}
      </div>
    </section>
  }

  return <section className="overflow-hidden rounded-[22px] border border-[#23263a] bg-[#111421] text-white shadow-[0_24px_64px_rgba(27,24,55,.15)]">
    <div className="grid lg:grid-cols-[340px_1fr]">
      <div className="border-b border-white/8 p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="gdn-tech text-[10px] font-bold uppercase tracking-[.13em] text-[var(--page-accent)]">Generador de equipos</p>
        <h2 className="gdn-editorial mt-2 text-[28px] font-bold leading-tight">Construye nombre y TAG juntos.</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#9da2b5]">Prueba una base, cambia el tono y revisa cómo funcionaría como abreviatura en camiseta, marcador o escudo.</p>

        <label className="mt-6 block">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Palabra base</span>
          <input value={seed} onChange={event=>setSeed(event.target.value)} className="h-12 w-full rounded-[11px] border border-white/12 bg-[#181c2a] px-4 text-[13px] text-white outline-none placeholder:text-[#6f7488] focus:border-[#776cff]" placeholder="Barrio"/>
        </label>

        <div className="mt-5">
          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.12em] text-[#9fa4b8]">Tono</span>
          <div className="flex flex-wrap gap-2">
            {footballStyles.map(item=><button key={item} onClick={()=>{setStyle(item);trackProductAction('style-change','generator-panel')}} className={'min-h-11 rounded-[9px] border px-3 text-[11px] font-semibold transition sm:min-h-0 sm:py-2 sm:text-[10px] '+(style===item?'border-[var(--page-accent)] bg-[var(--page-accent)] text-white':'border-white/18 bg-white/[.07] text-[#e0e2ea] hover:border-[var(--page-accent)] hover:bg-white/[.12]')}>{item}</button>)}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-[10px] text-[#858a9d]"><RefreshCw size={12}/> Se actualiza mientras escribes</div>
      </div>

      <div className="min-w-0 bg-[#151927]">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold"><Sparkles size={13} className="text-[var(--page-accent)]"/> Resultados</div>
          <span className="rounded-full bg-white/6 px-2.5 py-1 text-[9px] font-semibold text-[#898ea0]">{results.length} opciones</span>
        </div>
        <div className="grid gap-px bg-white/8 sm:grid-cols-2">
          {results.map(value=>{
            const saved=favorites.includes(value);
            const teamCode=footballCode(value);
            return <div key={value} className="group flex min-h-[72px] items-center justify-between gap-3 bg-[#151927] px-4 py-2.5 transition hover:bg-[#1b2030] sm:px-5">
              <div className="min-w-0">
                <span className="block break-all text-[13px] font-semibold">{value}</span>
                <button
                  onClick={()=>copy(teamCode)}
                  aria-label={copied===teamCode?'TAG copiado':'Copiar TAG '+teamCode}
                  className="gdn-tech mt-1 inline-flex min-h-7 items-center gap-1 rounded-full border border-white/10 bg-white/[.05] px-2 text-[9px] font-bold tracking-[.12em] text-[#8fa8cf] transition hover:border-[var(--page-accent)] hover:text-white"
                ><Copy size={9}/>{copied===teamCode?'COPIADO':'TAG '+teamCode}</button>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 place-items-center rounded-[9px] border transition sm:size-8 '+(saved?'border-[var(--page-accent)] bg-white/[.08] text-[var(--page-accent)]':'border-white/10 text-[#9297a9] hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]')}><Heart size={13} fill={saved?'currentColor':'none'}/></button>
                <button onClick={()=>copy(value)} aria-label={copied===value?'Copiado':'Copiar '+value} className="grid size-11 place-items-center rounded-[9px] border border-white/10 text-[#9297a9] transition hover:border-[var(--page-accent)] hover:text-[var(--page-accent)] sm:size-8"><Copy size={13}/></button>
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>
  </section>
}
