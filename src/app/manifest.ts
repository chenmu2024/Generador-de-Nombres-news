import type{MetadataRoute}from'next';

export const dynamic='force-static';

export default function manifest():MetadataRoute.Manifest{
  return{
    name:'GeneradorDeNombres.net',
    short_name:'GDN',
    description:'Generador de nombres, apodos e ideas para juegos, personas, mascotas y negocios.',
    start_url:'/',
    display:'standalone',
    background_color:'#fbfbff',
    theme_color:'#5b4df5',
    lang:'es',
    icons:[
      {src:'/favicon.svg',sizes:'any',type:'image/svg+xml'},
    ],
  };
}
