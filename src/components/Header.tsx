import {Grid2X2,Leaf} from 'lucide-react';
import HeaderSearch from './HeaderSearch';
import FavoritesNavLink from './FavoritesNavLink';
import MobileNavMenu from './MobileNavMenu';
import TrackedLink from './TrackedLink';
import {EXPERIMENTS} from '@/data/experiments';
import{primaryNavigation}from'@/data/siteNavigation';

const directoryLink=primaryNavigation.find(item=>item.href==='/directorio')!;
const categoryNavigation=primaryNavigation.filter(item=>item.href!==directoryLink.href);

export default function Header(){
  return <header className="sticky top-0 z-50 border-b border-[#eceaf3] bg-white/95 backdrop-blur-xl">
    <div className="gdn-shell flex h-[64px] items-center justify-between gap-3 xl:gap-5">
      <TrackedLink href="/" placement="header" role="logo-home" experimentId={EXPERIMENTS.nav} className="flex shrink-0 items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-[11px] bg-[#f0edff] text-[#5b4df5]"><Leaf size={18} fill="currentColor"/></span>
        <span className="gdn-display hidden text-[18px] font-bold tracking-[-.025em] text-[#171827] sm:inline">GeneradorDeNombres</span>
      </TrackedLink>

      <nav aria-label="Navegación principal" className="hidden min-w-0 items-center gap-2.5 lg:flex xl:gap-3 2xl:gap-4">
        {categoryNavigation.map((item,index)=><TrackedLink key={item.href} href={item.href} placement="header-nav" role={'desktop-'+(index+1)+'-'+item.label.toLowerCase()} experimentId={EXPERIMENTS.nav} className="whitespace-nowrap text-[9px] font-semibold text-[#55576a] transition hover:text-[#5b4df5] xl:text-[10px] 2xl:text-[11px]">{item.label}</TrackedLink>)}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <TrackedLink
          href={directoryLink.href}
          placement="header-directory"
          role="all-tools"
          experimentId={EXPERIMENTS.nav}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#d9d4ee] bg-[#f4f1ff] px-3 text-[11px] font-bold text-[#574cc7] transition hover:border-[#c8c0f2] hover:bg-[#ebe7ff]"
        >
          <Grid2X2 size={14}/><span>Directorio</span>
        </TrackedLink>
        <HeaderSearch/>
        <FavoritesNavLink/>
        <MobileNavMenu items={categoryNavigation}/>
      </div>
    </div>
  </header>
}
