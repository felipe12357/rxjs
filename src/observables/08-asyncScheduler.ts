import { asyncScheduler } from "rxjs";


//asyncScheduler permita generar los metodos:
//setTimeout(()=>'hola',1000);
//setInterval(()=>'hola',1000);

const saludar = ()=> console.log('hola mundo');
const saludar2 = (nombre) => console.log('hola', nombre);


//Ejemplo de setTimeOut
asyncScheduler.schedule(saludar,2000);  
asyncScheduler.schedule(saludar2,2000,'Felipe');

//Ejemplo de setInterval
//Para este caso no puedo enviar una funcion de flecha
const subs = asyncScheduler.schedule(function(state){
    console.log('state',state);
    //al modificar el estado la funcion se vuelve a ejecutar
    //el ultimo parametro indica cuando se ejecutar
    this.schedule('andres',2000); 
},3000,'felipe')

//despues de 5 seg me desuscribo
asyncScheduler.schedule(()=>subs.unsubscribe,5000,);