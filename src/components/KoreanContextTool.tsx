'use client';

import{useEffect,useMemo,useState}from'react';
import{BookOpenCheck,Clapperboard,ExternalLink,Music2,Sparkles}from'lucide-react';
import type{NameRecord}from'@/data/nameDataset';
import CopyButton from'./CopyButton';
import{trackProductAction}from'@/lib/analytics';

type KoreanContext='name'|'kpop'|'dorama'|'aesthetic';

function hangulFrom(script?:string){
  return script?.split('/')[0]?.trim()||'';
}
function genderLabel(gender?:NameRecord['gender']){
  return gender==='F'?'Femenino':gender==='M'?'Masculino':gender==='U'?'Unisex':'Sin clasificar';
}

export default function KoreanContextTool({items}:{items:NameRecord[]}){
  const verified=useMemo(()=>items.filter(item=>item.verified===true&&Boolean(item.sourceUrl)&&Boolean(item.script)),[items]);
  const[context,setContext]=useState<KoreanContext>('name');
  const[selectedName,setSelectedName]=useState(verified[0]?.name??'');

  useEffect(()=>{
    const requested=new URLSearchParams(window.location.search).get('context');
    if(requested==='name'||requested==='kpop'||requested==='dorama'||requested==='aesthetic')setContext(requested);
  },[]);

  const selected=verified.find(item=>item.name===selectedName)??verified[0];
  const hangul=hangulFrom(selected?.script);

  const displays=useMemo(()=>{
    if(!selected)return[];
    const name=selected.name;
    if(context==='kpop')return[
      name.toUpperCase(),
      hangul||name,
      hangul?name+' · '+hangul:name,
      '✦ '+name+' ✦',
    ];
    if(context==='dorama')return[
      hangul?name+' ('+hangul+')':name,
      hangul?hangul+' — '+name:name,
      hangul?name+' | '+hangul:name,
      name,
    ];
    if(context==='aesthetic')return[
      '♡ '+name+' ♡',
      '✦ '+name+' ✦',
      name+' ୨ৎ',
      '☾ '+name+' ☽',
    ];
    return[
      name,
      hangul||name,
      hangul?name+' · '+hangul:name,
    ];
  },[selected,hangul,context]);

  if(!selected)return null;

  const contextOptions:{id:KoreanContext;label:string;icon:typeof Music2}[]=[
    {id:'name',label:'Nombre',icon:BookOpenCheck},
    {id:'kpop',label:'K-pop',icon:Music2},
    {id:'dorama',label:'Dorama',icon:Clapperboard},
    {id:'aesthetic',label:'Aesthetic',icon:Sparkles},
  ];

  return <section id="contexto-coreano" className="mt-8 scroll-mt-20 overflow-hidden rounded-[22px] border border-[#dddff0] bg-white shadow-[0_15px_42px_rgba(48,54,100,.07)]">
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b border-[#e4e5f0] bg-[#f7f8fd] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#5d63b4]">Contexto de presentación</p>
        <h2 className="gdn-editorial mt-1.5 text-[25px] font-bold text-[#2e3043]">Prueba un nombre coreano en distintos formatos</h2>
        <p className="mt-2 text-[10px] leading-5 text-[#777b90]">Los nombres y su escritura proceden de las fichas verificadas de esta página. K-pop, Dorama y Aesthetic cambian solo la presentación; no indican popularidad ni que el nombre pertenezca a un artista o personaje real.</p>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[.1em] text-[#9295a6]">Nombre base verificado</span>
          <select value={selected.name} onChange={event=>setSelectedName(event.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">
            {verified.map(item=><option key={item.name} value={item.name}>{item.name} · {hangulFrom(item.script)}</option>)}
          </select>
        </label>

        <div className="mt-4">
          <span className="mb-2 block text-[9px] font-black uppercase tracking-[.1em] text-[#9295a6]">Modo</span>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {contextOptions.map(option=>{
              const Icon=option.icon;
              return <button key={option.id} type="button" onClick={()=>{setContext(option.id);trackProductAction('korean-context-'+option.id,'korean-context-tool')}} aria-pressed={context===option.id} className={'inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[9px] font-bold transition '+(context===option.id?'border-[#6269c4] bg-[#6269c4] text-white':'border-[#dde0ec] bg-white text-[#73778c] hover:border-[#bfc3e4]')}><Icon size={11}/>{option.label}</button>;
            })}
          </div>
        </div>

        <dl className="mt-5 divide-y divide-[#e5e6ef] rounded-[13px] border border-[#e2e3ed] bg-white px-3">
          <div className="flex items-start justify-between gap-3 py-2.5"><dt className="text-[9px] font-bold uppercase tracking-[.08em] text-[#a0a2b0]">Hangul</dt><dd className="text-right text-[13px] font-semibold text-[#3d4055]">{hangul||'No documentado'}</dd></div>
          <div className="flex items-start justify-between gap-3 py-2.5"><dt className="text-[9px] font-bold uppercase tracking-[.08em] text-[#a0a2b0]">Uso</dt><dd className="text-right text-[10px] font-semibold text-[#55586d]">{genderLabel(selected.gender)}</dd></div>
          {selected.pronunciation&&<div className="flex items-start justify-between gap-3 py-2.5"><dt className="text-[9px] font-bold uppercase tracking-[.08em] text-[#a0a2b0]">Pronunciación</dt><dd className="text-right text-[10px] font-semibold text-[#55586d]">{selected.pronunciation}</dd></div>}
        </dl>

        {selected.sourceUrl&&<a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-bold text-[#5d63b4] hover:underline">Ver fuente del nombre<ExternalLink size={10}/></a>}
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-1 border-b border-[#ececf3] pb-4">
          <p className="gdn-tech text-[9px] font-black uppercase tracking-[.11em] text-[#9395a5]">{contextOptions.find(option=>option.id===context)?.label}</p>
          <h3 className="gdn-editorial text-[30px] font-bold text-[#2c2f42]">{selected.name}</h3>
          {hangul&&<p className="text-[22px] font-semibold text-[#646987]">{hangul}</p>}
          {selected.meaning&&<p className="mt-2 max-w-[620px] text-[10px] leading-5 text-[#7c8093]"><strong className="text-[#565a70]">Significado documentado:</strong> {selected.meaning}</p>}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {displays.map((value,index)=><article key={value+'|'+index} className="flex min-h-[86px] items-center justify-between gap-3 rounded-[13px] border border-[#e5e5ef] bg-[#fbfbfe] p-4">
            <div className="min-w-0">
              <p className="gdn-tech text-[8px] font-black uppercase tracking-[.1em] text-[#aaa9b7]">Formato {index+1}</p>
              <p className="mt-1.5 break-words text-[16px] font-semibold text-[#35384c]">{value}</p>
            </div>
            <CopyButton value={value} analyticsRole="copy-korean-context"/>
          </article>)}
        </div>

        <div className="mt-4 rounded-[12px] border border-[#e0e2ef] bg-[#f7f8fd] px-4 py-3 text-[9px] leading-4 text-[#7e8193]">
          Modo de presentación, no clasificación cultural ni medición de popularidad. Para significado, escritura y pronunciación usa siempre la ficha y su fuente.
        </div>
      </div>
    </div>
  </section>
}
