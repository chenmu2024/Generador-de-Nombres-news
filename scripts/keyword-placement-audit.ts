import fs from'node:fs';
import{keywordPages}from'../src/data/keywordMaster';
import{getKeywordPlacements,normalizeKeyword}from'../src/lib/keywordPlacement';

const errors:string[]=[];
const primaryOwners=new Map<string,string>();
const secondaryOwners=new Map<string,string>();

for(const page of keywordPages){
  const primary=normalizeKeyword(page.primaryKeyword);
  if(primaryOwners.has(primary))errors.push('Duplicate primary keyword: '+page.primaryKeyword);
  primaryOwners.set(primary,page.path);
}

let secondaryCount=0;
for(const page of keywordPages){
  const local=new Set<string>();
  const placements=getKeywordPlacements(page);
  const placementKeys=new Set(placements.map(item=>normalizeKeyword(item.keyword)));

  if(placements.length!==page.secondaryKeywords.length)errors.push('Placement count mismatch: '+page.path);

  for(const keyword of page.secondaryKeywords){
    secondaryCount++;
    const normalized=normalizeKeyword(keyword);
    if(!normalized)errors.push('Blank secondary keyword: '+page.path);
    if(local.has(normalized))errors.push('Duplicate secondary keyword in page: '+page.path+' -> '+keyword);
    local.add(normalized);

    const otherPrimary=primaryOwners.get(normalized);
    if(otherPrimary&&otherPrimary!==page.path)errors.push('Cannibalization: '+page.path+' secondary "'+keyword+'" is primary of '+otherPrimary);

    const otherSecondary=secondaryOwners.get(normalized);
    if(otherSecondary&&otherSecondary!==page.path)errors.push('Duplicate secondary ownership: '+keyword+' -> '+otherSecondary+' + '+page.path);
    else secondaryOwners.set(normalized,page.path);

    if(!placementKeys.has(normalized))errors.push('Missing visible placement: '+page.path+' -> '+keyword);
    const placement=placements.find(item=>normalizeKeyword(item.keyword)===normalized);
    if(!placement||placement.description.trim().length<45)errors.push('Thin placement copy: '+page.path+' -> '+keyword);
  }
}

const home=fs.readFileSync('src/app/page.tsx','utf8');
const slug=fs.readFileSync('src/app/[slug]/page.tsx','utf8');
const component=fs.readFileSync('src/components/KeywordIntentCoverage.tsx','utf8');
if(!home.includes('<KeywordIntentCoverage page={homeSeo}/>'))errors.push('Homepage does not render keyword intent coverage.');
if(!slug.includes('<KeywordIntentCoverage page={page}/>'))errors.push('Keyword pages do not render keyword intent coverage.');
if(!component.includes('getKeywordPlacements(page)'))errors.push('Keyword coverage component is not data-driven.');

if(errors.length){
  console.error('[Keyword Placement] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Keyword Placement] PASS — '+keywordPages.length+' routes, '+keywordPages.length+' primary keywords and '+secondaryCount+' secondary/long-tail intents have explicit visible placements with unique ownership.');
