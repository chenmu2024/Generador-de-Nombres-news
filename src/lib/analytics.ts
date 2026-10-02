export type AnalyticsEventName='link_impression'|'link_click'|'page_arrival'|'tool_action'|'session_depth'|'web_vital';

export interface AnalyticsEventPayload{
  event:AnalyticsEventName;
  placement:string;
  role:string;
  experimentId:string;
  sourcePath:string;
  targetPath:string;
  ts:number;
  value?:number;
}

export interface PendingNavigation{
  placement:string;
  role:string;
  experimentId:string;
  sourcePath:string;
  targetPath:string;
  ts:number;
}

declare global{
  interface Window{
    dataLayer?:Record<string,unknown>[];
  }
}

const NAV_KEY='gdn:last-link-click';

export function rememberTrackedNavigation(payload:Omit<PendingNavigation,'ts'>){
  if(typeof window==='undefined')return;
  try{
    sessionStorage.setItem(NAV_KEY,JSON.stringify({...payload,ts:Date.now()}));
  }catch{}
}

export function consumeTrackedArrival(pathname:string):PendingNavigation|null{
  if(typeof window==='undefined')return null;
  try{
    const raw=sessionStorage.getItem(NAV_KEY);
    if(!raw)return null;
    const pending=JSON.parse(raw) as PendingNavigation;
    if(Date.now()-pending.ts>30*60*1000){
      sessionStorage.removeItem(NAV_KEY);
      return null;
    }
    if(pending.targetPath!==pathname)return null;
    sessionStorage.removeItem(NAV_KEY);
    return pending;
  }catch{return null}
}

export function emitAnalyticsEvent(payload:AnalyticsEventPayload){
  if(typeof window==='undefined')return;

  window.dispatchEvent(new CustomEvent('gdn:analytics',{detail:payload}));

  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({
    event:'gdn_'+payload.event,
    gdn_placement:payload.placement,
    gdn_role:payload.role,
    gdn_experiment_id:payload.experimentId,
    gdn_source_path:payload.sourcePath,
    gdn_target_path:payload.targetPath,
    gdn_ts:payload.ts,
    gdn_value:payload.value,
  });

  const endpoint=process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT||'/api/analytics';
  if(endpoint){
    try{
      const body=JSON.stringify(payload);
      if(navigator.sendBeacon){
        navigator.sendBeacon(endpoint,new Blob([body],{type:'application/json'}));
      }else{
        fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true}).catch(()=>{});
      }
    }catch{}
  }
}

export function trackProductAction(role:string,placement='product'){
  if(typeof window==='undefined')return;
  emitAnalyticsEvent({
    event:'tool_action',
    placement,
    role,
    experimentId:'product-actions-v1',
    sourcePath:window.location.pathname,
    targetPath:window.location.pathname,
    ts:Date.now(),
  });
}
