import { catchError, map, of, pluck } from 'rxjs';
import {ajax, AjaxError} from 'rxjs/ajax'

let url = 'https://api.github.com/users?per_page=5';

const manejaErrores = (response:Response)=>{
    if(!response.ok){
        throw new Error (response.statusText)
    }

    return response;
}

const fetchPromesa = fetch(url);


fetchPromesa
.then((val)=>{
    console.log('reespuesta ejmplo 1 p',val)
    val.json().then((val2)=>{
        console.log('reespuesta ejmplo 1',val2)
    })
})
.catch()


//mas corto
fetchPromesa
.then((val)=>val.json())
.then((val2)=> console.log('respuesta ejemplo corto',val2))
.catch(err => console.warn('error',err))




//manejando errores
const urlError = 'https://api.github.com/usersXX?per_page=5';
const fetchPromesaError = fetch(urlError);
fetchPromesaError
.then(manejaErrores)
.then((val)=>val.json())
.then((val2)=> console.log('respuesta manejando errores',val2))
.catch(err => console.warn('error en usuarios',err))


//ejemplo utilizando ajax de RXJS
ajax(url).pipe(pluck('response')).subscribe(val => console.log('respuesta con ajax',val))

//ejemplo manejando errores con ajax RXJS
ajax(urlError).pipe(pluck('response'),catchError((err:AjaxError) => { 
     console.warn(`Error en la respuesta ${err.message}`,err)
     return of([]) //necesita retornar un observable para q salga la respuesta
}))
.subscribe(val => console.log('respuesta con ajax error',val))



