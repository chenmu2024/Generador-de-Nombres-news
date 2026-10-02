export const primaryNavigation=[
  {label:'Juegos',href:'/nombres-free-fire'},
  {label:'Personas',href:'/nombres-de-mujer'},
  {label:'Mascotas',href:'/nombres-gatos'},
  {label:'Culturas',href:'/nombres-japoneses'},
  {label:'Negocios',href:'/nombres-para-tiendas'},
  {label:'Recursos',href:'/nombres-por-letra'},
] as const;

export const footerNavigationGroups=[
  {
    title:'Juegos',
    links:[
      ['Free Fire','/nombres-free-fire'],
      ['Roblox','/nombres-roblox'],
      ['Instagram','/nombres-instagram'],
      ['Anime','/nombres-anime'],
    ],
  },
  {
    title:'Personas',
    links:[
      ['Nombres de mujer','/nombres-de-mujer'],
      ['Nombres de niña','/nombres-de-nina'],
      ['Nombres de niño','/nombres-de-nino'],
      ['Nombres unisex','/nombres-unisex'],
    ],
  },
  {
    title:'Mascotas',
    links:[
      ['Gatos','/nombres-gatos'],
      ['Perritas','/nombres-perritas'],
      ['Perros machos','/nombres-perros-machos'],
      ['Caballos','/nombres-caballos'],
    ],
  },
  {
    title:'Culturas',
    links:[
      ['Japoneses','/nombres-japoneses'],
      ['Coreanos','/nombres-coreanos'],
      ['Franceses','/nombres-franceses'],
      ['Chinos','/nombres-chinos'],
    ],
  },
  {
    title:'Más',
    links:[
      ['Tiendas y negocios','/nombres-para-tiendas'],
      ['Equipos de fútbol','/nombres-equipos-futbol'],
      ['Nombres por letra','/nombres-por-letra'],
      ['Mis favoritos','/favoritos'],
    ],
  },
] as const;

export const legalNavigation=[
  {label:'Sobre nosotros',href:'/sobre-nosotros',role:'about'},
  {label:'Privacidad',href:'/politica-de-privacidad',role:'privacy'},
  {label:'Términos',href:'/terminos-y-condiciones',role:'terms'},
  {label:'Contacto',href:'/contacto',role:'contact'},
] as const;

export const staticAppRoutes=[
  '/',
  '/favoritos',
  '/sobre-nosotros',
  '/politica-de-privacidad',
  '/terminos-y-condiciones',
  '/contacto',
] as const;
