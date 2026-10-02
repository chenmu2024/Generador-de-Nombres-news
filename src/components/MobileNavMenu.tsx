'use client';

import{useEffect,useRef}from'react';
import{usePathname}from'next/navigation';
import{Grid2X2,Menu}from'lucide-react';
import HeaderSearch from'./HeaderSearch';
import FavoritesNavLink from'./FavoritesNavLink';
import TrackedLink from'./TrackedLink';
import{EXPERIMENTS}from'@/data/experiments';

export default function MobileNavMenu({items}:{items:readonly{readonly label:string;readonly href:string}[]}){
  const pathname=usePathname();
  const detailsRef=useRef<HTMLDetailsElement|null>(null);

  useEffect(()=>{
    if(detailsRef.current)detailsRef.current.open=false;
  },[pathname]);

  useEffect(()=>{
    const menu=detailsRef.current;
    if(!menu)return;

    const onPointerDown=(event:PointerEvent)=>{
      if(menu.open&&!menu.contains(event.target as Node))menu.open=false;
    };

    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key!=='Escape'||!menu.open)return;
      menu.open=false;
      menu.querySelector<HTMLElement>('summary')?.focus();
    };

    document.addEventListener('pointerdown',onPointerDown);
    document.addEventListener('keydown',onKeyDown);
    return()=>{
      document.removeEventListener('pointerdown',onPointerDown);
      document.removeEventListener('keydown',onKeyDown);
    };
  },[]);

  return <details ref={detailsRef} className="relative xl:hidden">
    <summary aria-label="Menú de navegación" className="grid size-10 cursor-pointer list-none place-items-center rounded-full border border-[#e4e1ee] bg-white text-[#5b5d70]"><Menu size={17}/></summary>
    <nav aria-label="Navegación móvil" className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-[14px] border border-[#e5e2ed] bg-white p-1.5 shadow-[0_18px_50px_rgba(43,39,74,.16)]">
      <div className="p-1.5"><HeaderSearch mobile/></div>
      <div className="my-1 border-t border-[#eceaf3]"/>
      <TrackedLink
        href="/#todas-las-herramientas"
        placement="header-nav"
        role="mobile-all-tools"
        experimentId={EXPERIMENTS.nav}
        className="mb-1 flex items-center gap-2 rounded-[10px] bg-[#f0edff] px-3 py-2.5 text-[12px] font-bold text-[#5146d6]"
      ><Grid2X2 size={14}/>Todas las herramientas</TrackedLink>
      {items.map((item,index)=>{
        const active=pathname===item.href;
        return <TrackedLink
          key={item.href}
          className={'block rounded-[10px] px-3 py-2.5 text-[12px] font-medium transition '+(active?'bg-[#f0edff] text-[#5146d6]':'text-[#55576a] hover:bg-[#f7f5ff]')}
          href={item.href}
          aria-current={active?'page':undefined}
          placement="header-nav"
          role={'mobile-'+(index+1)+'-'+item.label.toLowerCase()}
          experimentId={EXPERIMENTS.nav}
        >{item.label}</TrackedLink>;
      })}
      <FavoritesNavLink mobile/>
    </nav>
  </details>
}
