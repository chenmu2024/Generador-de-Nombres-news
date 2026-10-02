import type{Metadata}from'next';

export const metadata:Metadata={
  title:'Política de Privacidad | GDN',
  description:'Política de Privacidad de GeneradorDeNombres.net.',
  alternates:{canonical:'/politica-de-privacidad'},
};

export default function Page(){
  return <article className="gdn-shell max-w-4xl py-12 md:py-16">
    <p className="gdn-tech text-[10px] font-black uppercase tracking-[.16em] text-[#5b4df5]">Información legal</p>
    <h1 className="gdn-display mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Política de Privacidad</h1>
    <p className="mt-6 max-w-3xl text-[14px] leading-7 text-[#737687]">Las herramientas principales funcionan sin crear una cuenta y no necesitan que introduzcas datos personales para generar, guardar o copiar nombres.</p>

    <div className="mt-10 grid gap-4">
      <section className="gdn-card rounded-[20px] p-6 md:p-7">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Datos guardados en tu navegador</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">Funciones como favoritos utilizan almacenamiento local del navegador. Los nombres guardados permanecen en ese dispositivo y no forman parte de los eventos de analítica del sitio.</p>
      </section>

      <section className="gdn-card rounded-[20px] p-6 md:p-7">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Analítica propia y rendimiento</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">El sitio envía a un endpoint propio del mismo dominio eventos técnicos como vistas de página, impresiones y clics de enlaces, llegada a otra página, profundidad de sesión, acciones de herramientas y métricas de rendimiento como LCP, CLS o INP.</p>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">Estos eventos contienen el tipo de acción, las rutas de página, identificadores internos del experimento y, cuando corresponde, el valor numérico de una métrica de rendimiento. No incluyen el texto que escribes, tus búsquedas, los nombres generados ni el contenido de tus favoritos.</p>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">El recolector puede funcionar sin almacenamiento persistente. Cuando existe un almacén de métricas asociado al despliegue, los eventos técnicos pueden conservarse para analizar funcionamiento y uso agregado.</p>
      </section>

      <section className="gdn-card rounded-[20px] p-6 md:p-7">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Correcciones públicas en GitHub</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">La página de contacto ofrece un enlace voluntario a GitHub para reportar correcciones. Al abrirlo sales de GeneradorDeNombres.net y cualquier información que publiques en el issue será visible públicamente y quedará sujeta a las condiciones y políticas de GitHub. Por eso el formulario pide no incluir información personal o sensible.</p>
      </section>

      <section className="gdn-card rounded-[20px] p-6 md:p-7">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Publicidad y terceros</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">La integración publicitaria está desactivada mientras no se configure. Si se activa publicidad, analítica de terceros u otro servicio externo que trate información adicional, esta política deberá actualizarse para identificar el servicio y su finalidad.</p>
      </section>
    </div>
  </article>
}
