'use client';

import{usePathname}from'next/navigation';
import{useEffect}from'react';
import{consumeTrackedArrival,emitAnalyticsEvent}from'@/lib/analytics';
import{EXPERIMENTS}from'@/data/experiments';

export default function PageArrivalTracker(){
  const pathname=usePathname();

  useEffect(()=>{
    emitAnalyticsEvent({
      event:'page_view',
      placement:'page',
      role:'view',
      experimentId:EXPERIMENTS.pageView,
      sourcePath:pathname,
      targetPath:pathname,
      ts:Date.now(),
    });

    const pending=consumeTrackedArrival(pathname);
    if(pending){
      emitAnalyticsEvent({
        event:'page_arrival',
        placement:pending.placement,
        role:pending.role,
        experimentId:pending.experimentId,
        sourcePath:pending.sourcePath,
        targetPath:pathname,
        ts:Date.now(),
      });
    }

    try{
      const key='gdn:session-depth';
      const raw=sessionStorage.getItem(key);
      const state=raw?JSON.parse(raw) as {depth?:number;path?:string}:{depth:0,path:''};
      const previousPath=typeof state.path==='string'&&state.path?state.path:pathname;
      const depth=Math.max(1,Number(state.depth)||0)+(state.path&&state.path!==pathname?1:state.depth?0:0);
      sessionStorage.setItem(key,JSON.stringify({depth,path:pathname}));
      if(depth>=2&&previousPath!==pathname){
        emitAnalyticsEvent({
          event:'session_depth',
          placement:'session',
          role:'depth-'+depth,
          experimentId:EXPERIMENTS.sessionDepth,
          sourcePath:previousPath,
          targetPath:pathname,
          ts:Date.now(),
        });
      }
    }catch{}
  },[pathname]);

  return null;
}
