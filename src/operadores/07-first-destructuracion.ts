import { first, fromEvent, map, take } from "rxjs";

const click$ = fromEvent<MouseEvent>(document,'click');
click$.pipe(
   //pongo el objeto entre parentis de esta forma hace el return
   // map<MouseEvent,any>( event =>({ clientY:event.clientY, clientX:event.clientX})),
   // con la destructuracion del objeto evento saco ambas propiedades
   // map<MouseEvent,any>( ({clientX,clientY}) =>({ clientY:clientY, clientX:clientX})),
   //cuando el nombre de la propiedad es igual al objeto puedo resumirlo asi
    map<MouseEvent,any>( ({clientX,clientY}) =>({ clientY, clientX})),
    first( val=> val.clientY>150)
).subscribe({
   next: (val)=>console.log(val),
   complete:()=>console.log('completa')
})