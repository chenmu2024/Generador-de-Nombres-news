import FavoritesCenter from '@/components/FavoritesCenter';

export const metadata={
  title:'Mis nombres favoritos | GDN',
  description:'Tus nombres guardados localmente en GeneradorDeNombres.net.',
  robots:{index:false,follow:true},
  alternates:{canonical:'/favoritos'},
};

export default function Page(){
  return <div className="gdn-shell py-12 md:py-16">
    <p className="gdn-eyebrow">Colección personal</p>
    <h1 className="gdn-display mt-3 text-[42px] font-bold tracking-[-.04em] text-[#1b1c2b] md:text-[54px]">Mis favoritos</h1>
    <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#737687]">Reúne aquí los nombres que quieras volver a revisar. No necesitas cuenta: se guardan únicamente en el almacenamiento local de tu navegador.</p>
    <div className="mt-8"><FavoritesCenter/></div>
  </div>
}
