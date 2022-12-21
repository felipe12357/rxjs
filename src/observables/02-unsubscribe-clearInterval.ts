import { Observable, Observer, Subject } from "rxjs";

const observer:Observer<string> ={
    next:value => console.log('next',value),
    error:value => console.error('error',value),
    complete: ()=> console.log('complete') 

}

const intervalo$ = new Observable<number>( subscriber =>{
    let contador=0;
    const interval = setInterval(()=>{
        contador++;
        subscriber.next(contador);
        console.log('dentro del contador', contador); //asi se haga la des subscripcion esta vaina se sigue ejecutando
    },3000)

    return () =>{ //esta funcion se ejecuta cuando se realiza el unsubscribe
        clearInterval(interval) // de esta forma se elimina el intervalo
        console.log('intervalo destruido');
    }
})

const subs = intervalo$.subscribe((val)=>console.log(val));

setTimeout(function(){
    subs.unsubscribe();
 }, 20000);