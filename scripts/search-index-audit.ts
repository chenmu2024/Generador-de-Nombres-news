import{buildSearchIndex}from'../src/lib/searchIndex';
import{keywordPages,keywordPageByPath}from'../src/data/keywordMaster';
import{nameDataset}from'../src/data/nameDataset';
import{staticAppRoutes}from'../src/data/siteNavigation';

const errors:string[]=[];
const items=buildSearchIndex();
const pages=items.filter(item=>item.kind==='page');
const names=items.filter(item=>item.kind==='name');

const expectedPageCount=keywordPages.filter(page=>page.path!=='/').length+1;
if(pages.length!==expectedPageCount){
  errors.push('Search index page count mismatch: '+pages.length+' expected '+expectedPageCount);
}
if(names.length<600)errors.push('Search index has too few name records: '+names.length);

const validRoutes=new Set<string>([...keywordPageByPath.keys(),...staticAppRoutes]);
for(const item of items){
  if(!validRoutes.has(item.path))errors.push('Search item points to unknown route: '+item.title+' -> '+item.path);
  if(!item.titleKey||!item.searchText)errors.push('Search item missing normalized text: '+item.title);
}

const duplicatePages=new Set<string>();
for(const page of pages){
  if(duplicatePages.has(page.path))errors.push('Duplicate search page: '+page.path);
  duplicatePages.add(page.path);
}

const blackCat=nameDataset.find(item=>item.type==='pet'&&item.tags.includes('cat')&&item.tags.includes('black'));
if(blackCat){
  const indexed=names.find(item=>item.title===blackCat.name&&item.path==='/nombres-gatos-negros');
  if(!indexed?.searchText.includes('gato')||!indexed.searchText.includes('negro')){
    errors.push('Spanish pet aliases missing from search index');
  }
}

const strongDog=nameDataset.find(item=>item.type==='pet'&&item.tags.includes('dog')&&item.tags.includes('strong'));
if(strongDog){
  const indexed=names.find(item=>item.title===strongDog.name);
  if(!indexed?.searchText.includes('perro')||!indexed.searchText.includes('fuerte')){
    errors.push('Spanish dog aliases missing from search index');
  }
}

if(errors.length){
  console.error('[Search Index] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Search Index] PASS — '+pages.length+' pages + '+names.length+' names indexed.');
