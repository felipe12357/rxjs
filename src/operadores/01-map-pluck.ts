import {fromEvent, map, pluck, range} from 'rxjs'

range(1,5).subscribe( (val)=> console.log(val));

//<number,number> = recibo un numero y envio un numero
range(1,5).pipe(map<number,number>(val => val*10))
.subscribe((val)=> console.log(val));

//<number,string> = recibo un numero y envio un string
range(1,5).pipe(map<number,string>(val => (val*10).toString()))
.subscribe((val)=> console.log(val));

//ejemplo 2
const keyup$ = fromEvent<KeyboardEvent>(document,'keyup');

const keyupMap$ = keyup$.pipe(map((val) =>  [val.code, val.keyCode]));
keyupMap$.subscribe((val)=> console.log('ej map 1', val));


//ejemplo 2 utilizando el pluv (sirve para extraer variables)
const keyupPluck$ = keyup$.pipe(pluck('keyCode'));
keyupPluck$.subscribe((val)=> console.log('ej pluck 1',val));

const keyupPluck2$ = keyup$.pipe(pluck('target','baseURI'));
keyupPluck2$.subscribe((val)=> console.log('ej pluck 2',val));
