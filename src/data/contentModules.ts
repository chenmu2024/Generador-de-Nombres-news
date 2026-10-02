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
};

export function getFaqs(page: KeywordPage): PageFaq[] {
  return [...(specificFaqs[page.path] ?? []), ...sharedFaqs[page.tool]].slice(0, 4);
}

export function getDecisionCards(page: KeywordPage): DecisionCard[] {
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
