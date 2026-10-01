import FavoritesCenter from '@/components/FavoritesCenter';

export const metadata={
  title:'Mis nombres favoritos | GDN',
  description:'Tus nombres guardados localmente en GeneradorDeNombres.net.',
  robots:{index:false,follow:true},
};

export default function Page(){
  return <div className="gdn-shell py-14 md:py-16">
    <p className="gdn-eyebrow">Colección personal</p>
    <h1 className="mt-3 text-4xl font-black tracking-[-.035em] md:text-5xl">Mis favoritos</h1>
    <p className="mt-4 max-w-2xl leading-7 text-[#6d717b]">Reúne aquí los nombres que quieras comparar. No necesitas cuenta: se guardan únicamente en el almacenamiento local de tu navegador.</p>
    <div className="mt-8"><FavoritesCenter/></div>
  </div>
}
