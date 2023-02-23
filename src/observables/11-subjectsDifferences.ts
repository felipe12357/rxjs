//replay subject permite enviar todos los valores previos emitidos
//antes de la subscribcion

import { AsyncSubject, BehaviorSubject, concatMap, debounceTime, delay, of, Subject } from "rxjs";
import { ReplaySubject } from "rxjs/internal/ReplaySubject";

const replaySubject$  = new ReplaySubject<number>();

replaySubject$.next(1);
replaySubject$.next(2);
replaySubject$.next(3);

//Ejemplo utilizando un delay
replaySubject$.pipe(
    concatMap(x=>of(x).pipe(delay(1000)))
).subscribe(val =>console.log('replaySubject',val));
replaySubject$.next(4);


//a diferencia del subject que no obtiene ningun valor antes de su subscripcion

const subject$  = new Subject<number>();

subject$.next(1);
subject$.next(2);
subject$.next(3);

subject$.subscribe(val =>console.log('subject',val));
subject$.next(4);

//y behavior subject solo envia el ultimo valor antes de su subscripcion
//importante q behavior subject necesita un valor inicial
const behaviorSubject$  = new BehaviorSubject<number>(0);

behaviorSubject$.next(1);
behaviorSubject$.next(2);
behaviorSubject$.next(3);

behaviorSubject$.subscribe(val =>console.log('behaviorSubject',val));
behaviorSubject$.next(4);

//AsyncSubject solo envia el ultimo valor.. y esto cuando el se completa
//de lo contrario no envia nada


const asyncSubject$  = new AsyncSubject<number>;

asyncSubject$.next(1);
asyncSubject$.next(2);
asyncSubject$.next(3);

asyncSubject$.subscribe(val =>console.log('asyncSubject',val));
asyncSubject$.next(4); //no recibo el cuatro

setTimeout(()=>asyncSubject$.complete(),3000) //se completa y recibe el valor


//Es un patron definir los subjects como privados
//y solo exponer el observable, ya de esta forma 
//restringimos la posiblidad de q modifiquen el valor afuera del servicio
const subjectObservable$ = subject$.asObservable();