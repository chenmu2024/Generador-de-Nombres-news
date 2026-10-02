'use client';

import {FormEvent,useEffect,useId,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Search} from 'lucide-react';
import {emitAnalyticsEvent,rememberTrackedNavigation} from '@/lib/analytics';
import {EXPERIMENTS} from '@/data/experiments';
import{preloadSiteSearch,useSiteSearch,type SearchResult}from'@/hooks/useSiteSearch';
import SearchSuggestions from './SearchSuggestions';
import{rememberNameSearch}from'@/lib/searchHandoff';

export default function HeaderSearch({mobile=false}:{mobile?:boolean}){
  const router=useRouter();
  const listboxId=useId();
  const[q,setQ]=useState('');
  const[activeIndex,setActiveIndex]=useState(0);
  const[focused,setFocused]=useState(false);
  const{results,loading}=useSiteSearch(q,8);

  useEffect(()=>{setActiveIndex(0)},[q,results.length]);

  function go(item:SearchResult,index:number,source:'submit'|'suggestion'){
    const sourcePath=window.location.pathname;
    const role=source==='submit'
      ?'search-submit-'+item.kind
      :'search-'+item.kind+'-'+(index+1);
    rememberTrackedNavigation({
      placement:'header-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath:item.path,
    });
    emitAnalyticsEvent({
      event:'link_click',
      placement:'header-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath:item.path,
      ts:Date.now(),
    });
    if(item.kind==='name')rememberNameSearch(item.title,item.path);
    setQ('');
    setFocused(false);
    router.push(item.path);
  }

  function submit(e:FormEvent){
    e.preventDefault();
    if(results[activeIndex])go(results[activeIndex],activeIndex,'submit');
  }

  return <div className={mobile?'relative block w-full lg:hidden':'relative hidden w-[290px] lg:block'}>
    <form onSubmit={submit} className={'flex items-center gap-2 border border-[#e4e1ee] bg-[#fbfaff] px-3.5 py-2.5 '+(mobile?'rounded-[11px]':'rounded-full')}>
      <Search size={15} className="text-[#81859a]"/>
      <input
        value={q}
        onFocus={()=>{setFocused(true);preloadSiteSearch()}}
        onBlur={()=>window.setTimeout(()=>setFocused(false),120)}
        onChange={e=>setQ(e.target.value)}
        onKeyDown={e=>{
          if(e.key==='ArrowDown'&&results.length){e.preventDefault();setActiveIndex(index=>(index+1)%results.length)}
          if(e.key==='ArrowUp'&&results.length){e.preventDefault();setActiveIndex(index=>(index-1+results.length)%results.length)}
          if(e.key==='Escape'){setFocused(false);(e.currentTarget as HTMLInputElement).blur()}
        }}
        className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#363746] outline-none placeholder:text-[#9a9bad]"
        placeholder="Buscar nombre o herramienta…"
        role="combobox"
        aria-autocomplete="list"
        aria-label="Buscar nombres y herramientas"
        aria-expanded={focused&&q.trim().length>=2}
        aria-controls={listboxId}
        aria-activedescendant={focused&&results[activeIndex]?listboxId+'-option-'+activeIndex:undefined}
      />
    </form>
    {focused&&q.trim().length>=2&&<SearchSuggestions results={results} loading={loading} activeIndex={activeIndex} onHover={setActiveIndex} onSelect={(item,index)=>go(item,index,'suggestion')} compact listboxId={listboxId}/>}
  </div>
}
