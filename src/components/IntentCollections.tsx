import type {KeywordPage} from '@/data/keywordMaster';
import type {NameRecord} from '@/data/nameDataset';
import CopyButton from './CopyButton';

interface GroupDef{title:string;description:string;match:(item:NameRecord)=>boolean}
const has=(item:NameRecord,tag:string)=>item.tags.includes(tag);

function groupsFor(page:KeywordPage):GroupDef[]{
  switch(page.path){
    case '/nombres-gatos': return [
      {title:'Tiernos',description:'Opciones suaves y fáciles de llamar.',match:i=>has(i,'cute')},
      {title:'Para machos',description:'Ideas marcadas para gatos machos.',match:i=>has(i,'male')},
      {title:'Para hembras',description:'Ideas marcadas para gatas.',match:i=>has(i,'female')},
    ];
    case '/nombres-gatos-negros': return [
      {title:'Místicos',description:'Nombres con una sensación oscura o misteriosa.',match:i=>has(i,'mystic')},
      {title:'Para machos',description:'Ideas para gatos negros machos.',match:i=>has(i,'male')},
      {title:'Para hembras',description:'Ideas para gatas negras.',match:i=>has(i,'female')},
    ];
    case '/nombres-perritas': return [
      {title:'Pequeñas',description:'Nombres para perritas pequeñas.',match:i=>has(i,'small')},
      {title:'Tiernas',description:'Opciones suaves y cariñosas.',match:i=>has(i,'cute')},
      {title:'Con carácter',description:'Fuertes, elegantes o juguetonas.',match:i=>has(i,'strong')||has(i,'elegant')||has(i,'playful')},
    ];
    case '/perritas-chihuahua': return [
      {title:'Cortos',description:'Fáciles de repetir y reconocer.',match:i=>has(i,'short')||i.name.length<=4},
      {title:'Tiernos',description:'Para chihuahuas de aspecto dulce.',match:i=>has(i,'cute')},
      {title:'Juguetones',description:'Para una personalidad inquieta.',match:i=>has(i,'playful')},
    ];
    case '/nombres-de-mujer': return [
      {title:'Cortos',description:'Opciones breves y fáciles de recordar.',match:i=>has(i,'short')},
      {title:'Modernos',description:'Nombres con sensación contemporánea.',match:i=>has(i,'modern')},
      {title:'Clásicos',description:'Opciones tradicionales y familiares.',match:i=>has(i,'classic')},
    ];
    case '/nombres-de-nina': return [
      {title:'Cortos',description:'Ideas de pocas letras y sonido simple.',match:i=>has(i,'short')},
      {title:'Modernos',description:'Opciones actuales para comparar.',match:i=>has(i,'modern')},
      {title:'Poco comunes',description:'Ideas menos previsibles.',match:i=>has(i,'rare')},
    ];
    case '/nombres-raros': return [
      {title:'Muy cortos',description:'Breves y poco habituales.',match:i=>has(i,'short')},
      {title:'Unisex',description:'Sin una lectura de género única.',match:i=>i.gender==='U'},
      {title:'Poco comunes',description:'Marcados como menos habituales.',match:i=>has(i,'rare')},
    ];
    case '/nombres-free-fire': return [
      {title:'Cortos',description:'Bases rápidas de leer en partida.',match:i=>has(i,'short')},
      {title:'Dark',description:'Ideas con tono oscuro o agresivo.',match:i=>has(i,'dark')},
      {title:'Únicos',description:'Bases menos previsibles.',match:i=>has(i,'unique')},
    ];
    case '/nombres-ff-unicos': return [
      {title:'Cortos',description:'Bases de pocas letras para decorar.',match:i=>has(i,'short')},
      {title:'Dark',description:'Opciones oscuras con símbolos.',match:i=>has(i,'dark')},
      {title:'Fuertes',description:'Bases con sensación competitiva.',match:i=>has(i,'strong')},
    ];
    case '/nombres-ff-mujeres': return [
      {title:'Aesthetic',description:'Bases femeninas de tono suave.',match:i=>has(i,'aesthetic')},
      {title:'Cortos',description:'Nombres rápidos de leer.',match:i=>has(i,'short')},
      {title:'Fuertes',description:'Opciones con más presencia.',match:i=>has(i,'strong')},
    ];
    case '/nombres-clanes-ff': return [
      {title:'Cortos',description:'Tags compactos para el nickname.',match:i=>has(i,'short')},
      {title:'Dark',description:'Bases oscuras para clanes.',match:i=>has(i,'dark')},
      {title:'Fuertes',description:'Opciones con identidad agresiva.',match:i=>has(i,'strong')},
    ];
    default:return [];
  }
}

export default function IntentCollections({page,items}:{page:KeywordPage;items:NameRecord[]}){
  const groups=groupsFor(page).map(g=>({...g,items:items.filter(g.match).slice(0,6)})).filter(g=>g.items.length>=2);
  if(!groups.length)return null;
  return <section className="mt-14">
    <p className="gdn-eyebrow">Explora por intención</p>
    <h2 className="brand-serif mt-2 text-[36px] font-bold tracking-[-.035em] text-[#17231c]">Compara grupos antes de elegir</h2>
    <div className="mt-5 grid gap-4 lg:grid-cols-3">
      {groups.map(group=><article key={group.title} className="overflow-hidden rounded-[24px] border border-[#d5cbbb] bg-[#fffaf2]">
        <div className="border-b border-[#dfd6c9] bg-[#efe7da] px-5 py-4">
          <h3 className="brand-serif text-[23px] font-bold text-[#2a3b31]">{group.title}</h3>
          <p className="mt-1 text-[11px] leading-5 text-[#778179]">{group.description}</p>
        </div>
        <div className="divide-y divide-[#e2dacd]">{group.items.map(item=><div key={item.name} className="flex items-center justify-between gap-3 px-4 py-3.5"><span className="text-[12px] font-bold text-[#46544b]">{item.name}</span><CopyButton value={item.name}/></div>)}</div>
      </article>)}
    </div>
  </section>
}
