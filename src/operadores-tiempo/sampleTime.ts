import {  fromEvent, map, sampleTime } from "rxjs";

//ejemplo 1
//Emite el ultimo valor emitido durante 3 segundos
// si hay valor no se emite nada
const click$ = fromEvent<MouseEvent>(document,'click');
click$.pipe(
    sampleTime(3000),
    map(({x,y})=>({x,y})),
).subscribe((val)=>console.log('click',val));



