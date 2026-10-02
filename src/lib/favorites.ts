const FAVORITES_KEY='gdn-favorites';

export function normalizeFavorites(value:unknown):string[]{
  if(!Array.isArray(value))return[];
  return Array.from(new Set(value.filter((item):item is string=>typeof item==='string'&&item.length>0)));
}

export function readFavorites():string[]{
  if(typeof window==='undefined')return[];
  try{
    return normalizeFavorites(JSON.parse(window.localStorage.getItem(FAVORITES_KEY)||'[]'));
  }catch{
    return[];
  }
}

export function writeFavorites(items:string[]):string[]{
  const normalized=normalizeFavorites(items);
  if(typeof window==='undefined')return normalized;
  try{
    window.localStorage.setItem(FAVORITES_KEY,JSON.stringify(normalized));
    window.dispatchEvent(new Event('gdn:favorites-updated'));
  }catch{}
  return normalized;
}

export function removeFavorite(value:string,current=readFavorites()){
  return writeFavorites(current.filter(item=>item!==value));
}

export function toggleFavorite(value:string,current=readFavorites()){
  const removed=current.includes(value);
  const items=removed?current.filter(item=>item!==value):[...current,value];
  return{items:writeFavorites(items),removed};
}

export function clearFavorites(){
  if(typeof window==='undefined')return;
  try{
    window.localStorage.removeItem(FAVORITES_KEY);
    window.dispatchEvent(new Event('gdn:favorites-updated'));
  }catch{}
}
