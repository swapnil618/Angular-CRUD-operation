import { Injectable,ErrorHandler } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { error,log } from 'console';



@Injectable({
  providedIn: 'root'
})
export class BooksService {

  apiUrl:string='http://localhost:3000/books';

  headers = new HttpHeaders().set("Content-Type",'application/json');

  constructor(private httpClient:HttpClient) { }

  // show list of items

  list():Observable<any>{
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  
  // create new item  
  getItem(id:any):Observable<any>{
    console.log('Getting book with ID:', id); 
    return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    )
  }
   create(data:any):Observable<any>{
    return this.httpClient.post(this.apiUrl,data).pipe(
      catchError(this.handleError)
    )
   }

   // update or edit details

  update(id:any,data:any):Observable<any>{

    return this.httpClient.post(`${this.apiUrl}/${id}`,data).pipe(
      catchError(this.handleError)
    )
  }

   // delete data

   delete(id:any):Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)

    );
  }

  //search by title
  
  filterbytitle(title:any):Observable<any>{
    return this.httpClient.get(`${this.apiUrl}?title_like=${title}`).pipe(
      catchError(this.handleError)

    );
  }

  // Api Error handling

  handleError(error:HttpErrorResponse){

    if(error.error instanceof ErrorEvent) 

  {
    console.error(`Error Occurred`, error.error.message);

  }
  else{
    console.error(`Backend returns code ${error.status},`+
      `Body was: ${error.error}`);

}
 
  console.log('Error occurred:',error);

  return throwError(()=>`something went wrong..try again!`);
}
  
}
