import { of } from "rxjs";


const obs$ = of(1,2,3,4,5,6);
/*
//decapricado
obs$.subscribe( next =>  console.log(next),
    null,
    () => console.log('termina secuencia')
);*/

obs$.subscribe({
    next:(v)=> {console.log(v)},
    complete: () => console.info('complete')
})



