import { BehaviorSubject, Subject } from "rxjs";

//No necesita un valor inicial
const subject$  = new Subject<number>();

// Necesita un valor inicial
const behaviorSuject$ = new BehaviorSubject<number>(1);


subject$.next(1);
//Me puedo subscribir y solo recibe los valores luego de su subscripcion
//es decir no recibo el valor de 1
subject$.subscribe((val)=>console.log('subject',val)); 
subject$.next(2);


//Me puedo subscribir y aun asi recibo el ultimo valor emitido en este caso el valor inicial q sette
behaviorSuject$.subscribe(val=>console.log('behavior subject',val))
behaviorSuject$.next(2);

//ademas sin necesidad de una subscripcion puedo obtener su valor actual
const currentValue = behaviorSuject$.getValue()
console.log(currentValue);