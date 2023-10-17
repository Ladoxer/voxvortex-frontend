import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl: string = "http://localhost:3000"

  constructor(
    private http: HttpClient
  ) {}

  userRegister(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,user,httpOptions);
  }

  userLogin(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,user,httpOptions);
  }

  userReverification(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/reverification`,user,httpOptions);
  }

  userVerification(id:any, otp:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/verification?id=`+id,otp,httpOptions);
  }

  forgotPassword(mail:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/forgotpassword`,mail,httpOptions);
  }

  forgot(token:any,pass:any){
    return this.http.post(`${this.apiUrl}/forgot`+token,pass,httpOptions);
  }
}
