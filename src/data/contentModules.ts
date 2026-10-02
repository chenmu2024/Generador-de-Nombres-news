import type { KeywordPage, ToolMode } from './keywordMaster';

export interface PageFaq {
  question: string;
  answer: string;
}

export interface DecisionCard {
  title: string;
  description: string;
}

const sharedFaqs: Record<ToolMode, PageFaq[]> = {
  general: [
    {question:'¿Cómo elegir un nombre entre varias opciones?',answer:'Guarda unas pocas alternativas, compáralas en el contexto donde las usarás y descarta las que sean difíciles de recordar, pronunciar o volver a escribir.'},
    {question:'¿Puedo copiar los resultados?',answer:'Sí. Las tarjetas y generadores incluyen botones de copia para llevar el resultado a otra aplicación.'},
  ],
  gaming: [
    {question:'¿Un nombre generado funcionará en cualquier juego?',answer:'No necesariamente. Cada plataforma puede limitar longitud, símbolos o caracteres. Conviene probar el resultado dentro del juego antes de decidir.'},
    {question:'¿Es mejor un nickname corto?',answer:'Los nombres cortos suelen ser más fáciles de reconocer y escribir, pero el estilo adecuado depende del juego y del uso que quieras darle.'},
    {question:'¿La herramienta comprueba disponibilidad?',answer:'No. Genera y revisa formatos, pero la disponibilidad real depende de la plataforma correspondiente.'},
  ],
  invisible: [
    {question:'¿Por qué un espacio invisible puede dejar de funcionar?',answer:'Las plataformas pueden cambiar filtros y compatibilidad de caracteres. Si un carácter no funciona, prueba otra variante y confirma el resultado antes de guardar el nombre.'},
    {question:'¿El botón copia realmente un carácter?',answer:'Sí. Aunque visualmente parezca vacío, el botón copia el carácter Unicode mostrado en la herramienta.'},
  ],
  store: [
    {question:'¿El generador comprueba si una marca ya existe?',answer:'No. Antes de utilizar un nombre comercial debes revisar marcas registradas, dominios y perfiles sociales por tu cuenta.'},
    {question:'¿Qué hace que un nombre de tienda sea fácil de recordar?',answer:'Suelen ayudar una pronunciación clara, una longitud razonable y una asociación fácil con el estilo o categoría del negocio.'},
  ],
  football: [
    {question:'¿Cómo elegir un nombre para un equipo?',answer:'Prueba cómo suena al decirlo en voz alta, cómo quedaría en un escudo y si funciona también en una versión corta.'},
    {question:'¿Conviene usar el nombre de la ciudad o barrio?',answer:'Puede ayudar a crear identidad local, pero no es obligatorio. También puedes partir de una característica, apodo o historia del equipo.'},
  ],
  people: [
    {question:'¿Qué conviene comparar además de cómo suena un nombre?',answer:'Puedes comparar longitud, inicial, género de uso, origen y, cuando esté documentado, significado o variantes.'},
    {question:'¿Todos los significados de nombres son únicos y exactos?',answer:'No. Un mismo nombre puede tener variantes, tradiciones o interpretaciones diferentes. Por eso conviene tratar el significado como dato que necesita contexto y fuente.'},
  ],
  pet: [
    {question:'¿Cómo escoger un nombre para una mascota?',answer:'Los nombres breves y distinguibles suelen ser fáciles de usar a diario. También puedes filtrar por personalidad, tamaño, color o estilo.'},
    {question:'¿Puedo guardar nombres para revisarlos después?',answer:'Sí. Usa el corazón de cada tarjeta y los encontrarás en la sección Mis favoritos de este navegador.'},
  ],
  culture: [
    {question:'¿Por qué un nombre puede aparecer con distintas escrituras?',answer:'La escritura, romanización y pronunciación pueden variar según idioma, región y convención. Las fichas deben interpretarse dentro de ese contexto.'},
    {question:'¿Cómo se revisan los datos culturales?',answer:'La estructura de datos separa fuente, estado de verificación, confianza y fecha de revisión para que una futura ampliación pueda distinguir datos confirmados de datos pendientes.'},
  ],
};

