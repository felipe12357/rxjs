
//distinctUntil changes no emite valores q sean repetidos concecutivamente,

import { distinctUntilChanged, from, of } from "rxjs";

const numeros$ = of(1,1,3,3,2,2,3,5);
numeros$.pipe(distinctUntilChanged()).subscribe((val) => console.log(val))


interface Persona {
    nombre:string;
}

const persona:Persona[] =[
    { nombre : 'Megaman'},
    { nombre : 'Megaman'},
    { nombre : 'Willow'},
    { nombre : 'X'},
    { nombre : 'Zero'},
    { nombre : 'Zero'},
    { nombre : 'X'},
];

from(persona).pipe(
    //cuando trabajo con objetos es necesario indicar la propiedad sobre la cual se desea validar
    distinctUntilChanged((anterior,actual)=>anterior.nombre === actual.nombre) 
).subscribe((val)=>console.log(val));