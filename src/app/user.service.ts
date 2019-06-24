import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private route:Router) { }

  Data(s):Observable<any>
  {
     console.log(s)
    return this.http.post('/navbar/login',s)
  }

}