'use client';

import{useMemo,useState}from'react';
import{ArrowLeftRight,RefreshCw,ShieldCheck,Sparkles}from'lucide-react';
import CopyButton from'./CopyButton';
import{trackProductAction}from'@/lib/analytics';

export default function CompoundNameTool({
  audience,
  suggestions,
}:{audience:'niña'|'niño';suggestions:string[]}){
  const pool=useMemo(()=>Array.from(new Set(suggestions.filter(Boolean))).slice(0,32),[suggestions]);
  const[first,setFirst]=useState(pool[0]??'');
  const[second,setSecond]=useState(pool[1]??pool[0]??'');
  const[batch,setBatch]=useState(0);

  const proposals=useMemo(()=>{
    if(pool.length<2)return[];
    const pairs:Array<[string,string]>=[];
    const push=(left:string,right:string)=>{
      if(!left||!right||left===right)return;
      if(pairs.some(([a,b])=>a===left&&b===right))return;
      pairs.push([left,right]);
    };
    push(first,second);
    push(second,first);
    for(let index=0;index<10&&pairs.length<8;index++){
      const left=pool[(batch+index*2)%pool.length];
      const right=pool[(batch+index*2+1)%pool.length];
      push(left,right);
    }
    return pairs.map(([left,right])=>({
      value:left+' '+right,
      left,
      right,
    }));
  },[pool,first,second,batch]);

  if(pool.length<2)return null;

  return <section id="compuestos" className="mt-10 scroll-mt-20 overflow-hidden rounded-[22px] border border-[#ded9ef] bg-white shadow-[0_14px_40px_rgba(61,52,108,.06)]">
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b border-[#e6e2f0] bg-[#faf8ff] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[12px] bg-[#6658e8] text-white shadow-[0_8px_20px_rgba(102,88,232,.18)]"><Sparkles size={16}/></span>
          <div>
            <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#6658e8]">Combinador editorial</p>
            <h2 className="gdn-editorial text-[25px] font-bold text-[#302f43]">Nombres compuestos para {audience}</h2>
          </div>
        </div>

        <p className="mt-3 text-[10px] leading-5 text-[#7d7f90]">Elige dos nombres documentados de la colección y prueba el orden. La combinación resultante es una propuesta de la herramienta, no una afirmación de frecuencia, tradición o registro oficial.</p>

        <div className="mt-5 grid gap-3">
          <label>
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[.1em] text-[#9294a4]">Primer nombre</span>
            <select value={first} onChange={event=>setFirst(event.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">
              {pool.map(name=><option key={'first-'+name} value={name}>{name}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[.1em] text-[#9294a4]">Segundo nombre</span>
            <select value={second} onChange={event=>setSecond(event.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]">
              {pool.map(name=><option key={'second-'+name} value={name}>{name}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={()=>{setFirst(second);setSecond(first);trackProductAction('swap-compound','compound-name-tool')}} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#ddd8ed] bg-white px-3 text-[10px] font-semibold text-[#67697a] hover:border-[#c8c0ee]"><ArrowLeftRight size={12}/>Cambiar orden</button>
          <button type="button" onClick={()=>{setBatch(value=>value+2);trackProductAction('compound-batch','compound-name-tool')}} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#ddd8ed] bg-white px-3 text-[10px] font-semibold text-[#67697a] hover:border-[#c8c0ee]"><RefreshCw size={12}/>Otra tanda</button>
        </div>

        <div className="mt-4 flex gap-2 rounded-[12px] border border-[#e5e1f2] bg-white px-3 py-3 text-[9px] leading-4 text-[#858797]">
          <ShieldCheck size={13} className="mt-0.5 shrink-0 text-[#6658e8]"/>
          <span>Los componentes mostrados aquí proceden de registros con fuente verificada; la pareja entre ambos se genera localmente en esta herramienta.</span>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#ece9f3] px-5 py-4">
          <div>
            <p className="gdn-tech text-[9px] font-black uppercase tracking-[.1em] text-[#8b8d9c]">Propuestas</p>
            <p className="mt-1 text-[10px] text-[#9698a7]">Prueba la sonoridad con los apellidos antes de decidir.</p>
          </div>
          <span className="rounded-full bg-[#f1effb] px-2.5 py-1 text-[9px] font-bold text-[#6658e8]">{proposals.length}</span>
        </div>
        <div className="grid gap-px bg-[#ece9f3] sm:grid-cols-2">
          {proposals.map((item,index)=><article key={item.value} className="bg-white p-5 transition hover:bg-[#fcfbff]">
            <p className="gdn-tech text-[8px] font-black uppercase tracking-[.1em] text-[#aaa6b8]">Propuesta {index+1}</p>
            <h3 className="gdn-editorial mt-2 break-words text-[23px] font-bold text-[#303142]">{item.value}</h3>
            <p className="mt-2 text-[9px] leading-4 text-[#9698a7]">Componentes: {item.left} + {item.right}</p>
            <div className="mt-4"><CopyButton value={item.value} label="Copiar combinación" analyticsRole="copy-compound-name"/></div>
          </article>)}
        </div>
      </div>
    </div>
  </section>
}
