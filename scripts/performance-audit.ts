import{readFileSync}from'node:fs';

const errors:string[]=[];
const read=(path:string)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

const home=read('src/app/page.tsx');
if(home.includes('images.unsplash.com'))errors.push('Homepage must not depend on Unsplash hero images');
for(const asset of['/visuals/hero-gaming.webp','/visuals/hero-people.webp','/visuals/hero-pets.webp','/visuals/hero-culture.svg','/visuals/hero-business.svg']){
  if(!home.includes(asset))errors.push('Missing local homepage hero asset: '+asset);
}
const studioIndex=home.indexOf('<HomeFreeFireStudio/>');
const savedIndex=home.indexOf('<HomeSavedNames/>');
const quickIndex=home.indexOf('<HomeQuickGenerator');
if(studioIndex<0||savedIndex<0||quickIndex<0||!(studioIndex<savedIndex&&savedIndex<quickIndex)){
  errors.push('Homepage interaction order must keep flagship tool before hydrated saved names and quick discovery');
}

const layout=read('src/app/layout.tsx');
if(layout.includes('images.unsplash.com'))errors.push('Layout must not preconnect to obsolete image hosts');
if(!layout.includes('<WebVitalsReporter/>'))errors.push('Web Vitals reporter must remain mounted');

const vitals=read('src/components/WebVitalsReporter.tsx');
if(!vitals.includes("event:'web_vital'"))errors.push('Web Vitals reporter must emit web_vital events');

const adsense=read('src/components/AdsenseScript.tsx');
if(!adsense.includes('strategy="lazyOnload"'))errors.push('AdSense script must remain deferred');

const adSlot=read('src/components/AdSlot.tsx');
if(!adSlot.includes('minHeight:250')||!adSlot.includes('min-h-[286px]')){
  errors.push('Ad slot must reserve layout space to limit CLS');
}

const alphabetMatrix=read('src/components/AlphabetMatrix.tsx');
const alphabetExplorer=read('src/components/AlphabetExplorer.tsx');
if(alphabetMatrix.includes("'use client'")||alphabetMatrix.includes('"use client"')){
  errors.push('AlphabetMatrix should stay server-rendered');
}
if(!alphabetExplorer.includes("'use client'")){
  errors.push('AlphabetExplorer must own the interactive client boundary');
}

if(errors.length){
  console.error('[Performance] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Performance] PASS — local media, deferred ads, CLS reserves, Web Vitals and server/client boundaries verified.');
