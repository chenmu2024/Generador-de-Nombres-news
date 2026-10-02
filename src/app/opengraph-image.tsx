import{ImageResponse}from'next/og';

export const alt='GeneradorDeNombres.net — nombres para juegos, personas, mascotas, culturas y negocios';
export const size={width:1200,height:630};
export const contentType='image/png';

export default function OpenGraphImage(){
  return new ImageResponse(
    <div style={{
      width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',
      background:'#fbfbff',color:'#171827',fontFamily:'Arial, sans-serif',
      padding:'72px 78px',
    }}>
      <div style={{position:'absolute',right:'-90px',top:'-120px',width:'420px',height:'420px',borderRadius:'50%',background:'#eeeaff'}}/>
      <div style={{position:'absolute',right:'110px',bottom:'-160px',width:'360px',height:'360px',borderRadius:'50%',background:'#edf9f2'}}/>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',zIndex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:'18px'}}>
          <div style={{width:'58px',height:'58px',borderRadius:'18px',display:'flex',alignItems:'center',justifyContent:'center',background:'#5b4df5',color:'#fff',fontSize:'24px',fontWeight:800}}>G</div>
          <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{fontSize:'26px',fontWeight:800,letterSpacing:'-0.6px'}}>GeneradorDeNombres.net</div>
            <div style={{fontSize:'15px',color:'#777a8b',marginTop:'4px'}}>Gratis · sin registro · en español</div>
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',maxWidth:'930px'}}>
          <div style={{fontSize:'68px',lineHeight:1.02,fontWeight:800,letterSpacing:'-3.4px'}}>Encuentra un nombre que realmente quieras usar.</div>
          <div style={{fontSize:'22px',lineHeight:1.45,color:'#676a7b',marginTop:'24px'}}>Generadores, filtros y colecciones para juegos, personas, mascotas, culturas y negocios.</div>
        </div>

        <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
          {['Juegos','Personas','Mascotas','Culturas','Negocios'].map((label,index)=><div key={label} style={{
            display:'flex',padding:'11px 18px',borderRadius:'999px',fontSize:'15px',fontWeight:700,
            border:'1px solid '+(['#dcd7ff','#efd9df','#efdec9','#ead8f5','#d4eadc'][index]),
            background:['#f2f0ff','#fff3f5','#fff7ee','#faf2ff','#effaf4'][index],
            color:['#5549d7','#b45169','#a9682f','#7d4ca5','#257650'][index],
          }}>{label}</div>)}
        </div>
      </div>
    </div>,
    size
  );
}
