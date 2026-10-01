export const metadata={title:'Política de Privacidad | GDN',description:'Política de privacidad de GeneradorDeNombres.net.'};

export default function Page(){
  return <article className="gdn-shell max-w-3xl py-16">
    <p className="gdn-eyebrow">Información legal</p>
    <h1 className="mt-3 text-4xl font-black tracking-[-.035em] md:text-5xl">Política de Privacidad</h1>
    <p className="mt-6 leading-8 text-[#676b76]">Las herramientas principales funcionan sin crear una cuenta y no necesitan que introduzcas datos personales para generar o copiar nombres.</p>
    <div className="mt-10 space-y-5">
      <section className="gdn-card rounded-3xl p-6"><h2 className="text-xl font-black">Datos locales</h2><p className="mt-3 leading-7 text-[#70747e]">Funciones como favoritos pueden usar el almacenamiento local del navegador. Esa información permanece en tu dispositivo salvo que se indique expresamente lo contrario.</p></section>
      <section className="gdn-card rounded-3xl p-6"><h2 className="text-xl font-black">Servicios de terceros</h2><p className="mt-3 leading-7 text-[#70747e]">Si el sitio incorpora analítica, publicidad u otros servicios de terceros, esta política se actualizará para explicar qué información se trata y con qué finalidad.</p></section>
    </div>
  </article>
}
