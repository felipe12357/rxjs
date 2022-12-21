import { delay, fromEvent, interval, merge, of, take } from "rxjs";

//recibe un conjunto de observables como argumentos
//con ellos crea un nuevo observable
//emite los valores de los observable ingresados a medida q cualquiera de los
//observables emitan valores (no es ordenado) y se completa cuando todos se hayan
//completado

const interval$ = interval(1000);
merge(
    interval$.pipe(take(3)),
    interval$.pipe(take(2))
).subscribe((val)=>
    console.log(val)
) 
/* 
merge(
    of('a','b','c').pipe(delay(3000)),
    of(1,2,3).pipe(delay(3000))
).subscribe((val)=>
console.log(val)
) */


