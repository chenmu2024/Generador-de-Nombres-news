import{applyNameFrame,applyUnicodeStyle,nameFrames,unicodeStyles}from'../src/lib/styledText';

const errors:string[]=[];
const styleIds=new Set<string>();
const frameIds=new Set<string>();
const sample='Nova27';
const outputs=new Set<string>();

if(unicodeStyles.length<45)errors.push('Unicode style library is too small: '+unicodeStyles.length);
if(nameFrames.length<18)errors.push('Frame library is too small: '+nameFrames.length);

for(const style of unicodeStyles){
  if(styleIds.has(style.id))errors.push('Duplicate Unicode style id: '+style.id);
  styleIds.add(style.id);
  const output=applyUnicodeStyle(sample,style.id);
  if(!output.trim())errors.push('Empty Unicode style output: '+style.id);
  if(outputs.has(output))errors.push('Duplicate Unicode style output for sample: '+style.id);
  outputs.add(output);
}

for(const frame of nameFrames){
  if(frameIds.has(frame.id))errors.push('Duplicate frame id: '+frame.id);
  frameIds.add(frame.id);
  if(!applyNameFrame(sample,frame.id).includes(sample))errors.push('Frame removes source text: '+frame.id);
}

for(const style of unicodeStyles){
  const accent=applyUnicodeStyle('Ñé',style.id);
  if(!accent)errors.push('Accented input failed: '+style.id);
}

if(errors.length){
  console.error('[Style Library] FAILED');
  for(const error of errors)console.error(' - '+error);
  process.exit(1);
}

console.log('[Style Library] PASS — '+unicodeStyles.length+' Unicode styles × '+nameFrames.length+' frames = '+(unicodeStyles.length*nameFrames.length)+' base combinations.');
