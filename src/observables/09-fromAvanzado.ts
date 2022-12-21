import { of,from } from "rxjs";


// of = toma argumentos y genera una secuencia
// from = genera un observable apartir de una array, promise, itarable, observable


const observer ={
    next: val => console.log('next', val),
    complete: () => console.log('complete')
}


const source2$ = of([1,2,3,4,5]);
const source1$ = from([1,2,3,4,5]);
source1$.subscribe(observer);

//Esto genera una promesa
fetch('https://api.github.com/users/felipe12357').then(val => console.log('en la promesa norml',val));

const sourceFetch$ = from(fetch('https://api.github.com/users/felipe12357'))


sourceFetch$.subscribe( async(resp)=>{
    console.log('en la subscripcin',resp);

    //Esto se hace para poder acceder al body que es de tipo 
    // ReadableStream
    const dataRespuesta = await resp.json();
    console.log(dataRespuesta);
});