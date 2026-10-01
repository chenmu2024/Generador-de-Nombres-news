import type{Metadata}from'next';
import'./globals.css';
import Header from'@/components/Header';
import Footer from'@/components/Footer';
import AdsenseScript from'@/components/AdsenseScript';

export const metadata:Metadata={
  metadataBase:new URL('https://generadordenombres.net'),
  title:{default:'GeneradorDeNombres.net',template:'%s'},
  description:'Generador de nombres, apodos e ideas para juegos, redes, bebés, mascotas y negocios.',
  icons:{icon:'/favicon.svg'},
  openGraph:{type:'website',siteName:'GeneradorDeNombres.net',locale:'es_ES'}
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return <html lang="es">
    <head><link rel="preconnect" href="https://images.unsplash.com"/><link rel="dns-prefetch" href="https://images.unsplash.com"/></head>
    <body>
      <AdsenseScript/>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </body>
  </html>
}
