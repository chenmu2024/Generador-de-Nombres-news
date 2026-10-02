'use client';

import {useEffect,useState} from 'react';
import TrackedLink from './TrackedLink';
import {EXPERIMENTS} from '@/data/experiments';
import {Copy,Download,Heart,Search,Trash2,X,Clock3,ArrowUpAZ} from 'lucide-react';
import CopyButton from './CopyButton';
import {trackProductAction} from '@/lib/analytics';
import{copyText}from'@/lib/clipboard';
import{clearFavorites,readFavorites,removeFavorite}from'@/lib/favorites';

export default function FavoritesCenter(){
  const[items,setItems]=useState<string[]>([]);
  const[query,setQuery]=useState('');
  const[sort,setSort]=useState<'recent'|'az'>('recent');
  const[layout,setLayout]=useState<'grid'|'compact'>('grid');
  const[confirmClear,setConfirmClear]=useState(false);
  useEffect(()=>{setItems(readFavorites())},[]);
  function remove(name:string){setItems(removeFavorite(name,items));trackProductAction('favorite-remove','favorites-center')}
  async function copyAll(){const ok=await copyText(items.join('\n'));if(!ok)return;trackProductAction('copy-all-favorites','favorites-center')}
  function clear(){if(!confirmClear){setConfirmClear(true);return}clearFavorites();setItems([]);setConfirmClear(false);trackProductAction('favorite-clear-all','favorites-center')}
  function exportTxt(){const blob=new Blob([items.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mis-nombres-favoritos.txt';a.click();URL.revokeObjectURL(url);trackProductAction('export-favorites-txt','favorites-center')}

  const filtered=items.filter(name=>name.toLocaleLowerCase('es').includes(query.trim().toLocaleLowerCase('es')));
  const visible=sort==='az'?[...filtered].sort((a,b)=>a.localeCompare(b,'es')):[...filtered].reverse();

  if(!items.length)return <div className="rounded-[20px] border border-[#e4e1ed] bg-white px-6 py-12 text-center shadow-[0_10px_28px_rgba(55,49,91,.04)] sm:py-16">
    <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#f0edff] text-[#5b4df5]"><Heart size={19}/></span>
    <h2 className="gdn-editorial mt-5 text-[28px] font-bold text-[#292a39]">Aún no has guardado nombres</h2>
    <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-[#7e8192]">Pulsa el corazón en cualquier tarjeta. Tus favoritos se guardan solo en este navegador.</p>
    <div className="mx-auto mt-6 grid max-w-[820px] gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {[
        {href:'/nombres-de-mujer',label:'Personas',desc:'Origen, significado y estilos'},
        {href:'/nombres-gatos',label:'Mascotas',desc:'Gatos, perros y otras ideas'},
        {href:'/nombres-free-fire',label:'Juegos',desc:'Nicknames, símbolos y estilos'},
        {href:'/nombres-japoneses',label:'Culturas',desc:'Escritura, origen y fuentes'},
        {href:'/nombres-para-tiendas',label:'Negocios',desc:'Marcas, tiendas y proyectos'},
      ].map(item=><TrackedLink key={item.href} href={item.href} placement="empty-favorites" role={'discover-'+item.href.slice(1)} experimentId={EXPERIMENTS.emptyFavorites} className="rounded-[14px] border border-[#e2deef] bg-[#faf9ff] p-4 text-left transition hover:border-[#cbc4f7] hover:bg-[#f6f3ff]">
        <span className="block text-[11px] font-bold text-[#414354]">{item.label}</span>
        <span className="mt-1 block text-[10px] leading-4 text-[#858899]">{item.desc}</span>
      </TrackedLink>)}
    </div>
  </div>;

  return <section className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_10px_28px_rgba(55,49,91,.04)]">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eceaf3] bg-[#faf9ff] px-5 py-5">
      <div><p className="gdn-eyebrow">Guardados en este dispositivo</p><h2 className="gdn-display mt-1 text-[30px] font-bold text-[#292a39]">{items.length} favoritos</h2><p className="mt-1 text-[10px] text-[#8c8f9f]">Tu lista personal de nombres para volver, comparar y exportar.</p></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={()=>setSort(value=>value==='recent'?'az':'recent')} aria-label={sort==='recent'?'Ordenar alfabéticamente':'Volver al orden guardado'} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-4 text-[10px] font-semibold text-[#626576]">{sort==='recent'?<><ArrowUpAZ size={13}/>A–Z</>:<><Clock3 size={13}/>Recientes</>}</button>
        <button onClick={()=>setLayout(value=>value==='grid'?'compact':'grid')} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-4 text-[10px] font-semibold text-[#626576]">{layout==='grid'?'Compacto':'Tarjetas'}</button>
        <button onClick={copyAll} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-4 text-[10px] font-semibold text-[#626576]"><Copy size={13}/>Copiar todos</button>
        <button onClick={exportTxt} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#dfdbea] bg-white px-4 text-[10px] font-semibold text-[#626576]"><Download size={13}/>TXT</button>
        <button onClick={clear} onBlur={()=>setConfirmClear(false)} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#f0d9de] bg-[#fff4f6] px-4 text-[10px] font-semibold text-[#a35465]"><Trash2 size={13}/>{confirmClear?'Confirmar vaciado':'Vaciar'}</button>
      </div>
    </div>
    {items.length>=8&&<div className="border-b border-[#eceaf3] bg-white px-5 py-4">
      <label className="relative block max-w-md">
        <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9294a4]"/>
        <input value={query} onChange={event=>setQuery(event.target.value)} aria-label="Buscar en favoritos" placeholder="Buscar en mis favoritos…" className="gdn-input h-11 rounded-[11px] pl-10 pr-3 text-[11px]"/>
      </label>
      <p className="gdn-tech mt-2 text-[9px] text-[#9294a4]">{visible.length} de {items.length} favoritos visibles · {sort==='az'?'orden A–Z':'orden guardado'}</p>
    </div>}
    {visible.length?<div className={layout==='grid'?'grid gap-px bg-[#eceaf3] md:grid-cols-2 lg:grid-cols-3':'divide-y divide-[#eceaf3] bg-white'}>{visible.map(name=><div key={name} className={layout==='grid'?'bg-white p-5':'flex items-center justify-between gap-3 bg-white px-4 py-3 sm:px-5'}>
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3"><p className={'gdn-editorial truncate font-bold text-[#2a2b39] '+(layout==='grid'?'text-[23px]':'text-[18px]')}>{name}</p><button onClick={()=>remove(name)} aria-label="Quitar" className="grid size-9 shrink-0 place-items-center rounded-full border border-[#e0ddea] text-[#8c8e9e] hover:bg-[#f7f5ff]"><X size={13}/></button></div>
      <div className={layout==='grid'?'mt-4':'shrink-0'}><CopyButton value={name} analyticsRole="copy-favorite-name"/></div>
    </div>)}</div>:<div className="px-6 py-12 text-center">
      <p className="text-[12px] font-semibold text-[#55586a]">No hay favoritos que coincidan con “{query}”.</p>
      <button onClick={()=>setQuery('')} className="mt-3 text-[10px] font-semibold text-[#5b4df5] hover:underline">Limpiar búsqueda</button>
    </div>}
  </section>
}
