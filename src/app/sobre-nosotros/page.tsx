export const metadata={title:'Sobre nosotros | GDN',description:'Conoce el propósito y la metodología de GeneradorDeNombres.net.'};

export default function Page(){
  return <article className="gdn-shell max-w-3xl py-16">
    <p className="gdn-eyebrow">GeneradorDeNombres.net</p>
    <h1 className="mt-3 text-4xl font-black tracking-[-.035em] md:text-5xl">Sobre nosotros</h1>
    <p className="mt-6 text-lg leading-8 text-[#676b76]">Creamos herramientas gratuitas para encontrar nombres, apodos e identidades digitales en español. La prioridad es que puedas llegar a opciones útiles rápido, compararlas y guardarlas sin recorrer páginas llenas de relleno.</p>
    <section className="gdn-card mt-10 rounded-3xl p-6 md:p-8">
      <h2 className="text-2xl font-black">Cómo trabajamos</h2>
      <p className="mt-4 leading-7 text-[#70747e]">Organizamos las herramientas según la intención real: un nickname necesita estilos y símbolos; un nombre de persona necesita origen y significado; una mascota necesita personalidad; un negocio necesita tono de marca. Los datos culturales y las reglas que pueden cambiar con el tiempo requieren revisión adicional.</p>
    </section>
  </article>
}
