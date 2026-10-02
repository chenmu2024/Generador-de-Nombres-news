import{buildSearchIndex}from'../src/lib/searchIndex';
import{keywordPages,keywordPageByPath}from'../src/data/keywordMaster';

const errors:string[]=[];
const items=buildSearchIndex();
const pages=items.filter(item=>item.kind==='page');
const names=items.filter(item=>item.kind==='name');

if(pages.length!==keywordPages.filter(page=>page.path!=='/').length){
  errors.push('Search index page count mismatch: '+pages.length);
}
if(names.length<600)errors.push('Search index has too few name records: '+names.length);

for(const item of items){
  if(!keywordPageByPath.has(item.path))errors.push('Search item points to unknown route: '+item.title+' -> '+item.path);
  if(!item.titleKey||!item.searchText)errors.push('Search item missing normalized text: '+item.title);
}

const duplicatePages=new Set<string>();
for(const page of pages){
  if(duplicatePages.has(page.path))errors.push('Duplicate search page: '+page.path);
  duplicatePages.add(page.path);
}

if(errors.length){
  console.error('[Search Index] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Search Index] PASS — '+pages.length+' pages + '+names.length+' names indexed.');