const specificFaqs: Record<string, PageFaq[]> = {
  '/nombres-roblox': [
    {question:'¿Username y Display Name son lo mismo en Roblox?',answer:'No. Son campos distintos. Esta herramienta separa ambos flujos para que no se mezclen las reglas de formato con las ideas visuales de nombre.'},
  ],
  '/nombres-instagram': [
    {question:'¿La herramienta dice si un username de Instagram está libre?',answer:'No. Solo ayuda a crear formatos de username. La disponibilidad debe comprobarse dentro de Instagram.'},
    {question:'¿Las letras bonitas son fuentes instaladas?',answer:'No. Son caracteres Unicode que se ven con estilos distintos. Por eso su apariencia y compatibilidad pueden variar entre dispositivos y aplicaciones.'},
    {question:'¿Username y nombre visible deben tener el mismo formato?',answer:'No. La herramienta los separa: el username se mantiene simple, mientras el nombre visible puede probar variantes Unicode.'},
  ],
  '/nombres-por-letra': [
    {question:'¿Por qué algunas letras tienen página propia y otras no?',answer:'Solo se crea una página independiente cuando existe suficiente demanda y valor propio. Las demás letras permanecen dentro del directorio general.'},
  ],
  '/nombres-para-tiendas': [
    {question:'¿Puedo usar directamente uno de los nombres generados?',answer:'Úsalo primero como candidato. Antes de adoptarlo comercialmente revisa marcas, dominios, redes sociales y posibles conflictos legales.'},
  ],
  '/nombres-gatos-negros': [
    {question:'¿Qué tipo de nombres combinan con un gato negro?',answer:'Puedes comparar opciones místicas, elegantes, cortas o fuertes. El color puede inspirar el estilo, pero no tiene que determinar el nombre.'},
    {question:'¿Cómo elegir entre un nombre tierno y uno oscuro?',answer:'Prueba ambos estilos con la personalidad real del gato. Un nombre que contraste con su apariencia también puede funcionar muy bien.'},
  ],
  '/nombres-perritas': [
    {question:'¿Es mejor un nombre corto para una perrita?',answer:'Un nombre breve puede ser cómodo para usar todos los días, aunque también importa que su sonido sea fácil de distinguir de órdenes habituales.'},
    {question:'¿Puedo filtrar por tamaño o personalidad?',answer:'Sí. La página permite explorar etiquetas como pequeña, tierna, elegante, fuerte o juguetona cuando existen en la base de datos.'},
  ],
  '/perritas-chihuahua': [
    {question:'¿Qué nombres funcionan bien para una chihuahua pequeña?',answer:'Puedes empezar por nombres cortos, tiernos o juguetones y probar cuáles son más fáciles de repetir en voz alta.'},
  ],
  '/nombres-de-nina': [
    {question:'¿Cómo comparar nombres cortos y nombres poco comunes?',answer:'Guarda candidatos de ambos grupos y compáralos junto con los apellidos. La página separa opciones cortas, modernas y menos comunes para facilitar esa comparación.'},
  ],
  '/nombres-unisex': [
    {question:'¿Un nombre es unisex en todos los países?',answer:'No. El uso puede cambiar según idioma, país y época. Un nombre puede documentarse para hombres y mujeres en una tradición y ser predominantemente masculino o femenino en otra.'},
    {question:'¿Qué criterio usa esta lista para marcar un nombre como unisex?',answer:'Priorizamos nombres cuya fuente documenta uso masculino y femenino o un uso equivalente en tradiciones distintas. No basta con una aparición aislada para clasificarlo como unisex.'},
  ],
  '/nombres-raros': [
    {question:'¿Raro significa inventado?',answer:'No. Aquí “poco común” se usa como una categoría de exploración; no implica que el nombre sea inventado ni garantiza una frecuencia concreta en un país.'},
  ],
  '/nombres-con-en': [
    {question:'¿Hay muchos nombres que empiecen por Ñ?',answer:'Son muy poco frecuentes. Por eso la página también reúne nombres reales que contienen Ñ, separándolos de las formas históricas que sí empiezan por esa letra.'},
    {question:'¿Por qué Ñusta no aparece como un nombre corriente?',answer:'Las fuentes consultadas la describen principalmente como un título histórico inca relacionado con mujeres de sangre real, no como un nombre personal común.'},
  ],
  '/nombres-free-fire': [
    {question:'¿Puedo añadir símbolos y espacio invisible al mismo nickname?',answer:'La herramienta permite generar variantes con ambos recursos, pero debes probar el resultado dentro del juego porque la compatibilidad puede cambiar.'},
    {question:'¿Qué son las fuentes del generador?',answer:'Son transformaciones con caracteres Unicode, no archivos de fuente. Puedes comparar decenas de estilos y combinarlos con marcos, pero el juego puede aceptar unos caracteres y rechazar otros.'},
  ],
  '/nombres-perros-machos': [
    {question:'¿Qué estilo funciona para un perro macho grande?',answer:'Puedes empezar por las opciones fuertes o elegantes y compararlas con nombres más cortos si quieres algo fácil de llamar a diario.'},
    {question:'¿Hay nombres para perros machos pequeños?',answer:'Sí. La página incluye filtros de tamaño y nombres cortos para separar opciones pequeñas de las pensadas para perros grandes.'},
  ],
  '/nombres-caballos': [
    {question:'¿Cómo elegir un nombre para caballo o yegua?',answer:'Prueba cómo suena al llamarlo, si encaja con su presencia y si prefieres un tono fuerte, elegante o tranquilo.'},
  ],
  '/nombres-peluches': [
    {question:'¿Puedo buscar nombres kawaii para peluches?',answer:'Sí. La colección incluye etiquetas tiernas y kawaii para filtrar ositos, muñecos y peluches pequeños.'},
  ],
  '/nombres-japoneses': [
    {question:'¿Un mismo nombre japonés puede escribirse con kanji distintos?',answer:'Sí. Una misma lectura puede corresponder a varias escrituras y cada combinación de kanji puede aportar matices distintos. Por eso mostramos la escritura documentada junto con la romanización cuando está disponible.'},
    {question:'¿Romaji y kanji son lo mismo?',answer:'No. El romaji representa la lectura con alfabeto latino; el kanji es parte de la escritura original. Compararlos juntos ayuda a no confundir pronunciación con significado.'},
  ],
  '/nombres-coreanos': [
    {question:'¿Qué diferencia hay entre Hangul y romanización?',answer:'Hangul es la escritura coreana; la romanización representa el sonido con letras latinas. La forma romanizada puede variar según la convención utilizada.'},
    {question:'¿El significado de un nombre coreano depende de la escritura?',answer:'Puede depender de los caracteres hanja asociados al nombre cuando se usan. Por eso evitamos presentar una única traducción como definitiva si la fuente admite varias combinaciones.'},
  ],
  '/nombres-chinos': [
    {question:'¿Por qué es importante ver los caracteres chinos del nombre?',answer:'La forma escrita distingue caracteres que pueden compartir una romanización parecida pero tener significados diferentes. Por eso el Hanzi aporta contexto que el pinyin por sí solo no conserva.'},
    {question:'¿La romanización determina el significado?',answer:'No. La romanización ayuda con la lectura, pero el significado depende de los caracteres concretos y de su contexto.'},
  ],
  '/nombres-mayas': [
    {question:'¿Por qué esta colección maya es más pequeña que otras?',answer:'Porque priorizamos registros con una referencia clara. No añadimos listas extensas de supuestos nombres mayas cuando no podemos separar con suficiente confianza nombres personales, títulos, términos históricos o figuras mitológicas.'},
    {question:'¿Todos los nombres de la lista son nombres personales modernos?',answer:'No necesariamente. Algunas formas tienen contexto histórico o mitológico. La ficha y la fuente ayudan a distinguir ese contexto antes de interpretar el registro como un nombre de uso actual.'},
  ],
  '/nombres-de-dioses': [
    {question:'¿Todos estos nombres pertenecen a la misma tradición mitológica?',answer:'No. La colección reúne varias tradiciones y cada nombre debe interpretarse dentro de su propio contexto cultural.'},
    {question:'¿Un nombre de una deidad puede usarse como nombre personal?',answer:'El uso real depende del idioma, la tradición y la época. La presencia en esta colección indica origen mitológico, no que sea un nombre personal habitual en todos los contextos.'},
  ],
  '/nombres-franceses': [
    {question:'¿Conviene conservar los acentos de un nombre francés?',answer:'Sí cuando forman parte de la grafía documentada. La versión sin acento puede seguir siendo legible, pero no siempre representa la forma estándar del nombre en francés.'},
    {question:'¿La pronunciación francesa se puede deducir como si fuera español?',answer:'No. Aunque ambos idiomas usan alfabeto latino, sus reglas de pronunciación son distintas. Por eso mostramos una guía solo cuando la base la documenta.'},
  ],
  '/nombres-italianos': [
    {question:'¿Un nombre italiano puede tener una forma equivalente en español?',answer:'Sí. Muchos nombres europeos comparten una raíz histórica y tienen formas propias en distintos idiomas. La ficha conserva la forma usada en italiano en lugar de sustituirla automáticamente.'},
    {question:'¿Debo cambiar la escritura para pronunciarlo en español?',answer:'No necesariamente. Conviene mantener la grafía documentada y consultar la pronunciación cuando esté disponible, en vez de modificar el nombre para aproximarlo al español.'},
  ],
  '/nombres-rusos': [
    {question:'¿Por qué aparece una forma en cirílico y otra con letras latinas?',answer:'El ruso usa alfabeto cirílico. La forma latina es una transliteración o romanización para facilitar la lectura, y puede variar según la convención utilizada.'},
    {question:'¿Una transliteración distinta significa que sea otro nombre?',answer:'No necesariamente. Dos grafías latinas pueden representar el mismo nombre ruso si proceden de sistemas de transliteración diferentes.'},
  ],
  '/nombres-griegos': [
    {question:'¿La forma griega y la forma latinizada son siempre idénticas?',answer:'No. Algunos nombres tienen una escritura griega original y una forma latinizada o adaptada usada en otros idiomas. La fuente ayuda a distinguirlas.'},
    {question:'¿Los nombres de origen mitológico y los nombres griegos actuales son la misma categoría?',answer:'No. Puede haber relación histórica, pero una figura mitológica y un nombre de uso moderno necesitan contexto distinto. La colección intenta conservar esa diferencia.'},
  ],
  '/nombres-ingles': [
    {question:'¿“Nombre inglés” significa que el nombre nació en Inglaterra?',answer:'No siempre. Esta colección incluye formas usadas en inglés; algunas proceden históricamente de otras lenguas y fueron adoptadas o adaptadas al uso inglés.'},
    {question:'¿La pronunciación inglesa es igual en todos los países?',answer:'Puede variar entre regiones y variedades del inglés. Cuando se incluye pronunciación, debe interpretarse como una guía documentada y no como la única realización posible.'},
  ],
  '/nombres-turcos': [
    {question:'¿Importan letras como ı, İ, ş, ç, ö, ü o ğ en los nombres turcos?',answer:'Sí. Son letras propias del alfabeto turco y no deben tratarse simplemente como adornos. Cuando la forma documentada las contiene, conviene conservarlas.'},
    {question:'¿Puedo escribir el nombre sin signos diacríticos?',answer:'En algunos contextos técnicos puede hacerse una simplificación, pero la forma resultante no es idéntica a la grafía turca original. La ficha prioriza la forma documentada.'},
  ],
  '/nombres-de-mujer': [
    {question:'¿Cómo puedo comparar nombres de mujer con significado?',answer:'Usa los filtros de estilo, longitud y origen, guarda tus candidatos y da más peso a los significados que incluyen una fuente verificada. El comparador permite revisar varios nombres juntos.'},
    {question:'¿Qué significa que un nombre tenga “significado orientativo”?',answer:'Indica que la ficha puede incluir una explicación editorial todavía no respaldada por una fuente verificada dentro de la base. Se muestra de forma separada para no confundirla con un dato documentado.'},
  ],
  '/nombres-de-nino': [
    {question:'¿Puedo comparar nombres de niño cortos y modernos?',answer:'Sí. La página permite filtrar por longitud y estilo, ordenar por nombres más cortos y añadir hasta cuatro candidatos al comparador.'},
    {question:'¿Cómo sé si el significado está verificado?',answer:'Las fichas con fuente revisada muestran una indicación de significado verificado y un enlace a la referencia utilizada.'},
  ],
  '/nombres-gatos': [
    {question:'¿Puedo buscar nombres para gatos por color y personalidad?',answer:'Sí. Los filtros permiten combinar etiquetas como color, tamaño y personalidad cuando esos datos existen en la colección.'},
    {question:'¿Las etiquetas como “tierno” o “juguetón” son datos objetivos?',answer:'No. Son etiquetas editoriales para explorar ideas; no describen una característica objetiva del nombre ni predicen el comportamiento del gato.'},
  ],
  '/nombres-gatos-machos': [
    {question:'¿Cómo encuentro nombres cortos para un gato macho?',answer:'Usa el atajo de nombres cortos o el filtro de longitud y después compara los candidatos que mejor suenen al llamarlos en voz alta.'},
  ],
  '/nombres-equipos-futbol': [
    {question:'¿El generador crea también una abreviatura para el equipo?',answer:'Sí. Cada propuesta muestra un TAG compacto derivado del nombre para que puedas imaginarlo en una camiseta, marcador o escudo y copiarlo por separado.'},
    {question:'¿El nombre generado garantiza que ningún otro equipo lo use?',answer:'No. La herramienta crea ideas y abreviaturas, pero antes de adoptarlas conviene comprobar equipos existentes, redes y competiciones de tu zona.'},
  ],
  '/espacios-invisible-ff': [
    {question:'¿Puedo probar el espacio invisible con mi propio nickname?',answer:'Sí. Escribe tu nombre en el campo de prueba y compara cómo queda con distintas alternativas Unicode antes de copiar el resultado.'},
    {question:'¿Puedo copiar dos o tres espacios invisibles de una vez?',answer:'Sí. La herramienta incluye accesos rápidos para copiar uno, dos o tres caracteres de espacio popular, además de ejemplos insertados entre palabras.'},
  ],
  '/nombres-ff-mujeres': [
    {question:'¿Puedo combinar un nombre femenino con fuentes y marcos?',answer:'Sí. El estudio de Free Fire permite aplicar estilos Unicode, marcos decorativos, versión corta y espacio invisible sobre una base femenina.'},
  ],
  '/nombres-clanes-ff': [
    {question:'¿La herramienta sirve para nombre de clan y no solo para nickname individual?',answer:'Sí. Esta variante prioriza bases y formatos pensados para clan o escuadra y permite comparar decoraciones antes de copiar el resultado.'},
  ],
};

