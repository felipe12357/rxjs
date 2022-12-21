import { of, take, tap } from "rxjs";

const numbers$ = of(1,2,3,4,5);
numbers$.pipe(take(3),tap(
    (val)=> console.log('tap',val)
))
.subscribe({
    next:val => console.log('llega',val),
    complete:() => console.log('complete')
})
