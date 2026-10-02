import type{KeywordPage,ToolMode}from'@/data/keywordMaster';

export interface KeywordPlacement{
  keyword:string;
  description:string;
}

export function normalizeKeyword(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
}

function hasAny(value:string,terms:string[]){
  return terms.some(term=>value.includes(term));
}

function fallback(tool:ToolMode){
  if(tool==='people')return'Usa los filtros de longitud, estilo, origen y género cuando estén disponibles, guarda candidatos y compáralos antes de decidir.';
  if(tool==='pet')return'Explora la colección por rasgos, tamaño, color o personalidad y prueba en voz alta los nombres que mejor encajen.';
  if(tool==='culture')return'Compara escritura, romanización, pronunciación, origen y fuente antes de interpretar el nombre fuera de su contexto.';
  if(tool==='gaming'||tool==='invisible')return'Prueba variantes dentro del generador, copia las que te interesen y comprueba después la compatibilidad real en la plataforma.';
  if(tool==='store')return'Genera varios candidatos y valida después marca, dominio y perfiles sociales antes de usar uno comercialmente.';
  if(tool==='football')return'Compara nombre completo y versión corta para comprobar cómo funcionaría en camiseta, escudo, marcador y redes.';
  return'Explora varias alternativas, copia las que te interesen y usa la herramienta relacionada para llevar la búsqueda a un caso más concreto.';
}

export function explainKeywordIntent(keyword:string,page:KeywordPage){
  const value=normalizeKeyword(keyword);

  if(hasAny(value,['validador','validar username','validar usuario'])){
    return page.path==='/nombres-roblox'
      ?'El modo Username comprueba reglas locales de formato de Roblox; no consulta disponibilidad ni garantiza que el nombre esté libre.'
      :'Usa las variantes como comprobación de formato visual. La disponibilidad real del username debe revisarse dentro de la plataforma.';
  }
  if(hasAny(value,['acta de adopcion','certificado de adopcion'])){
    return'Elige primero el nombre del peluche y úsalo como dato principal del acta o certificado junto con fecha de adopción, adoptante y una pequeña promesa o nota.';
  }
  if(hasAny(value,['3 letras','4 letras','cortos','cortas','cortitos','corto'])){
    return'Prioriza el filtro de longitud y compara opciones breves; un nombre corto suele ser más fácil de leer, repetir y recordar.';
  }
  if(hasAny(value,['significado','significados'])){
    return'Compara el significado solo cuando esté documentado y revisa la fuente o el contexto antes de tratar una interpretación como definitiva.';
  }
  if(hasAny(value,['kanji','hangul','hanzi','romanizacion','transliteracion','fonetica','pronunciacion'])){
    return'Usa la escritura original y la guía de lectura como datos separados: una romanización o pronunciación aproximada no sustituye el contexto lingüístico.';
  }
  if(hasAny(value,['espacio invisible','espacios invisibles','letra invisible','espacio en blanco','unicode u+3000','simbolos','unicode'])){
    return'Prueba el carácter o símbolo en el generador y verifica después si la plataforma lo conserva, porque puede normalizar, filtrar o rechazar Unicode.';
  }
  if(hasAny(value,['clan','clanes','escuadra','escuadras','tag','tags','prefijo','prefijos'])){
    return'Busca una base que funcione como identidad de grupo y comprueba también una versión corta para tag, prefijo o lectura rápida dentro del juego.';
  }
  if(hasAny(value,['blox fruits','brookhaven','genshin impact','discord','roblox anime','free fire','ff','kpop','doramas'])){
    return'Adapta la base al contexto concreto del juego, comunidad o perfil y evita asumir que un formato aceptado en una plataforma funcionará igual en otra.';
  }
  if(hasAny(value,['mujer','mujeres','femenino','femenina','hembra','hembras','niña','nina','diosas','gatitas','perritas','yeguas'])){
    return'Filtra o compara las opciones de uso femenino dentro de esta colección y revisa sonido, longitud, origen o estilo según el contexto.';
  }
  if(hasAny(value,['hombre','hombres','masculino','masculinos','macho','machos','niño','nino','gatitos machos','perros machos','caballos machos'])){
    return'Filtra o compara las opciones de uso masculino y contrasta longitud, sonido, origen o estilo antes de guardar tus candidatos.';
  }
  if(hasAny(value,['raro','raros','raras','poco comun','poco comunes','unico','unicos','unicas','original','originales','exotico','exoticos','extravagantes'])){
    return'Usa estas etiquetas como criterio de exploración, no como garantía estadística de rareza o exclusividad; comprueba después el contexto donde usarás el nombre.';
  }
  if(hasAny(value,['aesthetic','bonitos','bonitas','elegantes','romanticos','tiernos','tiernas','kawaii','fuertes','modernos','modernas','clasicos','clasicas'])){
    return'Empieza por el estilo que buscas y compáralo con legibilidad, sonido y uso real para no elegir solo por la primera impresión visual.';
  }
  if(hasAny(value,['tienda','tiendas','negocio','negocios','boutique','boutiques','bazar','bazares','ropa','en linea'])){
    return'Genera varias alternativas para ese tipo de negocio y descarta las que sean difíciles de recordar; después revisa marca, dominio y redes.';
  }
  if(hasAny(value,['gato','gatos','gatita','gatitas','perro','perros','perrita','perritas','chihuahua','caballo','caballos','yegua','yeguas','potrillo','potrillos','peluche','peluches','osito','ositos','squishmallows','muñeco','muneco'])){
    return'Usa los filtros de rasgos disponibles y prueba el nombre en voz alta; en mascotas y peluches la facilidad de repetirlo suele importar más que una etiqueta estética aislada.';
  }
  if(hasAny(value,['por letra','inicial','empiezan con','con la letra'])){
    return'Usa el directorio por inicial para reducir la lista y después compara longitud, género de uso, origen y significado cuando estén disponibles.';
  }

  return fallback(page.tool);
}

export function getKeywordPlacements(page:KeywordPage):KeywordPlacement[]{
  return page.secondaryKeywords.map(keyword=>({keyword,description:explainKeywordIntent(keyword,page)}));
}
