'use client';

import {useState} from 'react';
import {Check,Copy,X} from 'lucide-react';
import {trackProductAction} from '@/lib/analytics';
import{copyText}from'@/lib/clipboard';

type CopyState='idle'|'copied'|'error';

export default function CopyButton({value,label='Copiar',copiedLabel='Copiado',analyticsRole='copy'}:{value:string;label?:string;copiedLabel?:string;analyticsRole?:string}){
  const[state,setState]=useState<CopyState>('idle');

  async function copy(){
    const ok=await copyText(value);
    if(!ok){
      setState('error');
      window.setTimeout(()=>setState('idle'),1600);
      return;
    }
    trackProductAction(analyticsRole,'copy-button');
    setState('copied');
    window.setTimeout(()=>setState('idle'),1200);
  }

  const currentLabel=state==='copied'?copiedLabel:state==='error'?'Error al copiar':label;

  return <button
    onClick={copy}
    aria-label={currentLabel}
    className={'gdn-copy-button inline-flex h-11 shrink-0 items-center gap-1.5 rounded-[10px] border bg-white px-4 text-[12px] font-semibold shadow-[0_2px_8px_rgba(55,49,91,.03)] transition sm:h-8 sm:rounded-[9px] sm:px-3 sm:text-[10px] '+(state==='error'?'border-[#efcfd6] text-[#a35465]':'border-[#d9d5e6] text-[#4f5263]')}
  >
    {state==='copied'?<Check size={12.5} className="text-[#25a468]"/>:state==='error'?<X size={12.5}/>:<Copy size={12.5}/>}
    {currentLabel}
  </button>
}
