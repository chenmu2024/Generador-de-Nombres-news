'use client';

import {useState} from 'react';
import {Check,Copy} from 'lucide-react';

export default function CopyButton({value}:{value:string}){
  const[copied,setCopied]=useState(false);
  async function copy(){await navigator.clipboard.writeText(value);setCopied(true);window.setTimeout(()=>setCopied(false),1200)}
  return <button onClick={copy} aria-label={copied?'Copiado':'Copiar'} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[9px] border border-[#e0ddeb] bg-white px-3 text-[10px] font-semibold text-[#66697a] shadow-[0_2px_8px_rgba(55,49,91,.03)] transition hover:border-[#cfc8fb] hover:bg-[#f7f5ff] hover:text-[#5146d6]">
    {copied?<Check size={12.5} className="text-[#25a468]"/>:<Copy size={12.5}/>}
    {copied?'Copiado':'Copiar'}
  </button>
}
