'use client';

import {useEffect,useMemo,useState} from 'react';
import {Heart,Store} from 'lucide-react';
import CopyButton from './CopyButton';

const styles=['Premium','Minimal','Juvenil','Artesanal'] as const;
const industries=['Ropa','Belleza','Comida','Hogar','Tecnología','General'] as const;
const channels=['Tienda online','Boutique','Bazar','Local físico','General'] as const;
const languages=['Español','Mixto','Internacional'] as const;

const spanish:Record<string,string[]>={Premium:['Aura','Noble','Alma','Casa'],Minimal:['Nexo','Luma','Noma','Uno'],Juvenil:['Viva','Mimo','Hola','Chispa'],Artesanal:['Casa','Taller','Raíz','Origen']};
const international:Record<string,string[]>={Premium:['Maison','Atelier','Noble','Aura'],Minimal:['Noma','Nexo','Luma','Mono'],Juvenil:['Viva','Milo','Hey','Pop'],Artesanal:['Craft','Atelier','Root','Origin']};
const sectorSpanish:Record<string,string[]>={Ropa:['Moda','Vestir','Prenda','Estudio'],Belleza:['Belleza','Piel','Brillo','Estudio'],Comida:['Sabor','Mesa','Cocina','Mercado'],Hogar:['Hogar','Casa','Nido','Interior'],Tecnología:['Digital','Nexo','Código','Laboratorio'],General:['Tienda','Mercado','Casa','Estudio']};
const sectorInternational:Record<string,string[]>={Ropa:['Studio','Wear','Closet','Mode'],Belleza:['Glow','Beauty','Skin','Lab'],Comida:['Bite','Table','Kitchen','Market'],Hogar:['Home','Living','Nest','Studio'],Tecnología:['Tech','Labs','Digital','Works'],General:['Store','Co.','Market','Studio']};

function handleFrom(name:string){
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24);
}

export default function BrandNameTool(){
  const[seed,setSeed]=useState('Luna');
  const[style,setStyle]=useState<(typeof styles)[number]>('Premium');
  const[industry,setIndustry]=useState<(typeof industries)[number]>('General');
  const[channel,setChannel]=useState<(typeof channels)[number]>('Tienda online');
  const[language,setLanguage]=useState<(typeof languages)[number]>('Español');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);

  const results=useMemo(()=>{
    const base=seed.trim()||'Luna';
    const prefixes=language==='Internacional'?international[style]:spanish[style];
    const suffixes=language==='Español'?sectorSpanish[industry]:sectorInternational[industry];
    const mixed=language==='Mixto'?[sectorSpanish[industry][0],sectorInternational[industry][0],sectorSpanish[industry][1],sectorInternational[industry][1]]:suffixes;
    const channelWord=channel==='Boutique'?'Boutique':channel==='Bazar'?'Bazar':channel==='Local físico'?'Casa':channel==='Tienda online'?'Online':'';

    const names=[
      prefixes[0]+' '+base,
      base+' '+mixed[0],
      prefixes[1]+base,
      base+' '+mixed[1],
      prefixes[2]+' '+mixed[2],
      channelWord?base+' '+channelWord:prefixes[3]+' '+base,
      prefixes[3]+' '+mixed[3],
      base+' '+(language==='Español'?'Colectivo':'Collective'),
    ];

    return Array.from(new Set(names)).map(name=>({name,handle:handleFrom(name),chars:name.length,words:name.trim().split(/\s+/).length}));
  },[seed,style,industry,channel,language]);

  function save(name:string){
    const current=JSON.parse(localStorage.getItem('gdn-favorites')||'[]') as string[];
    const next=Array.from(new Set([...current,name]));
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    setFavorites(next);
  }

  return <section className="overflow-hidden rounded-[14px] border border-[#dfe1e6] bg-white shadow-[0_1px_2px_rgba(20,22,26,.03)]">
    <div className="flex items-center gap-2.5 border-b border-[#eceef1] px-5 py-4">
      <span className="grid size-8 place-items-center rounded-[9px] bg-[#eeecff] text-[#5146c8]"><Store size={15}/></span>
      <div>
        <p className="text-[11px] font-semibold text-[#5b4df5]">Branding tool</p>
        <h2 className="text-[16px] font-semibold tracking-[-.015em]">Crea nombres según sector, canal y tono</h2>
      </div>
    </div>

    <div className="grid gap-3 border-b border-[#eceef1] bg-[#fafafa] p-4 sm:grid-cols-2 lg:grid-cols-5">
      <label><span className="mb-1.5 block text-[10px] font-medium text-[#7c8089]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-10 rounded-[9px] px-3 text-[12px]" placeholder="Luna, café, moda..."/></label>
      <label><span className="mb-1.5 block text-[10px] font-medium text-[#7c8089]">Sector</span><select value={industry} onChange={e=>setIndustry(e.target.value as (typeof industries)[number])} className="gdn-input h-10 rounded-[9px] px-3 text-[12px]">{industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-medium text-[#7c8089]">Canal</span><select value={channel} onChange={e=>setChannel(e.target.value as (typeof channels)[number])} className="gdn-input h-10 rounded-[9px] px-3 text-[12px]">{channels.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-medium text-[#7c8089]">Estilo</span><select value={style} onChange={e=>setStyle(e.target.value as (typeof styles)[number])} className="gdn-input h-10 rounded-[9px] px-3 text-[12px]">{styles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-medium text-[#7c8089]">Idioma</span><select value={language} onChange={e=>setLanguage(e.target.value as (typeof languages)[number])} className="gdn-input h-10 rounded-[9px] px-3 text-[12px]">{languages.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>

    <div className="divide-y divide-[#eceef1]">
      {results.map(item=>{
        const saved=favorites.includes(item.name);
        return <article key={item.name} className="flex flex-col gap-3 px-4 py-4 hover:bg-[#fcfcfd] sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[14px] font-semibold text-[#2c2e34]">{item.name}</h3>
              <span className="rounded-full bg-[#f2f2f5] px-2 py-0.5 text-[10px] font-medium text-[#737781]">{industry}</span>
            </div>
            <p className="mt-1 text-[11px] text-[#8a8e97]">{item.chars} caracteres · {item.words} palabras · @{item.handle}</p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <CopyButton value={item.name}/>
            <CopyButton value={'@'+item.handle}/>
            <button onClick={()=>save(item.name)} aria-label="Guardar nombre" className={'grid size-8 place-items-center rounded-[8px] border transition '+(saved?'border-[#d8d3ff] bg-[#eeecff] text-[#5549d7]':'border-[#e1e3e7] bg-white text-[#8b8f98] hover:bg-[#f5f5f7]')}>
              <Heart size={14} fill={saved?'currentColor':'none'}/>
            </button>
          </div>
        </article>
      })}
    </div>

    <p className="border-t border-[#eceef1] px-4 py-3 text-[10px] leading-4 text-[#92969f]">Los handles son simulaciones locales. Comprueba por separado marcas, dominio y perfiles sociales antes de usar un nombre comercial.</p>
  </section>
}
