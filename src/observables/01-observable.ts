import {Observable, Observer} from 'rxjs'

const obs1$ = new Observable<string>(subscriber =>{
    subscriber.next('hola');
    subscriber.next('mundo');
    subscriber.error('simulo error');
    subscriber.complete(); //finaliza la subscripcion
    subscriber.next('hola'); //por lo tanto este valor no llega a los subscriptores
});

obs1$.subscribe(
    resp => console.log(resp), //maneja los valores normales
    error =>console.error('error',error), //maneja error
    () => console.log('complete'),//maneja el complete y siempre llega vacio
)

//2nd forma de leer lso valores de un observable

const observer:Observer<string> ={
    next:value => console.log('next',value),
    error:value => console.error('error',value),
    complete: ()=> console.log('complete') 

}

obs1$.subscribe(observer);
