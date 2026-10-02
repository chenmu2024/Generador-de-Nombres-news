'use client';

import {FormEvent,useMemo,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Search,ArrowRight} from 'lucide-react';
import {keywordPages} from '@/data/keywordMaster';
import {emitAnalyticsEvent,rememberTrackedNavigation} from '@/lib/analytics';
import {EXPERIMENTS} from '@/data/experiments';

export default function IntentRouter(){
  const router=useRouter();
  const[q,setQ]=useState('');
  const matches=useMemo(()=>{
    const value=q.trim().toLocaleLowerCase('es');
    if(!value)return [];
    return keywordPages.filter(item=>item.path!=='/'&&[item.h1,item.primaryKeyword,...item.secondaryKeywords].some(text=>text.toLocaleLowerCase('es').includes(value))).slice(0,5);
  },[q]);

  function go(targetPath:string,role:string){
    const sourcePath=window.location.pathname;
    rememberTrackedNavigation({
      placement:'home-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath,
    });
    emitAnalyticsEvent({
      event:'link_click',
      placement:'home-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath,
      ts:Date.now(),
    });
    router.push(targetPath);
  }

  function submit(e:FormEvent){
    e.preventDefault();
    if(matches[0])go(matches[0].path,'search-submit');
  }

  return <div className="relative">
    <form onSubmit={submit} className="flex items-center gap-3 rounded-[15px] border border-[#e1e2ea] bg-white p-2 shadow-[0_14px_38px_rgba(84,72,158,.09)]">
      <Search size={19} className="ml-2 text-[#181a2a]"/>
      <input value={q} onChange={e=>setQ(e.target.value)} className="h-11 min-w-0 flex-1 border-0 bg-transparent px-1 text-[14px] text-[#292a38] outline-none placeholder:text-[#9294a5]" placeholder="Buscar nombres o herramientas..."/>
      <button type="submit" className="inline-flex h-11 items-center gap-3 rounded-[11px] bg-[#5b4df5] px-6 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(91,77,245,.28)] transition hover:bg-[#4d40e0]">
        Buscar <ArrowRight size={14}/>
      </button>
    </form>

    {matches.length>0&&<div className="absolute left-0 right-0 top-[64px] z-30 overflow-hidden rounded-[14px] border border-[#e5e3ec] bg-white p-1.5 shadow-[0_18px_44px_rgba(37,32,70,.14)]">
      {matches.map((item,index)=><button key={item.path} onClick={()=>go(item.path,'search-suggestion-'+(index+1))} className="block w-full rounded-[10px] px-3 py-2.5 text-left transition hover:bg-[#f7f5ff]">
        <span className="block text-[13px] font-semibold text-[#2b2c38]">{item.h1}</span>
        <span className="mt-0.5 block truncate text-[11px] text-[#888a9a]">{item.description}</span>
      </button>)}
    </div>}
  </div>
}
