import{readFileSync}from'node:fs';

const source=readFileSync(new URL('../functions/api/analytics.js',import.meta.url),'utf8');
const moduleUrl='data:text/javascript;base64,'+Buffer.from(source).toString('base64');
const collector=await import(moduleUrl) as {
  onRequestGet:(ctx:{env:Record<string,unknown>})=>Promise<Response>;
  onRequestPost:(ctx:{request:Request;env:Record<string,unknown>})=>Promise<Response>;
};

const writes:unknown[]=[];
const boundEnv={
  ANALYTICS:{
    writeDataPoint(point:unknown){writes.push(point)}
  }
};

const validPayload={
  event:'link_click',
  placement:'next-step',
  role:'next-intent-1',
  experimentId:'next-intent-v1',
  sourcePath:'/nombres-de-mujer',
  targetPath:'/nombres-de-nina',
  ts:Date.now(),
};

function request(payload:unknown,origin='https://example.com'){
  return new Request('https://example.com/api/analytics',{
    method:'POST',
    headers:{'content-type':'application/json',origin},
    body:JSON.stringify(payload),
  });
}

function assert(condition:unknown,message:string):asserts condition{
  if(!condition)throw new Error(message);
}

const ok=await collector.onRequestPost({request:request(validPayload),env:boundEnv});
assert(ok.status===204,'Valid analytics event must return 204');
assert(writes.length===1,'Valid analytics event must write one datapoint');

const point=writes[0] as {blobs?:string[];doubles?:number[];indexes?:string[]};
assert(point.blobs?.[0]==='link_click','blob1 must contain event');
assert(point.blobs?.[1]==='next-step','blob2 must contain placement');
assert(point.blobs?.[3]==='next-intent-v1','blob4 must contain experiment id');
assert(point.blobs?.[4]==='/nombres-de-mujer','blob5 must contain source path');
assert(point.blobs?.[5]==='/nombres-de-nina','blob6 must contain target path');
assert(point.doubles?.[0]===1,'double1 must contain event count');
assert(point.indexes?.[0]==='example.com','index1 must contain hostname');

const invalidEvent=await collector.onRequestPost({
  request:request({...validPayload,event:'search_text'}),
  env:boundEnv,
});
assert(invalidEvent.status===400,'Unknown event must return 400');

const crossOrigin=await collector.onRequestPost({
  request:request(validPayload,'https://evil.example'),
  env:boundEnv,
});
assert(crossOrigin.status===403,'Cross-origin event must return 403');

const invalidPath=await collector.onRequestPost({
  request:request({...validPayload,targetPath:'https://example.com/elsewhere'}),
  env:boundEnv,
});
assert(invalidPath.status===400,'Non-path target must return 400');

const unbound=await collector.onRequestPost({request:request(validPayload),env:{}});
assert(unbound.status===204,'Collector must remain harmless without Analytics Engine binding');

const status=await collector.onRequestGet({env:{}});
assert(status.status===200,'Collector GET status must return 200');
const statusJson=await status.json() as {storage?:string};
assert(statusJson.storage==='unbound','Unbound collector must report unbound storage');

console.log('[Analytics Collector] PASS — payload, origin, schema and unbound fallback verified.');
