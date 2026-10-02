'use client';

import Link from 'next/link';
import type{ComponentProps,ReactNode}from'react';
import{useEffect,useRef}from'react';
import{emitAnalyticsEvent,rememberTrackedNavigation}from'@/lib/analytics';

type Props=Omit<ComponentProps<typeof Link>,'children'> & {
  children:ReactNode;
  placement:string;
  role:string;
  experimentId:string;
};

export default function TrackedLink({children,placement,role,experimentId,href,onClick,...rest}:Props){
  const ref=useRef<HTMLAnchorElement|null>(null);
  const impressed=useRef(false);
  const targetPath=typeof href==='string'?href:href.pathname||'';

  useEffect(()=>{
    const node=ref.current;
    if(!node||impressed.current)return;

    const send=()=>{
      if(impressed.current)return;
      impressed.current=true;
      emitAnalyticsEvent({
        event:'link_impression',
        placement,
        role,
        experimentId,
        sourcePath:window.location.pathname,
        targetPath,
        ts:Date.now(),
      });
    };

    if(!('IntersectionObserver'in window)){send();return;}
    const observer=new IntersectionObserver(entries=>{
      if(entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>=0.5)){
        send();
        observer.disconnect();
      }
    },{threshold:[0.5]});
    observer.observe(node);
    return()=>observer.disconnect();
  },[placement,role,experimentId,targetPath]);

  return <Link
    {...rest}
    ref={ref}
    href={href}
    data-gdn-placement={placement}
    data-gdn-role={role}
    data-gdn-experiment={experimentId}
    onClick={event=>{
      const sourcePath=window.location.pathname;
      rememberTrackedNavigation({placement,role,experimentId,sourcePath,targetPath});
      emitAnalyticsEvent({
        event:'link_click',
        placement,
        role,
        experimentId,
        sourcePath,
        targetPath,
        ts:Date.now(),
      });
      onClick?.(event);
    }}
  >{children}</Link>;
}
