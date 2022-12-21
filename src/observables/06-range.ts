import { asyncScheduler, fromEvent, range,observeOn,scheduled } from "rxjs";
import {of} from 'rxjs';

const src1$ = of(1,2,3,4,5);
//-5 donde arranca, 10 cuantas emisiones
const src2$ = range(-5,10); //de esta forma es sincrono
const src3$ = range(-5,10,asyncScheduler); //de esta forma es asyncrono 
console.log('inicio');
 src2$.subscribe((val)=>console.log(val));
//src3$.subscribe((val)=>console.log(val));
console.log('fin')

