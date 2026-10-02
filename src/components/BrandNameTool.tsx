'use client';

import {useEffect,useMemo,useState} from 'react';
import {ClipboardCopy,Heart,RefreshCw,Store} from 'lucide-react';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';

const styles=['Premium','Minimal','Juvenil','Artesanal','Elegante','Natural'] as const;
const industries=['Ropa','Belleza','Comida','Hogar','Tecnología','Accesorios','Mascotas','Papelería','Café','General'] as const;
const channels=['Tienda online','Boutique','Bazar','Local físico','General'] as const;
const languages=['Español','Mixto','Internacional'] as const;

const spanish:Record<(typeof styles)[number],string[]>={
  Premium:['Aura','Noble','Alma','Casa','Imperio','Selecta'],
  Minimal:['Nexo','Luma','Noma','Uno','Linea','Punto'],
  Juvenil:['Viva','Mimo','Hola','Chispa','Boom','Club'],
  Artesanal:['Casa','Taller','Raíz','Origen','Manos','Patio'],
  Elegante:['Élan','Dalia','Serena','Velia','Siena','Perla'],
  Natural:['Verde','Brisa','Bosque','Lino','Oliva','Río'],
};
const international:Record<(typeof styles)[number],string[]>={
  Premium:['Maison','Atelier','Noble','Aura','Select','Prime'],
  Minimal:['Noma','Nexo','Luma','Mono','Line','Form'],
  Juvenil:['Viva','Milo','Hey','Pop','Glow','Club'],
  Artesanal:['Craft','Atelier','Root','Origin','Handmade','Workshop'],
  Elegante:['Maison','Élan','Siena','Velvet','Pearl','Muse'],
  Natural:['Leaf','Moss','Olive','River','Bloom','Terra'],
};

const sectorSpanish:Record<(typeof industries)[number],string[]>={
  Ropa:['Moda','Vestir','Prenda','Estudio','Closet','Textil'],
  Belleza:['Belleza','Piel','Brillo','Estudio','Aura','Ritual'],
  Comida:['Sabor','Mesa','Cocina','Mercado','Bocado','Despensa'],
  Hogar:['Hogar','Casa','Nido','Interior','Espacio','Rincón'],
  Tecnología:['Digital','Nexo','Código','Laboratorio','Pixel','Sistemas'],
  Accesorios:['Detalle','Complemento','Estilo','Joyero','Colección','Taller'],
  Mascotas:['Huella','Mimo','Patitas','Manada','Nido','Cola'],
  Papelería:['Papel','Tinta','Trazo','Agenda','Estudio','Letra'],
  Café:['Café','Taza','Grano','Origen','Barra','Tostador'],
  General:['Tienda','Mercado','Casa','Estudio','Bazar','Colectivo'],
};
const sectorInternational:Record<(typeof industries)[number],string[]>={
  Ropa:['Studio','Wear','Closet','Mode','Label','Textile'],
  Belleza:['Glow','Beauty','Skin','Lab','Aura','Ritual'],
  Comida:['Bite','Table','Kitchen','Market','Pantry','Taste'],
  Hogar:['Home','Living','Nest','Studio','Space','House'],
  Tecnología:['Tech','Labs','Digital','Works','Pixel','Systems'],
  Accesorios:['Details','Style','Edit','Collection','Studio','Atelier'],
  Mascotas:['Paws','Pet','Pack','Nest','Buddy','Tail'],
  Papelería:['Paper','Ink','Note','Studio','Letter','Desk'],
  Café:['Coffee','Bean','Roast','Brew','Cup','Origin'],
  General:['Store','Co.','Market','Studio','House','Collective'],
};

function handleFrom(name:string){
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,24);
}
function rotate<T>(items:T[],amount:number){
  const offset=((amount%items.length)+items.length)%items.length;
  return [...items.slice(offset),...items.slice(0,offset)];
}

