import { concatMap, fromEvent, interval, mergeMap, switchMap, take } from "rxjs";

const click$ = fromEvent(document,'click');
const interval$ = interval(500);

//concatMap
// solo cuando se completa el primer observable sigue con el siguiente
// concatenando los valores
/* click$.pipe(
    concatMap(()=>interval$.pipe(take(3)))
).subscribe((val)=>console.log(val))
 */

//Comparacion con el switchMap
//cancela el observable activo e inicia otro
/* click$.pipe(
    switchMap(()=>interval$.pipe(take(3)))
).subscribe((val)=>console.log(val)) */


//Comparacion con el mergeMap
//Mantiene todos los observables al mismo tiempo
/* click$.pipe(
   mergeMap(()=>interval$.pipe(take(3)))
).subscribe((val)=>console.log(val))
 */