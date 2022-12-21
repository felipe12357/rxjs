import {ajax} from 'rxjs/ajax';

const url = 'https://httpbin.org/delay/1';

ajax.post(url,{
    id:1,
    nombre:'felipe'
},{
    'mi-token':'ABC123'
}).subscribe((val)=>console.log(val));

//oTRA FORMA DE EJECUTAR LAS REQUEST
ajax({url:url,
    method:'POST',
    headers: { 'mi-token':'ABC13'},
    body:{
        id:1,
        nombre:'FELIPE'
    }
}).subscribe((val)=>console.log(val));


