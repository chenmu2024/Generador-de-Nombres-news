'use client';

import{useMemo,useState}from'react';
import{Search}from'lucide-react';
import type{UnicodeStyleId}from'@/lib/styledText';
import{applyUnicodeStyle,unicodeStyles}from'@/lib/styledText';

const quickIds:UnicodeStyleId[]=['plain','bold','fraktur','script','sansBold','monospace','circled','smallCaps','double','fullwidth','starSep','upsideDown'];

const styleGroups:Array<{label:string;ids:UnicodeStyleId[]}>= [
  {label:'Clásicas',ids:['plain','bold','italic','boldItalic','sans','sansBold','sansItalic','sansBoldItalic','monospace']},
  {label:'Elegantes',ids:['double','fraktur','frakturBold','script','scriptBold','smallCaps','fullwidth','superscript']},
  {label:'Encerradas',ids:['circled','squared','negativeSquared','negativeCircled','parenthesized','regional']},
  {label:'Trazos',ids:['underline','doubleUnderline','overline','strike','slash','dotted','tilde','acute','grave','macron','diaeresis','ring','dotBelow']},
  {label:'Separadas',ids:['spaced','middleDot','bullet','starSep','kanaDot','underscoreSep','slashSep','crossSep']},
  {label:'Especiales',ids:['upsideDown','mirrorLite']},
];

