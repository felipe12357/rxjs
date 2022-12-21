import { debounceTime, distinctUntilChanged, fromEvent, pluck } from "rxjs";

//ejemplo 1
const click$ = fromEvent(document,'click');
click$.pipe(debounceTime(3000)).subscribe(()=>console.log('click'));

//ejmplo 2
const input = document.createElement('input');
document.querySelector('body').append(input);
//solo emite el ultimo valor q se halla ingresado al 
//finalizar el tiempo especificado (1seg)
const input$ = fromEvent (input,'keyup');
input$.pipe(pluck('target','value'),debounceTime(1000))
.subscribe(val => console.log(val));


//ejmplo 3
const input1 = document.createElement('input');
document.querySelector('body').append(input1);
//solo emite el ultimo valor q se halla ingresado al 
//finalizar el tiempo especificado (1seg)
//previene q el usuario repita el valor
const input1$ = fromEvent (input1,'keyup');
input1$.pipe(pluck('target','value'),debounceTime(1000),distinctUntilChanged())
.subscribe(val => console.log(val));