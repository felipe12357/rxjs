import {map, range, tap} from 'rxjs'
//La funcion del tap es disparar Efectos secundarios

const numeros$ = range(1,5);

numeros$.pipe(
    tap(x => console.log('tap',x)),
    map(val => val*10)
).subscribe(val =>console.log('subscripcion',val))
