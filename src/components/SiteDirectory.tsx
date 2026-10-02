import{ArrowUpRight,Layers3}from'lucide-react';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters,type TopicClusterId}from'@/data/topicClusters';

const clusterOrder:TopicClusterId[]=[
  'freeFire',
  'gamingSocial',
  'personasBebes',
  'letras',
  'culturas',
  'mascotas',
  'negociosEquipos',
];

function label(value:string){
  return value.charAt(0).toLocaleUpperCase('es')+value.slice(1);
}

export default function SiteDirectory(){
  const pages=keywordPages.filter(page=>page.path!=='/');
  return <section id="todas-las-herramientas" className="gdn-shell scroll-mt-24 pb-16 pt-4 sm:pb-20">
    <div className="rounded-[24px] border border-[#e2deee] bg-[#f8f7fc] p-5 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-[#e5e1ee] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[690px]">
          <p className="gdn-eyebrow">Directorio completo</p>
          <h2 className="gdn-display mt-2 text-[34px] font-bold tracking-[-.04em] text-[#1c1d2b] sm:text-[40px]">Todas las herramientas y páginas</h2>
          <p className="mt-3 text-[12px] leading-6 text-[#737687]">Aquí puedes ver y abrir directamente los {pages.length} temas disponibles, agrupados para que no tengas que descubrirlos uno por uno.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dcd7ef] bg-white px-3 py-2 text-[10px] font-bold text-[#6258c9]"><Layers3 size={13}/>{pages.length} páginas</span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {clusterOrder.map(clusterId=>{
          const cluster=topicClusters[clusterId];
          const clusterPages=pages.filter(page=>page.cluster===clusterId);
          return <section key={clusterId} className="rounded-[19px] border border-[#e4e1ec] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="gdn-editorial text-[22px] font-bold text-[#292a38]">{cluster.label}</h3>
                <p className="mt-1 text-[10px] leading-5 text-[#858899]">{cluster.description}</p>
              </div>
              <span className="rounded-full bg-[#f1effa] px-2.5 py-1 text-[9px] font-bold text-[#6a61b7]">{clusterPages.length}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {clusterPages.map((item,index)=><TrackedLink
                key={item.path}
                href={item.path}
                placement="site-directory"
                role={clusterId+'-'+(index+1)}
                experimentId={EXPERIMENTS.homePopular}
                className="group inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#e2dfeb] bg-[#fbfaff] px-3 py-2 text-[10px] font-semibold leading-4 text-[#555768] transition hover:border-[#cfc8f1] hover:bg-[#f3f0ff] hover:text-[#5b4df5]"
              >{label(item.primaryKeyword)}<ArrowUpRight size={10} className="shrink-0 opacity-45 transition group-hover:opacity-100"/></TrackedLink>)}
            </div>
          </section>;
        })}
      </div>
    </div>
  </section>
}
