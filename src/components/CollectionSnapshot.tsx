import{BookOpenCheck,Languages,ScanText,UsersRound}from'lucide-react';
import type{NameRecord}from'@/data/nameDataset';
import type{ToolMode}from'@/data/keywordMaster';

function letters(name:string){return Array.from(name.replace(/[^\p{L}]/gu,'')).length}

export default function CollectionSnapshot({items,mode,pagePath}:{items:NameRecord[];mode:ToolMode;pagePath:string}){
  if(!items.length||!(mode==='people'||mode==='culture'))return null;
  const female=items.filter(item=>item.gender==='F').length;
  const male=items.filter(item=>item.gender==='M').length;
  const unisex=items.filter(item=>item.gender==='U').length;
  const short=items.filter(item=>letters(item.name)<=4).length;
  const verified=items.filter(item=>item.verified===true&&item.source&&item.sourceUrl).length;
  const script=items.filter(item=>Boolean(item.script)).length;
  const pronunciation=items.filter(item=>Boolean(item.pronunciation)).length;
  const mythology=items.filter(item=>item.tags.includes('mythology')).length;
  const isLetter=pagePath.startsWith('/nombres-con-');

  const stats=mode==='culture'
    ?[
      {label:'Con fuente',value:verified,icon:BookOpenCheck},
      {label:'Escritura original',value:script,icon:ScanText},
      {label:'Pronunciación',value:pronunciation,icon:Languages},
      {label:mythology>0?'Mitología':'Unisex',value:mythology>0?mythology:unisex,icon:UsersRound},
    ]
    :[
      {label:'Femeninos',value:female,icon:UsersRound},
      {label:'Masculinos',value:male,icon:UsersRound},
      {label:'Unisex',value:unisex,icon:UsersRound},
      {label:'3–4 letras',value:short,icon:ScanText},
    ];

  const visible=stats.filter(stat=>stat.value>0);
  if(visible.length<2)return null;

  return <section className="mt-7 rounded-[18px] border border-[#e4e1ed] bg-[#faf9fd] p-4 sm:p-5">
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="gdn-eyebrow">{mode==='culture'?'Cobertura de la colección':isLetter?'Distribución de esta inicial':'Composición de la lista'}</p>
        <h2 className="gdn-editorial mt-1.5 text-[22px] font-bold text-[#2b2c3a]">{items.length} opciones disponibles en esta página</h2>
      </div>
      <p className="max-w-[420px] text-[9px] leading-4 text-[#8b8d9c]">Los contadores salen de los registros visibles en esta colección; no representan estadísticas de población.</p>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {visible.map(({label,value,icon:Icon})=><div key={label} className="rounded-[13px] border border-[#e5e2ec] bg-white px-3 py-3">
        <div className="flex items-center justify-between gap-2"><span className="text-[9px] font-bold uppercase tracking-[.08em] text-[#8b8d9c]">{label}</span><Icon size={12} className="text-[var(--page-accent)]"/></div>
        <p className="gdn-display mt-2 text-[24px] font-bold text-[#292a38]">{value}</p>
      </div>)}
    </div>
  </section>
}
