'use client';

import {useEffect,useMemo,useState} from 'react';
import {Heart,Store} from 'lucide-react';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';

const styles=['Premium','Minimal','Juvenil','Artesanal'] as const;
const industries=['Ropa','Belleza','Comida','Hogar','Tecnología','General'] as const;
const channels=['Tienda online','Boutique','Bazar','Local físico','General'] as const;
const languages=['Español','Mixto','Internacional'] as const;

const spanish:Record<string,string[]>={Premium:['Aura','Noble','Alma','Casa'],Minimal:['Nexo','Luma','Noma','Uno'],Juvenil:['Viva','Mimo','Hola','Chispa'],Artesanal:['Casa','Taller','Raíz','Origen']};
const international:Record<string,string[]>={Premium:['Maison','Atelier','Noble','Aura'],Minimal:['Noma','Nexo','Luma','Mono'],Juvenil:['Viva','Milo','Hey','Pop'],Artesanal:['Craft','Atelier','Root','Origin']};
const sectorSpanish:Record<string,string[]>={Ropa:['Moda','Vestir','Prenda','Estudio'],Belleza:['Belleza','Piel','Brillo','Estudio'],Comida:['Sabor','Mesa','Cocina','Mercado'],Hogar:['Hogar','Casa','Nido','Interior'],Tecnología:['Digital','Nexo','Código','Laboratorio'],General:['Tienda','Mercado','Casa','Estudio']};
const sectorInternational:Record<string,string[]>={Ropa:['Studio','Wear','Closet','Mode'],Belleza:['Glow','Beauty','Skin','Lab'],Comida:['Bite','Table','Kitchen','Market'],Hogar:['Home','Living','Nest','Studio'],Tecnología:['Tech','Labs','Digital','Works'],General:['Store','Co.','Market','Studio']};

function handleFrom(name:string){return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24)}

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
    const names=[prefixes[0]+' '+base,base+' '+mixed[0],prefixes[1]+base,base+' '+mixed[1],prefixes[2]+' '+mixed[2],channelWord?base+' '+channelWord:prefixes[3]+' '+base,prefixes[3]+' '+mixed[3],base+' '+(language==='Español'?'Colectivo':'Collective')];
    return Array.from(new Set(names)).map(name=>({name,handle:handleFrom(name),chars:name.length,words:name.trim().split(/\s+/).length}));
  },[seed,style,industry,channel,language]);

  function save(name:string){const current=JSON.parse(localStorage.getItem('gdn-favorites')||'[]') as string[];const next=Array.from(new Set([...current,name]));localStorage.setItem('gdn-favorites',JSON.stringify(next));setFavorites(next);window.dispatchEvent(new Event('gdn:favorites-updated'));trackProductAction('favorite-add','brand-tool')}

  return <section className="overflow-hidden rounded-[22px] border border-[#e2dfec] bg-white shadow-[0_14px_38px_rgba(55,49,91,.06)]">
    <div className="flex items-center gap-3 border-b border-[#eceaf3] bg-[#faf9ff] px-6 py-5">
      <span className="grid size-10 place-items-center rounded-[12px] bg-[#5b4df5] text-white"><Store size={16}/></span>
      <div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8177e9]">Branding tool</p><h2 className="brand-serif text-[27px] font-bold text-[#292a39]">Crea nombres según sector, canal y tono</h2></div>
    </div>

    <div className="grid gap-3 border-b border-[#eceaf3] bg-[#f7f5ff] p-5 sm:grid-cols-2 lg:grid-cols-5">
      <label><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#87899a]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]" placeholder="Luna, café, moda..."/></label>
      <label><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#87899a]">Sector</span><select value={industry} onChange={e=>setIndustry(e.target.value as (typeof industries)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#87899a]">Canal</span><select value={channel} onChange={e=>setChannel(e.target.value as (typeof channels)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{channels.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#87899a]">Estilo</span><select value={style} onChange={e=>setStyle(e.target.value as (typeof styles)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{styles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[.12em] text-[#87899a]">Idioma</span><select value={language} onChange={e=>setLanguage(e.target.value as (typeof languages)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{languages.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>

    <div className="grid gap-px bg-[#eceaf3] md:grid-cols-2">
      {results.map(item=>{
        const saved=favorites.includes(item.name);
        return <article key={item.name} className="min-h-[148px] bg-white p-5 transition hover:bg-[#fcfbff]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0"><h3 className="brand-serif truncate text-[24px] font-bold text-[#2b2c3a]">{item.name}</h3><p className="mt-1 text-[10px] font-semibold text-[#9395a4]">{industry} · {style} · {channel}</p></div>
            <button onClick={()=>save(item.name)} aria-label="Guardar nombre" className={'grid size-9 place-items-center rounded-full border '+(saved?'border-[#cfc8fb] bg-[#f0edff] text-[#5b4df5]':'border-[#e0ddea] bg-white text-[#8c8e9d]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
          </div>
          <p className="mt-4 text-[10px] text-[#87899a]">{item.chars} caracteres · {item.words} palabras · @{item.handle}</p>
          <div className="mt-4 flex flex-wrap gap-2"><CopyButton value={item.name} analyticsRole="copy-brand-name"/><CopyButton value={'@'+item.handle} analyticsRole="copy-brand-handle"/></div>
        </article>
      })}
    </div>
    <p className="border-t border-[#eceaf3] bg-[#faf9ff] px-5 py-4 text-[9px] leading-4 text-[#9092a1]">Los handles son simulaciones locales. Comprueba marcas, dominio y perfiles sociales antes de usar un nombre comercial.</p>
  </section>
}
