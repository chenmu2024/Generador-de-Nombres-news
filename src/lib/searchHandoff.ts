const KEY='gdn:pending-name-search';

interface PendingNameSearch{
  name:string;
  path:string;
  ts:number;
}

export function rememberNameSearch(name:string,path:string){
  if(typeof window==='undefined')return;
  try{
    sessionStorage.setItem(KEY,JSON.stringify({name,path,ts:Date.now()} satisfies PendingNameSearch));
  }catch{}
}

export function consumeNameSearch(path:string){
  if(typeof window==='undefined')return null;
  try{
    const raw=sessionStorage.getItem(KEY);
    if(!raw)return null;
    const pending=JSON.parse(raw) as PendingNameSearch;
    if(Date.now()-pending.ts>5*60*1000){
      sessionStorage.removeItem(KEY);
      return null;
    }
    if(pending.path!==path)return null;
    sessionStorage.removeItem(KEY);
    return pending.name;
  }catch{return null}
}
