import { fromEvent, interval, mergeMap, switchMap } from "rxjs";

const click$ = fromEvent(document,'click');
const interval$ = interval(1000);

//Mantiene varias subscripciones activas
/* click$.pipe(
    mergeMap(()=>interval$)
).subscribe(val => console.log(val));
 */

//Solo tiene una subscripcion cuando el primer observable emite otro valor.. 
//switch cancela el valro interno e inicia otro con el 2nd valor
click$.pipe(
    switchMap(()=>interval$)
).subscribe(val => console.log(val));
