import AlphabetExplorer,{type AlphabetEntry}from'./AlphabetExplorer';
import {getNamesForPath,nameDataset} from '@/data/nameDataset';

const routes:Record<string,string>={A:'/nombres-con-a',B:'/nombres-con-b',C:'/nombres-con-c',E:'/nombres-con-e',F:'/nombres-con-f',M:'/nombres-con-m','Ñ':'/nombres-con-en',Y:'/nombres-con-y',Z:'/nombres-con-z'};
const letters='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

function normalizeInitial(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').charAt(0).toUpperCase();
}

export default function AlphabetMatrix(){
  const entries:AlphabetEntry[]=letters.map(letter=>{
    const href=routes[letter];
    if(href)return{
      letter,
      href,
      count:getNamesForPath(href).length,
      names:[],
    };

    const matches=nameDataset
      .filter(item=>item.type==='person'&&normalizeInitial(item.name)===letter)
      .map(item=>item.name);

    return{
      letter,
      count:matches.length,
      names:matches.slice(0,18),
    };
  });

  return <section className="overflow-hidden rounded-[20px] border border-[#e4e1ed] bg-white shadow-[0_10px_28px_rgba(55,49,91,.045)]">
    <div className="border-b border-[#eceaf3] bg-[#faf9ff] px-5 py-5 sm:px-6">
      <p className="gdn-eyebrow">Directorio A–Z</p>
      <h2 className="gdn-display mt-1 text-[28px] font-bold text-[#292a39]">Explora por inicial</h2>
      <p className="mt-2 max-w-2xl text-[11px] leading-5 text-[#858899]">Las letras con demanda validada tienen página propia. Las demás se abren aquí en una vista rápida, sin crear páginas SEO innecesarias.</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[9px] font-semibold text-[#858899]">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0dcef] bg-white px-2.5 py-1"><span className="size-1.5 rounded-full bg-[var(--page-accent)]"/>Página propia</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e0dcef] bg-[#faf9ff] px-2.5 py-1"><span className="size-1.5 rounded-full border border-[var(--page-accent)]"/>Vista rápida</span>
      </div>
    </div>
    <AlphabetExplorer entries={entries}/>
  </section>
}
