import { fromEvent, map, takeWhile } from "rxjs";

//toma valores hasta q Y sea menor a 150

const click$ = fromEvent<MouseEvent>(document,'click');
//click$.pipe(map(({x,y})=>{ return {x,y}}))
click$.pipe(
  //  map(({x,y})=>{ return {x,y}})
    map( ({x,y}) => ({x,y})), //los parentesis se usan cuando quiero regresar algo q es mayor a una linea
    takeWhile(({y}) => y<150,true) //aplico destructuracion para solo tomar el valor de Y
    //la segunda propiedad indica si quiere que pase el ultimo valor (el q no fue valido)
).subscribe({
    next:val =>console.log('next',val),
    complete:()=>console.log('complete')
})