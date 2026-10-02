import type{Metadata}from'next';
import{ExternalLink,ShieldAlert}from'lucide-react';

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

    <div className="mt-6 rounded-[18px] border border-[#ddd8ff] bg-[#f5f3ff] p-5 sm:p-6">
      <p className="gdn-tech text-[9px] font-black uppercase tracking-[.13em] text-[#6f65d5]">Canal público de correcciones</p>
      <h2 className="gdn-editorial mt-2 text-[24px] font-bold text-[#303142]">Envía un reporte que podamos revisar.</h2>
      <p className="mt-2 max-w-2xl text-[12px] leading-6 text-[#6f7183]">El formulario abre un issue en el repositorio público del proyecto. Sirve para corregir datos, fuentes, compatibilidad o errores de navegación.</p>
      <a href="https://github.com/chenmu2024/Generador-de-Nombres-news/issues/new?template=correccion.yml" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[11px] bg-[#5b4df5] px-4 text-[11px] font-semibold text-white transition hover:bg-[#5044de]">
        Abrir formulario de corrección <ExternalLink size={13}/>
      </a>
      <p className="mt-4 flex max-w-2xl items-start gap-2 text-[10px] leading-5 text-[#858899]"><ShieldAlert size={13} className="mt-0.5 shrink-0"/>Los reportes son públicos. No envíes nombres completos, correos privados, contraseñas, documentos ni otros datos sensibles.</p>
    </div>
  </article>
}
