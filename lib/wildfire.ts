export type Cell={id:string,lat:number,lon:number,step:number,children?:Cell[]};
export const colors=['#6bb397','#ddc775','#ec9653','#e4675b'];
export const cities=[{name:'Redding',lat:40.587,lon:-122.392},{name:'Paradise',lat:39.759,lon:-121.621},{name:'Chico',lat:39.728,lon:-121.838},{name:'Truckee',lat:39.328,lon:-120.183},{name:'Sacramento',lat:38.582,lon:-121.494},{name:'Ukiah',lat:39.15,lon:-123.208},{name:'Eureka',lat:40.802,lon:-124.163}];
export function project(lon:number,lat:number){return [(lon+124.6)*145+20,(42.2-lat)*150+15];}
const boundary=[[-124.21,42],[-120,42],[-120,39],[-119.1,38],[-122.5,38],[-123,38.3],[-123.7,38.9],[-123.8,39.4],[-124.35,40.25],[-124.15,40.8],[-124.1,41.25],[-124.21,42]];
export const coast='M'+boundary.map(p=>project(p[0],p[1]).join(',')).join('L')+'Z';
function inside(lon:number,lat:number){let result=false;for(let i=0,j=boundary.length-1;i<boundary.length;j=i++){const a=boundary[i],b=boundary[j];if((a[1]>lat)!==(b[1]>lat)&&lon<(b[0]-a[0])*(lat-a[1])/(b[1]-a[1])+a[0])result=!result;}return result;}
export const cells:Cell[]=[];for(let y=0;y<20;y++)for(let x=0;x<21;x++){const lat=38.1+y*.2,lon=-124.1+x*.2;if(inside(lon,lat))cells.push({id:`${y.toString().padStart(2,'0')}-${x.toString().padStart(2,'0')}`,lat,lon,step:.2});}
export function aggregate(input:Cell[]):Cell[]{const groups=new Map<string,Cell[]>();for(const c of input){const [y,x]=c.id.split('-').map(Number);const id=`${Math.floor(y/2)}-${Math.floor(x/2)}`;groups.set(id,[...(groups.get(id)??[]),c]);}return [...groups].map(([id,children])=>{const [y,x]=id.split('-').map(Number);return {id:`A${id}`,lat:38.2+y*.4,lon:-124+x*.4,step:.4,children};});}
export function nearest(input:Cell[],lat:number,lon:number){return input.reduce((a,b)=>Math.hypot(a.lat-lat,(a.lon-lon)*.77)<Math.hypot(b.lat-lat,(b.lon-lon)*.77)?a:b);}
export function category(v:number){return v<25?'Low':v<50?'Moderate':v<75?'High':'Very high';}
export function sample(c:Cell,day:number):{risk:number,temperature:number,wind:number,humidity:number,dryness:number}{
 if(c.children){const all=c.children.map(x=>sample(x,day));return Object.fromEntries(['risk','temperature','wind','humidity','dryness'].map(key=>[key,Math.round(all.reduce((s,d)=>s+d[key as keyof typeof d],0)/all.length)])) as ReturnType<typeof sample>;}
 const wave=[0,3,7,10,5,-3,-7][day],east=Math.max(0,Math.min(1,(c.lon+124)/3.5)),n=(Math.sin(c.lat*15+c.lon*9)+1)/2,foothill=Math.exp(-Math.pow((c.lon+121.2)/.8,2));
 const temperature=Math.round(19+east*11+n*4+wave*.55),wind=Math.round(7+east*10+n*9+Math.max(0,wave)),humidity=Math.round(68-east*31-n*12-wave*.9),dryness=Math.round(Math.min(96,24+east*34+foothill*22+n*8+wave*.4));
 const risk=Math.round(Math.max(3,Math.min(97,(temperature-15)*1.05+wind*.7+(100-humidity)*.25+dryness*.3-15)));
 return {risk,temperature,wind,humidity,dryness};
}
