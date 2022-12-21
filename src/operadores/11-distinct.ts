
//distinct: solo envia los valores q son emitidos por primera vez
//es decir si algun valor repetido se emite este no lo deja pasar

import { distinct, from, of } from "rxjs";

const numeros$ = of(1,1,3,3,2,2,3,5);
numeros$.pipe(distinct()).subscribe((val) => console.log(val))


interface Persona {
    nombre:string;
}

const persona:Persona[] =[
    { nombre : 'Megaman'},
    { nombre : 'Zero'},
    { nombre : 'Willow'},
    { nombre : 'X'},
    { nombre : 'Zero'},
    { nombre : 'Willow'},
];

from(persona).pipe(
    //cuando trabajo con objetos es necesario indicar la propiedad sobre la cual se desea validar
    distinct(person => person.nombre) 
).subscribe((val)=>console.log(val));