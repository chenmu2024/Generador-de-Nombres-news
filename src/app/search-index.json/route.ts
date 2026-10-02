import{buildSearchIndex}from'@/lib/searchIndex';

export const dynamic='force-static';

export function GET(){
  return Response.json(
    {version:1,items:buildSearchIndex()},
    {headers:{'cache-control':'public, max-age=3600, stale-while-revalidate=86400'}}
  );
}
