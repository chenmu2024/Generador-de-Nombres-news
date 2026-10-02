'use client';

import {FormEvent,useEffect,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Search,ArrowRight} from 'lucide-react';
import {emitAnalyticsEvent,rememberTrackedNavigation} from '@/lib/analytics';
import {EXPERIMENTS} from '@/data/experiments';
import{useSiteSearch,type SearchResult}from'@/hooks/useSiteSearch';
import SearchSuggestions from './SearchSuggestions';

export default function IntentRouter(){
  const router=useRouter();
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
      placement:'home-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath:item.path,
    });
    emitAnalyticsEvent({
      event:'link_click',
      placement:'home-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath:item.path,
      ts:Date.now(),
    });
    setFocused(false);
    router.push(item.path);
  }

  function submit(e:FormEvent){
    e.preventDefault();
    if(results[activeIndex])go(results[activeIndex],activeIndex,'submit');
  }

  return <div className="relative">
    <form onSubmit={submit} className="flex items-center gap-3 rounded-[15px] border border-[#e1e2ea] bg-white p-2 shadow-[0_14px_38px_rgba(84,72,158,.09)]">
      <Search size={19} className="ml-2 text-[#181a2a]"/>
      <input
        value={q}
        onFocus={()=>setFocused(true)}
        onBlur={()=>window.setTimeout(()=>setFocused(false),120)}
        onChange={e=>setQ(e.target.value)}
        onKeyDown={e=>{
          if(e.key==='ArrowDown'&&results.length){e.preventDefault();setActiveIndex(index=>(index+1)%results.length)}
          if(e.key==='ArrowUp'&&results.length){e.preventDefault();setActiveIndex(index=>(index-1+results.length)%results.length)}
          if(e.key==='Escape'){setFocused(false);(e.currentTarget as HTMLInputElement).blur()}
        }}
        className="h-11 min-w-0 flex-1 border-0 bg-transparent px-1 text-[14px] text-[#292a38] outline-none placeholder:text-[#9294a5]"
        placeholder="Busca Alma, gato negro, Free Fire, japonés…"
        aria-label="Buscar nombres y herramientas"
        aria-expanded={focused&&q.trim().length>=2}
      />
      <button type="submit" disabled={!results.length} className="inline-flex h-11 items-center gap-3 rounded-[11px] bg-[#5b4df5] px-6 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(91,77,245,.28)] transition hover:bg-[#4d40e0] disabled:cursor-not-allowed disabled:bg-[#aaa5d9]">
        Buscar <ArrowRight size={14}/>
      </button>
    </form>

    {focused&&q.trim().length>=2&&<SearchSuggestions results={results} loading={loading} activeIndex={activeIndex} onHover={setActiveIndex} onSelect={(item,index)=>go(item,index,'suggestion')}/>}
  </div>
}
