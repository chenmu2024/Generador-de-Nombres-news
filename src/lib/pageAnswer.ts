import type{KeywordPage}from'@/data/keywordMaster';
import{keywordPages}from'@/data/keywordMaster';
import type{NameRecord}from'@/data/nameDataset';
import{invisibleCharacters}from'@/data/invisibleCharacters';
import{brandChannels,brandIndustries,brandLanguages,brandStyles}from'@/lib/brandGenerator';
import{footballContexts,footballStyles}from'@/lib/generator';

export interface PageAnswerFact{label:string;value:string}
export interface PageAnswer{question:string;answer:string;facts:PageAnswerFact[];limitation:string}

function letters(name:string){
  return Array.from(name.replace(/[^\p{L}]/gu,'')).length;
}

function unique(values:(string|undefined)[]){
  return new Set(values.filter((value):value is string=>Boolean(value&&value.trim()))).size;
}

export function getPageAnswer(page:KeywordPage,items:NameRecord[]):PageAnswer{
  const verified=items.filter(item=>item.verified===true&&item.source&&item.sourceUrl).length;
  const sourced=items.filter(item=>Boolean(item.source&&item.sourceUrl)).length;
  const short=items.filter(item=>letters(item.name)<=4).length;
  const scripts=items.filter(item=>Boolean(item.script)).length;
  const pronunciations=items.filter(item=>Boolean(item.pronunciation)).length;
  const meanings=items.filter(item=>Boolean(item.meaning)).length;
  const origins=unique(items.map(item=>item.origin));
  const question='¿Qué puedes hacer con “'+page.primaryKeyword+'” en esta página?';

  if(page.path==='/nombres-por-letra'){
    const dedicated=keywordPages.filter(item=>item.path.startsWith('/nombres-con-')).length;
    return{
      question,
      answer:'Esta página de '+page.primaryKeyword+' funciona como un directorio A–Z: permite empezar por una inicial, abrir las letras con guía propia y explorar el resto sin crear páginas vacías o repetitivas.',
      facts:[
        {label:'Cobertura',value:'A–Z'},
        {label:'Guías por inicial',value:String(dedicated)},
        {label:'Uso principal',value:'Filtrar antes de comparar'},
      ],
      limitation:'La existencia de una guía propia para una letra no significa que esa inicial sea más popular; solo refleja que el sitio tiene una página específica y contenido suficiente para esa búsqueda.',
    };
  }

  if(page.tool==='invisible'){
    return{
      question,
      answer:'Para '+page.primaryKeyword+', esta herramienta permite copiar y probar '+invisibleCharacters.length+' caracteres Unicode que pueden verse vacíos. Puedes insertarlos en un nickname real antes de decidir cuál te sirve.',
      facts:[
        {label:'Caracteres disponibles',value:String(invisibleCharacters.length)},
        {label:'Prueba',value:'Dentro de tu nickname'},
        {label:'Salida',value:'Copiar 1–3 unidades'},
      ],
      limitation:'Que un carácter sea Unicode válido no garantiza que Free Fire u otra plataforma lo acepte: los filtros, normalizaciones y reglas de nombre pueden cambiar y deben comprobarse en el servicio de destino.',
    };
  }

  if(page.tool==='store'){
    return{
      question,
      answer:'Para '+page.primaryKeyword+', el generador combina sector, estilo, canal e idioma para producir candidatos de marca que puedas comparar antes de hacer una validación comercial.',
      facts:[
        {label:'Sectores',value:String(brandIndustries.length)},
        {label:'Estilos',value:String(brandStyles.length)},
        {label:'Combinaciones de contexto',value:String(brandChannels.length*brandLanguages.length)},
      ],
      limitation:'Las propuestas son ideas creativas: el sitio no comprueba automáticamente marcas registradas, dominios, perfiles sociales ni derechos de uso. Un finalista comercial necesita esas verificaciones por separado.',
    };
  }

  if(page.tool==='football'){
    return{
      question,
      answer:'Esta página de '+page.primaryKeyword+' genera propuestas de nombre y TAG para distintos escenarios y tonos, de modo que puedas evaluar la identidad completa en camiseta, escudo y marcador.',
      facts:[
        {label:'Escenarios',value:String(footballContexts.length)},
        {label:'Tonos',value:String(footballStyles.length)},
        {label:'Salida',value:'Nombre + TAG'},
      ],
      limitation:'El generador no comprueba si existe otro club, torneo o equipo con un nombre parecido. Antes de adoptar una opción conviene revisar el contexto local y cualquier requisito de registro aplicable.',
    };
  }

  if(page.tool==='culture'){
    return{
      question,
      answer:'Esta colección de '+page.primaryKeyword+' reúne '+items.length+' registros para comparar forma, origen y contexto. '+verified+' tienen fuente verificada, '+scripts+' conservan escritura original y '+pronunciations+' incluyen una guía de pronunciación.',
      facts:[
        {label:'Registros',value:String(items.length)},
        {label:'Con fuente verificada',value:String(verified)},
        {label:'Orígenes documentados',value:String(origins)},
      ],
      limitation:'Una misma romanización puede corresponder a escrituras o significados distintos. La página separa forma escrita, pronunciación, origen y fuente y evita completar esos datos cuando la base no los documenta.',
    };
  }

  if(page.tool==='people'){
    return{
      question,
      answer:'Esta página de '+page.primaryKeyword+' reúne '+items.length+' candidatos para comparar longitud, origen y significado. '+verified+' registros tienen fuente verificada y '+short+' opciones tienen entre tres y cuatro letras.',
      facts:[
        {label:'Candidatos',value:String(items.length)},
        {label:'Con fuente verificada',value:String(verified)},
        {label:'Opciones de 3–4 letras',value:String(short)},
      ],
      limitation:'Los conteos describen únicamente la colección actual del sitio. Etiquetas como moderno, clásico o poco común sirven para explorar y no equivalen a estadísticas oficiales de frecuencia o popularidad.',
    };
  }

  if(page.tool==='pet'){
    return{
      question,
      answer:'Esta página de '+page.primaryKeyword+' reúne '+items.length+' opciones de la colección actual y permite reducirlas por rasgos editoriales como longitud, personalidad, tamaño o color cuando esos datos están disponibles.',
      facts:[
        {label:'Opciones',value:String(items.length)},
        {label:'Opciones de 3–4 letras',value:String(short)},
        {label:'Etiquetas disponibles',value:String(unique(items.flatMap(item=>item.tags)))},
      ],
      limitation:'Las etiquetas de personalidad, tamaño o color son ayudas creativas para filtrar, no propiedades objetivas del nombre. La elección final debe funcionar para el animal real y para el uso diario.',
    };
  }

  return{
    question,
    answer:'Esta página de '+page.primaryKeyword+' reúne '+items.length+' bases o candidatos y los conecta con la herramienta correspondiente para personalizar, filtrar, copiar o probar resultados según la plataforma o intención.',
    facts:[
      {label:'Bases actuales',value:String(items.length)},
      {label:'Con significado',value:String(meanings)},
      {label:'Con fuente',value:String(sourced)},
    ],
    limitation:'La disponibilidad de usernames, símbolos o nombres cambia según la plataforma y el momento. Los resultados sirven como candidatos y deben probarse o verificarse en el servicio donde vayas a utilizarlos.',
  };
}
