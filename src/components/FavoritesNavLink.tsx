'use client';

import Link from 'next/link';
import {Heart} from 'lucide-react';
import {useEffect,useState} from 'react';

function readCount(){
  try{
    const items=JSON.parse(localStorage.getItem('gdn-favorites')||'[]');
    return Array.isArray(items)?items.length:0;
  }catch{return 0}
}

export default function FavoritesNavLink({mobile=false}:{mobile?:boolean}){
  const[count,setCount]=useState(0);

  useEffect(()=>{
    const sync=()=>setCount(readCount());
    sync();
    window.addEventListener('storage',sync);
    window.addEventListener('gdn:favorites-updated',sync);
    return()=>{
      window.removeEventListener('storage',sync);
      window.removeEventListener('gdn:favorites-updated',sync);
    };
  },[]);

  if(mobile)return <Link href="/favoritos" className="mt-1 flex items-center justify-between gap-2 border-t border-[#eceaf3] px-3 py-3 text-[12px] font-semibold text-[#5b4df5]">
    <span className="flex items-center gap-2"><Heart size={14}/>Favoritos</span>
    {count>0&&<span className="grid min-w-6 place-items-center rounded-full bg-[#f0edff] px-1.5 py-1 text-[9px] font-black text-[#5b4df5]">{count}</span>}
  </Link>;

  return <Link href="/favoritos" className="hidden h-10 items-center gap-2 rounded-full border border-[#e4e1ee] bg-white px-4 text-[12px] font-semibold text-[#282939] shadow-[0_2px_10px_rgba(50,43,100,.04)] transition hover:border-[#d1cbed] sm:inline-flex">
    <Heart size={15} className="text-[#ff4f80]"/>
    <span>Favoritos</span>
    {count>0&&<span aria-label={count+' favoritos guardados'} className="grid min-w-5 place-items-center rounded-full bg-[#f0edff] px-1.5 py-0.5 text-[9px] font-black text-[#5b4df5]">{count}</span>}
  </Link>
}
