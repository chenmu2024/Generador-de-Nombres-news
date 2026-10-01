import type {KeywordPage} from '@/data/keywordMaster';
import type {NameRecord} from '@/data/nameDataset';
import CopyButton from './CopyButton';

interface GroupDef{
  title:string;
  description:string;
  match:(item:NameRecord)=>boolean;
}

const has=(item:NameRecord,tag:string)=>item.tags.includes(tag);

function groupsFor(page:KeywordPage):GroupDef[]{
  switch(page.path){
    case '/nombres-gatos':
      return [
        {title:'Tiernos',description:'Opciones suaves y fáciles de llamar.',match:item=>has(item,'cute')},
        {title:'Para machos',description:'Ideas marcadas para gatos machos.',match:item=>has(item,'male')},
        {title:'Para hembras',description:'Ideas marcadas para gatas.',match:item=>has(item,'female')},
      ];
    case '/nombres-gatos-negros':
      return [
        {title:'Místicos',description:'Nombres con una sensación oscura o misteriosa.',match:item=>has(item,'mystic')},
        {title:'Para machos',description:'Ideas para gatos negros machos.',match:item=>has(item,'male')},
        {title:'Para hembras',description:'Ideas para gatas negras.',match:item=>has(item,'female')},
      ];
    case '/nombres-perritas':
      return [
        {title:'Pequeñas',description:'Nombres que encajan bien con perritas pequeñas.',match:item=>has(item,'small')},
        {title:'Tiernas',description:'Opciones suaves y cariñosas.',match:item=>has(item,'cute')},
        {title:'Con carácter',description:'Opciones fuertes, elegantes o juguetonas.',match:item=>has(item,'strong')||has(item,'elegant')||has(item,'playful')},
      ];
    case '/perritas-chihuahua':
      return [
        {title:'Cortos',description:'Fáciles de repetir y reconocer.',match:item=>has(item,'short')||item.name.length<=4},
        {title:'Tiernos',description:'Para chihuahuas de aspecto dulce.',match:item=>has(item,'cute')},
        {title:'Juguetones',description:'Para una personalidad inquieta y divertida.',match:item=>has(item,'playful')},
      ];
    case '/nombres-de-mujer':
      return [
        {title:'Cortos',description:'Opciones breves y fáciles de recordar.',match:item=>has(item,'short')},
        {title:'Modernos',description:'Nombres con uso o sensación contemporánea.',match:item=>has(item,'modern')},
        {title:'Clásicos',description:'Opciones tradicionales que siguen siendo familiares.',match:item=>has(item,'classic')},
      ];
    case '/nombres-de-nina':
      return [
        {title:'Cortos',description:'Ideas de pocas letras y sonido simple.',match:item=>has(item,'short')},
        {title:'Modernos',description:'Opciones actuales para comparar.',match:item=>has(item,'modern')},
        {title:'Poco comunes',description:'Ideas menos previsibles dentro de la base actual.',match:item=>has(item,'rare')},
      ];
    case '/nombres-raros':
      return [
        {title:'Muy cortos',description:'Opciones breves que se salen de lo habitual.',match:item=>has(item,'short')},
        {title:'Unisex',description:'Nombres que pueden funcionar sin una lectura de género única.',match:item=>item.gender==='U'},
        {title:'Poco comunes',description:'Registros marcados específicamente como menos habituales.',match:item=>has(item,'rare')},
      ];
    case '/nombres-free-fire':
      return [
        {title:'Cortos',description:'Bases rápidas de leer en partida.',match:item=>has(item,'short')},
        {title:'Dark',description:'Ideas con tono oscuro o agresivo.',match:item=>has(item,'dark')},
        {title:'Únicos',description:'Bases pensadas para combinaciones menos previsibles.',match:item=>has(item,'unique')},
      ];
    case '/nombres-ff-unicos':
      return [
        {title:'Cortos',description:'Bases de pocas letras para decorar.',match:item=>has(item,'short')},
        {title:'Dark',description:'Opciones oscuras para combinar con símbolos.',match:item=>has(item,'dark')},
        {title:'Fuertes',description:'Bases con una sensación competitiva.',match:item=>has(item,'strong')},
      ];
    case '/nombres-ff-mujeres':
      return [
        {title:'Aesthetic',description:'Bases femeninas con un tono visual más suave.',match:item=>has(item,'aesthetic')},
        {title:'Cortos',description:'Nombres femeninos rápidos de leer.',match:item=>has(item,'short')},
        {title:'Fuertes',description:'Opciones femeninas con más presencia.',match:item=>has(item,'strong')},
      ];
    case '/nombres-clanes-ff':
      return [
        {title:'Cortos',description:'Tags compactos para anteponer al nickname.',match:item=>has(item,'short')},
        {title:'Dark',description:'Bases oscuras para clanes competitivos.',match:item=>has(item,'dark')},
        {title:'Fuertes',description:'Opciones con una identidad más agresiva.',match:item=>has(item,'strong')},
      ];
    default:
      return [];
  }
}

export default function IntentCollections({page,items}:{page:KeywordPage;items:NameRecord[]}){
  const groups=groupsFor(page)
    .map(group=>({...group,items:items.filter(group.match).slice(0,6)}))
    .filter(group=>group.items.length>=2);

  if(!groups.length)return null;

  return <section className="mt-12">
    <div className="max-w-2xl">
      <p className="gdn-eyebrow">Explora por intención</p>
      <h2 className="mt-2 text-2xl font-black tracking-[-.02em]">Compara grupos antes de elegir</h2>
    </div>
    <div className="mt-5 grid gap-4 lg:grid-cols-3">
      {groups.map(group=><article key={group.title} className="gdn-card rounded-3xl p-5">
        <h3 className="text-lg font-black">{group.title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#767a84]">{group.description}</p>
        <div className="mt-4 space-y-2">
          {group.items.map(item=><div key={item.name} className="flex items-center justify-between gap-3 rounded-xl border border-[#ececf0] bg-[#fbfbfc] px-3 py-2.5">
            <span className="truncate text-sm font-extrabold">{item.name}</span>
            <CopyButton value={item.name}/>
          </div>)}
        </div>
      </article>)}
    </div>
  </section>
}
