// Shared axonometric projection for source modules and assembled workspace.
export type Vec3 = readonly [number, number, number];
export const project = ([x,y,z]: Vec3) => [0.86*(x-z),0.42*(x+z)-y];
const point = (p: Vec3) => project(p).map(v=>v.toFixed(2)).join(' ');
export const line3 = (points: Vec3[], close=false) => points.map((p,i)=>`${i?'L':'M'}${point(p)}`).join('')+(close?'Z':'');
export function box(x:number,y:number,z:number,w:number,h:number,d:number) {
  const a:Vec3[]=[[x,y,z],[x+w,y,z],[x+w,y,z+d],[x,y,z+d]];
  const b=a.map(([px,py,pz])=>[px,py+h,pz] as Vec3);
  return line3(a,true)+line3(b,true)+a.map((p,i)=>line3([p,b[i]])).join('');
}
export const cameraBody=box(-18,34,-12,36,25,24)+box(18,40,-7,12,13,14)
  +line3([[0,34,0],[0,8,0],[-20,0,12]])+line3([[0,8,0],[18,0,15]])
  +line3([[0,8,0],[0,0,-22]])+line3([[-10,63,-7],[12,63,-7],[12,59,-7]]);
const frame:Vec3[]=[[100,12,-37],[100,82,-37],[100,82,37],[100,12,37]];
export const cameraFrustum=line3(frame,true)+frame.map(p=>line3([[30,46,0],p])).join('');
export const setFrame=line3([[-65,0,42],[-65,135,42],[-65,135,-52],[80,135,-52],[80,0,-52]])
  +line3([[-65,0,42],[-65,0,-52],[80,0,-52]])
  +line3([[-65,0,10],[-65,80,10],[-65,80,-20],[-65,0,-20]])
  +line3([[-65,0,42],[80,0,42],[80,0,-52]],true);
export const setSlats=Array.from({length:17},(_,i)=>line3([[-55+i*8,0,-52],[-55+i*8,135,-52]])).join('');
export const floorGrid=Array.from({length:9},(_,i)=>{
  const n=-140+i*35;
  return line3([[n,0,-110],[n,0,130]])+line3([[-140,0,n*.8],[140,0,n*.8]]);
}).join('');
// An illustrative folded surface: continuous geometry, sampled as textile-like dots.
function surface(u:number,v:number,updated=false):Vec3 {
  if(updated) {
    // v3: one broad diagonal fold with a lifted corner, distinct from v2's twin ridges.
    const crest=88*Math.exp(-Math.pow((u+.42*v+.08)/.42,2));
    const lift=24*Math.exp(-Math.pow((u-.75)/.38,2)-Math.pow((v+.7)/.5,2));
    return [u*106+12*Math.sin(v*2)*(1-u*u),
      12+crest*(.72+.28*Math.cos(v*Math.PI/2))+lift+8*Math.sin(v*3-u),v*65];
  }
  const ridge=48*Math.exp(-Math.pow((u+.34+.12*Math.sin(v*3))/.31,2))
    +78*Math.exp(-Math.pow((u-.5-.13*Math.sin(v*2.5))/.28,2));
  const edge=.6+.4*Math.cos(v*Math.PI/2);
  return [u*106,(ridge*edge+9*Math.sin(v*3+u*2)+12),v*65];
}
const dotsFor=(updated:boolean)=>Array.from({length:65},(_,j)=>{
  const v=-1+j/32;
  return Array.from({length:101},(_,i)=>{
    const u=-1+i/50;
    const p=project(surface(u,v,updated));
    return `M${p[0].toFixed(2)} ${p[1].toFixed(2)}h.1`;
  }).join('');
}).join('');
const contoursFor=(updated:boolean)=>[
  line3(Array.from({length:101},(_,i)=>surface(-1+i/50,-1,updated))),
  line3(Array.from({length:101},(_,i)=>surface(-1+i/50,1,updated))),
  line3(Array.from({length:65},(_,i)=>surface(-1,-1+i/32,updated))),
  line3(Array.from({length:65},(_,i)=>surface(1,-1+i/32,updated))),
].join('');
export const assetDots=dotsFor(false);
export const assetContours=contoursFor(false);
export const updatedAssetDots=dotsFor(true);
export const updatedAssetContours=contoursFor(true);
