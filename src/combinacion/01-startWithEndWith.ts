import { endWith, of, startWith } from "rxjs";

//startWith .. antes de cualquier valor inicia con el valor q yo indique en este caso el 0
//endWith .. al final del observable emite el valor indicado en ese caso Z
/* const numeros$ = of(1,2,3,4).pipe(startWith(0));
const letras$ =of('a','b','c').pipe(endWith('z'));
numeros$.subscribe((val)=>console.log(val))
letras$.subscribe(val =>console.log(val)); */


const numerosLetras$ =of(1,2,3,4,'a','b','c').pipe(startWith(0),endWith('z'));
numerosLetras$.subscribe((val)=>console.log(val));