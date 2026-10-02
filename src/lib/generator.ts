export const footballStyles=['Serio','Barrio','Gracioso','Competitivo'] as const;
export const footballContexts=['Equipo','Fútbol 5','Femenino','Torneo','Amigos'] as const;
export type FootballStyle=(typeof footballStyles)[number];
export type FootballContext=(typeof footballContexts)[number];

const footballTemplates:Record<FootballStyle,Array<(seed:string)=>string>>={
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

const footballContextTemplates:Record<Exclude<FootballContext,'Equipo'>,Array<(seed:string)=>string>>={
  'Fútbol 5':[
    s=>s+' F5',s=>'Futsal '+s,s=>'Quinta '+s,s=>s+' Five',s=>'Sala '+s,s=>s+' 5',
    s=>'Team '+s+' 5',s=>'Liga '+s+' 5',s=>s+' Indoor',s=>'Cinco '+s,s=>s+' Sala',s=>'Five '+s,
  ],
  Femenino:[
    s=>'Club Femenino '+s,s=>'Unión Femenina '+s,s=>'Las '+s,s=>'Deportivo Femenino '+s,
    s=>s+' Femenino',s=>'Academia '+s+' Femenina',s=>'Selección '+s,s=>'Equipo '+s+' Femenino',
    s=>s+' Ladies',s=>'Fuerza '+s,s=>'Real '+s+' Femenino',s=>'Atléticas '+s,
  ],
  Torneo:[
    s=>'Copa '+s,s=>'Torneo '+s,s=>'Liga '+s,s=>'Copa Barrio '+s,s=>'Trofeo '+s,s=>'Challenge '+s,
    s=>'Copa Nocturna '+s,s=>'Open '+s,s=>'Serie '+s,s=>'Copa 5 '+s,s=>'Festival '+s,s=>'Campeonato '+s,
  ],
  Amigos:[
    s=>'La Banda '+s,s=>'Los '+s,s=>s+' Amigos',s=>'La Peña '+s,s=>'Combo '+s,s=>s+' Crew',
    s=>'Los del '+s,s=>'Team '+s,s=>s+' y Amigos',s=>'Barrio '+s,s=>'Pachanga '+s,s=>'La Once '+s,
  ],
};

export function generateFootballNames(seed:string,tone:FootballStyle='Competitivo',context:FootballContext='Equipo'){
  const s=seed.trim()||'Barrio';
  const templates=context==='Equipo'?footballTemplates[tone]:footballContextTemplates[context];
  return Array.from(new Set(templates.map(template=>template(s))));
}
