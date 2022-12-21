import { fromEvent } from "rxjs";


/** Evento del Dom */

const sourceEvent1 = fromEvent<PointerEvent>(document,'click');
const sourceEvent2 = fromEvent<KeyboardEvent >(document,'keyup');

const observer ={
    next:(val) => console.log('next',val),
}

sourceEvent1.subscribe(observer =>console.log(observer.x));
sourceEvent2.subscribe((observer:KeyboardEvent) =>console.log(observer.key));

//con destructuracion
sourceEvent2.subscribe(({key,keyCode,code}) =>console.log(key,keyCode,code));




