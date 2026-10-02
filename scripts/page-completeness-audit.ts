import{readFileSync}from'node:fs';
import{keywordPages}from'../src/data/keywordMaster';
import{pageBlueprints}from'../src/data/pageBlueprints';

const errors:string[]=[];
const pages=keywordPages.filter(page=>page.path!=='/');
const expected=new Set(pages.map(page=>page.path));
const actual=new Set(Object.keys(pageBlueprints));

for(const page of pages){
  const blueprint=pageBlueprints[page.path];
  if(!blueprint){errors.push('Missing blueprint: '+page.path);continue;}
  if(!blueprint.hero.eyebrow.trim()||!blueprint.hero.title.trim()||blueprint.hero.body.trim().length<45)errors.push('Thin hero blueprint: '+page.path);
  if(!blueprint.guide.title.trim()||blueprint.guide.summary.trim().length<45)errors.push('Thin guide blueprint: '+page.path);
  if(blueprint.guide.cards.length!==3)errors.push('Guide must have exactly 3 cards: '+page.path);
  for(const card of blueprint.guide.cards){
    if(!card.title.trim()||card.body.trim().length<35)errors.push('Thin guide card: '+page.path+' -> '+card.title);
  }
  if(!blueprint.faq.question.trim()||blueprint.faq.answer.trim().length<45)errors.push('Missing page-specific FAQ: '+page.path);
}
for(const path of actual)if(!expected.has(path))errors.push('Blueprint points to unknown/non-topic route: '+path);

const heroTitles=new Map<string,string>();
const guideTitles=new Map<string,string>();
for(const [path,blueprint]of Object.entries(pageBlueprints)){
  const hero=blueprint.hero.title.toLocaleLowerCase('es');
  const guide=blueprint.guide.title.toLocaleLowerCase('es');
  if(heroTitles.has(hero))errors.push('Duplicate hero title: '+path+' + '+heroTitles.get(hero));
  else heroTitles.set(hero,path);
  if(guideTitles.has(guide))errors.push('Duplicate guide title: '+path+' + '+guideTitles.get(guide));
  else guideTitles.set(guide,path);
}

const slug=readFileSync(new URL('../src/app/[slug]/page.tsx',import.meta.url),'utf8');
if(!slug.includes('<PageSpecificGuide page={page} items={items}/>'))errors.push('Slug template does not render PageSpecificGuide');
if(!slug.includes('const hasResultCollection=!isAlphabet&&items.length>0'))errors.push('Slug template must gate result collections by real data');
if(!slug.includes('hasResultCollection&&<NameGrid'))errors.push('NameGrid must not render on dedicated no-list tool pages');
const intro=readFileSync(new URL('../src/components/PageIntro.tsx',import.meta.url),'utf8');
if(!intro.includes('getPageBlueprint(page.path)'))errors.push('PageIntro does not consume page blueprint');

if(errors.length){
  console.error('[Page Completeness] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Page Completeness] PASS — '+pages.length+'/'+pages.length+' topic pages have unique hero guidance, a 3-card page guide and a page-specific FAQ.');
