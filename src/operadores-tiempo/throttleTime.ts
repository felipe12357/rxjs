import { asyncScheduler, debounceTime, distinctUntilChanged, fromEvent, pluck, throttleTime } from "rxjs";

//ejemplo 1
const click$ = fromEvent(document,'click');
click$.pipe(throttleTime(3000)).subscribe(()=>console.log('click'));



//ejmplo 2
//emite el el primer valor, y el resto no (lo opuesto a debounce time)
//si escriben despues de 1 segundo muestra el primer valor mas lo q ya estaba escrito
const input1 = document.createElement('input');
document.querySelector('body').append(input1);

const input1$ = fromEvent (input1,'keyup');
input1$.pipe(pluck('target','value'),throttleTime(1000),distinctUntilChanged())
.subscribe(val => console.log(val));


//ejmplo 3
const input2 = document.createElement('input');
document.querySelector('body').append(input2);

const input2$ = fromEvent (input2,'keyup');
input2$.pipe(pluck('target','value'),throttleTime(1000,asyncScheduler,{
    leading:true,  //mostrar el primer caracter
    trailing:true  //mostrar lo q se escribio al final
}),distinctUntilChanged())
.subscribe(val => console.log(val));