export default function BrandNameTool(){
  const[seed,setSeed]=useState('Luna');
  const[style,setStyle]=useState<(typeof styles)[number]>('Premium');
  const[industry,setIndustry]=useState<(typeof industries)[number]>('General');
  const[channel,setChannel]=useState<(typeof channels)[number]>('Tienda online');
  const[language,setLanguage]=useState<(typeof languages)[number]>('Español');
  const[batch,setBatch]=useState(0);
  const[favorites,setFavorites]=useState<string[]>([]);
  const[feedback,setFeedback]=useState('');

  useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem('gdn-favorites')||'[]'))}catch{}},[]);

  const results=useMemo(()=>{
    const base=seed.trim()||'Luna';
    const prefixSource=language==='Internacional'?international[style]:spanish[style];
    const suffixSource=language==='Español'?sectorSpanish[industry]:sectorInternational[industry];
    const prefixes=rotate(prefixSource,batch);
    const suffixes=rotate(suffixSource,batch*2);
    const mixed=language==='Mixto'
      ?[sectorSpanish[industry][batch%6],sectorInternational[industry][(batch+1)%6],sectorSpanish[industry][(batch+2)%6],sectorInternational[industry][(batch+3)%6],sectorSpanish[industry][(batch+4)%6],sectorInternational[industry][(batch+5)%6]]
      :suffixes;
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
      prefixes[4]+' '+base,
      base+' '+mixed[4],
      prefixes[5]+base,
      base+' '+mixed[5],
      prefixes[0]+' '+mixed[1],
      prefixes[2]+' '+base+' '+mixed[0],
    ];
    return Array.from(new Set(names)).map(name=>({
      name,
      handle:handleFrom(name),
      chars:Array.from(name).length,
      words:name.trim().split(/\s+/).length,
    }));
  },[seed,style,industry,channel,language,batch]);

  function toggleFavorite(name:string){
    const current=JSON.parse(localStorage.getItem('gdn-favorites')||'[]') as string[];
    const removing=current.includes(name);
    const next=removing?current.filter(item=>item!==name):Array.from(new Set([...current,name]));
    localStorage.setItem('gdn-favorites',JSON.stringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event('gdn:favorites-updated'));
    trackProductAction(removing?'favorite-remove':'favorite-add','brand-tool');
  }

  async function copyAll(){
    await navigator.clipboard.writeText(results.map(item=>item.name).join('\n'));
    setFeedback(results.length+' nombres copiados');
    trackProductAction('copy-all-brands','brand-tool');
    window.setTimeout(()=>setFeedback(''),1400);
  }

  function nextBatch(){
    setBatch(value=>value+1);
    trackProductAction('generate-batch','brand-tool');
  }

  return <section className="overflow-hidden rounded-[22px] border border-[#e2dfec] bg-white shadow-[0_14px_38px_rgba(55,49,91,.06)]">
    <div className="flex flex-col gap-4 border-b border-[#e2eee7] bg-[#f5fbf7] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-[12px] bg-[#27885d] text-white shadow-[0_8px_20px_rgba(39,136,93,.2)]"><Store size={16}/></span>
        <div><p className="gdn-tech text-[10px] font-bold uppercase tracking-[.14em] text-[#27885d]">Branding tool</p><h2 className="gdn-editorial text-[25px] font-bold text-[#26342d] sm:text-[27px]">Crea nombres según sector, canal y tono</h2></div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={nextBatch} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-3 text-[10px] font-semibold text-[#626576]"><RefreshCw size={12}/>Otra tanda</button>
        <button onClick={copyAll} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-3 text-[10px] font-semibold text-[#626576]"><ClipboardCopy size={12}/>Copiar todos</button>
      </div>
    </div>

    <div className="grid gap-3 border-b border-[#e2eee7] bg-[#f7fcf9] p-5 sm:grid-cols-2 lg:grid-cols-5">
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Palabra base</span><input value={seed} onChange={e=>setSeed(e.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]" placeholder="Luna, café, moda..."/></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Sector · {industries.length}</span><select value={industry} onChange={e=>{setIndustry(e.target.value as (typeof industries)[number]);setBatch(0)}} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{industries.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Canal</span><select value={channel} onChange={e=>setChannel(e.target.value as (typeof channels)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{channels.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Estilo · {styles.length}</span><select value={style} onChange={e=>{setStyle(e.target.value as (typeof styles)[number]);setBatch(0)}} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{styles.map(x=><option key={x}>{x}</option>)}</select></label>
      <label><span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[.12em] text-[#87899a]">Idioma</span><select value={language} onChange={e=>setLanguage(e.target.value as (typeof languages)[number])} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">{languages.map(x=><option key={x}>{x}</option>)}</select></label>
    </div>

    <div className="flex items-center justify-between border-b border-[#eceaf3] bg-white px-5 py-3">
      <span className="gdn-tech text-[10px] font-bold uppercase tracking-[.1em] text-[#728278]">{results.length} propuestas</span>
      <span aria-live="polite" className="text-[10px] font-semibold text-[#27885d]">{feedback}</span>
    </div>

    <div className="grid gap-px bg-[#eceaf3] md:grid-cols-2">
      {results.map(item=>{
        const saved=favorites.includes(item.name);
        return <article key={item.name} className="min-h-[148px] bg-white p-5 transition hover:bg-[#fcfbff]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0"><h3 className="gdn-editorial truncate text-[24px] font-bold text-[#26342d]">{item.name}</h3><p className="mt-1 text-[10px] font-semibold text-[#9395a4]">{industry} · {style} · {channel}</p></div>
            <button onClick={()=>toggleFavorite(item.name)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className={'grid size-11 place-items-center rounded-full border sm:size-9 '+(saved?'border-[#cfc8fb] bg-[#f0edff] text-[#5b4df5]':'border-[#e0ddea] bg-white text-[#8c8e9d]')}><Heart size={14} fill={saved?'currentColor':'none'}/></button>
          </div>
          <p className="mt-4 text-[10px] text-[#87899a]">{item.chars} {item.chars===1?'carácter':'caracteres'} · {item.words} {item.words===1?'palabra':'palabras'} · @{item.handle}</p>
          <div className="mt-4 flex flex-wrap gap-2"><CopyButton value={item.name} analyticsRole="copy-brand-name"/><CopyButton value={'@'+item.handle} analyticsRole="copy-brand-handle"/></div>
        </article>;
      })}
    </div>
    <p className="border-t border-[#eceaf3] bg-[#faf9ff] px-5 py-4 text-[10px] leading-4 text-[#9092a1]">Los handles son simulaciones locales. Comprueba marcas, dominio y perfiles sociales antes de usar un nombre comercial.</p>
  </section>
}
