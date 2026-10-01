'use client';

import {useMemo,useState} from 'react';
import CopyButton from './CopyButton';

const styles=['Premium','Minimal','Juvenil','Artesanal'] as const;
const industries=['Ropa','Belleza','Comida','Hogar','Tecnología','General'] as const;

const prefixes:Record<string,string[]>={
  Premium:['Maison','Aura','Noble','Atelier'],
  Minimal:['Noma','Nexo','Luma','Mono'],
  Juvenil:['Viva','Milo','Hey','Pop'],
  Artesanal:['Casa','Taller','Raíz','Origen'],
};
const suffixes:Record<string,string[]>={
  Ropa:['Studio','Wear','Closet','Moda'],
  Belleza:['Glow','Beauty','Skin','Lab'],
  Comida:['Casa','Bite','Sabor','Market'],
  Hogar:['Home','Living','Casa','Nest'],
  Tecnología:['Tech','Labs','Digital','Works'],
  General:['Store','Co.','Market','Shop'],
};

export default function BrandNameTool(){
  const[seed,setSeed]=useState('Luna');
  const[style,setStyle]=useState<(typeof styles)[number]>('Premium');
  const[industry,setIndustry]=useState<(typeof industries)[number]>('General');
  const[favorites,setFavorites]=useState<string[]>([]);

  const results=useMemo(()=>{
    const base=seed.trim()||'Luna';
    const a=prefixes[style];
    const b=suffixes[industry];
    return [
      {name:a[0]+' '+base,slogan:'Una identidad clara para '+industry.toLowerCase()+'.'},
      {name:base+' '+b[0],slogan:'Simple, recordable y lista para crecer.'},
      {name:a[1]+base,slogan:'Una marca con tono '+style.toLowerCase()+'.'},
      {name:base+' '+b[1],slogan:'Hecha para destacar sin complicarse.'},
      {name:a[2]+' '+b[2],slogan:'Nombre corto con sensación de marca.'},
      {name:a[3]+' '+base,slogan:'Una opción flexible para redes y tienda.'},
    ];
  },[seed,style,industry]);

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
        <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Crea nombres con intención de marca</h2>
      </div>
      <span className="text-xs font-semibold text-[#858995]">No comprueba dominios ni marcas registradas</span>
    </div>

    <div className="mt-6 grid gap-3 md:grid-cols-3">
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-12 rounded-xl px-3" placeholder="Luna, café, moda..."/></label>
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Sector</span><select value={industry} onChange={e=>setIndustry(e.target.value as (typeof industries)[number])} className="gdn-input h-12 rounded-xl px-3">{industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-extrabold text-[#646974]">Estilo</span><select value={style} onChange={e=>setStyle(e.target.value as (typeof styles)[number])} className="gdn-input h-12 rounded-xl px-3">{styles.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {results.map(item=><article key={item.name} className="rounded-2xl border border-[#e4e5e9] bg-[#fbfbfc] p-5">
        <div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-black">{item.name}</h3><p className="mt-1 text-xs font-bold text-[#7b7f89]">{industry} · {style}</p></div><button onClick={()=>save(item.name)} className="grid size-9 place-items-center rounded-xl border border-[#e0e1e6] bg-white">{favorites.includes(item.name)?'♥':'♡'}</button></div>
        <p className="mt-4 text-sm leading-6 text-[#6f737d]">{item.slogan}</p>
        <div className="mt-4"><CopyButton value={item.name}/></div>
      </article>)}
    </div>
  </section>
}
