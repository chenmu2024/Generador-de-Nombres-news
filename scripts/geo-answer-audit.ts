import{readFileSync}from'node:fs';
import{keywordPages}from'../src/data/keywordMaster';
import{getNamesForPath}from'../src/data/nameDataset';
import{getPageAnswer}from'../src/lib/pageAnswer';

const errors:string[]=[];
const pages=keywordPages.filter(page=>page.path!=='/');
const seenAnswers=new Map<string,string>();

for(const page of pages){
  const content=getPageAnswer(page,getNamesForPath(page.path));
  const normalizedKeyword=page.primaryKeyword.toLocaleLowerCase('es');
  if(!content.question.toLocaleLowerCase('es').includes(normalizedKeyword))errors.push('Direct answer question does not name primary intent: '+page.path);
  if(!content.answer.toLocaleLowerCase('es').includes(normalizedKeyword))errors.push('Direct answer body does not name primary intent: '+page.path);
  if(content.answer.trim().length<120)errors.push('Direct answer too thin: '+page.path+' -> '+content.answer.trim().length);
  if(content.facts.length!==3)errors.push('Direct answer must expose exactly 3 compact facts: '+page.path);
  if(content.facts.some(fact=>!fact.label.trim()||!fact.value.trim()))errors.push('Blank direct-answer fact: '+page.path);
  if(content.limitation.trim().length<90)errors.push('Direct answer limitation too thin: '+page.path+' -> '+content.limitation.trim().length);

  const normalizedAnswer=content.answer.toLocaleLowerCase('es').replace(/\d+/g,'#').replace(/\s+/g,' ').trim();
  const duplicate=seenAnswers.get(normalizedAnswer);
  if(duplicate)errors.push('Near-template duplicate direct answer: '+duplicate+' + '+page.path);
  else seenAnswers.set(normalizedAnswer,page.path);
}

const slug=readFileSync(new URL('../src/app/[slug]/page.tsx',import.meta.url),'utf8');
const component=readFileSync(new URL('../src/components/PageDirectAnswer.tsx',import.meta.url),'utf8');
const nav=readFileSync(new URL('../src/components/PageSectionNav.tsx',import.meta.url),'utf8');

if(!slug.includes("import PageDirectAnswer from'@/components/PageDirectAnswer'"))errors.push('Slug template does not import PageDirectAnswer');
if(!slug.includes('<PageDirectAnswer page={page} items={items}/>'))errors.push('Slug template does not render PageDirectAnswer');
const answerIndex=slug.indexOf('<PageDirectAnswer page={page} items={items}/>');
const toolIndex=slug.indexOf('{hasPrimaryTool&&<div id="herramienta"');
const guideIndex=slug.indexOf('<PageSpecificGuide page={page} items={items}/>');
if(answerIndex<0||guideIndex<0||answerIndex>guideIndex)errors.push('Direct answer must appear before explanatory guide content');
if(toolIndex>=0&&answerIndex>toolIndex)errors.push('Direct answer must appear before primary tool content');
if(component.includes("'use client'")||component.includes('"use client"'))errors.push('Direct answer must stay server-rendered');
if(!component.includes('data-geo-answer="true"')||!component.includes('id="respuesta"'))errors.push('Direct answer must expose stable GEO/anchor markers');
if(!nav.includes("href:'#respuesta'"))errors.push('Page section navigation must link to the direct answer');

if(errors.length){
  console.error('[GEO Answer] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[GEO Answer] PASS — '+pages.length+' topic pages expose unique server-rendered direct answers with evidence facts and explicit limitations before tools/guides.');
