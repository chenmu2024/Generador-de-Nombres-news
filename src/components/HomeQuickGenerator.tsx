'use client';

import{useEffect,useMemo,useState}from'react';
import{ArrowRight,Baby,Gamepad2,Heart,Landmark,PawPrint,RefreshCw,Store}from'lucide-react';
import CopyButton from'./CopyButton';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';
import{trackProductAction}from'@/lib/analytics';
import{generateStoreNames}from'@/lib/generator';
import{readFavorites,toggleFavorite as toggleStoredFavorite}from'@/lib/favorites';

type Mode='people'|'pet'|'gaming'|'culture'|'store';

const modes=[
  {id:'people' as const,label:'Personas',icon:Baby,href:'/nombres-de-mujer',soft:'#fff2f5',accent:'#cc5f78'},
  {id:'pet' as const,label:'Mascotas',icon:PawPrint,href:'/nombres-gatos',soft:'#fff6ec',accent:'#c77a33'},
  {id:'gaming' as const,label:'Juegos',icon:Gamepad2,href:'/nombres-roblox',soft:'#f1efff',accent:'#5b4df5'},
  {id:'culture' as const,label:'Culturas',icon:Landmark,href:'/nombres-japoneses',soft:'#faf1ff',accent:'#8d5ab8'},
  {id:'store' as const,label:'Negocios',icon:Store,href:'/nombres-para-tiendas',soft:'#eefaf3',accent:'#27885d'},
];

function rotate<T>(items:T[],amount:number){
  if(!items.length)return[];
  const offset=((amount%items.length)+items.length)%items.length;
  return [...items.slice(offset),...items.slice(0,offset)];
}

export default function HomeQuickGenerator({
  people,
  pets,
  games,
  cultures,
}:{people:string[];pets:string[];games:string[];cultures:string[]}){
  const[mode,setMode]=useState<Mode>('people');
  const[batch,setBatch]=useState(0);
  const[seed,setSeed]=useState('Luna');
  const[favorites,setFavorites]=useState<string[]>([]);

  useEffect(()=>{setFavorites(readFavorites())},[]);

  const config=modes.find(item=>item.id===mode)!;
  const results=useMemo(()=>{
    if(mode==='store')return rotate(generateStoreNames(seed,'Premium'),batch*3).slice(0,6);
    const pool=mode==='people'?people:mode==='pet'?pets:mode==='culture'?cultures:games;
    return rotate(pool,batch*5).slice(0,6);
  },[mode,batch,seed,people,pets,games,cultures]);

  function changeMode(next:Mode){
    setMode(next);
    setBatch(0);
    trackProductAction('quick-mode-'+next,'home-quick-generator');
  }

  function nextBatch(){
    setBatch(value=>value+1);
    trackProductAction('quick-generate','home-quick-generator');
  }

  function toggleFavorite(value:string){
    const{items:next,removed}=toggleStoredFavorite(value,favorites);
    setFavorites(next);
    trackProductAction(removed?'favorite-remove':'favorite-add','home-quick-generator');
  }

  return <section className="overflow-hidden rounded-[22px] border border-[#e2dfec] bg-white shadow-[0_16px_42px_rgba(55,49,91,.07)]">
    <div className="grid lg:grid-cols-[300px_1fr]">
      <div className="border-b border-[#eceaf3] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <p className="gdn-tech text-[10px] font-black uppercase tracking-[.14em]" style={{color:config.accent}}>Generador rápido</p>
        <h2 className="gdn-display mt-2 text-[30px] font-bold leading-[1.02] tracking-[-.035em] text-[#20212e]">Empieza con una categoría.</h2>
        <p className="mt-3 text-[11px] leading-5 text-[#7b7e90]">Genera una primera selección y después entra en la herramienta especializada si quieres afinar filtros, estilo o contexto.</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {modes.map(item=>{
            const Icon=item.icon;
            const active=mode===item.id;
            return <button key={item.id} onClick={()=>changeMode(item.id)} aria-pressed={active} className="flex min-h-12 items-center gap-2 rounded-[11px] border px-3 text-left text-[11px] font-semibold transition" style={active?{borderColor:item.accent,background:item.soft,color:item.accent}:{borderColor:'#e5e2ec',background:'#fff',color:'#66697a'}}>
              <Icon size={14}/>{item.label}
            </button>;
          })}
        </div>

        {mode==='store'&&<label className="mt-4 block">
          <span className="gdn-tech mb-2 block text-[9px] font-black uppercase tracking-[.1em] text-[#8d8f9f]">Palabra base</span>
          <input value={seed} onChange={event=>{setSeed(event.target.value);setBatch(0)}} className="gdn-input h-11 rounded-[10px] px-3 text-[11px]" placeholder="Luna, café, moda…"/>
        </label>}

        <button onClick={nextBatch} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[11px] px-4 text-[11px] font-semibold text-white transition hover:brightness-95" style={{background:config.accent}}>
          <RefreshCw size={13}/> Generar otra selección
        </button>
      </div>

      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3 border-b border-[#eceaf3] px-4 py-3 sm:px-5">
          <div>
            <p className="gdn-tech text-[9px] font-black uppercase tracking-[.1em] text-[#8d8f9f]">{config.label}</p>
            <p className="mt-0.5 text-[11px] text-[#777a8a]">6 ideas para empezar</p>
          </div>
          <TrackedLink href={config.href} placement="home-quick-generator" role={'open-'+mode+'-hub'} experimentId={EXPERIMENTS.homeQuick} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-[10px] font-semibold transition hover:brightness-[.98]" style={{borderColor:config.accent,background:config.soft,color:config.accent}}>
            Ver herramienta completa <ArrowRight size={11}/>
          </TrackedLink>
        </div>

        <div className="grid gap-px bg-[#eceaf3] sm:grid-cols-2 xl:grid-cols-3">
          {results.map(value=>{
            const saved=favorites.includes(value);
            return <article key={value} className="flex min-h-[104px] flex-col justify-between bg-white p-4 transition hover:bg-[#fcfbff]">
              <div className="flex items-start justify-between gap-3">
                <h3 className="gdn-editorial min-w-0 break-words text-[19px] font-bold leading-tight text-[#2a2b39]">{value}</h3>
                <button onClick={()=>toggleFavorite(value)} aria-pressed={saved} aria-label={saved?'Quitar de favoritos':'Guardar en favoritos'} className="grid size-9 shrink-0 place-items-center rounded-full border transition" style={saved?{borderColor:config.accent,background:config.soft,color:config.accent}:{borderColor:'#e1ddea',background:'#fff',color:'#8f91a0'}}>
                  <Heart size={13} fill={saved?'currentColor':'none'}/>
                </button>
              </div>
              <div className="mt-3"><CopyButton value={value} analyticsRole="copy-home-quick-name"/></div>
            </article>;
          })}
        </div>
      </div>
    </div>
  </section>
}
