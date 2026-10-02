import{existsSync,readdirSync,readFileSync,statSync}from'node:fs';
import{fileURLToPath}from'node:url';
import{join,relative,sep}from'node:path';

const errors:string[]=[];
const projectRoot=fileURLToPath(new URL('../',import.meta.url));
const visualsDir=join(projectRoot,'public','visuals');

function walk(dir:string):string[]{
  return readdirSync(dir).flatMap(name=>{
    const full=join(dir,name);
    return statSync(full).isDirectory()?walk(full):[full];
  });
}

function validAsset(path:string){
  const buffer=readFileSync(path);
  const lower=path.toLowerCase();
  if(lower.endsWith('.webp'))return buffer.length>=12&&buffer.toString('ascii',0,4)==='RIFF'&&buffer.toString('ascii',8,12)==='WEBP';
  if(lower.endsWith('.png'))return buffer.length>=8&&buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if(lower.endsWith('.jpg')||lower.endsWith('.jpeg'))return buffer.length>=3&&buffer[0]===0xff&&buffer[1]===0xd8&&buffer[2]===0xff;
  if(lower.endsWith('.svg'))return buffer.toString('utf8').includes('<svg');
  return true;
}

const visualFiles=walk(visualsDir);
for(const file of visualFiles){
  if(!validAsset(file))errors.push('Invalid image file signature: '+relative(projectRoot,file).split(sep).join('/'));
}

const sourceFiles=[...walk(join(projectRoot,'src','app')),...walk(join(projectRoot,'src','components'))].filter(path=>/\.(tsx?|jsx?)$/.test(path));
const refs=new Set<string>();
for(const file of sourceFiles){
  const source=readFileSync(file,'utf8');
  for(const match of source.matchAll(/\/visuals\/[A-Za-z0-9._/-]+\.(?:svg|webp|png|jpe?g)/g))refs.add(match[0]);
}

for(const ref of refs){
  const target=join(projectRoot,'public',ref.replace(/^\//,''));
  if(!existsSync(target))errors.push('Missing referenced visual asset: '+ref);
  else if(!validAsset(target))errors.push('Referenced visual asset is not decodable: '+ref);
}

if(errors.length){
  console.error('[Asset Integrity] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Asset Integrity] PASS — '+visualFiles.length+' local visual assets validated; '+refs.size+' source references resolve to decodable files.');
