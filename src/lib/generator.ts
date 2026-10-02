const storePrefixes:Record<string,string[]>={
  Premium:['Casa','Maison','Atelier','Noble','Aura','Galería'],
  Minimal:['Nexo','Luma','Noma','Uno','Linea','Mono'],
  Juvenil:['Viva','Hola','Chispa','Mimo','Pop','Club'],
  Artesanal:['Taller','Casa','Raíz','Origen','Manos','Patio'],
};

const storeSuffixes:Record<string,string[]>={
  Premium:['Studio','Boutique','Collection','Co.','House','Atelier'],
  Minimal:['Lab','Co.','Studio','Shop','Works','Market'],
  Juvenil:['Pop','Club','Shop','Mood','Go','Market'],
  Artesanal:['Taller','Mercado','Hecho a Mano','Casa','Oficio','Colectivo'],
};

export function generateStoreNames(seed:string,tone='Premium'){
  const s=seed.trim()||'Mía';
  const prefixes=storePrefixes[tone]??storePrefixes.Premium;
  const suffixes=storeSuffixes[tone]??storeSuffixes.Premium;
  const results=[
    ...prefixes.slice(0,6).map(prefix=>prefix+' '+s),
    ...suffixes.slice(0,6).map(suffix=>s+' '+suffix),
  ];
  return Array.from(new Set(results));
}

const footballTemplates:Record<string,Array<(seed:string)=>string>>={
  Serio:[
    s=>'Atlético '+s,
    s=>'Deportivo '+s,
    s=>'Club '+s,
    s=>'Unión '+s,
    s=>'Real '+s,
    s=>s+' FC',
    s=>s+' CF',
    s=>'Sporting '+s,
    s=>'Academia '+s,
    s=>s+' Athletic',
    s=>s+' United',
    s=>s+' XI',
  ],
  Barrio:[
    s=>'Barrio '+s,
    s=>'La Banda '+s,
    s=>'Los del '+s,
    s=>s+' Crew',
    s=>s+' 5',
    s=>'Unión '+s,
    s=>s+' Calle',
    s=>'Combo '+s,
    s=>s+' City',
    s=>'La Peña '+s,
    s=>s+' Amigos',
    s=>'Team '+s,
  ],
  Gracioso:[
    s=>'Los '+s+' sin VAR',
    s=>s+' y a correr',
    s=>'Los del '+s+' FC',
    s=>s+' Tiki Taka',
    s=>'No Era Penal '+s,
    s=>s+' de Rebote',
    s=>'VAR '+s,
    s=>'Los Cansados de '+s,
    s=>s+' al Palo',
    s=>'Once de '+s,
    s=>s+' sin Banquillo',
    s=>'La Pachanga '+s,
  ],
  Competitivo:[
    s=>s+' Elite',
    s=>s+' Titans',
    s=>s+' United',
    s=>s+' Pro',
    s=>s+' Legends',
    s=>s+' XI',
    s=>'Prime '+s,
    s=>'Vanguard '+s,
    s=>s+' Force',
    s=>s+' Academy',
    s=>'Alpha '+s,
    s=>s+' Champions',
  ],
};

export function generateFootballNames(seed:string,tone='Competitivo'){
  const s=seed.trim()||'Barrio';
  const templates=footballTemplates[tone]??footballTemplates.Competitivo;
  return Array.from(new Set(templates.map(template=>template(s))));
}
