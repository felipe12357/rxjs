import { fromEvent, interval, takeUntil } from "rxjs";

const boton = document.createElement('button');
boton.innerHTML = 'Detener Timer';
document.querySelector('body').append(boton);


const counter$ = interval(1000);
const clickBtn$ = fromEvent(boton,'click');
//se detiene cuando el otro observable recibe algun valor (cualquiera)
counter$.pipe(takeUntil(clickBtn$)).subscribe({
    next: val => console.log('next',val),
    complete:() => console.log('complete')
})


