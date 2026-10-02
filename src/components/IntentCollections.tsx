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
    case '/nombres-perros-machos': return [
      {title:'Fuertes',description:'Para perros con presencia o tamaño grande.',match:i=>has(i,'strong')},
      {title:'Pequeños',description:'Opciones compactas para perros pequeños.',match:i=>has(i,'small')||has(i,'short')},
      {title:'Tranquilos',description:'Nombres de sonido suave para perros calmados.',match:i=>has(i,'calm')},
    ];
    case '/nombres-caballos': return [
      {title:'Elegantes',description:'Nombres con presencia para caballos y yeguas.',match:i=>has(i,'elegant')},
      {title:'Fuertes',description:'Opciones asociadas a energía y potencia.',match:i=>has(i,'strong')},
      {title:'Para yeguas',description:'Ideas marcadas para caballos hembra.',match:i=>has(i,'female')},
    ];
    case '/nombres-peluches': return [
      {title:'Tiernos',description:'Nombres suaves para ositos y muñecos.',match:i=>has(i,'cute')},
      {title:'Kawaii',description:'Opciones de estética dulce y japonesa.',match:i=>has(i,'kawaii')},
      {title:'Pequeños',description:'Nombres cortos para peluches pequeños.',match:i=>has(i,'small')},
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
    case '/nombres-unisex': return [
      {title:'Cortos',description:'Opciones de pocas letras para comparar rápidamente.',match:i=>has(i,'short')},
      {title:'Modernos',description:'Nombres con uso contemporáneo en más de un género.',match:i=>has(i,'modern')},
      {title:'Clásicos o históricos',description:'Formas con una trayectoria más larga o tradicional.',match:i=>has(i,'classic')},
    ];
    case '/nombres-free-fire': return [
      {title:'Cortos',description:'Bases rápidas de leer en partida.',match:i=>has(i,'short')},
      {title:'Dark',description:'Ideas con tono oscuro o agresivo.',match:i=>has(i,'dark')},
      {title:'Únicos',description:'Bases menos previsibles.',match:i=>has(i,'unique')},
    ];
    case '/nombres-roblox': return [
      {title:'Cortos',description:'Bases fáciles de leer y volver a escribir.',match:i=>has(i,'short')},
      {title:'Aesthetic',description:'Ideas con una identidad visual más suave.',match:i=>has(i,'aesthetic')},
      {title:'Fuertes',description:'Opciones con una sensación más competitiva.',match:i=>has(i,'strong')},
    ];
    case '/nombres-instagram': return [
      {title:'Aesthetic',description:'Ideas pensadas para una identidad visual cuidada.',match:i=>has(i,'aesthetic')},
      {title:'Modernos',description:'Bases actuales para perfiles y proyectos.',match:i=>has(i,'modern')},
      {title:'Únicos',description:'Opciones menos previsibles para personalizar.',match:i=>has(i,'unique')},
    ];
    case '/nombres-anime': return [
      {title:'Aesthetic',description:'Bases inspiradas en una estética anime suave.',match:i=>has(i,'aesthetic')},
      {title:'Dark',description:'Ideas de tono nocturno, oscuro o intenso.',match:i=>has(i,'dark')},
      {title:'Únicos',description:'Combinaciones menos convencionales para juegos y redes.',match:i=>has(i,'unique')},
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
    default:
      if(page.tool==='culture')return [
        {title:'Con escritura original',description:'Compara nombres que conservan su escritura de origen.',match:i=>Boolean(i.script)},
        {title:'Con pronunciación',description:'Opciones con una guía de pronunciación documentada.',match:i=>Boolean(i.pronunciation)},
        {title:'Con significado verificado',description:'Registros cuyo significado incluye una fuente revisada.',match:i=>Boolean(i.meaning)&&i.verified===true&&Boolean(i.sourceUrl)},
      ];
      if(page.tool==='people')return [
        {title:'Cortos',description:'Opciones breves para comparar de un vistazo.',match:i=>has(i,'short')||i.name.length<=4},
        {title:'Femeninos',description:'Nombres marcados con uso femenino en la base actual.',match:i=>i.gender==='F'},
        {title:'Masculinos',description:'Nombres marcados con uso masculino en la base actual.',match:i=>i.gender==='M'},
      ];
      return [];
  }
}

export default function IntentCollections({page,items}:{page:KeywordPage;items:NameRecord[]}){
  const groups=groupsFor(page).map(g=>({...g,items:items.filter(g.match).slice(0,6)})).filter(g=>g.items.length>=2);
  if(!groups.length)return null;
  const heading=page.tool==='people'?'Compara estilos de nombre'
    :page.tool==='pet'?'Explora por rasgos y personalidad'
    :page.tool==='gaming'?'Prueba bases antes de decorarlas'
    :page.tool==='culture'?'Explora por contexto y origen'
    :'Compara grupos antes de elegir';
  const eyebrow=page.tool==='gaming'?'Bases para empezar':page.tool==='pet'?'Explora por intención':page.tool==='people'?'Atajos de comparación':'Explora por intención';
  return <section className="mt-14">
    <p className="gdn-eyebrow">{eyebrow}</p>
    <h2 className="gdn-display mt-2 text-[35px] font-bold tracking-[-.035em] text-[#1b1c2b]">{heading}</h2>
    <div className="mt-5 grid gap-4 lg:grid-cols-3">
      {groups.map(group=><article key={group.title} className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_8px_24px_rgba(55,49,91,.04)]">
        <div className="border-b border-[var(--page-border)] bg-[var(--page-soft)] px-5 py-4">
          <h3 className="gdn-editorial text-[22px] font-bold text-[#292a39]">{group.title}</h3>
          <p className="mt-1 text-[11px] leading-5 text-[#838697]">{group.description}</p>
        </div>
        <div className="divide-y divide-[#eceaf3]">{group.items.map(item=><div key={item.name} className="flex items-center justify-between gap-3 px-4 py-3.5"><span className="text-[12px] font-semibold text-[#515363]">{item.name}</span><CopyButton value={item.name}/></div>)}</div>
      </article>)}
    </div>
  </section>
}
