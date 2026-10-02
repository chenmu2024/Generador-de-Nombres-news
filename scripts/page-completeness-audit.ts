import{readFileSync}from'node:fs';
import{keywordPages}from'../src/data/keywordMaster';
import{pageBlueprints}from'../src/data/pageBlueprints';
import{getFaqs}from'../src/data/contentModules';

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
  const faqs=getFaqs(page);
  if(faqs.length<4)errors.push('Topic page must expose at least 4 FAQs: '+page.path+' -> '+faqs.length);
  if(new Set(faqs.map(item=>item.question.toLocaleLowerCase('es'))).size!==faqs.length)errors.push('Duplicate rendered FAQ: '+page.path);
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
const guideMarker='<PageSpecificGuide page={page} items={items}/>';
if(!slug.includes(guideMarker))errors.push('Slug template does not render PageSpecificGuide');
const guideSource=readFileSync(new URL('../src/components/PageSpecificGuide.tsx',import.meta.url),'utf8');
if(!guideSource.includes('Ejemplos de esta colección'))errors.push('PageSpecificGuide must expose representative collection examples');
if(!guideSource.includes('id="guia"'))errors.push('PageSpecificGuide must expose #guia anchor');
const guideIndex=slug.indexOf(guideMarker);
const collectionIndex=slug.indexOf('<CollectionSnapshot');
if(guideIndex<0||collectionIndex<0||guideIndex>collectionIndex)errors.push('PageSpecificGuide must appear before result collections');
if(slug.includes('<DecisionGuide'))errors.push('Generic DecisionGuide must not return after dedicated page guides');
if(!slug.includes('<TopicSubnav page={page}/>'))errors.push('Topic pages must keep visible sibling navigation');
if(!slug.includes('<PageSectionNav page={page}'))errors.push('Topic pages must render in-page section navigation');
if(!slug.includes('<PageDataBrief page={page} items={items}/>'))errors.push('Topic pages must render page-specific data/capability brief');
if(!slug.includes('const hasResultCollection=!isAlphabet&&items.length>0'))errors.push('Slug template must gate result collections by real data');
if(!slug.includes('hasResultCollection&&<div id="coleccion"')||!slug.includes('<NameGrid items={items}'))errors.push('Result collection must gate NameGrid on real data and expose #coleccion');
const intro=readFileSync(new URL('../src/components/PageIntro.tsx',import.meta.url),'utf8');
if(!intro.includes('getPageBlueprint(page.path)'))errors.push('PageIntro does not consume page blueprint');
if(!intro.includes("PageHeroVisual page={page}"))errors.push('Topic pages must render the resilient page-specific hero visual');

if(errors.length){
  console.error('[Page Completeness] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Page Completeness] PASS — '+pages.length+'/'+pages.length+' topic pages have unique hero guidance, a 3-card page guide and a page-specific FAQ.');
