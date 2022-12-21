//mergeMap Puede mantener varias subscripciones activas

import { debounceTime, fromEvent, interval, map, mergeAll, mergeMap, Observable, of, pluck, take, takeUntil } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Users } from "../interfaces/users.inteface";


/* Cual es la diferencia?
Pues mergeAll() fusionara todos los observables sin recibir parámetros y vas a obtener los datos propagados combinados.

En cambio mergeMap(), recibe como parámetro cada valor que emite el observable de origen y crea un nuevo observable interno,
luego como resultado final o de salida da el resultado de estos observables
*/

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

//Ejemplo ajustado con el MergeMap
//mergeMap se susbcribe a cuanto valor se emita del primer observable
// y recibe como parametro un segundo observalbe retorna un observable con la respuesta
input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent,any,string>('target','value'),
    mergeMap<string,Observable<Users[]>>(( texto=> ajax.getJSON(`https://api.github.com/users?q=${texto}`) ))
).subscribe({
    next:(val:Users[]) =>{
     console.log('mergeMap',val);
     console.log('donde estoy',val[0].login)
     mostrarUsuarios(val);
    },
    complete:()=> console.log('completado')
})




const url = 'https://httpbin.org/delay/1?arg=';
input$.pipe(
    pluck('target','value'),
    mergeMap(texto =>ajax.getJSON(url +texto))
).subscribe( (val) => console.log(val))