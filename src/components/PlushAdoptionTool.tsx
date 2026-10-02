'use client';

import{useEffect,useMemo,useState}from'react';
import{CalendarDays,Copy,HeartHandshake,Printer,Sparkles}from'lucide-react';
import{copyText}from'@/lib/clipboard';
import{trackProductAction}from'@/lib/analytics';

type DocMode='acta'|'certificado';

export default function PlushAdoptionTool({suggestions}:{suggestions:string[]}){
  const[mode,setMode]=useState<DocMode>('acta');
  const[plushName,setPlushName]=useState(suggestions[0]??'Nube');
  const[adopter,setAdopter]=useState('');
  const[date,setDate]=useState('');
  const[note,setNote]=useState('Prometo cuidarte, darte un lugar especial y compartir muchas aventuras contigo.');
  const[feedback,setFeedback]=useState('');

  useEffect(()=>{
    const requested=new URLSearchParams(window.location.search).get('doc');
    if(requested==='acta'||requested==='certificado')setMode(requested);
  },[]);

  const title=mode==='acta'?'Acta de adopción de peluche':'Certificado de adopción de peluche';
  const documentText=useMemo(()=>{
    const lines=[
      title,
      '',
      'Nombre del peluche: '+(plushName.trim()||'Sin nombre'),
      'Adoptante: '+(adopter.trim()||'________________'),
      'Fecha de adopción: '+(date||'________________'),
      '',
      note.trim()||'Este peluche ha encontrado un hogar especial.',
      '',
      'Recuerdo personal · No es un documento oficial.',
    ];
    return lines.join('\n');
  },[title,plushName,adopter,date,note]);

  async function copyDocument(){
    const ok=await copyText(documentText);
    if(!ok)return;
    setFeedback('Texto copiado');
    trackProductAction('copy-adoption-card','plush-adoption');
    window.setTimeout(()=>setFeedback(''),1400);
  }

  function printDocument(){
    trackProductAction('print-adoption-card','plush-adoption');
    window.print();
  }

  return <section id="adopcion" className="mt-10 scroll-mt-20 overflow-hidden rounded-[22px] border border-[#eadce8] bg-white shadow-[0_16px_42px_rgba(83,55,80,.07)]">
    <div className="grid lg:grid-cols-[360px_1fr]">
      <div className="border-b border-[#eadce8] bg-[#fff8fc] p-5 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-[12px] bg-[#b45d8d] text-white shadow-[0_8px_20px_rgba(180,93,141,.2)]"><HeartHandshake size={17}/></span>
          <div>
            <p className="gdn-tech text-[10px] font-black uppercase tracking-[.12em] text-[#a94f81]">Recuerdo personal</p>
            <h2 className="gdn-editorial text-[25px] font-bold text-[#3b2d39]">Crea su acta o certificado</h2>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 rounded-[11px] border border-[#eadce8] bg-white p-1">
          <button onClick={()=>{setMode('acta');trackProductAction('mode-acta','plush-adoption')}} aria-pressed={mode==='acta'} className={'min-h-10 rounded-[8px] px-3 text-[10px] font-semibold '+(mode==='acta'?'bg-[#b45d8d] text-white':'text-[#7f6b79]')}>Acta</button>
          <button onClick={()=>{setMode('certificado');trackProductAction('mode-certificado','plush-adoption')}} aria-pressed={mode==='certificado'} className={'min-h-10 rounded-[8px] px-3 text-[10px] font-semibold '+(mode==='certificado'?'bg-[#b45d8d] text-white':'text-[#7f6b79]')}>Certificado</button>
        </div>

        <label className="mt-5 block">
          <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[.1em] text-[#9a8895]">Nombre del peluche</span>
          <input value={plushName} onChange={event=>setPlushName(event.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]" placeholder="Nube"/>
        </label>

        {suggestions.length>0&&<div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {suggestions.slice(0,6).map(name=><button key={name} onClick={()=>setPlushName(name)} className="shrink-0 rounded-full border border-[#eadce8] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#7a6573] hover:border-[#c987aa] hover:text-[#a94f81]">{name}</button>)}
        </div>}

        <label className="mt-4 block">
          <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[.1em] text-[#9a8895]">Adoptante</span>
          <input value={adopter} onChange={event=>setAdopter(event.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]" placeholder="Tu nombre"/>
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[.1em] text-[#9a8895]"><CalendarDays size={11}/>Fecha de adopción</span>
          <input type="date" value={date} onChange={event=>setDate(event.target.value)} className="gdn-input h-11 rounded-[11px] px-3 text-[11px]"/>
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-[9px] font-black uppercase tracking-[.1em] text-[#9a8895]">Promesa o nota</span>
          <textarea value={note} onChange={event=>setNote(event.target.value)} rows={4} maxLength={220} className="gdn-input min-h-[96px] resize-y rounded-[11px] px-3 py-2.5 text-[11px] leading-5"/>
        </label>
      </div>

      <div className="bg-[#fcfafc] p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="gdn-tech text-[9px] font-black uppercase tracking-[.1em] text-[#a94f81]">Vista previa</p>
            <p className="mt-1 text-[10px] text-[#91818d]">Puedes copiar el texto o imprimir solo la tarjeta.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={copyDocument} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#e3d8e1] bg-white px-3 text-[10px] font-semibold text-[#685662] hover:border-[#c987aa]"><Copy size={12}/>{feedback||'Copiar texto'}</button>
            <button onClick={printDocument} className="inline-flex min-h-10 items-center gap-2 rounded-[10px] bg-[#b45d8d] px-3 text-[10px] font-semibold text-white"><Printer size={12}/>Imprimir</button>
          </div>
        </div>

        <article className="plush-print-card mx-auto max-w-[620px] rounded-[24px] border border-[#dfcbd8] bg-white p-7 text-center shadow-[0_18px_45px_rgba(90,61,84,.08)] sm:p-9">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#f8e8f1] text-[#a94f81]"><Sparkles size={19}/></div>
          <p className="gdn-tech mt-5 text-[9px] font-black uppercase tracking-[.18em] text-[#ad8b9e]">GeneradorDeNombres.net</p>
          <h3 className="gdn-editorial mt-2 text-[30px] font-bold text-[#422f3c] sm:text-[36px]">{title}</h3>
          <div className="mx-auto mt-7 max-w-[460px] border-y border-[#eadce8] py-6">
            <p className="text-[10px] uppercase tracking-[.12em] text-[#a28c99]">Nombre del peluche</p>
            <p className="gdn-editorial mt-1 break-words text-[34px] font-bold text-[#9c4e7a]">{plushName.trim()||'Sin nombre'}</p>
            <p className="mt-5 text-[12px] leading-6 text-[#66545f]">Ha sido adoptado por <strong>{adopter.trim()||'________________'}</strong>{date&&<> el <strong>{date}</strong></>}.</p>
          </div>
          <p className="mx-auto mt-6 max-w-[460px] whitespace-pre-wrap text-[12px] leading-6 text-[#72616c]">{note.trim()||'Este peluche ha encontrado un hogar especial.'}</p>
          <p className="mt-7 text-[9px] font-semibold text-[#ad9ca7]">Recuerdo personal · No es un documento oficial.</p>
        </article>
      </div>
    </div>
  </section>
}