export default function UnicodeStylePicker({
  value,
  onChange,
  preview='Nova',
  dark=false,
  compact=false,
}:{
  value:UnicodeStyleId;
  onChange:(value:UnicodeStyleId)=>void;
  preview?:string;
  dark?:boolean;
  compact?:boolean;
}){
  const[galleryOpen,setGalleryOpen]=useState(false);
  const[search,setSearch]=useState('');
  const[compatibility,setCompatibility]=useState<'all'|'alta'|'media'|'experimental'>('all');
  const selected=unicodeStyles.find(style=>style.id===value)??unicodeStyles[0];
  const filteredGroups=useMemo(()=>{
    const query=search.trim().toLocaleLowerCase('es');
    return styleGroups.map(group=>({
      ...group,
      ids:group.ids.filter(id=>{
        const style=unicodeStyles.find(item=>item.id===id);
        if(!style)return false;
        const matchesQuery=!query||[style.label,style.shortLabel,style.id].join(' ').toLocaleLowerCase('es').includes(query);
        const matchesCompatibility=compatibility==='all'||style.compatibility===compatibility;
        return matchesQuery&&matchesCompatibility;
      }),
    })).filter(group=>group.ids.length>0);
  },[search,compatibility]);
  const visibleCount=filteredGroups.reduce((sum,group)=>sum+group.ids.length,0);
  const quick=quickIds.slice(0,compact?6:quickIds.length).map(id=>unicodeStyles.find(style=>style.id===id)!).filter(Boolean);

  return <div>
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className={'text-[10px] font-bold uppercase tracking-[.12em] '+(dark?'text-[#9fa4b8]':'text-[#858899]')}>Fuente Unicode</span>
      <span className={'rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-[.08em] '+(dark?'bg-white/[.07] text-[#aeb2c1]':'bg-[var(--page-soft,#f0edff)] text-[var(--page-ink,#6558f5)]')}>{unicodeStyles.length} estilos</span>
    </div>

    <select
      value={value}
      onChange={event=>onChange(event.target.value as UnicodeStyleId)}
      aria-label="Elegir fuente Unicode"
      className={'h-11 w-full rounded-[10px] border px-3 text-[11px] outline-none transition '+(dark?'border-white/14 bg-[#181c2a] text-white focus:border-[#776cff]':'border-[#dedbe8] bg-white text-[#4f5162] focus:border-[var(--page-accent,#8e83ff)]')}
    >
      {styleGroups.map(group=><optgroup key={group.label} label={group.label}>
        {group.ids.map(id=>{
          const style=unicodeStyles.find(item=>item.id===id);
          return style?<option key={style.id} value={style.id}>{style.label} · compatibilidad {style.compatibility}</option>:null;
        })}
      </optgroup>)}
    </select>

    <div className={'mt-2 flex min-h-12 items-center justify-between gap-3 rounded-[10px] border px-3 '+(dark?'border-white/10 bg-white/[.045]':'border-[#e6e2ef] bg-[#faf9ff]')}>
      <div className="min-w-0">
        <span className={'block truncate text-[16px] font-semibold '+(dark?'text-white':'text-[#292a39]')}>{applyUnicodeStyle(preview||'Nova',selected.id)}</span>
        <span className={'mt-0.5 block text-[9px] font-bold uppercase tracking-[.1em] '+(dark?'text-[#777d93]':'text-[#9a9cab]')}>{selected.label}</span>
      </div>
      <span className={'gdn-tech shrink-0 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-[.06em] '+(dark?'bg-white/[.06] text-[#9ea3b7]':'bg-white text-[#858899]')}>{selected.compatibility}</span>
    </div>

    <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
      {quick.map(style=><button
        key={style.id}
        type="button"
        onClick={()=>onChange(style.id)}
        aria-pressed={value===style.id}
        title={style.label}
        className={'min-h-9 min-w-[44px] shrink-0 rounded-[8px] border px-2 text-[12px] font-semibold transition '+(value===style.id
          ?dark?'border-[#7469ff] bg-[#5b4df5] text-white':'border-[var(--page-border,#c9c1ff)] bg-[var(--page-soft,#f0edff)] text-[var(--page-ink,#5146d6)]'
          :dark?'border-white/12 bg-white/[.04] text-[#d6d9e3] hover:bg-white/[.08]':'border-[#e3e0eb] bg-white text-[#66697a] hover:border-[var(--page-border,#d8d2f0)] hover:bg-[var(--page-soft,#f7f5ff)]')}
      >{style.shortLabel}</button>)}
    </div>

    {!compact&&<details onToggle={event=>setGalleryOpen(event.currentTarget.open)} className={'mt-3 overflow-hidden rounded-[11px] border '+(dark?'border-white/10 bg-white/[.025]':'border-[#e5e2ed] bg-[#fcfbff]')}>
      <summary className={'flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 text-[10px] font-bold '+(dark?'text-[#c3c7d4]':'text-[#626576]')}>
        <span>Explorar todos los estilos</span>
        <span className={'gdn-tech rounded-full px-2 py-1 text-[9px] '+(dark?'bg-white/[.06] text-[#8f95a8]':'bg-white text-[#8b8d9d]')}>{styleGroups.length} familias · {unicodeStyles.length} estilos</span>
      </summary>
      {galleryOpen&&<div className={'border-t p-3 '+(dark?'border-white/8':'border-[#ece9f2]')}>
        <div className="mb-4 grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="relative block">
            <Search size={13} className={'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 '+(dark?'text-[#73798d]':'text-[#9a9cab]')}/>
            <input
              value={search}
              onChange={event=>setSearch(event.target.value)}
              placeholder="Buscar estilo..."
              aria-label="Buscar fuente Unicode"
              className={'h-10 w-full rounded-[9px] border pl-9 pr-3 text-[10px] outline-none transition '+(dark?'border-white/10 bg-[#161a28] text-white placeholder:text-[#666c80] focus:border-[#7469ff]':'border-[#e1deea] bg-white text-[#525465] placeholder:text-[#a1a3b0] focus:border-[var(--page-border,#cbc5f0)]')}
            />
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {([
              ['all','Todas'],
              ['alta','Alta'],
              ['media','Media'],
              ['experimental','Experimental'],
            ] as const).map(([id,label])=><button
              key={id}
              type="button"
              onClick={()=>setCompatibility(id)}
              aria-pressed={compatibility===id}
              className={'min-h-9 shrink-0 rounded-full border px-3 text-[9px] font-bold transition '+(compatibility===id
                ?dark?'border-[#7469ff] bg-[#5b4df5] text-white':'border-[var(--page-border,#cbc5f0)] bg-[var(--page-soft,#f0edff)] text-[var(--page-ink,#5146d6)]'
                :dark?'border-white/10 bg-white/[.035] text-[#9ca1b5] hover:bg-white/[.07]':'border-[#e3e0eb] bg-white text-[#858899] hover:border-[var(--page-border,#d8d2f0)]')}
            >{label}</button>)}
          </div>
        </div>
        <div className={'mb-3 flex items-center justify-between gap-3 text-[9px] '+(dark?'text-[#70768b]':'text-[#9a9cab]')}>
          <span>{visibleCount} estilos visibles</span>
          {(search||compatibility!=='all')&&<button type="button" onClick={()=>{setSearch('');setCompatibility('all')}} className="font-bold text-[var(--page-accent,#6a5ff0)] hover:underline">Limpiar filtros</button>}
        </div>
        {filteredGroups.length>0?<div className="space-y-4">
          {filteredGroups.map(group=><section key={group.label}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className={'gdn-tech text-[9px] font-black uppercase tracking-[.1em] '+(dark?'text-[#7f8498]':'text-[#9395a4]')}>{group.label}</p>
              <span className={'text-[9px] '+(dark?'text-[#676d82]':'text-[#aaaeba]')}>{group.ids.length}</span>
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {group.ids.map(id=>{
                const style=unicodeStyles.find(item=>item.id===id);
                if(!style)return null;
                const active=value===style.id;
                return <button
                  key={style.id}
                  type="button"
                  onClick={()=>onChange(style.id)}
                  aria-pressed={active}
                  className={'min-w-0 rounded-[9px] border px-3 py-2 text-left transition '+(active
                    ?dark?'border-[#7469ff] bg-[#5b4df5]/20':'border-[var(--page-border,#c9c1ff)] bg-[var(--page-soft,#f0edff)]'
                    :dark?'border-white/8 bg-white/[.025] hover:bg-white/[.06]':'border-[#e8e5ef] bg-white hover:border-[var(--page-border,#d8d2f4)]')}
                >
                  <span className={'block truncate text-[13px] font-semibold '+(dark?'text-white':'text-[#313241]')}>{applyUnicodeStyle(preview||'Nova',style.id)}</span>
                  <span className={'mt-1 flex items-center justify-between gap-2 text-[9px] '+(dark?'text-[#7f8498]':'text-[#9698a7]')}>
                    <span className="truncate">{style.label}</span><span className="gdn-tech shrink-0 uppercase">{style.compatibility}</span>
                  </span>
                </button>;
              })}
            </div>
          </section>)}
        </div>:<div className={'rounded-[10px] border px-4 py-5 text-center text-[10px] '+(dark?'border-white/8 bg-white/[.025] text-[#777d91]':'border-[#e8e5ef] bg-white text-[#9193a2]')}>No hay estilos que coincidan con esos filtros.</div>}
      </div>}
    </details>}
  </div>
}
