import { concat, delay, interval, of, take } from "rxjs";

//recibe un conjunto de observables como argumentos
//con ellos crea un nuevo observable
//emite los valores de los observable ingresados en orden y hasta q no se complete
//el primero no sigue con el siguiente.. y asi sucesivamente

/* const interval$ = interval(1000);
concat(
    interval$.pipe(take(3)),
    interval$.pipe(take(2))
).subscribe((val)=>
    console.log(val)
) */

concat(
    of('a','b','c').pipe(delay(3000)),
    of(1,2,3).pipe(delay(3000))
).subscribe((val)=>
console.log(val)
)