import{readFileSync}from'node:fs';

const errors:string[]=[];
const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

const layout=read('src/app/layout.tsx');
if(!layout.includes('href="#main-content"'))errors.push('Missing skip-to-content link');
if(!layout.includes('id="main-content"'))errors.push('Missing main-content target');

const header=read('src/components/Header.tsx');
if(!header.includes('aria-label="Navegación principal"'))errors.push('Primary navigation must be labelled');

const mobile=read('src/components/MobileNavMenu.tsx');
for(const required of[
  'aria-label="Menú de navegación"',
  'aria-label="Navegación móvil"',
  "event.key!=='Escape'",
]){
  if(!mobile.includes(required))errors.push('Mobile navigation accessibility regression: '+required);
}

const headerSearch=read('src/components/HeaderSearch.tsx');
for(const required of[
  'role="combobox"',
  'aria-autocomplete="list"',
  'aria-activedescendant=',
  'aria-controls=',
]){
  if(!headerSearch.includes(required))errors.push('Header search accessibility regression: '+required);
}

const intentSearch=read('src/components/IntentRouter.tsx');
for(const required of[
  'role="combobox"',
  'aria-autocomplete="list"',
  'aria-activedescendant=',
  'aria-controls=',
]){
  if(!intentSearch.includes(required))errors.push('Home search accessibility regression: '+required);
}

const suggestions=read('src/components/SearchSuggestions.tsx');
if(!suggestions.includes('role="listbox"'))errors.push('Search suggestions must expose listbox semantics');
if(!suggestions.includes('role="option"'))errors.push('Search suggestions must expose option semantics');
if(!suggestions.includes('aria-selected='))errors.push('Search suggestions must expose selected option');

const copy=read('src/components/CopyButton.tsx');
if(!copy.includes('aria-live="polite"'))errors.push('Copy feedback must be announced');

const alphabet=read('src/components/AlphabetExplorer.tsx');
if(!alphabet.includes('aria-pressed={previewLetter===entry.letter}'))errors.push('Alphabet preview buttons must expose pressed state');
if(!alphabet.includes('aria-label={'))errors.push('Alphabet explorer controls must be labelled');

const nameGrid=read('src/components/NameGrid.tsx');
if(!nameGrid.includes('aria-label="Buscar nombres"'))errors.push('Name grid search must be labelled');
if(!nameGrid.includes('aria-expanded={advancedOpen}'))errors.push('Advanced filters must expose expanded state');

if(errors.length){
  console.error('[Accessibility] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Accessibility] PASS — navigation, search, feedback and expandable controls keep required semantics.');
