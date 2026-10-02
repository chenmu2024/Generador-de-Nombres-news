import {Leaf} from 'lucide-react';
import HeaderSearch from './HeaderSearch';
import FavoritesNavLink from './FavoritesNavLink';
import MobileNavMenu from './MobileNavMenu';
import TrackedLink from './TrackedLink';
import {EXPERIMENTS} from '@/data/experiments';
import{primaryNavigation}from'@/data/siteNavigation';

export default function Header(){
  return <header className="sticky top-0 z-50 border-b border-[#eceaf3] bg-white/95 backdrop-blur-xl">
    <div className="gdn-shell flex h-[64px] items-center justify-between gap-5">
      <TrackedLink href="/" placement="header" role="logo-home" experimentId={EXPERIMENTS.nav} className="flex shrink-0 items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-[11px] bg-[#f0edff] text-[#5b4df5]"><Leaf size={18} fill="currentColor"/></span>
        <span className="gdn-display text-[18px] font-bold tracking-[-.025em] text-[#171827]">GeneradorDeNombres</span>
      </TrackedLink>

      <nav aria-label="Navegación principal" className="hidden items-center gap-5 xl:flex">
        {primaryNavigation.map((item,index)=><TrackedLink key={item.href} href={item.href} placement="header-nav" role={'desktop-'+(index+1)+'-'+item.label.toLowerCase()} experimentId={EXPERIMENTS.nav} className="text-[12px] font-medium text-[#55576a] transition hover:text-[#5b4df5]">{item.label}</TrackedLink>)}
      </nav>

      <div className="ml-auto flex items-center gap-2.5">
        <HeaderSearch/>
        <FavoritesNavLink/>
        <MobileNavMenu items={primaryNavigation}/>
      </div>
    </div>
  </header>
}
