import{CheckCircle2,ShieldCheck}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';

function criteria(page:KeywordPage):[string,string][]{
  if(page.cluster==='letras')return[
    ['Usa la inicial como primera criba','La letra reduce el universo; después compara género, longitud, origen y significado.'],
    ['No elijas solo por forma','Dos nombres con la misma inicial pueden tener historias, pronunciaciones y usos muy diferentes.'],
    ['Compara con apellidos','La misma inicial puede crear repeticiones o ritmos distintos al combinarse con el nombre completo.'],
  ];
  if(page.tool==='culture')return[
    ['Separa escritura y lectura','La grafía original, la romanización y la pronunciación cumplen funciones distintas; no las trates como equivalentes.'],
    ['Da prioridad a la fuente','Si el significado influye en tu elección, revisa primero los registros con referencia documentada.'],
    ['Conserva el contexto','Un nombre puede cambiar de uso, género o matiz según idioma, región y época.'],
  ];
  if(page.tool==='people')return[
    ['Prueba el nombre completo','Di cada candidato junto con los apellidos y escucha ritmo, repeticiones y posibles diminutivos.'],
    ['Distingue dato de etiqueta','“Moderno”, “raro” o “bonito” ayudan a explorar; no son estadísticas oficiales de uso.'],
    ['Reduce antes de decidir','Guarda una lista corta y compara origen, significado documentado y sonoridad entre finalistas.'],
  ];
  if(page.tool==='pet')return[
    ['Dilo en voz alta','Comprueba que puedas repetir el nombre con claridad y que sea fácil de reconocer en el día a día.'],
    ['Usa los rasgos como filtro','Color, tamaño o personalidad sirven para explorar, no para imponer cómo debe llamarse la mascota.'],
    ['Quédate con pocos','Guarda varios finalistas y pruébalos durante un rato antes de fijar uno.'],
  ];
  if(page.tool==='store')return[
    ['Primero memorabilidad','Busca una forma clara de pronunciar, escribir y recordar antes de añadir complejidad.'],
    ['Luego disponibilidad','Comprueba marcas, dominio y perfiles sociales antes de adoptar una propuesta comercialmente.'],
    ['Prueba el contexto','Lee el nombre como tienda, handle y recomendación verbal para detectar fricciones.'],
  ];
  if(page.tool==='football')return[
    ['Nombre y TAG deben convivir','Una propuesta fuerte pierde utilidad si su abreviatura resulta confusa en camiseta o marcador.'],
    ['Prueba cómo se grita','Lee el nombre como presentación, cántico y anuncio para comprobar ritmo y claridad.'],
    ['Revisa uso local','Antes de adoptarlo, comprueba equipos y competiciones de tu zona para evitar coincidencias innecesarias.'],
  ];
  if(page.tool==='invisible')return[
    ['Prueba dentro del juego','Ver un carácter vacío aquí no garantiza que la plataforma lo conserve al guardar el nickname.'],
    ['Ten una alternativa','Los filtros Unicode pueden cambiar; guarda más de una variante compatible con tu idea.'],
    ['Copia, no reescribas','Los caracteres invisibles no se distinguen visualmente, así que usa el botón de copia para evitar errores.'],
  ];
  if(page.cluster==='freeFire'||page.cluster==='gamingSocial')return[
    ['Prioriza legibilidad','Símbolos y estilos sirven solo si el nombre sigue siendo reconocible en partida, chat o perfil.'],
    ['Comprueba compatibilidad','Longitud y Unicode dependen de la plataforma; prueba el resultado antes de darlo por definitivo.'],
    ['Guarda una versión simple','Mantén una alternativa limpia por si la versión decorada no se acepta o cuesta compartirla.'],
  ];
  return[
    ['Define el contexto','Decide dónde vas a usar el nombre antes de comparar variantes.'],
    ['Compara pocas opciones','Una lista corta permite valorar mejor lectura, sonido y recordación.'],
    ['Verifica antes de fijarlo','Cuando exista una plataforma, marca o fuente externa, comprueba allí el dato final.'],
  ];
}

export default function PageDecisionChecklist({page}:{page:KeywordPage}){
  const items=criteria(page);
  return <section id="criterios" className="mt-7 scroll-mt-24 rounded-[20px] border border-[#e5e2ef] bg-white p-5 shadow-[0_10px_28px_rgba(55,49,91,.035)] sm:p-6">
    <div className="flex items-start gap-3">
      <span className="gdn-theme-chip grid size-10 shrink-0 place-items-center rounded-[13px] border"><ShieldCheck size={16}/></span>
      <div>
        <p className="gdn-eyebrow">Antes de decidir</p>
        <h2 className="gdn-editorial mt-1.5 text-[24px] font-bold text-[#292a38]">Tres criterios para usar bien “{page.primaryKeyword}”</h2>
      </div>
    </div>
    <div className="mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
      {items.map(([title,body],index)=><article key={title} className="min-w-[82vw] snap-start rounded-[15px] border border-[#e8e5ef] bg-[#fcfbff] p-4 sm:min-w-[320px] lg:min-w-0">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={13} className="text-[var(--page-accent)]"/>
          <span className="gdn-tech text-[8px] font-black tracking-[.1em] text-[#a09dac]">0{index+1}</span>
        </div>
        <h3 className="mt-3 text-[12px] font-bold text-[#383946]">{title}</h3>
        <p className="mt-1.5 text-[10px] leading-5 text-[#7d8090]">{body}</p>
      </article>)}
    </div>
  </section>;
}
