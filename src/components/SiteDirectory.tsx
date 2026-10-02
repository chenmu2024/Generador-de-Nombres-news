import{ArrowUpRight,Layers3}from'lucide-react';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';
import{keywordPages}from'@/data/keywordMaster';
import{topicClusters,type TopicClusterId}from'@/data/topicClusters';
import{getNamesForPath}from'@/data/nameDataset';

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

function pageMeta(path:string,count:number){
  if(count>0)return count+' opciones';
  if(path==='/nombres-por-letra')return'Directorio A–Z';
  if(path==='/espacios-invisible-ff')return'Unicode';
  return'Generador';
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
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {clusterPages.map((item,index)=>{
                const count=getNamesForPath(item.path).length;
                return <TrackedLink
                  key={item.path}
                  href={item.path}
                  placement="site-directory"
                  role={clusterId+'-'+(index+1)}
                  experimentId={EXPERIMENTS.homePopular}
                  className="group flex min-h-[58px] items-center justify-between gap-3 rounded-[13px] border border-[#e2dfeb] bg-[#fbfaff] px-3.5 py-3 transition hover:border-[#cfc8f1] hover:bg-[#f3f0ff] hover:shadow-[0_8px_18px_rgba(70,61,128,.05)]"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold leading-4 text-[#505263] group-hover:text-[#5b4df5]">{label(item.primaryKeyword)}</span>
                    <span className="mt-1 block text-[8px] font-bold uppercase tracking-[.08em] text-[#a09eac]">{pageMeta(item.path,count)}</span>
                  </span>
                  <ArrowUpRight size={11} className="shrink-0 text-[#aaa6b8] transition group-hover:-translate-y-.5 group-hover:translate-x-.5 group-hover:text-[#5b4df5]"/>
                </TrackedLink>;
              })}
            </div>
          </section>;
        })}
      </div>
    </div>
  </section>
}
