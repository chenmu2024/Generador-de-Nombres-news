import{ArrowDown,BookOpenCheck,Sparkles}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';

function primaryAction(page:KeywordPage){
  if(page.path==='/nombres-por-letra')return{href:'#herramienta',label:'Elegir una inicial'};
  if(page.path==='/espacios-invisible-ff')return{href:'#herramienta',label:'Probar espacio invisible'};
  if(page.path==='/nombres-para-tiendas')return{href:'#herramienta',label:'Generar nombres de tienda'};
  if(page.path==='/nombres-equipos-futbol')return{href:'#herramienta',label:'Crear nombre y TAG'};
  if(page.path==='/nombres-roblox')return{href:'#herramienta',label:'Crear nombre para Roblox'};
  if(page.path==='/nombres-instagram')return{href:'#herramienta',label:'Crear username'};
  if(page.path==='/nombres-anime')return{href:'#herramienta',label:'Generar nombre anime'};
  if(page.cluster==='freeFire')return{href:'#herramienta',label:page.path==='/nombres-clanes-ff'?'Crear nombre de clan':'Generar nickname'};
  if(page.tool==='people')return{href:'#resultados',label:'Explorar nombres'};
  if(page.tool==='pet')return{href:'#resultados',label:'Ver nombres'};
  if(page.tool==='culture')return{href:'#resultados',label:'Explorar la colección'};
  return{href:'#guia',label:'Empezar'};
}

export default function PageIntroActions({page}:{page:KeywordPage}){
  const primary=primaryAction(page);
  return <div className="mt-6 flex flex-wrap items-center gap-2.5">
    <a href={primary.href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--page-accent)] px-4 text-[11px] font-bold text-white shadow-[0_9px_22px_rgba(69,60,150,.14)] transition hover:-translate-y-0.5 hover:brightness-95">
      <Sparkles size={13}/>{primary.label}<ArrowDown size={12}/>
    </a>
    <a href="#guia" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--page-border)] bg-white px-4 text-[10px] font-bold text-[var(--page-ink)] transition hover:bg-[var(--page-soft)]">
      <BookOpenCheck size={12}/>Cómo usar esta página
    </a>
  </div>;
}
