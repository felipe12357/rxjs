import { debounceTime, fromEvent, interval, map, mergeAll, mergeMap, Observable, of, pluck, switchMap, take, takeUntil } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Users } from "../interfaces/users.inteface";


//Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append(textInput,orderList);

//Streams
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');

//helpers
const mostrarUsuarios = (usuarios:Users[])=>{
    orderList.innerHTML = '';
    for(const users of usuarios){
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = users.avatar_url;

        const anchor = document.createElement('a');
        anchor.href = users.html_url;
        anchor.text = 'Ver pagina';
        anchor.target = '_blank';

        li.append(img);
        li.append(users.login + '');
        li.append(anchor);

        orderList.append(li)
    }
}



const url = 'https://httpbin.org/delay/1?arg=';
//switch map solo mantiene una subscripcion activa
//switch map funciona igual q mergemap
//pero a diferencia de este cancela las peticiones ajax al detectar que se hizo
//una nueva busqueda
input$.pipe(
    pluck('target','value'),
    switchMap(texto =>ajax.getJSON(url +texto))
).subscribe( (val) => console.log(val))
