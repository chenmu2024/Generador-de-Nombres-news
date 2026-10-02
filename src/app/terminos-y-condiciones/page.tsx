import type{Metadata}from'next';

export const metadata:Metadata={
  title:'Términos y Condiciones | GDN',
  description:'Condiciones de uso de las herramientas de GeneradorDeNombres.net.',
  alternates:{canonical:'/terminos-y-condiciones'},
};

export default function Page(){
  return <article className="gdn-shell max-w-4xl py-12 md:py-16">
    <p className="gdn-tech text-[10px] font-black uppercase tracking-[.16em] text-[#5b4df5]">Información legal</p>
    <h1 className="gdn-display mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Términos y Condiciones</h1>
    <p className="mt-6 max-w-3xl text-[14px] leading-7 text-[#737687]">Las herramientas se ofrecen como ayuda para generar, explorar y comparar ideas. Un resultado no constituye una garantía de disponibilidad, compatibilidad, origen legal o derecho exclusivo de uso.</p>

    <div className="mt-10 grid gap-4 md:grid-cols-2">
      <section className="gdn-card rounded-[20px] p-6">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Plataformas y juegos</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">La longitud admitida, los símbolos y los caracteres Unicode pueden variar según la plataforma, el dispositivo y futuras actualizaciones. Comprueba siempre el resultado en el servicio donde piensas utilizarlo.</p>
      </section>
      <section className="gdn-card rounded-[20px] p-6">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Uso comercial</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">Los nombres de tienda o marca son candidatos creativos. Antes de adoptarlos debes revisar por tu cuenta marcas registradas, dominios, perfiles sociales y cualquier requisito legal aplicable.</p>
      </section>
      <section className="gdn-card rounded-[20px] p-6 md:col-span-2">
        <h2 className="gdn-editorial text-[24px] font-bold text-[#292a39]">Datos culturales y significados</h2>
        <p className="mt-3 text-[13px] leading-7 text-[#777a8b]">Las fichas pueden incluir fuentes, transliteraciones, pronunciaciones y significados documentados. Una misma forma romanizada puede tener interpretaciones distintas según idioma, escritura o tradición, por lo que conviene consultar la fuente indicada cuando el contexto sea importante.</p>
      </section>
    </div>
  </article>
}
