export const metadata={title:'Contacto y correcciones | GDN',description:'Cómo enviar correcciones y comentarios sobre GeneradorDeNombres.net.'};

export default function Page(){
  return <article className="gdn-shell max-w-3xl py-12 md:py-16">
    <p className="gdn-eyebrow">Ayuda editorial</p>
    <h1 className="brand-serif mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Contacto y correcciones</h1>
    <p className="mt-6 text-[14px] leading-7 text-[#737687]">Queremos corregir errores de significados, transliteraciones, pronunciación y compatibilidad de símbolos cuando se detecten. Esta página también identifica el tipo de información que revisamos con prioridad.</p>
    <div className="mt-10 grid gap-3 sm:grid-cols-2">
      {['Significados u orígenes incorrectos','Errores de escritura o transliteración','Símbolos que ya no funcionan','Problemas de navegación o copia'].map(item=><div key={item} className="gdn-card rounded-[16px] p-5"><p className="text-[13px] font-semibold text-[#3a3b4a]">{item}</p></div>)}
    </div>
    <p className="mt-8 rounded-[16px] border border-[#ddd8ff] bg-[#f5f3ff] p-5 text-[12px] leading-6 text-[#6f7183]">No publicamos direcciones de correo inventadas ni formularios que no estén conectados. Cuando el proyecto tenga un canal oficial de soporte, se mostrará aquí.</p>
  </article>
}
