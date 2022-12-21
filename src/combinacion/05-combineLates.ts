
import { combineLatest, fromEvent, pluck } from "rxjs";

//solo se completa cuando ambos observables se completan
//combina los valores de los observables enviados
//solo envia el primer resultado cuando todos los observables suministrados
//emiten al menos 1 valor

//cuando alguno de los observables emita el segundo valor
//el valor emitido sera el primer observable de los demas + el nuevo valor

//importante, utilizarlo como un array para q no marque q esta decapricated

//devuelve un array con los valores separados emitidos por ambos observables
//devolviendo siempre el ultimo valor de cada uno de los observables



const input1 = document.createElement('input');
const input2 = document.createElement('input');

document.querySelector('body').append(input1,input2);

//helper
const getInputStream = (element: HTMLElement) =>{
    return fromEvent<KeyboardEvent> (element, 'keyup').pipe(
        pluck('target','value')
    );
}

combineLatest([
    getInputStream(input1),
    getInputStream(input2)
]).subscribe((val)=>console.log(val))
