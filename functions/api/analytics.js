const ALLOWED_EVENTS=new Set(['link_impression','link_click','page_arrival','tool_action','session_depth','web_vital','page_view']);

function cleanString(value,max){
  if(typeof value!=='string')return'';
  return value.slice(0,max);
}

function jsonResponse(body,status=200){
  return new Response(JSON.stringify(body),{
    status,
    headers:{
      'content-type':'application/json; charset=utf-8',
      'cache-control':'no-store',
      'x-content-type-options':'nosniff',
    },
  });
}

export async function onRequestGet({env}){
  return jsonResponse({
    ok:true,
    collector:'gdn-first-party-analytics',
    storage:env&&env.ANALYTICS?'analytics-engine':'unbound',
  });
}

export async function onRequestPost({request,env}){
  const url=new URL(request.url);
  const origin=request.headers.get('origin');
  if(origin&&origin!==url.origin)return jsonResponse({ok:false,error:'origin_not_allowed'},403);

  const contentLength=Number(request.headers.get('content-length')||0);
  if(contentLength>8192)return jsonResponse({ok:false,error:'payload_too_large'},413);

  let body;
  try{body=await request.json()}catch{return jsonResponse({ok:false,error:'invalid_json'},400)}

  const event=cleanString(body?.event,40);
  const placement=cleanString(body?.placement,80);
  const role=cleanString(body?.role,80);
  const experimentId=cleanString(body?.experimentId,80);
  const sourcePath=cleanString(body?.sourcePath,256);
  const targetPath=cleanString(body?.targetPath,256);
  const ts=Number(body?.ts);
  const value=Number(body?.value);

  if(!ALLOWED_EVENTS.has(event))return jsonResponse({ok:false,error:'invalid_event'},400);
  if(!placement||!role||!experimentId)return jsonResponse({ok:false,error:'missing_dimensions'},400);
  if(!sourcePath.startsWith('/')||!targetPath.startsWith('/'))return jsonResponse({ok:false,error:'invalid_path'},400);

  if(env&&env.ANALYTICS&&typeof env.ANALYTICS.writeDataPoint==='function'){
    env.ANALYTICS.writeDataPoint({
      blobs:[event,placement,role,experimentId,sourcePath,targetPath],
      doubles:[1,Number.isFinite(ts)?ts:Date.now(),Number.isFinite(value)?value:0],
      indexes:[url.hostname],
    });
  }

  return new Response(null,{
    status:204,
    headers:{
      'cache-control':'no-store',
      'x-content-type-options':'nosniff',
    },
  });
}
