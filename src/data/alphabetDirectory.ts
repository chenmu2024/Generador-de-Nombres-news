import{getNamesForPath,nameDataset}from'./nameDataset';

export const alphabetRoutes:Record<string,string>={
  A:'/nombres-con-a',
  B:'/nombres-con-b',
  C:'/nombres-con-c',
  E:'/nombres-con-e',
  F:'/nombres-con-f',
  M:'/nombres-con-m',
  'Ñ':'/nombres-con-en',
  Y:'/nombres-con-y',
  Z:'/nombres-con-z',
};

export const alphabetLetters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export function normalizeAlphabetInitial(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').charAt(0).toUpperCase();
}

export function getAlphabetDirectoryEntries(){
  return alphabetLetters.map(letter=>{
    const href=alphabetRoutes[letter];
    if(href)return{
      letter,
      href,
      count:getNamesForPath(href).length,
      names:[] as string[],
    };

    const names=Array.from(new Set(
      nameDataset
        .filter(item=>
          (item.type==='person'||(item.type==='culture'&&!item.tags.includes('mythology')))&&
          normalizeAlphabetInitial(item.name)===letter
        )
        .map(item=>item.name)
    )).sort((a,b)=>a.localeCompare(b,'es'));

    return{
      letter,
      count:names.length,
      names:names.slice(0,18),
    };
  });
}
