import { interval, reduce, take, tap } from "rxjs";

const numbers = [1,2,3,4,5];

//reduce con javascript
const totalReducer =(acumulador:number,valorActual:number)=>{
    return acumulador + valorActual;
}

//Importante Reduce solo arroja el resultado al final de toda la operacion

const total = numbers.reduce(totalReducer,0);
console.log('total array', total);

interval(1000).pipe(
    take(3),
    tap((val)=>console.log(val)),  //uso el tap para validar q esta pasando
    reduce(totalReducer,0)
)
.subscribe({next:val=>console.log('next',val)})