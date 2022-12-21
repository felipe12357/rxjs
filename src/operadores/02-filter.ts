import {filter, from, fromEvent, map, of, pluck, range} from 'rxjs'

const heroes = [{
    type:'Heroe',
    name:'Batman'
},{
    type:'Heroe',
    name:'Robin'
},{
    type:'Villan',
    name:'Joker'
}]

range(1,10).pipe(filter((val,index) =>{
    console.log(index)
    return val %2 ===1;
})).subscribe( (val)=> console.log(val));


from(heroes).pipe(filter(val => val.type === 'Heroe'))
.subscribe( (val)=> console.log(val));

const keyup$ = fromEvent<KeyboardEvent>(document,'keyup').pipe(
   // map(event =>{ console.log(event); return event.code}),
    pluck('code'),
    filter(code => code === 'Enter')
)

keyup$.subscribe(val => console.log('subscripcion',val));

