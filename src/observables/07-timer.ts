import { interval,timer } from "rxjs"

const observer = {
    next: val => console.log('next',val),
    complete:()=> console.log('complete')
}

const interval$ = interval(1000);
const timer$ = timer(1000);
const timer2$ = timer(1000,2000); //pasado 1 segundo inicia un interval
console.log('inicio');
//interval$.subscribe(observer);
timer$.subscribe(observer);
console.log('fin');



