import { fromEvent, map, tap } from "rxjs";

const texto = document.createElement('div');
texto.innerHTML =`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac eros id eros fermentum ultrices vehicula id purus. Curabitur et semper turpis. Quisque suscipit tincidunt velit ut hendrerit. In hac habitasse platea dictumst. Nulla facilisi. Pellentesque id turpis arcu. Quisque tempus, eros a consectetur dictum, libero ante semper ipsum, quis ultrices elit nisi eget risus. In hac habitasse platea dictumst. Nullam ac mauris justo. Donec lobortis, ipsum in condimentum dignissim, eros enim condimentum lectus, non accumsan sapien purus et sapien. Etiam laoreet et odio at rutrum.
<br>
Nunc hendrerit sollicitudin nunc consectetur rutrum. Ut pulvinar ligula efficitur massa fermentum blandit. Praesent ornare leo et erat placerat luctus. Integer tincidunt porta nulla, non ornare magna. Donec at congue est, ut fermentum sem. Maecenas ornare nulla eu quam ultricies iaculis. Sed vehicula nibh in sapien rutrum dapibus. Proin nulla quam, mollis ut mattis sed, tempor eget urna.
<br>
Nulla et malesuada felis, ut rutrum dui. In id tellus tellus. Praesent sed arcu velit. Donec luctus, dui in iaculis faucibus, ipsum arcu pellentesque orci, in ultrices dolor mauris ac elit. Proin lectus purus, efficitur quis rutrum ut, dictum vel odio. Suspendisse vitae dapibus nulla. Suspendisse pellentesque, est quis molestie tincidunt, urna purus hendrerit nibh, auctor auctor erat risus vel odio. Sed nec libero eu ex hendrerit consectetur. Aliquam at bibendum quam. Phasellus malesuada tellus vitae lacinia rhoncus. In hac habitasse platea dictumst.
<br>
In consectetur sit amet odio a condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean ac leo vel augue fermentum commodo. Quisque rutrum eros diam, a aliquam nisi imperdiet sed. In facilisis commodo massa vel consequat. Ut interdum tortor nulla, ut euismod est fermentum vel. Nam tempus venenatis justo non dapibus. Curabitur laoreet auctor pretium. Curabitur purus sem, tempor nec fringilla sed, tincidunt eleifend metus. Mauris at magna in metus tempus interdum ac nec lacus. Sed ornare quis quam nec ultrices. Vestibulum dapibus vulputate luctus.
<br>
Suspendisse ligula tellus, maximus nec efficitur id, feugiat id diam. Donec mattis, nulla eu lacinia efficitur, arcu orci sollicitudin tortor, in lobortis lacus mi commodo lectus. Nunc auctor enim sed neque vulputate commodo. Vivamus viverra pellentesque dolor id laoreet. Sed maximus, ligula non hendrerit pretium, eros dolor sagittis dui, quis commodo urna est vitae diam. Aenean nisi nulla, posuere vel placerat sit amet, venenatis varius sem. Maecenas semper magna ut imperdiet vulputate. Cras hendrerit, augue in laoreet convallis, arcu arcu venenatis enim, id varius diam arcu dignissim tortor. Pellentesque tempus finibus faucibus.`;

const body = document.querySelector('body');
body.append(texto);

const progressBar = document.createElement('div');
progressBar.setAttribute('class','progress-bar');

body.append(progressBar);

const calcularPorcentajeScroll = (event)=>{
    const {scrollTop,scrollHeight,clientHeight} = event.target.documentElement;
   // console.log(scrollTop,scrollHeight,clientHeight);
    return (scrollTop / (scrollHeight-clientHeight)) * 100
   
}

//subscribo al scroll del html
const scroll$ = fromEvent(document,'scroll');
//scroll$.subscribe(val =>console.log(val));

const progress$ = scroll$.pipe(
    map(event =>calcularPorcentajeScroll(event)),
    tap((result)=>console.log(result))
);

progress$.subscribe( porcentaje => {
    progressBar.style.width = `${porcentaje}%`
})
