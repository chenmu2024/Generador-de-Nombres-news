'use client';

import{useEffect,useState}from'react';

export interface SearchResult{
  kind:'page'|'name';
  title:string;
  subtitle:string;
  path:string;
  titleKey:string;
  searchText:string;
}

let indexPromise:Promise<SearchResult[]>|null=null;

function normalize(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es').replace(/\s+/g,' ').trim();
}

async function loadIndex(){
  if(!indexPromise){
    indexPromise=fetch('/search-index.json',{cache:'force-cache'})
      .then(async response=>{
        if(!response.ok)throw new Error('Search index unavailable');
        const json=await response.json() as {items?:SearchResult[]};
        return Array.isArray(json.items)?json.items:[];
      })
      .catch(error=>{
        indexPromise=null;
        throw error;
      });
  }
  return indexPromise;
}

export function preloadSiteSearch(){
  void loadIndex().catch(()=>{});
}

function score(item:SearchResult,query:string){
  if(item.titleKey===query)return 120;
  if(item.titleKey.startsWith(query))return 95;
  if(item.titleKey.includes(query))return 80;
  const tokens=query.split(' ').filter(Boolean);
  if(tokens.length>1&&tokens.every(token=>item.searchText.includes(token)))return 65;
  if(item.searchText.includes(query))return 50;
  return 0;
}

export function useSiteSearch(query:string,limit=8){
  const[results,setResults]=useState<SearchResult[]>([]);
  const[loading,setLoading]=useState(false);

  useEffect(()=>{
    const normalized=normalize(query);
    if(normalized.length<2){setResults([]);setLoading(false);return;}

    let cancelled=false;
    setLoading(true);
    const timer=window.setTimeout(()=>{
      loadIndex()
        .then(items=>{
          if(cancelled)return;
          const ranked=items
            .map(item=>({item,score:score(item,normalized)}))
            .filter(entry=>entry.score>0)
            .sort((a,b)=>b.score-a.score||(a.item.kind===b.item.kind?0:a.item.kind==='page'?-1:1))
            .slice(0,limit)
            .map(entry=>entry.item);
          setResults(ranked);
        })
        .catch(()=>{if(!cancelled)setResults([])})
        .finally(()=>{if(!cancelled)setLoading(false)});
    },80);

    return()=>{cancelled=true;window.clearTimeout(timer)};
  },[query,limit]);

  return{results,loading};
}
