import { Observable, Observer, Subject } from "rxjs";


  //cuando la data es producida dentro del observable es conocido como un cold observable
 //cuando la data se produce afuera del observable este se conoco como un hot observable
const observer:Observer<string> ={
    next:value => console.log('next',value),
    error:value => console.error('error',value),
    complete: ()=> console.log('complete') 

}

const intervalo$ = new Observable<number>( subs =>{
    const interval = setInterval(()=>{
        console.log('dentro del contador');
        //cuando la data es producida dentro del observable es conocido como un cold observable
        subs.next(Math.random() )
    }, 3000);

    return ()=>{ 
        console.log('elimino el intervalo');
        clearInterval(interval);
     }
})

// aun q se subscribio al mismo observable cada uno es independiente
// y emite valores diferetnes de la funcion math random
//const subs1 = intervalo$.subscribe((val)=> console.log('subs1',val));
//const subs2 = intervalo$.subscribe((val)=> console.log('subs2',val));

/** caracteristicas del subject
 * 1. Casteo Multiple = muchas subscripciones reciben el mismo valor
 * 2. Tambien es un Observer por lo q puede manejar next, error y complete
 * 3. puede manejar next, error y complete
 */
const subject$  = new Subject();
const subscription = intervalo$.subscribe(subject$);
const subs3 = subject$.subscribe((val)=> console.log('subs3',val));
const subs4 = subject$.subscribe((val)=> console.log('subs4',val));


setTimeout(()=>{
    //cuando la data se produce afuera del observable este se conoco como un hot observable
    subject$.next(10); // forma de verificar q tambien es un observer por lo q puedo insertar data
    subject$.complete(); // O terminar su ejecucion
    subscription.unsubscribe(); // hago q se llame el clear interval
},5000)


