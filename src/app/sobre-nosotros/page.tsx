export const metadata={title:'Sobre nosotros | GDN',description:'Sobre nosotros de GeneradorDeNombres.net.'};

export default function Page(){
  return <article className="gdn-shell max-w-3xl py-12 md:py-16">
    <p className="gdn-eyebrow">GeneradorDeNombres.net</p>
    <h1 className="brand-serif mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Sobre nosotros</h1>
    <p className="mt-6 text-[14px] leading-7 text-[#737687]">Creamos herramientas gratuitas para encontrar nombres, apodos e identidades digitales en español. La prioridad es que puedas llegar a opciones útiles rápido, compararlas y guardarlas sin recorrer páginas llenas de relleno.</p>
    <section className="gdn-card mt-10 rounded-[20px] p-6 md:p-8"><h2 className="brand-serif text-[26px] font-bold text-[#292a39]">Cómo trabajamos</h2><p className="mt-4 text-[13px] leading-7 text-[#777a8b]">Organizamos las herramientas según la intención real: un nickname necesita estilos y símbolos; un nombre de persona necesita origen y significado; una mascota necesita personalidad; un negocio necesita tono de marca. Los datos culturales y las reglas que pueden cambiar con el tiempo requieren revisión adicional.</p></section>
  </article>
}
