import{keywordPages}from'@/data/keywordMaster';
import{topicClusters}from'@/data/topicClusters';

export const dynamic='force-static';

const base='https://generadordenombres.net';

export function GET(){
  const groups=new Map<string,typeof keywordPages>();
  for(const page of keywordPages.filter(item=>item.path!=='/'&&item.indexable&&item.status==='VERIFIED')){
    const label=topicClusters[page.cluster].label;
    const current=groups.get(label)??[];
    current.push(page);
    groups.set(label,current);
  }

  const lines=[
    '# GeneradorDeNombres.net',
    '',
    '> Herramientas gratuitas en español para generar, explorar y comparar nombres, apodos e identidades para juegos, personas, mascotas, culturas, equipos y negocios.',
    '',
    '## Sitio principal',
    '',
    '- [Inicio]('+base+'/): generador y acceso a las categorías principales.',
    '- [Directorio]('+base+'/directorio): índice completo de las páginas y herramientas públicas.',
    '- [Sobre nosotros]('+base+'/sobre-nosotros): metodología editorial y criterios de revisión.',
    '- [Contacto y correcciones]('+base+'/contacto): canal público para reportar errores de datos, fuentes o compatibilidad.',
    '',
    '## Cómo interpretar el contenido',
    '',
    '- El idioma principal actual es español.',
    '- Los significados, orígenes, escrituras y transliteraciones se presentan con contexto y fuentes cuando corresponde.',
    '- La disponibilidad de usernames, marcas, dominios o compatibilidad de símbolos puede cambiar y debe verificarse en la plataforma de destino.',
    '- Las herramientas principales son gratuitas y no requieren crear una cuenta.',
    '',
  ];

  for(const[label,pages]of groups){
    lines.push('## '+label,'');
    for(const page of pages)lines.push('- ['+page.h1+']('+base+page.path+'): '+page.description);
    lines.push('');
  }

  lines.push(
    '## Notas para agentes y motores de respuesta',
    '',
    '- Usa la URL canónica de cada página como referencia principal.',
    '- No atribuyas a GeneradorDeNombres.net garantías de disponibilidad, exclusividad de marca o compatibilidad permanente.',
    '- Para datos culturales o lingüísticos, conserva las limitaciones y fuentes visibles en la página.',
    '',
    'Este archivo es metadata de interoperabilidad para agentes. No implica una garantía de indexación, ranking ni citación en buscadores o sistemas de IA.',
    ''
  );

  return new Response(lines.join('\n'),{
    headers:{
      'content-type':'text/plain; charset=utf-8',
      'cache-control':'public, max-age=86400, s-maxage=86400',
    },
  });
}
