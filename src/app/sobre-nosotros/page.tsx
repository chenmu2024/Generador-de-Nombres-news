import type{Metadata}from'next';

export const metadata:Metadata={
  title:'Sobre nosotros | GDN',
  description:'Cómo se construyen y revisan las herramientas y colecciones de GeneradorDeNombres.net.',
  alternates:{canonical:'/sobre-nosotros'},
};

export default function Page(){
  return <article className="gdn-shell max-w-4xl py-12 md:py-16">
    <p className="gdn-tech text-[10px] font-black uppercase tracking-[.16em] text-[#5b4df5]">GeneradorDeNombres.net</p>
    <h1 className="gdn-display mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Sobre nosotros</h1>
    <p className="mt-6 max-w-3xl text-[14px] leading-7 text-[#737687]">Creamos herramientas gratuitas para encontrar nombres, apodos e identidades digitales en español. La prioridad es llegar rápido a opciones útiles, compararlas y guardarlas sin obligarte a crear una cuenta.</p>

    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {[
        ['Herramienta primero','Cada página debe resolver una intención concreta antes de añadir contenido explicativo.'],
        ['Datos con contexto','Origen, significado, escritura y pronunciación se separan cuando requieren fuentes distintas.'],
        ['Sin falsas garantías','No presentamos disponibilidad de usernames, marcas o compatibilidad de símbolos como si fuera permanente.'],
      ].map(([title,body],index)=><section key={title} className="gdn-card rounded-[20px] p-6">
        <span className="gdn-tech text-[10px] font-black text-[#a7a3b5]">0{index+1}</span>
        <h2 className="gdn-editorial mt-3 text-[22px] font-bold text-[#292a39]">{title}</h2>
        <p className="mt-3 text-[12px] leading-6 text-[#777a8b]">{body}</p>
      </section>)}
    </div>

    <section className="mt-5 rounded-[20px] border border-[#e3dff0] bg-[#faf9ff] p-6 md:p-8">
      <p className="gdn-tech text-[10px] font-black uppercase tracking-[.13em] text-[#7469d7]">Metodología</p>
      <h2 className="gdn-editorial mt-2 text-[27px] font-bold text-[#292a39]">Cómo trabajamos</h2>
      <p className="mt-4 text-[13px] leading-7 text-[#777a8b]">Organizamos las herramientas según la intención real: un nickname necesita estilos y símbolos; un nombre de persona necesita origen y significado; una mascota necesita filtros editoriales; y un negocio necesita tono, sector y validaciones posteriores. Las reglas que pueden cambiar con el tiempo se presentan como comprobaciones que el usuario debe volver a verificar.</p>
    </section>
  </article>
}
