export interface SearchConsoleSnapshot {
  date: string;
  keyword: string;
  url: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface SeoExperiment {
  date: string;
  url: string;
  changeType: 'title'|'description'|'intro'|'tool'|'internal-links'|'content'|'ux';
  before: string;
  after: string;
  targetKeyword: string;
  reason: string;
}

export type GrowthPriority='HIGH'|'MEDIUM'|'WATCH'|'LOW';

export interface GrowthOpportunity {
  priority: GrowthPriority;
  reason: string;
  recommendedAction: string;
}

export function classifyGrowthOpportunity(row: SearchConsoleSnapshot): GrowthOpportunity {
  if(row.impressions>=100&&row.position>=8&&row.position<=20){
    return {
      priority:'HIGH',
      reason:'High-impression query already close to page one.',
      recommendedAction:row.ctr<0.03
        ? 'Review title/description and search-intent match before expanding content.'
        : 'Improve tool usefulness, internal links and the section answering this query.',
    };
  }

  if(row.impressions>=50&&row.position>20&&row.position<=40){
    return {
      priority:'MEDIUM',
      reason:'Query has meaningful impressions but needs stronger relevance.',
      recommendedAction:'Strengthen the existing page first; do not create a new URL unless the Page Gate confirms independent intent.',
    };
  }

  if(row.impressions>=20){
    return {
      priority:'WATCH',
      reason:'There is early demand but not enough evidence to justify expansion.',
      recommendedAction:'Keep collecting Search Console data and compare trend over time.',
    };
  }

  return {
    priority:'LOW',
    reason:'Insufficient current search evidence.',
    recommendedAction:'Do not expand based on this row alone.',
  };
}
