import{readFileSync}from'node:fs';

const errors:string[]=[];
const headers=readFileSync(new URL('../public/_headers',import.meta.url),'utf8');
const nextConfig=readFileSync(new URL('../next.config.mjs',import.meta.url),'utf8');

for(const required of[
  'X-Content-Type-Options: nosniff',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'Permissions-Policy: camera=(), microphone=(), geolocation=()',
  'X-Frame-Options: SAMEORIGIN',
  '/_next/static/*',
  'max-age=31536000, immutable',
  '/visuals/*',
]){
  if(!headers.includes(required))errors.push('Missing Pages header/cache rule: '+required);
}

if(!nextConfig.includes("output:'export'"))errors.push('Static export must remain enabled for Pages deployment.');
if(!nextConfig.includes("poweredByHeader:false"))errors.push('poweredByHeader must remain disabled.');

if(errors.length){
  console.error('[Deployment Audit] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Deployment Audit] PASS — security headers, static asset caching and export settings verified.');
