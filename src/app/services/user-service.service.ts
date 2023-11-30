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

  apiUrl: string = "http://localhost:3000/api"

  constructor(
    private http: HttpClient
  ) {}

  userRegister(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`,user,httpOptions);
  }

  userLogin(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`,user,httpOptions);
  }

  userReverification(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/reverification`,user,httpOptions);
  }

  userVerification(id:any, otp:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/verification?id=`+id,otp,httpOptions);
  }

  forgotPassword(mail:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/forgotpassword`,mail,httpOptions);
  }

  forgot(token:any,pass:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/forgot/${token}`,pass,httpOptions);
  }

  useractive(data): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/active`,data,httpOptions);
  }


  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`,httpOptions);
  }

  toggleFollow(userId: string, targetId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/follow`,{userId,targetId},httpOptions);
  }

  getFollowings(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/followings/${userId}`,httpOptions);
  }
}
