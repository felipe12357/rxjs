import { catchError, concatMap, exhaustMap, fromEvent, interval, map, mergeMap, of, pluck, switchMap, take, tap } from "rxjs";
import { ajax } from "rxjs/ajax";

const click$ = fromEvent(document,'click');
const interval$ = interval(500);

//Pagina para hacer pruebas, da respuestas fake https://reqres.in/

//Auxiliar
const peticionHttpLogin = (userPass) => ajax.post('https://reqres.in/api/login?delay=1',userPass)
                                        .pipe(
                                            pluck('response','token'),
                                            catchError(err =>of('handling',err))
                                        )

//creo formulario
const form =document.createElement('form');
const inputEmail = document.createElement('input');
const inputPass = document.createElement('input');
const submitBtn = document.createElement('button');

//configuraciones

inputEmail.type = 'email';
inputEmail.placeholder = 'Email';
inputEmail.value = 'eve.holt@reqres.in';

inputPass.type = 'password';
inputPass.placeholder = 'password';
inputPass.value = 'cityslicka';

submitBtn.innerHTML = 'Ingresar';

form.append(inputEmail,inputPass,submitBtn);
document.querySelector('body').append(form);

//Streams
const submitForm$ = fromEvent(form,'submit').pipe(
                            tap(ev =>ev.preventDefault()),
                            map(ev =>({
                                email:ev.target[0].value,
                                password:ev.target[1].value
                            })),
                            //al hacer click al button submit 5 veces seguidas podemos observar la diferencia (ventana network)
                          //  mergeMap(peticionHttpLogin) //El merge map ejecuta todas las subcripciones activas al tiempo
                          // switchMap(peticionHttpLogin) // cancela la subscripcion previa y deja sola la ultima
                          // exhaustMap(peticionHttpLogin) // solo ejecuta la primera subscripcion el resto las ignora y solo cuando  la primera se completa recibe nuevas peticiones
                           concatMap(peticionHttpLogin) //ejecuta todas 1 a una
                            //no es necesario poner el primer argumento este automaticamente se envia a la funcion
                          /*   mergeMap( userPass =>{
                                console.log('mergeMap',userPass)
                                return peticionHttpLogin(userPass)
                            })*/
                            ); 
submitForm$.subscribe(token =>console.log('stoken',token));

