import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  

  constructor(private http:HttpClient, private route:Router) { }

  getData(): Observable<any[]> {
    console.log(this.route.url)
    //return this.http.get<any[]>(this.route.url)
    return this.http.get<any[]>('/assets/orders.json')
    .pipe(catchError(this.errorHandler))
   
 
    
  }

   /** Error Handling method */

   errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');

  }





  deleteData(k) :Observable<any> {
    console.log('in delete service');
    console.log(k);
    return this.http.delete(this.route.url,k);
  }

  
  newOrder(v):Observable<any>
{

  console.log('in service');
  console.log(v);
  console.log(this.route.url);
  return this.http.post(this.route.url,v);
  
 
  
}
}
