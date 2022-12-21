import { debounceTime, fromEvent, map, mergeAll, Observable, pluck } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Users } from "../interfaces/users.inteface";

//Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append(textInput,orderList);


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

//Streams
const input$ = fromEvent<KeyboardEvent>(textInput, 'keyup');


//Tenemos un observable (getJson) que depende de otro observable (fromEvent keyup)
//para ejecurtase
input$.pipe(
    debounceTime(500),
    map( event=>{
        const texto = event.target['value'];
        return ajax.getJSON(`https://api.github.com/users?q=${texto}`)
    })
).subscribe(val =>{
     console.log(val)
    val.subscribe( resp => console.log(resp))
})


//Ejemplo ajustado con el MergeAll
//El se subscribe a ambos observables y retorna un solo observalbe con la respuesta
input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent,any,string>('target','value'),
    map<string,Observable<Users[]>>( texto=> ajax.getJSON(`https://api.github.com/users?q=${texto}`) ),
    mergeAll<Observable<Users[]>>()
).subscribe((val:Users[]) =>{
     console.log('mergeAll',val);
     console.log('donde estoy',val[0].login)
     mostrarUsuarios(val);
})
