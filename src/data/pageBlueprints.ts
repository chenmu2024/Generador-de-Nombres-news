export interface PageBlueprintCard{
  title:string;
  body:string;
}

export interface PageBlueprint{
  hero:{eyebrow:string;title:string;body:string};
  guide:{title:string;summary:string;cards:[PageBlueprintCard,PageBlueprintCard,PageBlueprintCard]};
  faq:{question:string;answer:string};
}

export const pageBlueprints:Record<string,PageBlueprint>={
  '/nombres-free-fire':{
    hero:{eyebrow:'Nicknames para jugar',title:'Parte de una base y llévala a tu estilo.',body:'Combina nombres, símbolos, marcos y variantes cortas sin perder de vista la compatibilidad real dentro del juego.'},
    guide:{title:'Cómo construir un nickname de Free Fire que puedas usar',summary:'Empieza con una base fácil de reconocer y cambia una sola dimensión cada vez: longitud, símbolos o marco.',cards:[
      {title:'Base reconocible',body:'Conserva una palabra o raíz que puedas identificar incluso después de decorarla.'},
      {title:'Decoración controlada',body:'Añade símbolos o marcos sin convertir el nombre en algo difícil de leer o copiar.'},
      {title:'Prueba final',body:'Comprueba el resultado dentro del juego antes de guardarlo como definitivo.'},
    ]},
    faq:{question:'¿Cómo usar esta página si todavía no tengo una idea de nickname?',answer:'Empieza por los resultados de la colección, elige una base corta y después pásala por el generador para probar estilos, símbolos o espacio invisible.'},
  },
  '/generador-free-fire':{
    hero:{eyebrow:'Generador directo',title:'Convierte una palabra en varias versiones jugables.',body:'Escribe una base y compara salidas limpias, decoradas, cortas o con compatibilidad alta.'},
    guide:{title:'De una palabra base a un nickname listo para probar',summary:'El generador funciona mejor cuando partes de una palabra simple y comparas variantes en lugar de mezclar todos los efectos a la vez.',cards:[
      {title:'Escribe una base',body:'Usa una palabra que ya te guste; no hace falta que tenga símbolos desde el principio.'},
      {title:'Elige una dirección',body:'Prueba corto, símbolos, invisible o compatibilidad alta según lo que necesites.'},
      {title:'Copia solo finalistas',body:'Quédate con pocas variantes y pruébalas en Free Fire antes de decidir.'},
    ]},
    faq:{question:'¿Qué diferencia hay entre este generador y la página general de nombres para Free Fire?',answer:'Esta página está centrada en transformar una palabra base. La página general combina colección de ideas y generador para quienes todavía están explorando.'},
  },
  '/espacios-invisible-ff':{
    hero:{eyebrow:'Unicode para copiar',title:'Prueba varios caracteres invisibles antes de elegir uno.',body:'No todos los espacios visualmente vacíos son iguales ni todas las plataformas los conservan.'},
    guide:{title:'Cómo probar un espacio invisible sin adivinar',summary:'Copia una variante, insértala en tu nickname y verifica si el juego la conserva tal como esperas.',cards:[
      {title:'Compara códigos',body:'U+3164, U+FFA0, U+2800 y otras alternativas pueden comportarse de forma distinta.'},
      {title:'Ensaya con tu nombre',body:'Usa el campo de prueba para ver dónde queda el carácter dentro de tu nickname.'},
      {title:'Ten una alternativa',body:'Si una plataforma elimina un carácter, prueba otra variante antes de cambiar todo el nombre.'},
    ]},
    faq:{question:'¿Por qué esta página ofrece más de un espacio invisible?',answer:'Porque distintos caracteres Unicode pueden verse vacíos pero no son equivalentes. La compatibilidad puede variar según la plataforma y sus filtros.'},
  },
  '/nombres-ff-unicos':{
    hero:{eyebrow:'Variantes poco comunes',title:'Busca diferenciación sin prometer exclusividad imposible.',body:'La página combina bases raras, formatos cortos y estilos visuales para ayudarte a salir de los nombres más repetidos.'},
    guide:{title:'Cómo buscar un nombre menos repetido en Free Fire',summary:'La mejor estrategia es combinar una base poco obvia con una modificación pequeña y fácil de recordar.',cards:[
      {title:'Base menos obvia',body:'Empieza por una palabra que no dependa de los mismos términos usados por todo el mundo.'},
      {title:'Cambia poco',body:'Una variación corta suele ser más legible que una cadena larga de símbolos.'},
      {title:'Verifica disponibilidad',body:'“Único” aquí significa orientación creativa; la disponibilidad real solo puede comprobarse en el juego.'},
    ]},
    faq:{question:'¿La página garantiza que nadie tenga el nombre?',answer:'No. Sirve para producir combinaciones menos obvias, pero solo Free Fire puede confirmar si una variante concreta está disponible.'},
  },
  '/nombres-ff-mujeres':{
    hero:{eyebrow:'Estilos femeninos',title:'Compara bases suaves, fuertes, dark o aesthetic.',body:'El objetivo es darte más de una dirección visual sin reducir los nombres femeninos a un único estilo.'},
    guide:{title:'Cómo elegir un nickname femenino sin caer en una sola estética',summary:'Prueba una misma base con estilos distintos y decide por legibilidad, tono y uso dentro del juego.',cards:[
      {title:'Aesthetic',body:'Funciona bien si buscas una presencia visual más suave o decorativa.'},
      {title:'Fuerte o dark',body:'Útil si prefieres contraste, presencia competitiva o una lectura más agresiva.'},
      {title:'Versión corta',body:'Mantén una alternativa simple por si la versión decorada resulta difícil de escribir.'},
    ]},
    faq:{question:'¿Los nombres femeninos tienen que ser aesthetic?',answer:'No. La colección mezcla estilos aesthetic, fuertes, oscuros y simples para que puedas elegir el tono que realmente quieras usar.'},
  },
  '/nombres-clanes-ff':{
    hero:{eyebrow:'Clan y escuadra',title:'Piensa en nombre completo, TAG y prefijo como un sistema.',body:'Un buen clan no necesita solo un nombre; también necesita una forma corta que funcione junto a los nicknames de sus miembros.'},
    guide:{title:'Cómo convertir una idea en identidad de clan',summary:'Comprueba que el nombre completo, su abreviatura y el posible prefijo funcionen juntos.',cards:[
      {title:'Nombre completo',body:'Debe poder decirse y recordarse sin depender únicamente de símbolos.'},
      {title:'TAG corto',body:'Prueba una abreviatura compacta que funcione en marcador, chat y nickname.'},
      {title:'Uso compartido',body:'Evalúa cómo se verá el prefijo cuando varios miembros lo usen a la vez.'},
    ]},
    faq:{question:'¿Qué conviene decidir primero: el nombre del clan o el TAG?',answer:'Empieza por el nombre completo y después comprueba si puede resumirse en un TAG corto y reconocible sin perder identidad.'},
  },
  '/nombres-roblox':{
    hero:{eyebrow:'Roblox',title:'Separa Username, Display Name y contexto de juego.',body:'La herramienta distingue formato de cuenta y nombre visible, además de ofrecer modos para Blox Fruits y Brookhaven.'},
    guide:{title:'Cómo usar el generador de Roblox según lo que vas a cambiar',summary:'No uses el mismo criterio para un Username técnico y para un Display Name visual.',cards:[
      {title:'Username',body:'Mantén el formato simple y revisa las reglas locales antes de probar disponibilidad.'},
      {title:'Display Name',body:'Aquí puedes priorizar estilo, lectura y tono visual sin confundirlo con el identificador de cuenta.'},
      {title:'Modo de juego',body:'Blox Fruits y Brookhaven cambian el tipo de combinación que genera la herramienta.'},
    ]},
    faq:{question:'¿Qué modo debo usar para Blox Fruits o Brookhaven?',answer:'Usa los atajos de intención del generador. Cambian las combinaciones propuestas sin alterar las reglas básicas del campo Username.'},
  },
  '/nombres-instagram':{
    hero:{eyebrow:'Perfil y username',title:'Diseña el identificador y el nombre visible por separado.',body:'El username necesita simplicidad; el nombre visible permite probar una estética más expresiva.'},
    guide:{title:'Cómo construir una identidad de Instagram coherente',summary:'Parte de una misma base y decide qué debe ir en el username y qué puede reservarse para el nombre visible.',cards:[
      {title:'Username limpio',body:'Prioriza una variante fácil de escribir, recordar y compartir fuera de la app.'},
      {title:'Nombre visible',body:'Puedes usar Unicode o una estética más libre sin cargar el identificador principal.'},
      {title:'Consistencia',body:'Comprueba que ambas versiones parezcan pertenecer al mismo perfil o proyecto.'},
    ]},
    faq:{question:'¿Conviene usar letras decoradas en el username de Instagram?',answer:'La herramienta las reserva para el nombre visible. Para el username conviene mantener una variante simple y comprobar disponibilidad dentro de Instagram.'},
  },
  '/nombres-anime':{
    hero:{eyebrow:'Anime y gaming',title:'Usa la estética anime sin confundirla con nombres japoneses reales.',body:'Aquí se mezclan ideas para perfiles y juegos; si buscas nombres japoneses documentados, usa la colección cultural específica.'},
    guide:{title:'Cómo elegir un nombre de estética anime para juegos o redes',summary:'Decide primero si quieres una referencia clara al anime o solo un tono inspirado en esa estética.',cards:[
      {title:'Referencia directa',body:'Útil si quieres que la inspiración anime sea evidente en el nickname.'},
      {title:'Estética indirecta',body:'Combina bases cortas, sonidos y estilos sin copiar un personaje concreto.'},
      {title:'Contexto de uso',body:'Prueba cómo funciona en Discord, Roblox, Genshin u otra plataforma antes de fijarlo.'},
    ]},
    faq:{question:'¿Esta página sirve para buscar nombres japoneses reales?',answer:'No es su objetivo principal. Está orientada a nicknames de estética anime; para nombres japoneses documentados conviene usar la página cultural de nombres japoneses.'},
  },
  '/nombres-de-mujer':{
    hero:{eyebrow:'Comparador de nombres',title:'Explora por estilo, origen y significado documentado.',body:'Puedes reducir la lista, guardar candidatos y volver a comparar sin decidir por una sola etiqueta.'},
    guide:{title:'Cómo reducir una lista amplia de nombres de mujer',summary:'Empieza con un criterio fuerte y usa los demás para desempatar entre finalistas.',cards:[
      {title:'Sonoridad',body:'Di el nombre junto con los apellidos y escucha el ritmo completo.'},
      {title:'Origen y significado',body:'Da más peso a los datos que incluyen una fuente revisada.'},
      {title:'Lista corta',body:'Guarda pocos candidatos para compararlos con calma en lugar de acumular decenas.'},
    ]},
    faq:{question:'¿Cómo usar esta página si tengo demasiadas opciones?',answer:'Filtra primero por un criterio principal como longitud, estilo u origen y guarda solo unas pocas finalistas para compararlas juntas.'},
  },
  '/nombres-de-nina':{
    hero:{eyebrow:'Nombres de niña',title:'Compara opciones cortas, poco comunes y modernas.',body:'La página está pensada para pasar de una lista amplia a un grupo pequeño que puedas probar con los apellidos.'},
    guide:{title:'Cómo comparar nombres de niña sin quedarte solo con la primera impresión',summary:'Combina longitud, estilo y sonoridad y revisa el significado cuando esté documentado.',cards:[
      {title:'3–4 letras',body:'Empieza aquí si la prioridad es un nombre breve y fácil de escribir.'},
      {title:'Poco común',body:'Úsalo como criterio de exploración, no como una garantía estadística de rareza.'},
      {title:'Con apellidos',body:'Lee siempre el nombre completo antes de descartarlo o elegirlo.'},
    ]},
    faq:{question:'¿Cómo encuentro nombres de niña de 3 o 4 letras?',answer:'Usa el atajo de longitud corta y después compara estilo, origen y sonoridad entre los resultados que queden.'},
  },
  '/nombres-de-nino':{
    hero:{eyebrow:'Nombres de niño',title:'Cruza modernidad, longitud y significado.',body:'La herramienta permite ordenar y filtrar candidatos masculinos sin presentar una tendencia editorial como un hecho absoluto.'},
    guide:{title:'Cómo comparar nombres de niño modernos y con significado',summary:'Decide si te importa más la sonoridad, la longitud o el contexto del nombre y usa el resto como apoyo.',cards:[
      {title:'Moderno',body:'Trátalo como una etiqueta de exploración, no como una medición objetiva de popularidad.'},
      {title:'Corto',body:'Puede facilitar escritura y pronunciación, pero comprueba cómo suena con los apellidos.'},
      {title:'Significado',body:'Revisa la fuente cuando exista antes de usar una traducción como criterio principal.'},
    ]},
    faq:{question:'¿Puedo buscar nombres de niño modernos y cortos a la vez?',answer:'Sí. Combina los filtros de estilo y longitud y después revisa origen, sonoridad y significado de los candidatos que queden.'},
  },
  '/nombres-unisex':{
    hero:{eyebrow:'Uso neutro o mixto',title:'Compara nombres documentados en más de un uso de género.',body:'El uso unisex puede cambiar según país, idioma y época; la ficha conserva ese contexto cuando está disponible.'},
    guide:{title:'Cómo interpretar una lista de nombres unisex',summary:'No des por hecho que el mismo equilibrio de uso existe en todos los lugares.',cards:[
      {title:'Uso documentado',body:'Prioriza registros cuya fuente admita uso masculino y femenino o equivalente.'},
      {title:'Contexto',body:'Comprueba idioma y tradición antes de extrapolar el uso a otro país.'},
      {title:'Sonoridad',body:'Prueba el nombre completo con apellidos y posibles diminutivos.'},
    ]},
    faq:{question:'¿Un nombre marcado como unisex se usa igual para ambos géneros?',answer:'No necesariamente. La etiqueta indica que existe uso documentado en más de un género, pero la frecuencia puede ser muy distinta según el contexto.'},
  },
  '/nombres-raros':{
    hero:{eyebrow:'Poco comunes',title:'Explora rareza sin confundirla con invención.',body:'La colección reúne nombres menos habituales, cortos o singulares, pero evita prometer una frecuencia concreta que la base no mide.'},
    guide:{title:'Cómo buscar un nombre poco común sin perder contexto',summary:'Un nombre puede ser raro en un lugar y normal en otro; usa la categoría como punto de partida.',cards:[
      {title:'Origen',body:'Comprueba de qué tradición procede antes de interpretar su rareza.'},
      {title:'Pronunciación',body:'Un nombre muy singular puede ser menos práctico si nadie sabe cómo decirlo.'},
      {title:'Uso real',body:'Contrasta la etiqueta editorial con la fuente y el contexto que te interese.'},
    ]},
    faq:{question:'¿Cómo se decide que un nombre es “raro” en esta página?',answer:'Se usa como categoría de exploración basada en rasgos editoriales de la colección; no representa una estadística oficial de frecuencia por país.'},
  },
  '/nombres-por-letra':{
    hero:{eyebrow:'Directorio A–Z',title:'Empieza por la inicial y reduce el universo de opciones.',body:'Puedes entrar en las letras con guía propia o abrir una vista rápida para el resto del alfabeto.'},
    guide:{title:'Cómo aprovechar el directorio por inicial',summary:'Usa la letra como primer filtro y después cruza género, longitud, origen y significado.',cards:[
      {title:'Elige inicial',body:'Parte de una letra si ya sabes cómo quieres que empiece el nombre.'},
      {title:'Abre la vista rápida',body:'Las letras sin página propia siguen mostrando nombres directamente en el directorio.'},
      {title:'Refina después',body:'Una vez dentro de una letra, usa longitud y género para acortar la lista.'},
    ]},
    faq:{question:'¿Tengo que entrar en una página distinta para cada letra?',answer:'No. El directorio permite abrir resultados rápidos para letras sin guía propia y enlaza a páginas completas solo donde ya existe una colección dedicada.'},
  },
  '/nombres-con-a':{
    hero:{eyebrow:'Inicial A',title:'Filtra nombres con A por género, longitud y estilo.',body:'La A reúne opciones muy distintas; usa filtros para separar rápidamente el tipo de nombre que buscas.'},
    guide:{title:'Cómo explorar nombres que empiezan por A',summary:'Empieza por género o longitud y usa origen y significado para comparar finalistas.',cards:[
      {title:'Hombre o mujer',body:'Separa primero el uso documentado si esa distinción es importante para ti.'},
      {title:'Cortos o largos',body:'Ordena por longitud para ver cómo cambia el ritmo del nombre.'},
      {title:'Bonitos o raros',body:'Usa esas etiquetas como orientación editorial y confirma después el contexto del nombre.'},
    ]},
    faq:{question:'¿Puedo ver solo nombres con A de mujer o de hombre?',answer:'Sí. Usa el filtro de género dentro de la colección y combínalo con longitud, estilo u origen.'},
  },
  '/nombres-con-b':{
    hero:{eyebrow:'Inicial B',title:'Compara una inicial menos extensa sin perder filtros.',body:'La lista con B es más compacta, por lo que resulta útil comparar directamente género, longitud y origen.'},
    guide:{title:'Cómo elegir entre nombres que empiezan por B',summary:'Aprovecha el tamaño de la colección para leer y comparar más candidatos completos.',cards:[
      {title:'Género de uso',body:'Separa nombres masculinos, femeninos o unisex cuando la ficha lo documente.'},
      {title:'Longitud',body:'Prueba primero los nombres cortos si buscas algo fácil de escribir y repetir.'},
      {title:'Contexto',body:'Revisa origen y significado antes de decidir solo por sonido.'},
    ]},
    faq:{question:'¿La página incluye nombres con B para hombre y mujer?',answer:'Sí. La colección puede filtrarse por género de uso y luego combinarse con longitud, origen y otros criterios disponibles.'},
  },
  '/nombres-con-c':{
    hero:{eyebrow:'Inicial C',title:'Explora nombres con C y compáralos por uso y origen.',body:'La página concentra opciones femeninas, masculinas y mixtas que empiezan por C.'},
    guide:{title:'Cómo refinar una búsqueda de nombres con C',summary:'Usa un filtro principal y compara después cómo suenan los candidatos completos.',cards:[
      {title:'Uso femenino',body:'Activa el filtro correspondiente si buscas específicamente nombres de mujer o niña.'},
      {title:'Uso masculino',body:'Separa los registros masculinos antes de comparar longitud y origen.'},
      {title:'Sonoridad',body:'Lee cada candidato junto con los apellidos para detectar repeticiones o choques.'},
    ]},
    faq:{question:'¿Cómo encuentro nombres con C de mujer?',answer:'Selecciona el filtro femenino y después ordena o filtra por longitud, origen o estilo según lo que quieras priorizar.'},
  },
  '/nombres-con-e':{
    hero:{eyebrow:'Inicial E',title:'Nombres con E para comparar por género y longitud.',body:'Usa la lista para pasar de una inicial concreta a un conjunto pequeño de candidatos.'},
    guide:{title:'Cómo sacar partido a la inicial E',summary:'La E permite comparar nombres muy distintos; longitud y sonoridad ayudan a crear una primera criba.',cards:[
      {title:'Masculinos',body:'Filtra el uso masculino si quieres evitar mezclar categorías desde el principio.'},
      {title:'Femeninos',body:'Haz lo mismo con el uso femenino y compara después origen y significado.'},
      {title:'Ritmo',body:'Prueba el nombre completo para valorar repeticiones de vocales o sílabas.'},
    ]},
    faq:{question:'¿Puedo separar nombres con E de hombre y de mujer?',answer:'Sí. La colección permite filtrar por género de uso y seguir refinando por longitud y otros atributos disponibles.'},
  },
  '/nombres-con-f':{
    hero:{eyebrow:'Inicial F',title:'Busca nombres con F bonitos, raros o breves.',body:'La colección está pensada para comparar opciones con una inicial menos saturada sin perder contexto.'},
    guide:{title:'Cómo buscar nombres que empiezan por F',summary:'Combina género, longitud y rareza editorial para encontrar candidatos que merezcan una segunda lectura.',cards:[
      {title:'Bonitos',body:'No te quedes con la etiqueta: comprueba cómo suena el nombre completo.'},
      {title:'Poco comunes',body:'La rareza depende del contexto; revisa origen y uso documentado.'},
      {title:'Para bebé',body:'Guarda pocos candidatos y pruébalos con apellidos y diminutivos posibles.'},
    ]},
    faq:{question:'¿Cómo encuentro nombres con F poco comunes?',answer:'Usa el filtro de estilo “poco común” cuando esté disponible y revisa después origen, uso y sonoridad de los resultados.'},
  },
  '/nombres-con-m':{
    hero:{eyebrow:'Inicial M',title:'Una colección amplia para niña, niño y adultos.',body:'La M ofrece muchas opciones, así que los filtros ayudan a evitar una lista demasiado larga.'},
    guide:{title:'Cómo reducir una lista grande de nombres con M',summary:'Empieza por género o longitud y solo después compara estilo, origen y significado.',cards:[
      {title:'Niña o mujer',body:'Activa el filtro femenino para centrar la búsqueda antes de comparar estilos.'},
      {title:'Niño u hombre',body:'Filtra uso masculino y ordena por longitud si buscas algo más compacto.'},
      {title:'Lista corta',body:'Guarda finalistas para comparar juntos en vez de seguir acumulando opciones.'},
    ]},
    faq:{question:'¿Puedo buscar nombres con M de niña y de niño por separado?',answer:'Sí. Usa el filtro de género y combínalo con longitud, estilo u origen para acotar todavía más la lista.'},
  },
  '/nombres-con-en':{
    hero:{eyebrow:'Letra Ñ',title:'Una letra poco frecuente necesita más contexto que volumen.',body:'La colección distingue nombres que contienen Ñ de formas históricas o culturales relacionadas con esa letra.'},
    guide:{title:'Cómo interpretar una colección de nombres con Ñ',summary:'No todas las formas con Ñ cumplen el mismo papel ni son nombres personales actuales.',cards:[
      {title:'Empiezan por Ñ',body:'Son muy poco frecuentes y deben revisarse con especial atención a la fuente.'},
      {title:'Contienen Ñ',body:'Nombres como Íñigo o Begoña son útiles para explorar la letra aunque no comiencen por ella.'},
      {title:'Contexto histórico',body:'No conviertas títulos o formas históricas en nombres modernos sin evidencia.'},
    ]},
    faq:{question:'¿Por qué la página incluye nombres que contienen Ñ y no solo los que empiezan por Ñ?',answer:'Porque los nombres que empiezan por Ñ son muy escasos. La colección amplía la búsqueda a formas reales que contienen esa letra y señala su contexto.'},
  },
  '/nombres-con-y':{
    hero:{eyebrow:'Inicial Y',title:'Compara nombres con Y sin perder origen ni uso.',body:'La Y aparece en tradiciones distintas; la ficha ayuda a separar sonido, origen y género de uso.'},
    guide:{title:'Cómo explorar nombres que empiezan por Y',summary:'Empieza por género y después revisa de qué tradición procede cada candidato.',cards:[
      {title:'Femeninos',body:'Filtra los registros de uso femenino antes de comparar longitud y estilo.'},
      {title:'Masculinos',body:'Haz lo mismo con los masculinos para no mezclar intenciones distintas.'},
      {title:'Origen',body:'La misma inicial puede agrupar nombres de lenguas y tradiciones muy diferentes.'},
    ]},
    faq:{question:'¿La Y indica que los nombres tienen el mismo origen?',answer:'No. Compartir inicial no implica compartir lengua o tradición; revisa el origen de cada ficha antes de compararlos.'},
  },
  '/nombres-con-z':{
    hero:{eyebrow:'Inicial Z',title:'Explora nombres con Z modernos, raros y de distintos orígenes.',body:'La Z crea una colección visualmente marcada, pero conviene distinguir estética de contexto real.'},
    guide:{title:'Cómo comparar nombres que empiezan por Z',summary:'Usa género y longitud para filtrar y origen para entender mejor cada opción.',cards:[
      {title:'Niña o mujer',body:'Activa el filtro femenino si esa es tu búsqueda principal.'},
      {title:'Poco comunes',body:'La etiqueta ayuda a explorar, pero no equivale a una frecuencia oficial.'},
      {title:'Pronunciación',body:'Comprueba cómo se pronuncia el nombre en su lengua de origen cuando esté documentado.'},
    ]},
    faq:{question:'¿Los nombres con Z son necesariamente raros?',answer:'No. Algunos pueden ser poco frecuentes en español y comunes en otra lengua. La página usa la rareza como criterio de exploración, no como estadística global.'},
  },
  '/nombres-japoneses':{
    hero:{eyebrow:'Japonés',title:'Lee nombre, escritura y significado como datos separados.',body:'Una misma lectura puede corresponder a distintas escrituras; la ficha evita reducirlo todo a una traducción breve.'},
    guide:{title:'Cómo comparar nombres japoneses con más contexto',summary:'Empieza por la forma documentada y usa romanización y pronunciación como ayudas, no como sustitutos de la escritura.',cards:[
      {title:'Kanji',body:'Comprueba qué escritura concreta acompaña al nombre cuando la fuente la documenta.'},
      {title:'Lectura',body:'Usa la romanización para orientarte, pero no la confundas con el significado.'},
      {title:'Variantes',body:'Una misma lectura puede tener más de una combinación posible de caracteres.'},
    ]},
    faq:{question:'¿Qué debo mirar primero en un nombre japonés?',answer:'Empieza por la escritura documentada y la fuente. Después usa romanización, pronunciación y significado como capas de contexto.'},
  },
  '/nombres-coreanos':{
    hero:{eyebrow:'Coreano',title:'Hangul, romanización y posible Hanja no son la misma capa.',body:'La página separa escritura, lectura y significado para no presentar una única interpretación como absoluta.'},
    guide:{title:'Cómo leer una ficha de nombre coreano',summary:'Toma el Hangul como referencia escrita y usa la romanización como ayuda para leerlo.',cards:[
      {title:'Hangul',body:'Es la escritura coreana que identifica visualmente el nombre.'},
      {title:'Romanización',body:'Puede variar según la convención; no significa que sean nombres diferentes.'},
      {title:'Hanja',body:'Cuando se documenta, puede aportar información relevante para el significado.'},
    ]},
    faq:{question:'¿Qué significan los modos K-pop, Dorama y Aesthetic de esta página?',answer:'Son modos de presentación para probar cómo se ve un nombre coreano documentado en distintos contextos visuales. No indican que el nombre pertenezca a un artista, personaje real o que sea más popular.'},
  },
  '/nombres-franceses':{
    hero:{eyebrow:'Francés',title:'Conserva grafía y acentos antes de simplificar el nombre.',body:'La página prioriza la forma francesa documentada y añade pronunciación cuando la base la incluye.'},
    guide:{title:'Cómo comparar nombres franceses sin españolizarlos por defecto',summary:'Mira grafía, pronunciación y género de uso antes de adaptar el nombre a otro idioma.',cards:[
      {title:'Acentos',body:'Si forman parte de la grafía documentada, conviene conservarlos en la comparación.'},
      {title:'Pronunciación',body:'No la deduzcas con reglas del español; consulta la guía cuando exista.'},
      {title:'Uso',body:'Compara opciones femeninas y masculinas dentro de su contexto francés.'},
    ]},
    faq:{question:'¿Puedo comparar nombres franceses por pronunciación?',answer:'Sí cuando la ficha incluye una pronunciación documentada. La página evita inventarla cuando la fuente no la aporta.'},
  },
  '/nombres-italianos':{
    hero:{eyebrow:'Italiano',title:'Compara forma italiana, significado y pronunciación.',body:'Muchos nombres comparten raíces con otras lenguas, pero la colección conserva la forma usada en italiano.'},
    guide:{title:'Cómo elegir entre nombres italianos clásicos y modernos',summary:'Usa género, longitud y sonoridad como primera criba y revisa la forma italiana antes de traducirla.',cards:[
      {title:'Forma original',body:'Mantén la grafía italiana documentada como referencia principal.'},
      {title:'Equivalentes',body:'Un nombre puede tener parientes en español sin ser exactamente la misma forma.'},
      {title:'Pronunciación',body:'Consulta la guía documentada en lugar de forzar una lectura española.'},
    ]},
    faq:{question:'¿Un nombre italiano y su equivalente español cuentan como el mismo nombre?',answer:'Pueden compartir origen histórico, pero son formas lingüísticas distintas. La página mantiene la variante italiana como registro principal.'},
  },
  '/nombres-mayas':{
    hero:{eyebrow:'Colección curada',title:'Separa nombres personales, historia y mitología.',body:'La colección prioriza registros con fuente clara y señala cuándo una forma pertenece a una figura mitológica.'},
    guide:{title:'Cómo usar una colección maya sin mezclar categorías',summary:'La etiqueta “maya” no convierte automáticamente cada término histórico o mitológico en un nombre personal actual.',cards:[
      {title:'Fuente',body:'Comprueba que el registro pueda rastrearse a una referencia concreta.'},
      {title:'Tipo de registro',body:'Distingue nombre personal, figura mitológica y forma histórica cuando la ficha lo indique.'},
      {title:'Uso actual',body:'Evita asumir uso moderno si la fuente solo documenta un contexto antiguo o ritual.'},
    ]},
    faq:{question:'¿Cómo sé si una entrada maya es un nombre personal o una figura mitológica?',answer:'La ficha y la etiqueta de tipo lo indican cuando existe evidencia suficiente. Las figuras mitológicas aparecen separadas de los nombres personales.'},
  },
  '/nombres-de-dioses':{
    hero:{eyebrow:'Mitología',title:'Compara deidades y figuras sin mezclar tradiciones.',body:'La colección reúne varios sistemas mitológicos, por lo que cada nombre necesita su propio contexto cultural.'},
    guide:{title:'Cómo explorar nombres de dioses y deidades',summary:'Antes de reutilizar un nombre, identifica tradición, función y tipo de figura.',cards:[
      {title:'Tradición',body:'Separa griega, nórdica y otras procedencias antes de comparar.'},
      {title:'Tipo de figura',body:'No toda figura mitológica ocupa el mismo papel que una deidad.'},
      {title:'Uso personal',body:'Origen mitológico no implica uso habitual como nombre de persona.'},
    ]},
    faq:{question:'¿Puedo filtrar nombres de dioses por tradición?',answer:'La colección muestra origen y etiquetas de contexto para ayudarte a distinguir tradiciones antes de guardar candidatos.'},
  },
  '/nombres-rusos':{
    hero:{eyebrow:'Ruso',title:'Compara cirílico y transliteración sin confundirlos.',body:'La forma latina sirve para leer; la escritura cirílica conserva mejor la referencia original.'},
    guide:{title:'Cómo leer nombres rusos en una colección en español',summary:'Usa cirílico, transliteración y pronunciación como datos relacionados pero distintos.',cards:[
      {title:'Cirílico',body:'Es la forma escrita original cuando la ficha la documenta.'},
      {title:'Transliteración',body:'Puede cambiar entre sistemas sin convertir el registro en otro nombre.'},
      {title:'Pronunciación',body:'Consulta la guía disponible en lugar de deducirla por la grafía latina.'},
    ]},
    faq:{question:'¿Por qué dos transliteraciones rusas pueden verse diferentes?',answer:'Porque distintos sistemas representan el cirílico de manera distinta. La forma original ayuda a reconocer cuándo se trata del mismo nombre.'},
  },
  '/nombres-griegos':{
    hero:{eyebrow:'Griego',title:'Distingue nombres actuales de referencias mitológicas.',body:'La colección combina formas griegas y registros de raíz mitológica, pero los marca para que no se interpreten igual.'},
    guide:{title:'Cómo comparar nombres griegos con contexto',summary:'Mira escritura, uso y posible origen mitológico antes de decidir qué categoría estás explorando.',cards:[
      {title:'Forma griega',body:'Usa la escritura documentada como referencia cuando esté disponible.'},
      {title:'Forma adaptada',body:'Una versión latinizada puede coexistir con la forma griega original.'},
      {title:'Mitología',body:'Las figuras mitológicas se diferencian de los nombres personales de uso documentado.'},
    ]},
    faq:{question:'¿La página mezcla nombres griegos modernos y mitológicos?',answer:'Puede incluir ambos, pero los registros mitológicos se señalan para que puedas filtrarlos y no tratarlos como la misma categoría.'},
  },
  '/nombres-ingles':{
    hero:{eyebrow:'Uso en inglés',title:'Explora formas usadas en inglés, no solo nombres nacidos en Inglaterra.',body:'La colección refleja uso lingüístico y puede incluir nombres con raíces históricas en otras lenguas.'},
    guide:{title:'Cómo comparar nombres en inglés',summary:'Prioriza uso, pronunciación y sonoridad actual en lugar de asumir un único origen histórico.',cards:[
      {title:'Uso',body:'“En inglés” describe la forma usada en esa lengua, no necesariamente su lugar de origen remoto.'},
      {title:'Pronunciación',body:'Puede variar entre regiones; usa la guía como referencia, no como única realización posible.'},
      {title:'Internacionalidad',body:'Comprueba cómo cambia la forma si también existe en otros idiomas.'},
    ]},
    faq:{question:'¿Todos los nombres de esta página son de origen inglés?',answer:'No. La página reúne formas usadas en inglés; algunas proceden históricamente de otras lenguas y fueron adoptadas o adaptadas.'},
  },
  '/nombres-turcos':{
    hero:{eyebrow:'Turco',title:'Respeta las letras propias del alfabeto turco.',body:'Caracteres como ı, İ, ş, ç, ö, ü o ğ forman parte de la grafía y no son adornos.'},
    guide:{title:'Cómo comparar nombres turcos sin perder su forma original',summary:'Mantén la grafía documentada y usa una simplificación solo cuando el contexto técnico lo exija.',cards:[
      {title:'Grafía',body:'Conserva los caracteres propios del turco cuando forman parte del nombre.'},
      {title:'Pronunciación',body:'No sustituyas automáticamente letras por equivalentes visuales del español.'},
      {title:'Series y novelas',body:'Que un nombre aparezca en ficción no determina por sí solo su uso real o frecuencia.'},
    ]},
    faq:{question:'¿Debo quitar las letras especiales de un nombre turco para usarlo?',answer:'No como regla general. La forma documentada debe conservarse siempre que el sistema donde la uses admita esos caracteres.'},
  },
  '/nombres-chinos':{
    hero:{eyebrow:'Chino',title:'Los Hanzi aportan contexto que la romanización no conserva.',body:'Dos formas parecidas en pinyin pueden corresponder a caracteres y significados diferentes.'},
    guide:{title:'Cómo leer una ficha de nombre chino',summary:'Empieza por los caracteres documentados y usa la romanización como ayuda de lectura.',cards:[
      {title:'Hanzi',body:'Identifican la forma escrita concreta y son esenciales para interpretar el significado.'},
      {title:'Pinyin',body:'Ayuda con la lectura, pero no sustituye a los caracteres.'},
      {title:'Significado',body:'Depende de los caracteres concretos y no solo de cómo suena la romanización.'},
    ]},
    faq:{question:'¿Dos nombres con la misma romanización china tienen siempre el mismo significado?',answer:'No. Pueden escribirse con caracteres diferentes, por lo que la forma en Hanzi es necesaria para interpretar el registro con precisión.'},
  },
  '/nombres-perritas':{
    hero:{eyebrow:'Perritas',title:'Filtra por tamaño, personalidad y longitud.',body:'La página prioriza criterios prácticos para encontrar nombres fáciles de usar todos los días.'},
    guide:{title:'Cómo elegir un nombre para una perrita',summary:'Prueba el sonido en voz alta y cruza personalidad, tamaño y longitud solo cuando esos rasgos te ayuden de verdad.',cards:[
      {title:'Sonido claro',body:'Evita candidatos que se confundan fácilmente con órdenes o palabras habituales.'},
      {title:'Tamaño y estilo',body:'Úsalos como inspiración, no como una regla que determine el nombre correcto.'},
      {title:'Prueba diaria',body:'Repite el nombre varias veces como si estuvieras llamándola desde lejos.'},
    ]},
    faq:{question:'¿Cómo sé si un nombre será cómodo de usar todos los días?',answer:'Prueba a decirlo varias veces en voz alta y prioriza opciones que puedas distinguir y repetir con facilidad.'},
  },
  '/nombres-perros-machos':{
    hero:{eyebrow:'Perros machos',title:'Compara opciones fuertes, cortas, grandes o juguetonas.',body:'La colección permite explorar por tamaño y personalidad sin asumir que cada perro necesita un estilo concreto.'},
    guide:{title:'Cómo elegir un nombre para un perro macho',summary:'Usa presencia y personalidad como inspiración, pero decide por claridad y uso diario.',cards:[
      {title:'Fuerte',body:'Puede encajar con presencia física, aunque no tiene que reflejar tamaño.'},
      {title:'Corto',body:'Suele ser práctico para llamadas rápidas y repetición frecuente.'},
      {title:'Juguetón',body:'Úsalo si quieres un tono más ligero y cercano.'},
    ]},
    faq:{question:'¿Un perro grande necesita un nombre fuerte?',answer:'No. El tamaño puede inspirar el estilo, pero la facilidad de llamar y reconocer el nombre suele ser más importante en el uso diario.'},
  },
  '/nombres-gatos':{
    hero:{eyebrow:'Gatos',title:'Cruza sexo, color y personalidad sin convertirlos en reglas.',body:'Los filtros sirven para explorar ideas, no para afirmar que un nombre pertenece objetivamente a un tipo de gato.'},
    guide:{title:'Cómo encontrar un nombre para gato sin perderte entre estilos',summary:'Empieza por color o personalidad si te inspiran y termina probando cómo suena al llamarlo.',cards:[
      {title:'Color',body:'Negro o naranja pueden orientar el tono, pero no limitan la elección.'},
      {title:'Personalidad',body:'Tierno, místico o juguetón son etiquetas creativas para explorar.'},
      {title:'Llamada',body:'Prueba nombres que puedas decir con claridad en casa o en el veterinario.'},
    ]},
    faq:{question:'¿Puedo combinar color y personalidad al buscar un nombre para gato?',answer:'Sí. Puedes usar ambos filtros cuando existan etiquetas suficientes en la colección y después comparar los resultados que mejor te funcionen.'},
  },
  '/nombres-gatos-negros':{
    hero:{eyebrow:'Gatos negros',title:'Explora estilos místicos, elegantes y oscuros.',body:'El color sirve como inspiración visual, pero la personalidad real del gato puede llevarte a un nombre completamente distinto.'},
    guide:{title:'Cómo elegir un nombre para un gato negro',summary:'Compara una dirección estética con una opción que describa mejor su carácter.',cards:[
      {title:'Místico',body:'Ideal si quieres aprovechar la asociación visual con noche, magia o misterio.'},
      {title:'Tierno',body:'El contraste entre apariencia oscura y nombre suave puede funcionar muy bien.'},
      {title:'Macho o hembra',body:'Usa el filtro de género de uso solo si te ayuda a reducir la lista.'},
    ]},
    faq:{question:'¿Un gato negro tiene que llevar un nombre oscuro o místico?',answer:'No. Es solo una dirección creativa; también puedes elegir un nombre tierno, corto o neutro según su personalidad.'},
  },
  '/nombres-gatos-machos':{
    hero:{eyebrow:'Gatos machos',title:'Busca opciones cortas, tiernas o de carácter marcado.',body:'La página combina filtros prácticos con estilos creativos para reducir la lista.'},
    guide:{title:'Cómo elegir un nombre para un gato macho',summary:'Prioriza nombres fáciles de repetir y usa color o personalidad solo como inspiración secundaria.',cards:[
      {title:'Corto',body:'Ayuda a llamar y repetir el nombre sin esfuerzo.'},
      {title:'Tierno',body:'Funciona bien si buscas un tono cercano aunque el gato sea grande o serio.'},
      {title:'Color',body:'Puedes filtrar negros u otros rasgos cuando la colección los documenta.'},
    ]},
    faq:{question:'¿Qué filtro conviene usar primero para un gato macho?',answer:'Empieza por longitud si quieres practicidad o por personalidad si buscas un tono concreto; después usa color como filtro secundario.'},
  },
  '/perritas-chihuahua':{
    hero:{eyebrow:'Chihuahua hembra',title:'Prioriza nombres breves y fáciles de repetir.',body:'El tamaño puede inspirar nombres pequeños o tiernos, pero la colección no clasifica rasgos físicos que no estén documentados.'},
    guide:{title:'Cómo elegir un nombre para una chihuahua',summary:'Combina longitud corta y personalidad antes que descripciones físicas demasiado específicas.',cards:[
      {title:'Corto',body:'Prueba nombres compactos que se distingan bien al llamarla.'},
      {title:'Tierno',body:'Úsalo como estilo si encaja con el tono que quieres, no como obligación por tamaño.'},
      {title:'Juguetón',body:'Puede funcionar si quieres un nombre con más energía y movimiento.'},
    ]},
    faq:{question:'¿La página clasifica chihuahuas por cabeza de manzana o cabeza de venado?',answer:'No. Esa característica no forma parte de la base; la página se centra en nombres y filtros como longitud, tamaño y personalidad.'},
  },
  '/nombres-caballos':{
    hero:{eyebrow:'Caballos y yeguas',title:'Compara presencia, color y sonido antes de decidir.',body:'La colección sirve para caballos, yeguas y potrillos, pero no infiere raza, disciplina o aptitud.'},
    guide:{title:'Cómo elegir un nombre para caballo o yegua',summary:'Busca una opción que funcione tanto escrita como al llamarla en voz alta.',cards:[
      {title:'Presencia',body:'Fuerte, elegante o tranquilo son estilos útiles para empezar la búsqueda.'},
      {title:'Color',body:'Negro u otros rasgos visuales pueden inspirar sin determinar el nombre.'},
      {title:'Uso real',body:'Piensa en establo, competición, registro y llamada diaria antes de elegir.'},
    ]},
    faq:{question:'¿La página distingue caballos de paso u otras disciplinas?',answer:'No. La colección no clasifica raza o disciplina; usa color, personalidad y estilo como criterios creativos y decide según el caballo real.'},
  },
  '/nombres-peluches':{
    hero:{eyebrow:'Peluches',title:'Busca nombres tiernos, kawaii o fáciles de adoptar como personaje.',body:'La colección sirve para ositos y muñecos, y también para crear una identidad propia alrededor del peluche.'},
    guide:{title:'Cómo convertir un peluche en un personaje con nombre propio',summary:'Empieza por el tono del nombre y después decide si quieres añadir una historia, acta o certificado.',cards:[
      {title:'Tierno o kawaii',body:'Úsalo como estilo principal si quieres una personalidad suave y reconocible.'},
      {title:'Nombre corto',body:'Funciona bien si el peluche será usado por niños o como personaje recurrente.'},
      {title:'Historia',body:'Puedes acompañarlo con fecha de adopción, adoptante y una pequeña nota personal.'},
    ]},
    faq:{question:'¿La página crea también un acta de adopción para el peluche?',answer:'Sí. Después de elegir un nombre puedes crear un acta o certificado de recuerdo con adoptante, fecha y una nota personal, copiar el texto o imprimir la tarjeta. Es una pieza recreativa y no un documento oficial.'},
  },
  '/nombres-equipos-futbol':{
    hero:{eyebrow:'Equipos de fútbol',title:'Genera nombre, tono y TAG como un conjunto.',body:'El nombre debe funcionar en voz alta, pero también en escudo, camiseta y marcador.'},
    guide:{title:'Cómo construir un nombre de equipo que no se quede solo en una idea',summary:'Prueba el nombre completo y su abreviatura antes de decidir si realmente funciona para el grupo.',cards:[
      {title:'Tono',body:'Serio, barrio, gracioso o competitivo cambia por completo el tipo de propuesta.'},
      {title:'TAG',body:'Comprueba si la abreviatura sigue siendo reconocible y fácil de usar.'},
      {title:'Identidad local',body:'Puedes añadir barrio, ciudad o historia del grupo cuando aporte sentido real.'},
    ]},
    faq:{question:'¿Qué debería revisar antes de imprimir el nombre en una camiseta?',answer:'Comprueba el nombre completo, el TAG, la legibilidad del escudo y si ya existe un equipo cercano con una identidad demasiado parecida.'},
  },
  '/nombres-para-tiendas':{
    hero:{eyebrow:'Nombre comercial',title:'Genera ideas y después valida marca, dominio y redes.',body:'La herramienta cruza estilo, sector, canal e idioma, pero no sustituye una búsqueda legal o comercial.'},
    guide:{title:'Cómo pasar de una idea de tienda a un nombre que puedas evaluar',summary:'Genera varias direcciones y elimina pronto las que sean difíciles de recordar o demasiado genéricas.',cards:[
      {title:'Sector',body:'Haz que el nombre pueda convivir con lo que vendes hoy sin cerrar futuras categorías.'},
      {title:'Canal',body:'Piensa distinto si será boutique, bazar, tienda online o local físico.'},
      {title:'Disponibilidad',body:'Antes de usar un finalista, revisa marca, dominio y perfiles sociales.'},
    ]},
    faq:{question:'¿Cómo uso el generador si mi tienda vende productos muy distintos?',answer:'Selecciona el sector General y prueba estilos más amplios. Después descarta nombres que te obliguen a parecer especializado en una sola categoría.'},
  },
};

export function getPageBlueprint(path:string){
  return pageBlueprints[path];
}
