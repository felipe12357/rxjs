/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

import { from, map, of } from "rxjs";

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */
(() =>{



    const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];
  
    const capitalizar = (nombre: string) => nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    from(nombres).pipe(
        map(nombre => capitalizar(nombre))
    ).subscribe( val => console.log(val))

    //Importante diferencia con of este devuelve en una emision un array de string
    // from lo devuelve diferente
   /*  of(nombres).pipe(
        map(nombre => capitalizar(nombre))
    ).subscribe( val => console.log(val)) */
  
})();
 