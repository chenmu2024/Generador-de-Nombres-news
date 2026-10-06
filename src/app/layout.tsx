import type{Metadata,Viewport}from'next';
import'./globals.css';
import Header from'@/components/Header';
import Footer from'@/components/Footer';
import AdsenseScript from'@/components/AdsenseScript';
import PageArrivalTracker from'@/components/PageArrivalTracker';
import WebVitalsReporter from'@/components/WebVitalsReporter';

export const viewport:Viewport={
  themeColor:'#fbfbff',
  colorScheme:'light',
};

export const metadata:Metadata={
  metadataBase:new URL('https://generadordenombres.net'),
  title:{default:'GeneradorDeNombres.net',template:'%s'},
  description:'Generador de nombres, apodos e ideas para juegos, redes, bebés, mascotas y negocios.',
  icons:{icon:'/favicon.svg'},
  openGraph:{type:'website',siteName:'GeneradorDeNombres.net',locale:'es_ES'}
};

const siteStructuredData={
  '@context':'https://schema.org',
  '@graph':[
    {
      '@type':'Organization',
      '@id':'https://generadordenombres.net/#organization',
      name:'GeneradorDeNombres.net',
      url:'https://generadordenombres.net/',
      logo:{
        '@type':'ImageObject',
        '@id':'https://generadordenombres.net/#logo',
        url:'https://generadordenombres.net/favicon.svg',
      },
    },
    {
      '@type':'WebSite',
      '@id':'https://generadordenombres.net/#website',
      name:'GeneradorDeNombres.net',
      alternateName:'GDN',
      url:'https://generadordenombres.net/',
      description:'Generador de nombres, apodos e ideas para juegos, redes, bebés, mascotas y negocios.',
      inLanguage:'es',
      publisher:{'@id':'https://generadordenombres.net/#organization'},
    },
  ],
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  const buildVersion=(process.env.CF_PAGES_COMMIT_SHA||process.env.GITHUB_SHA||'local').slice(0,12);
  return <html lang="es" data-gdn-build={buildVersion}>
    <body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(siteStructuredData)}}/>
      <a href="#main-content" className="gdn-skip-link">Saltar al contenido</a>
      <AdsenseScript/>
      <PageArrivalTracker/>
      <WebVitalsReporter/>
      <Header/>
      <main id="main-content">{children}</main>
      <Footer/>
    </body>
  </html>
}
