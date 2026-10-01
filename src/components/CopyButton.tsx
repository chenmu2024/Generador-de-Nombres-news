'use client';

import {useState} from 'react';
import {Check, Copy} from 'lucide-react';

export default function CopyButton({value}:{value:string}){
  const[copied,setCopied]=useState(false);

  async function copy(){
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(()=>setCopied(false),1200);
  }

  return <button
    onClick={copy}
    aria-label={copied?'Copiado':'Copiar'}
    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[8px] border border-[#dfe1e6] bg-white px-2.5 text-[12px] font-medium text-[#555963] shadow-[0_1px_2px_rgba(0,0,0,.025)] transition hover:border-[#cbcdd3] hover:bg-[#f7f7f8] hover:text-[#23252a]"
  >
    {copied?<Check size={13.5} className="text-[#0f7b4b]"/>:<Copy size={13.5}/>}
    {copied?'Copiado':'Copiar'}
  </button>
}
