import { fromEvent, interval, skip, takeUntil, tap } from "rxjs";

const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';
document.querySelector('body').append(boton);


const counter$ = interval(1000);
const clickBtn$ = fromEvent(boton,'click').pipe(
    tap(()=>console.log('antes')),
    skip(1), //evade el numero de click q senalemos como paremetro, en este caso 1
    tap(()=>console.log('despues'))
);
//se detiene cuando el otro observable recibe algun valor (cualquiera)
counter$.pipe(takeUntil(clickBtn$)).subscribe({
    next: val => console.log('next',val),
    complete:() => console.log('complete')
})


