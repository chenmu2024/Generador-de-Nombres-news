'use client';

import {useEffect,useMemo,useState} from 'react';
import CopyButton from './CopyButton';

const styles=['Premium','Minimal','Juvenil','Artesanal'] as const;
const industries=['Ropa','Belleza','Comida','Hogar','Tecnología','General'] as const;
const channels=['Tienda online','Boutique','Bazar','Local físico','General'] as const;
const languages=['Español','Mixto','Internacional'] as const;

const spanish:Record<string,string[]> = {
  Premium:['Aura','Noble','Alma','Casa'],
  Minimal:['Nexo','Luma','Noma','Uno'],
  Juvenil:['Viva','Mimo','Hola','Chispa'],
  Artesanal:['Casa','Taller','Raíz','Origen'],
};

const international:Record<string,string[]> = {
  Premium:['Maison','Atelier','Noble','Aura'],
  Minimal:['Noma','Nexo','Luma','Mono'],
  Juvenil:['Viva','Milo','Hey','Pop'],
  Artesanal:['Craft','Atelier','Root','Origin'],
};

const sectorSpanish:Record<string,string[]> = {
  Ropa:['Moda','Vestir','Prenda','Estudio'],
  Belleza:['Belleza','Piel','Brillo','Estudio'],
  Comida:['Sabor','Mesa','Cocina','Mercado'],
  Hogar:['Hogar','Casa','Nido','Interior'],
  Tecnología:['Digital','Nexo','Código','Laboratorio'],
  General:['Tienda','Mercado','Casa','Estudio'],
};

const sectorInternational:Record<string,string[]> = {
  Ropa:['Studio','Wear','Closet','Mode'],
  Belleza:['Glow','Beauty','Skin','Lab'],
  Comida:['Bite','Table','Kitchen','Market'],
  Hogar:['Home','Living','Nest','Studio'],
  Tecnología:['Tech','Labs','Digital','Works'],
  General:['Store','Co.','Market','Studio'],
};

function handleFrom(name:string){
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'')
    .slice(0,24);
}

export default function BrandNameTool(){
  const[seed,setSeed]=useState('Luna');
  const[style,setStyle]=useState<(typeof styles)[number]>('Premium');
  const[industry,setIndustry]=useState<(typeof industries)[number]>('General');
  const[channel,setChannel]=useState<(typeof channels)[number]>('Tienda online');
  const[language,setLanguage]=useState<(typeof languages)[number]>('Español');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{
    try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}
  },[]);

  const results=useMemo(()=>{
    const base=seed.trim()||'Luna';
    const prefixes=language==='Internacional'?international[style]:spanish[style];
    const suffixes=language==='Español'?sectorSpanish[industry]:sectorInternational[industry];
    const mixedSuffixes=language==='Mixto'
      ? [sectorSpanish[industry][0],sectorInternational[industry][0],sectorSpanish[industry][1],sectorInternational[industry][1]]
      : suffixes;

    const channelWord=channel==='Boutique'?'Boutique':channel==='Bazar'?'Bazar':channel==='Local físico'?'Casa':channel==='Tienda online'?'Online':'';

    const names=[
      prefixes[0]+' '+base,
      base+' '+mixedSuffixes[0],
      prefixes[1]+base,
      base+' '+mixedSuffixes[1],
      prefixes[2]+' '+mixedSuffixes[2],
      channelWord?base+' '+channelWord:prefixes[3]+' '+base,
      prefixes[3]+' '+mixedSuffixes[3],
      base+' '+(language==='Español'?'Colectivo':'Collective'),
    ];

    return Array.from(new Set(names)).map(name=>({
      name,
      handle:handleFrom(name),
      chars:name.length,
      words:name.trim().split(/\s+/).length,
      channel,
      tone:style,
    }));
  },[seed,style,industry,channel,language]);

  function save(name:string){
    const current=JSON.parse(localStorage.getItem('gdn-favorites')||'[]') as string[];
    const next=Array.from(new Set([...current,name]));
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    setFavorites(next);
  }

  return <section className="gdn-card rounded-[28px] p-5 md:p-7">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="gdn-eyebrow">Branding tool</p>
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Crea nombres según sector, canal y tono</h2>
      </div>
      <span className="text-xs font-semibold text-[#858995]">Genera candidatos; no verifica marcas ni dominios</span>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <label className="lg:col-span-1"><span className="mb-2 block text-xs font-extrabold text-[#646974]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-12 rounded-xl px-3" placeholder="Luna, café, moda..."/></label>
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Sector</span><select value={industry} onChange={e=>setIndustry(e.target.value as (typeof industries)[number])} className="gdn-input h-12 rounded-xl px-3">{industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Canal</span><select value={channel} onChange={e=>setChannel(e.target.value as (typeof channels)[number])} className="gdn-input h-12 rounded-xl px-3">{channels.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Estilo</span><select value={style} onChange={e=>setStyle(e.target.value as (typeof styles)[number])} className="gdn-input h-12 rounded-xl px-3">{styles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Idioma</span><select value={language} onChange={e=>setLanguage(e.target.value as (typeof languages)[number])} className="gdn-input h-12 rounded-xl px-3">{languages.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {results.map(item=><article key={item.name} className="rounded-2xl border border-[#e4e5e9] bg-[#fbfbfc] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black">{item.name}</h3>
            <p className="mt-1 text-xs font-bold text-[#7b7f89]">{industry} · {item.tone} · {item.channel}</p>
          </div>
          <button onClick={()=>save(item.name)} aria-label="Guardar nombre" className="grid size-9 place-items-center rounded-xl border border-[#e0e1e6] bg-white">{favorites.includes(item.name)?'♥':'♡'}</button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-xl bg-white p-3"><span className="block text-[#9699a2]">Caracteres</span><strong className="mt-1 block text-[#343740]">{item.chars}</strong></div>
          <div className="rounded-xl bg-white p-3"><span className="block text-[#9699a2]">Palabras</span><strong className="mt-1 block text-[#343740]">{item.words}</strong></div>
          <div className="rounded-xl bg-white p-3"><span className="block text-[#9699a2]">Handle</span><strong className="mt-1 block truncate text-[#343740]">@{item.handle}</strong></div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton value={item.name}/>
          <CopyButton value={'@'+item.handle}/>
        </div>
      </article>)}
    </div>

    <div className="mt-5 rounded-2xl border border-[#e6e2f7] bg-[#f7f5ff] p-4 text-xs leading-6 text-[#6b667d]">
      El handle es solo una normalización local para ayudarte a imaginar el nombre en redes. No implica que esté disponible. Antes de usar un candidato comercialmente, comprueba marcas registradas, dominio y perfiles sociales.
    </div>
  </section>
}
