import fs from 'node:fs';
import path from 'node:path';
import { classifyGrowthOpportunity, type SearchConsoleSnapshot } from '../src/data/seoGrowth';

const input=process.argv[2]??'data/gsc-snapshot.example.json';
const file=path.resolve(input);

if(!fs.existsSync(file)){
  console.error('[GSC] File not found: '+file);
  process.exit(1);
}

const rows=JSON.parse(fs.readFileSync(file,'utf8')) as SearchConsoleSnapshot[];
const rank={HIGH:0,MEDIUM:1,WATCH:2,LOW:3};

const report=rows.map(row=>({
  ...row,
  ...classifyGrowthOpportunity(row),
})).sort((a,b)=>rank[a.priority]-rank[b.priority]||b.impressions-a.impressions);

console.log('\nGSC Opportunity Report');
console.log('======================');

for(const item of report){
  console.log('\n['+item.priority+'] '+item.keyword);
  console.log('URL: '+item.url);
  console.log('Position: '+item.position+' | Impressions: '+item.impressions+' | Clicks: '+item.clicks+' | CTR: '+(item.ctr*100).toFixed(1)+'%');
  console.log('Why: '+item.reason);
  console.log('Action: '+item.recommendedAction);
}
