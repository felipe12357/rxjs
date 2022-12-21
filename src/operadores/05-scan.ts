import { from, interval, reduce, scan, take, tap } from "rxjs";
//Scan es como un reduce
const numbers = [1,2,3,4,5];
const totalAcumulador =(acumulador:number,valorActual:number)=>{
    return acumulador + valorActual;
}

from( numbers ).pipe(
    reduce(totalAcumulador,0)
)
.subscribe( (val)=>console.log('reduce',val))

from( numbers ).pipe(
    scan(totalAcumulador,0)
)
.subscribe( (val)=>console.log('scan',val))

