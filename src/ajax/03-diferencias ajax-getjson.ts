import { catchError, of } from 'rxjs';
import {ajax, AjaxError} from 'rxjs/ajax'

//Diferencias entre AJAX y Ajax GetJson
const url = 'https://httpbin.org/delays/1';

const manejaErrores = (resp: AjaxError) => {
    console.log('error',resp.message)
    return of({ok:false})
}

const obs1$ = ajax(url).pipe(catchError(manejaErrores));
const obs2$ = ajax.getJSON(url).pipe(catchError(manejaErrores));

//AJax nos trae informacion adicional como el status code, request, etc ademas de la respuesta
obs1$.subscribe(data => console.log('ajax',data));

//Get json nos trae la informacion de la respuesta
obs2$.subscribe(data => console.log('getJson',data));

//otra forma de capturar el error
const obs3$ = ajax(url);
obs3$.subscribe({
    next: data => console.log('getJson next',data),
    error: (error) => {
        console.log('error type', error)
        return of({ok:false})
    }
});



