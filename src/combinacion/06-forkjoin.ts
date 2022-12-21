import { delay, forkJoin, fromEvent, interval, merge, of, take } from "rxjs";

//recibe un conjunto de observables como argumentos
//con ellos crea un nuevo observable

//solo emite el valor de los observables ingresados cuando todos se completan

const numeros$ = of(1,2,3,4);
const letras$ = of('a','b','c','d').pipe(delay(3500));
const intervalo$ = interval(1000).pipe(take(3));


//Para este ejemplo solo retorna la respuesta pasados 3,5
// que es cuando el ultimo observable se completa

//y retorna [4,2,d] que corresponde a un array con los ultimos
// valores de cada observable)
forkJoin([numeros$,intervalo$,letras$]).subscribe(
    (val)=>console.log(val)
)


//De esta forma nos retorna un objeto
forkJoin({numeros$,intervalo$,letras$}).subscribe(
    (val)=>console.log(val)
)


//con nombres personalizados
forkJoin({num:numeros$,interval:intervalo$,letras:letras$}).subscribe(
    (val)=>console.log(val)
)
