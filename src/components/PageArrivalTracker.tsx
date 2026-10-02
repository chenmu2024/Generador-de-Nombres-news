'use client';

import{usePathname}from'next/navigation';
import{useEffect}from'react';
import{consumeTrackedArrival,emitAnalyticsEvent}from'@/lib/analytics';

export default function PageArrivalTracker(){
  const pathname=usePathname();

  useEffect(()=>{
    const pending=consumeTrackedArrival(pathname);
    if(!pending)return;
    emitAnalyticsEvent({
      event:'page_arrival',
      placement:pending.placement,
      role:pending.role,
      experimentId:pending.experimentId,
      sourcePath:pending.sourcePath,
      targetPath:pathname,
      ts:Date.now(),
    });
  },[pathname]);

  return null;
}
