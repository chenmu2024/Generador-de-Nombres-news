import type{Metadata}from'next';
import'./globals.css';
import Header from'@/components/Header';
import Footer from'@/components/Footer';
import AdsenseScript from'@/components/AdsenseScript';
import PageArrivalTracker from'@/components/PageArrivalTracker';
import WebVitalsReporter from'@/components/WebVitalsReporter';

export const metadata:Metadata={
  metadataBase:new URL('https://generadordenombres.net'),
  title:{default:'GeneradorDeNombres.net',template:'%s'},
  description:'Generador de nombres, apodos e ideas para juegos, redes, bebés, mascotas y negocios.',
  icons:{icon:'/favicon.svg'},
  openGraph:{type:'website',siteName:'GeneradorDeNombres.net',locale:'es_ES'}
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  const buildVersion=(process.env.CF_PAGES_COMMIT_SHA||process.env.GITHUB_SHA||'local').slice(0,12);
  return <html lang="es" data-gdn-build={buildVersion}>
    <body>
      <AdsenseScript/>
      <PageArrivalTracker/>
      <WebVitalsReporter/>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </body>
  </html>
}
