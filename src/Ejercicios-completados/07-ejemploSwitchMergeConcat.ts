import { catchError, concatMap, forkJoin, from, fromEvent, interval, map, mergeMap, of, switchMap, take, toArray } from "rxjs";
import { ajax } from "rxjs/ajax";

/* const click$ = fromEvent(document,'click');
const interval$ = interval(500); */

//concatMap
// solo cuando se completa el primer observable sigue con el siguiente
// concatenando los valores
/* click$.pipe(
    concatMap(()=>interval$.pipe(take(3)))
).subscribe((val)=>console.log(val))
 */

//Comparacion con el switchMap
//cancela el observable activo e inicia otro
/* click$.pipe(
    switchMap(()=>interval$.pipe(take(3)))
).subscribe((val)=>console.log(val)) */


//Comparacion con el mergeMap
//Mantiene todos los observables al mismo tiempo
/* click$.pipe(
   mergeMap(()=>interval$.pipe(take(3)))
).subscribe((val)=>console.log(val))
 */
const SW_API = 'https://swapi.dev/api'; 
const getRequest = ( url: string ) => ajax.getJSON<any>(url);

function getCharacters () {
    return  getRequest(`${SW_API}/people/`).pipe(
                map((res: any) => {
                    return res.results;
                 }),
            );
}

function getPlanets() {
    return  getRequest(`${SW_API}/planets/`).pipe(
        map((res: any) => {
            return res.results;
         }),
    );
}

getCharacters().subscribe(val => console.log('obtengo characters',val));
getPlanets().subscribe(val => console.log('obtengo planetas',val));


//Ejemplo del forkjoin trayendo ambas peticiones

function getCharactersAndPlanets() {
    return forkJoin([
      getCharacters(),
      getPlanets()
    ])
    .pipe(
      map((res: any) => {
        return { characters: res[0], planets: res[1] };
      }),
      catchError(error => of(error))
    );
}
getCharactersAndPlanets().subscribe(val => console.log('obtengo planetas y characters',val));

//ejemplo del switchmap sencillo: la informacion del homeworld viene en una URL q hay q consultar
//desde la primera URL

function getCharacterHomeworld() {
    return getRequest(`${SW_API}/people/1`)
      .pipe(
        switchMap((character: any) => {
            console.log('llega',character) //en el parametro homeworld llega la url q debo consultar
          return  getRequest(character.homeworld)
        })
      );
  }
getCharacterHomeworld().subscribe(val =>console.log('character homeworld',val));


//aca retorno el character y el homeworld actualizando el parametro homeworld del primer request  con
//la respuesta del 2nd request 
function getCharacterAndHomeworld() {
    return getRequest(`${SW_API}/people/1`)
      .pipe(
        switchMap((character: any) => {
          return getRequest(character.homeworld)
            .pipe(
              map(hw => {
                character.homeworld = hw;
                return character;
              })
            )
        })
      );
  }
  getCharacterAndHomeworld().subscribe(val =>console.log('character and his homeworld',val));




//Obtener todos los charectes y sus hogares
//dentro del array de characters se encuentra la URL para consultar su homework
//como traer ambos:
function getCharactersAndHomeworlds() {
    return getRequest(`${SW_API}/people/`)
      .pipe(
        switchMap((res: any) => {
          // convert array to observable
          //se debe convertir en observable para q de esta forma puede concatenarse
          return from(res.results);
        }),
        concatMap((person: any) => { //concat arroja los resultados segun el orden del array
       // mergeMap((person: any) => { //merge arroja los resultados en desorden
            console.log('llega',person);
            return getRequest(`${person.homeworld}/`)
              .pipe(
                map(hw => {
                    //actualiza la propiedad home cambiando la url por la respuesta del 2nd llamado
                  person.homeworld = hw;
                  return person;
                })
              );
        }),
        toArray() //con el fin de obterner una respuesta por cada uno de los resultados
      );
  }

  getCharactersAndHomeworlds().subscribe(val =>console.log('juntos',val));