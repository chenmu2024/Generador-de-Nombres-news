import{readdirSync,readFileSync,statSync}from'node:fs';
import{join,relative}from'node:path';

const rootPath=new URL('../src/',import.meta.url).pathname;
const errors:string[]=[];

function walk(dir:string){
  for(const name of readdirSync(dir)){
    const full=join(dir,name);
    const stat=statSync(full);
    if(stat.isDirectory()){walk(full);continue}
    if(!/\.(ts|tsx)$/.test(name))continue;
    const rel=relative(rootPath,full).replace(/\\/g,'/');
    const source=readFileSync(full,'utf8');
    if(rel!=='lib/favorites.ts'&&source.includes('gdn-favorites')){
      errors.push('Direct favorites storage key outside helper: src/'+rel);
    }
  }
}

walk(rootPath);
const helper=readFileSync(new URL('../src/lib/favorites.ts',import.meta.url),'utf8');
for(const required of ['readFavorites','writeFavorites','toggleFavorite','clearFavorites']){
  if(!helper.includes('function '+required))errors.push('Favorites helper missing '+required);
}

if(errors.length){
  console.error('[Favorites Audit] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Favorites Audit] PASS — favorites storage is centralized and normalized.');
