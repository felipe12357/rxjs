import { catchError, forkJoin, of, pipe } from "rxjs";
import { ajax } from "rxjs/ajax";

const GITHUB_URL =  'https://api.github.com/users'
const GITHUB_USER = 'felipe12357';

forkJoin({
    usuario: ajax.getJSON(`${GITHUB_URL}/${GITHUB_USER}`),
    repost:ajax.getJSON(`${GITHUB_URL}/${GITHUB_USER}/repos`),
    gists:ajax.getJSON(`${GITHUB_URL}/${GITHUB_USER}/gists`),
    gistErr:ajax.getJSON(`${GITHUB_URL}/${GITHUB_USER}/gistsa`).pipe(
        //catch singular, al caer aca no sera manejado por el general
        catchError(err =>of([]))
    )
}).pipe(
    //cathc general
    catchError(err =>of(err))
).subscribe(val=>{
    console.log(val)
})