import{AtSign,Baby,Gamepad2,Hash,Landmark,PawPrint,Store,Trophy,Type,UsersRound}from'lucide-react';
import type{KeywordPage}from'@/data/keywordMaster';

function visualConfig(page:KeywordPage){
  if(page.cluster==='freeFire')return{Icon:Gamepad2,kicker:'GAME',accent:'FF'};
  if(page.cluster==='gamingSocial')return{Icon:AtSign,kicker:'SOCIAL',accent:'@'};
  if(page.cluster==='personasBebes')return{Icon:Baby,kicker:'PERSONAS',accent:'Aa'};
  if(page.cluster==='letras')return{Icon:Type,kicker:'A–Z',accent:'#'};
  if(page.cluster==='culturas')return{Icon:Landmark,kicker:'ORIGEN',accent:'文'};
  if(page.cluster==='mascotas')return{Icon:PawPrint,kicker:'MASCOTAS',accent:'♡'};
  if(page.tool==='football')return{Icon:Trophy,kicker:'EQUIPO',accent:'XI'};
  if(page.tool==='store')return{Icon:Store,kicker:'MARCA',accent:'+'};
  return{Icon:UsersRound,kicker:'NOMBRES',accent:'•'};
}

function contextChip(page:KeywordPage){
  if(page.path==='/nombres-ff-unicos')return'Poco común';
  if(page.path==='/nombres-ff-mujeres')return'Estilos femeninos';
  if(page.path==='/nombres-clanes-ff')return'Clan + TAG';
  if(page.path==='/generador-free-fire')return'Generador directo';
  if(page.path==='/nombres-roblox')return'Username / Display';
  if(page.path==='/nombres-instagram')return'Username / perfil';
  if(page.path==='/nombres-anime')return'Gaming / redes';
  if(page.path==='/nombres-de-mujer')return'Origen / significado';
  if(page.path==='/nombres-de-nina')return'Cortos / poco comunes';
  if(page.path==='/nombres-de-nino')return'Modernos / significado';
  if(page.path==='/nombres-unisex')return'Uso mixto';
  if(page.path==='/nombres-raros')return'Poco comunes';
  if(page.path==='/nombres-por-letra')return'Directorio A–Z';
  if(page.path.startsWith('/nombres-con-')){
    const letter=page.path.replace('/nombres-con-','').replace('en','Ñ').toUpperCase();
    return'Inicial '+letter;
  }
  if(page.path==='/nombres-japoneses')return'Kanji / romaji';
  if(page.path==='/nombres-coreanos')return'Hangul / contexto';
  if(page.path==='/nombres-chinos')return'Hanzi / lectura';
  if(page.path==='/nombres-rusos')return'Cirílico / transliteración';
  if(page.path==='/nombres-griegos')return'Clásicos / mitología';
  if(page.path==='/nombres-mayas')return'Contexto prehispánico';
  if(page.path==='/nombres-de-dioses')return'Mitologías';
  if(page.path==='/nombres-franceses')return'Pronunciación / estilo';
  if(page.path==='/nombres-italianos')return'Clásicos / modernos';
  if(page.path==='/nombres-ingles')return'Uso internacional';
  if(page.path==='/nombres-turcos')return'Grafía turca';
  if(page.path==='/nombres-perritas')return'Hembras / personalidad';
  if(page.path==='/nombres-perros-machos')return'Machos / tamaño';
  if(page.path==='/nombres-gatos')return'Sexo / color';
  if(page.path==='/nombres-gatos-negros')return'Negros / místicos';
  if(page.path==='/nombres-gatos-machos')return'Machos / cortos';
  if(page.path==='/perritas-chihuahua')return'Pequeñas / tiernas';
  if(page.path==='/nombres-caballos')return'Caballos / yeguas';
  if(page.path==='/nombres-peluches')return'Kawaii / adopción';
  if(page.tool==='culture')return'Origen + fuente';
  if(page.tool==='people')return'Comparador';
  if(page.tool==='pet')return'Filtros';
  if(page.tool==='football')return'Nombre + TAG';
  if(page.tool==='invisible')return'Unicode';
  if(page.tool==='store')return'Ideas de marca';
  if(page.cluster==='freeFire'||page.cluster==='gamingSocial')return'Nicknames';
  return'Explorar';
}

export default function PageHeroVisual({page,compact=false}:{page:KeywordPage;compact?:boolean}){
  const{Icon,kicker,accent}=visualConfig(page);
  const chips=[page.primaryKeyword,contextChip(page),'Gratis'];
  return <div
    aria-hidden="true"
    className={'relative isolate overflow-hidden rounded-[16px] border border-[var(--page-border)] bg-white '+(compact?'min-h-[112px]':'min-h-[188px]')}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,var(--page-soft),transparent_42%),linear-gradient(135deg,#fff_0%,var(--page-soft)_100%)]"/>
    <div className="absolute -right-8 -top-10 size-36 rounded-full border border-[var(--page-border)] bg-white/55"/>
    <div className="absolute -bottom-10 -left-8 size-28 rounded-full border border-[var(--page-border)] bg-white/50"/>
    <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="gdn-theme-chip grid size-10 place-items-center rounded-[13px] border bg-white/80 shadow-sm"><Icon size={18}/></span>
        <span className="gdn-tech gdn-theme-accent text-[9px] font-black tracking-[.18em]">{kicker}</span>
      </div>
      <div className={compact?'mt-3':'mt-6'}>
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="gdn-display truncate text-[22px] font-bold tracking-[-.035em] text-[#252635]">{page.primaryKeyword}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.slice(1).map(chip=><span key={chip} className="rounded-full border border-[var(--page-border)] bg-white/75 px-2 py-1 text-[8px] font-bold text-[var(--page-ink)]">{chip}</span>)}
            </div>
          </div>
          <span className="gdn-display shrink-0 text-[34px] font-bold leading-none text-[var(--page-accent)] opacity-80">{accent}</span>
        </div>
      </div>
    </div>
  </div>;
}
