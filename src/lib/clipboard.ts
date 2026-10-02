export async function copyText(value:string){
  if(typeof navigator!=='undefined'&&navigator.clipboard?.writeText){
    try{
      await navigator.clipboard.writeText(value);
      return true;
    }catch{}
  }

  if(typeof document==='undefined')return false;
  const textarea=document.createElement('textarea');
  textarea.value=value;
  textarea.setAttribute('readonly','');
  textarea.style.position='fixed';
  textarea.style.opacity='0';
  textarea.style.pointerEvents='none';
  textarea.style.left='-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0,textarea.value.length);
  let copied=false;
  try{copied=document.execCommand('copy')}catch{}
  textarea.remove();
  return copied;
}
