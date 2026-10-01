export const metadata={title:'Contacto y correcciones | GDN',description:'Cómo enviar correcciones y comentarios sobre GeneradorDeNombres.net.'};

export default function Page(){
  return <article className="gdn-shell max-w-3xl py-16">
    <p className="gdn-eyebrow">Ayuda editorial</p>
    <h1 className="mt-3 text-4xl font-black tracking-[-.035em] md:text-5xl">Contacto y correcciones</h1>
    <p className="mt-6 leading-8 text-[#676b76]">Queremos corregir errores de significados, transliteraciones, pronunciación y compatibilidad de símbolos cuando se detecten. Esta página también identifica el tipo de información que revisamos con prioridad.</p>
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {['Significados u orígenes incorrectos','Errores de escritura o transliteración','Símbolos que ya no funcionan','Problemas de navegación o copia'].map(item=><div key={item} className="gdn-card rounded-2xl p-5"><p className="font-extrabold">{item}</p></div>)}
    </div>
    <p className="mt-8 rounded-2xl border border-[#e1e2e7] bg-[#f1efff] p-5 text-sm leading-6 text-[#615f70]">No publicamos direcciones de correo inventadas ni formularios que no estén conectados. Cuando el proyecto tenga un canal oficial de soporte, se mostrará aquí.</p>
  </article>
}
