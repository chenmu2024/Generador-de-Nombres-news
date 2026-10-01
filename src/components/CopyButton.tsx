'use client';

import {useState} from 'react';

export default function CopyButton({value}:{value:string}){
  const[copied,setCopied]=useState(false);
  async function copy(){
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(()=>setCopied(false),1200);
  }
  return <button onClick={copy} className="shrink-0 rounded-xl border border-[#dedfe5] bg-white px-3 py-2 text-xs font-extrabold text-[#353944] transition hover:border-[#9a85ff] hover:bg-[#f2efff] hover:text-[#593dce]">
    {copied?'✓ Copiado':'Copiar'}
  </button>
}
