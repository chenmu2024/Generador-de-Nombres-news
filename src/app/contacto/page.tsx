import type{Metadata}from'next';

export const metadata:Metadata={
  title:'Contacto y correcciones | GDN',
  description:'Qué tipos de correcciones y comentarios revisa GeneradorDeNombres.net.',
  alternates:{canonical:'/contacto'},
};

export default function Page(){
  return <article className="gdn-shell max-w-4xl py-12 md:py-16">
    <p className="gdn-tech text-[10px] font-black uppercase tracking-[.16em] text-[#5b4df5]">Ayuda editorial</p>
    <h1 className="gdn-display mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Contacto y correcciones</h1>
    <p className="mt-6 max-w-3xl text-[14px] leading-7 text-[#737687]">Priorizamos correcciones que puedan cambiar la utilidad o la precisión de una página: significados, escritura, transliteración, pronunciación, compatibilidad técnica y errores de navegación.</p>

    <div className="mt-10 grid gap-3 sm:grid-cols-2">
      {[
        ['Significados u orígenes','Datos culturales o lingüísticos que necesiten una fuente mejor.'],
        ['Escritura y transliteración','Errores en caracteres originales, romanización o presentación.'],
        ['Compatibilidad','Símbolos, espacios o formatos que una plataforma haya dejado de aceptar.'],
        ['Producto y navegación','Problemas para buscar, filtrar, copiar, guardar o llegar a otra herramienta.'],
      ].map(([title,body])=><section key={title} className="gdn-card rounded-[18px] p-5">
        <h2 className="gdn-editorial text-[20px] font-bold text-[#333442]">{title}</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#7d8091]">{body}</p>
      </section>)}
    </div>

    <div className="mt-6 rounded-[18px] border border-[#ddd8ff] bg-[#f5f3ff] p-5">
      <p className="gdn-tech text-[9px] font-black uppercase tracking-[.13em] text-[#6f65d5]">Canal de soporte</p>
      <p className="mt-2 text-[12px] leading-6 text-[#6f7183]">No mostramos direcciones de correo inventadas ni formularios sin un backend real. El canal público de soporte se añadirá aquí cuando esté conectado y pueda recibir mensajes correctamente.</p>
    </div>
  </article>
}
