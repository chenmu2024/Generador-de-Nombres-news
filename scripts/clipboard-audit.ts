import{readdirSync,readFileSync,statSync}from'node:fs';
import{join,relative}from'node:path';

const root=new URL('../src/',import.meta.url);
const rootPath=root.pathname;
const errors:string[]=[];

function walk(dir:string){
  for(const name of readdirSync(dir)){
    const full=join(dir,name);
    const stat=statSync(full);
    if(stat.isDirectory()){walk(full);continue}
    if(!/\.(ts|tsx)$/.test(name))continue;
    const rel=relative(rootPath,full).replace(/\\/g,'/');
    const source=readFileSync(full,'utf8');
    if(rel!=='lib/clipboard.ts'&&source.includes('navigator.clipboard')){
      errors.push('Direct Clipboard API usage outside helper: src/'+rel);
    }
  }
}

walk(rootPath);
const helper=readFileSync(new URL('../src/lib/clipboard.ts',import.meta.url),'utf8');
if(!helper.includes('navigator.clipboard'))errors.push('Clipboard helper must attempt the modern Clipboard API');
if(!helper.includes("document.execCommand('copy')"))errors.push('Clipboard helper must retain a legacy copy fallback');

if(errors.length){
  console.error('[Clipboard Audit] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}
console.log('[Clipboard Audit] PASS — copy actions are centralized behind the resilient helper.');
