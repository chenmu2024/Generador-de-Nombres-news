'use client';

import {FormEvent,useMemo,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Search} from 'lucide-react';
import {keywordPages} from '@/data/keywordMaster';
import {emitAnalyticsEvent,rememberTrackedNavigation} from '@/lib/analytics';
import {EXPERIMENTS} from '@/data/experiments';

export default function HeaderSearch(){
  const router=useRouter();
  const[q,setQ]=useState('');
  const match=useMemo(()=>{
    const value=q.trim().toLocaleLowerCase('es');
    if(!value)return null;
    return keywordPages.find(item=>item.path!=='/'&&[item.h1,item.primaryKeyword,...item.secondaryKeywords].some(text=>text.toLocaleLowerCase('es').includes(value)))??null;
  },[q]);

  function go(targetPath:string,role:string){
    const sourcePath=window.location.pathname;
    rememberTrackedNavigation({
      placement:'header-search',
      role,
      experimentId:EXPERIMENTS.searchRoute,
      sourcePath,
      targetPath,
    });
    emitAnalyticsEvent({
      event:'link_click',
      placement:'header-search',
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
    if(match)go(match.path,'search-submit');
  }

  return <form onSubmit={submit} className="hidden w-[290px] items-center gap-2 rounded-full border border-[#e4e1ee] bg-[#fbfaff] px-3.5 py-2.5 lg:flex">
    <Search size={15} className="text-[#81859a]"/>
    <input value={q} onChange={e=>setQ(e.target.value)} className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#363746] outline-none placeholder:text-[#9a9bad]" placeholder="Buscar nombres, por ejemplo: gato negro..."/>
  </form>
}
