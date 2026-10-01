'use client';

import {useState} from 'react';
import {Check,Copy} from 'lucide-react';

export default function CopyButton({value}:{value:string}){
  const[copied,setCopied]=useState(false);
  async function copy(){
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(()=>setCopied(false),1200);
  }
  return <button onClick={copy} aria-label={copied?'Copiado':'Copiar'} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#d4cbbb] bg-[#fffaf2] px-3 text-[10px] font-bold text-[#5f6a62] transition hover:border-[#9ca99f] hover:bg-white hover:text-[#24483b]">
    {copied?<Check size={12.5} className="text-[#52735f]"/>:<Copy size={12.5}/>}
    {copied?'Copiado':'Copiar'}
  </button>
}
