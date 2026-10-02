import{BookOpenCheck,Compass,Layers3,Ruler,ScanText,Sparkles,Tags,Type}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';
import type{NameRecord}from'@/data/nameDataset';
import{keywordPages}from'@/data/keywordMaster';
import{invisibleCharacters}from'@/data/invisibleCharacters';
import{brandChannels,brandIndustries,brandLanguages,brandStyles}from'@/lib/brandGenerator';
import{footballContexts,footballStyles}from'@/lib/generator';

type Fact={label:string;value:string|number;body:string;Icon:typeof Sparkles};

function letters(name:string){
  return Array.from(name.replace(/[^\p{L}]/gu,'')).length;
}

function unique(values:(string|undefined)[]){
  return new Set(values.filter((value):value is string=>Boolean(value&&value.trim()))).size;
}

export default function PageDataBrief({page,items}:{page:KeywordPage;items:NameRecord[]}){
  const verified=items.filter(item=>item.verified===true&&item.source&&item.sourceUrl).length;
  const short=items.filter(item=>letters(item.name)<=4).length;
  const meanings=items.filter(item=>Boolean(item.meaning)).length;
  const scripts=items.filter(item=>Boolean(item.script)).length;
  const pronunciations=items.filter(item=>Boolean(item.pronunciation)).length;
  const origins=unique(items.map(item=>item.origin));
  const tags=unique(items.flatMap(item=>item.tags));

  const petTraits=new Set(['cute','playful','calm','strong','elegant','mystic','kawaii']);
  const petColors=new Set(['black','orange','white','gray','brown']);
  const traitTagged=items.filter(item=>item.tags.some(tag=>petTraits.has(tag))).length;
  const colorTagged=items.filter(item=>item.tags.some(tag=>petColors.has(tag))).length;

  let facts:Fact[]=[];
  let note='Los contadores se calculan sobre los registros incluidos actualmente en esta página; no representan popularidad nacional.';

  if(page.path==='/nombres-por-letra'){
    const dedicated=keywordPages.filter(item=>item.path.startsWith('/nombres-con-')).length;
    facts=[
      {label:'Cobertura',value:'A–Z',body:'Empieza por cualquier inicial desde el explorador alfabético.',Icon:Type},
      {label:'Guías propias',value:dedicated,body:'Las letras con demanda validada tienen una página dedicada con más contexto.',Icon:Layers3},
      {label:'Resto de letras',value:'Vista rápida',body:'Las demás iniciales se pueden explorar sin salir del directorio.',Icon:Compass},
      {label:'Objetivo',value:'Filtrar',body:'Usa la inicial como primera criba y afina después por género, longitud u origen.',Icon:Sparkles},
    ];
    note='El directorio separa las letras con guía propia de las vistas rápidas para no crear páginas vacías.';
  }else if(page.tool==='invisible'){
    facts=[
      {label:'Variantes Unicode',value:invisibleCharacters.length,body:'Compara caracteres que visualmente parecen vacíos pero no son equivalentes.',Icon:ScanText},
      {label:'Copias rápidas',value:'1–3',body:'Puedes copiar una, dos o tres unidades sin tener que repetir manualmente.',Icon:Layers3},
      {label:'Prueba',value:'Tu nickname',body:'Inserta el carácter en una base real antes de decidir si te sirve.',Icon:Sparkles},
      {label:'Compatibilidad',value:'Variable',body:'El juego puede filtrar o normalizar caracteres según sus reglas actuales.',Icon:BookOpenCheck},
    ];
    note='La compatibilidad de Unicode depende de la plataforma; esta página sirve para probar, no para garantizar aceptación.';
  }else if(page.tool==='store'){
    facts=[
      {label:'Sectores',value:brandIndustries.length,body:'Cambia el tipo de negocio para que las combinaciones no partan siempre del mismo patrón.',Icon:Tags},
      {label:'Estilos',value:brandStyles.length,body:'Compara tonos de marca sin cambiar tu palabra base.',Icon:Sparkles},
      {label:'Canales',value:brandChannels.length,body:'Distingue tienda online, negocio físico y otros contextos de uso.',Icon:Compass},
      {label:'Idiomas',value:brandLanguages.length,body:'Prueba la misma idea con convenciones de naming diferentes.',Icon:Type},
    ];
    note='Los nombres y handles son propuestas locales. Antes de usarlos comercialmente debes comprobar marca, dominio y redes.';
  }else if(page.tool==='football'){
    facts=[
      {label:'Escenarios',value:footballContexts.length,body:'Separa equipo, torneo u otros contextos para no mezclar intenciones distintas.',Icon:Compass},
      {label:'Tonos',value:footballStyles.length,body:'Cambia el carácter del nombre manteniendo una misma palabra base.',Icon:Sparkles},
      {label:'Salida',value:'Nombre + TAG',body:'Las propuestas de equipo muestran una abreviatura para camiseta, marcador o escudo.',Icon:Layers3},
      {label:'Prueba',value:'En vivo',body:'Los resultados se actualizan mientras cambias base, escenario o tono.',Icon:Ruler},
    ];
    note='El generador produce ideas; no comprueba automáticamente equipos existentes ni disponibilidad en competiciones.';
  }else if(page.tool==='culture'){
    facts=[
      {label:'Colección',value:items.length,body:'Registros que cumplen el contexto cultural de esta página.',Icon:Layers3},
      {label:'Con fuente',value:verified,body:'Entradas con referencia revisada y enlace de origen en la base.',Icon:BookOpenCheck},
      {label:'Escritura original',value:scripts,body:'Registros que conservan caracteres o grafía original cuando está documentada.',Icon:ScanText},
      {label:'Pronunciación',value:pronunciations,body:'Entradas con una guía de lectura disponible en los datos actuales.',Icon:Type},
    ];
  }else if(page.tool==='pet'){
    facts=[
      {label:'Colección',value:items.length,body:'Opciones que cumplen especie, sexo o rasgo de esta página.',Icon:Layers3},
      {label:'3–4 letras',value:short,body:'Nombres especialmente compactos para llamar y repetir con facilidad.',Icon:Ruler},
      {label:'Personalidad',value:traitTagged,body:'Registros con etiquetas editoriales como tierno, fuerte, elegante o juguetón.',Icon:Sparkles},
      {label:'Color',value:colorTagged,body:'Opciones con una etiqueta de color cuando ese dato forma parte de la colección.',Icon:Tags},
    ];
  }else if(page.tool==='people'){
    facts=[
      {label:'Colección',value:items.length,body:'Candidatos que cumplen el filtro principal de esta página.',Icon:Layers3},
      {label:'Con fuente',value:verified,body:'Nombres con referencia revisada dentro de la base de datos.',Icon:BookOpenCheck},
      {label:'3–4 letras',value:short,body:'Opciones compactas para comparar rápidamente longitud y sonoridad.',Icon:Ruler},
      {label:'Orígenes',value:origins,body:'Contextos de origen distintos presentes en los registros actuales.',Icon:Compass},
    ];
  }else{
    facts=[
      {label:'Bases disponibles',value:items.length,body:'Ideas iniciales que puedes tomar como punto de partida antes de personalizar.',Icon:Layers3},
      {label:'3–4 letras',value:short,body:'Bases especialmente cortas dentro de la colección actual.',Icon:Ruler},
      {label:'Etiquetas',value:tags,body:'Rasgos de exploración disponibles entre estilos, plataformas o usos.',Icon:Tags},
      {label:'Con significado',value:meanings,body:'Registros que además incluyen una nota de significado en la base.',Icon:BookOpenCheck},
    ];
  }

  return <section className="mt-7 rounded-[20px] border border-[var(--page-border)] bg-[var(--page-soft)]/40 p-4 sm:p-5">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="gdn-eyebrow">Resumen de esta página</p>
        <h2 className="gdn-editorial mt-1.5 text-[23px] font-bold text-[#2a2b39]">Qué contiene “{page.primaryKeyword}” antes de empezar</h2>
      </div>
      <p className="max-w-[420px] text-[9px] leading-4 text-[#858899]">{note}</p>
    </div>
    <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
      {facts.map(({label,value,body,Icon})=><article key={label} className="rounded-[14px] border border-[var(--page-border)] bg-white p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[8px] font-black uppercase tracking-[.09em] text-[#9395a4]">{label}</span>
          <Icon size={12} className="text-[var(--page-accent)]"/>
        </div>
        <p className="gdn-display mt-2 text-[22px] font-bold text-[#292a38]">{value}</p>
        <p className="mt-1.5 text-[9px] leading-4 text-[#858899]">{body}</p>
      </article>)}
    </div>
  </section>;
}
