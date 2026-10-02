import{readFileSync}from'node:fs';

const errors:string[]=[];
const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const userFacing=[
  'src/components/KeywordIntentCoverage.tsx',
  'src/components/AlphabetMatrix.tsx',
  'src/components/PageIntro.tsx',
  'src/data/contentModules.ts',
  'src/components/CultureDataNote.tsx',
  'src/components/DatasetTrustNote.tsx',
];

const forbidden=[
  'páginas SEO',
  'demanda validada',
  'páginas duplicadas',
  'futura ampliación',
  'espacio popular',
  'Solo se crea una página independiente',
  'La estructura de datos separa',
];

for(const path of userFacing){
  const source=read(path);
  for(const phrase of forbidden){
    if(source.includes(phrase))errors.push(path+' contains implementation/stale user copy: '+phrase);
  }
}

if(errors.length){
  console.error('[Content Quality] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Content Quality] PASS — user-facing copy is free of known implementation and stale-label language.');