export function getFaqs(page: KeywordPage): PageFaq[] {
  return [...(specificFaqs[page.path] ?? []), ...sharedFaqs[page.tool]].slice(0, 4);
}

export function getDecisionCards(page: KeywordPage): DecisionCard[] {
  if(page.path==='/nombres-japoneses')return[
    {title:'Lectura',description:'Compara la romanización con la pronunciación documentada antes de decidir cómo leerlo.'},
    {title:'Kanji',description:'Revisa qué escritura concreta acompaña al nombre; una misma lectura puede tener varias formas.'},
    {title:'Contexto',description:'No conviertas una traducción breve en un significado absoluto si la fuente muestra variantes.'},
  ];
  if(page.path==='/nombres-coreanos')return[
    {title:'Hangul',description:'Empieza por la forma escrita coreana y úsala como referencia principal del registro.'},
    {title:'Romanización',description:'Trátala como una ayuda de lectura; distintas convenciones pueden producir grafías latinas diferentes.'},
    {title:'Hanja',description:'Cuando interviene, el significado puede depender de la combinación de caracteres asociada al nombre.'},
  ];
  if(page.path==='/nombres-chinos')return[
    {title:'Hanzi',description:'Compara siempre los caracteres concretos, no solo la forma romanizada.'},
    {title:'Lectura',description:'La romanización orienta la pronunciación, pero no conserva por sí sola todos los contrastes del original.'},
    {title:'Significado',description:'Interpreta el significado a partir de los caracteres documentados y su contexto.'},
  ];
  if(page.path==='/nombres-mayas')return[
    {title:'Fuente',description:'Prioriza registros que puedan rastrearse a una referencia clara antes de ampliar la lista.'},
    {title:'Tipo de registro',description:'Distingue nombre personal, título, término histórico y figura mitológica cuando la fuente lo permita.'},
    {title:'Uso actual',description:'No asumas que una forma histórica o mitológica sea hoy un nombre personal corriente.'},
  ];
  if(page.path==='/nombres-de-dioses')return[
    {title:'Tradición',description:'Identifica a qué tradición mitológica pertenece cada nombre antes de compararlo.'},
    {title:'Función',description:'Distingue deidad, héroe u otra figura cuando el contexto de la fuente lo especifique.'},
    {title:'Uso personal',description:'Origen mitológico no significa automáticamente uso habitual como nombre de persona.'},
  ];

  switch (page.tool) {
    case 'gaming':
      return [
        {title:'Legibilidad',description:'Que puedas reconocerlo rápido dentro de una partida o lista de jugadores.'},
        {title:'Compatibilidad',description:'Prueba longitud, símbolos y caracteres en la plataforma antes de guardarlo.'},
        {title:'Identidad',description:'Elige un estilo que siga funcionando sin depender solo de adornos.'},
      ];
    case 'pet':
      return [
        {title:'Personalidad',description:'Tierno, fuerte, tranquilo, místico o juguetón: empieza por cómo describes a tu mascota.'},
        {title:'Sonido',description:'Prueba nombres fáciles de distinguir cuando los dices en voz alta.'},
        {title:'Uso diario',description:'Piensa en cómo suena al llamarla en casa, en el parque o en el veterinario.'},
      ];
    case 'people':
      return [
        {title:'Sonoridad',description:'Dilo junto con los apellidos y comprueba que el ritmo te resulte natural.'},
        {title:'Contexto',description:'Compara origen, variantes, género de uso y posibles diminutivos.'},
        {title:'Duración',description:'No elijas solo por la primera impresión: guarda candidatos y vuelve a ellos después.'},
      ];
    case 'culture':
      return [
        {title:'Escritura',description:'Compara la forma original con su romanización o transliteración.'},
        {title:'Pronunciación',description:'No asumas que la escritura latina refleja exactamente el sonido original.'},
        {title:'Contexto cultural',description:'Revisa el uso real y la fuente antes de atribuir un significado definitivo.'},
      ];
    case 'store':
      return [
        {title:'Memorable',description:'Debe ser fácil de pronunciar, recordar y volver a escribir.'},
        {title:'Flexible',description:'Comprueba que siga funcionando si el negocio amplía productos o canales.'},
        {title:'Disponible',description:'Después de elegir candidatos, revisa marcas, dominio y perfiles sociales.'},
      ];
    case 'football':
      return [
        {title:'Identidad',description:'Puede reflejar barrio, ciudad, valores, humor o historia del grupo.'},
        {title:'Versión corta',description:'Comprueba cómo se vería abreviado en camiseta, marcador y escudo.'},
        {title:'Diferenciación',description:'Evita nombres que se confundan fácilmente con equipos ya conocidos.'},
      ];
    default:
      return [
        {title:'Reconocible',description:'Prioriza nombres que puedas identificar y recordar con facilidad.'},
        {title:'Comparable',description:'Guarda varias opciones antes de elegir una sola.'},
        {title:'Adecuado al contexto',description:'Prueba el nombre exactamente donde piensas usarlo.'},
      ];
  }
}
