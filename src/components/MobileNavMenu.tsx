'use client';

import{useEffect,useRef}from'react';
import{usePathname}from'next/navigation';
import{Menu}from'lucide-react';
import HeaderSearch from'./HeaderSearch';
import FavoritesNavLink from'./FavoritesNavLink';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';

export default function MobileNavMenu({items}:{items:{label:string;href:string}[]}){
  const pathname=usePathname();
  const detailsRef=useRef<HTMLDetailsElement|null>(null);

  useEffect(()=>{
    if(detailsRef.current)detailsRef.current.open=false;
  },[pathname]);

  return <details ref={detailsRef} className="relative xl:hidden">
    <summary aria-label="Abrir menú" className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[#e4e1ee] bg-white text-[#5b5d70]"><Menu size={17}/></summary>
    <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-[14px] border border-[#e5e2ed] bg-white p-1.5 shadow-[0_18px_50px_rgba(43,39,74,.16)]">
      <div className="p-1.5"><HeaderSearch mobile/></div>
      <div className="my-1 border-t border-[#eceaf3]"/>
      {items.map((item,index)=><TrackedLink
        key={item.href}
        className="block rounded-[10px] px-3 py-2.5 text-[12px] font-medium text-[#55576a] hover:bg-[#f7f5ff]"
        href={item.href}
        placement="header-nav"
        role={'mobile-'+(index+1)+'-'+item.label.toLowerCase()}
        experimentId={EXPERIMENTS.nav}
      >{item.label}</TrackedLink>)}
      <FavoritesNavLink mobile/>
    </div>
  </details>
}
