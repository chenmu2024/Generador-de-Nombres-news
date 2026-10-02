'use client';

import{useReportWebVitals}from'next/web-vitals';
import{emitAnalyticsEvent}from'@/lib/analytics';
import{EXPERIMENTS}from'@/data/experiments';

export default function WebVitalsReporter(){
  useReportWebVitals(metric=>{
    const path=window.location.pathname;
    emitAnalyticsEvent({
      event:'web_vital',
      placement:'performance',
      role:metric.name.toLowerCase(),
      experimentId:EXPERIMENTS.webVitals,
      sourcePath:path,
      targetPath:path,
      ts:Date.now(),
      value:metric.value,
    });
  });

  return null;
}
