import{keywordPages}from'../src/data/keywordMaster';import{topicClusters}from'../src/data/topicClusters';import{internalLinkPriority}from'../src/data/internalLinkGraph';const e:string[]=[];const p=new Set<string>();const ids=new Set<string>();for(const i of keywordPages){if(p.has(i.path))e.push('Duplicate path: '+i.path);if(ids.has(i.id))e.push('Duplicate id: '+i.id);p.add(i.path);ids.add(i.id);if(!i.lockedKeyword||i.status!=='VERIFIED')e.push('Unlocked page: '+i.path);if(!topicClusters[i.cluster])e.push('Missing cluster: '+i.path);if(!i.primaryKeyword.trim()||!i.h1.trim()||!i.title.trim()||!i.description.trim())e.push('Incomplete metadata: '+i.path)}const inboundPriority=new Map<string,number>();
for(const page of keywordPages)inboundPriority.set(page.path,0);
for(const page of keywordPages){
  const targets=internalLinkPriority[page.path]||[];
  if(page.path!=='/'&&targets.length===0)e.push('Missing priority internal links: '+page.path);
  const seen=new Set<string>();
  for(const target of targets){
    if(target===page.path)e.push('Self internal link: '+page.path);
    if(seen.has(target))e.push('Duplicate internal link: '+page.path+' -> '+target);
    seen.add(target);
    if(!p.has(target))e.push('Unknown internal link target: '+page.path+' -> '+target);
    else inboundPriority.set(target,(inboundPriority.get(target)||0)+1);
  }
}
for(const page of keywordPages){
  const isLetterDetail=page.path.startsWith('/nombres-con-');
  if(page.path!=='/'&&!isLetterDetail&&(inboundPriority.get(page.path)||0)===0)e.push('No inbound priority link: '+page.path);
}
if(e.length){console.error('[SEO Governance] FAILED');for(const x of e)console.error(' - '+x);process.exit(1)}console.log(`[SEO Governance] PASS — ${keywordPages.length} VERIFIED/LOCKED routes.`);
