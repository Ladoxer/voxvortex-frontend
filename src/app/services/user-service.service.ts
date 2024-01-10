import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  profileIsSaveSubject: Subject<boolean> = new Subject<boolean>();
  profileIsSave$: Observable<boolean> = this.profileIsSaveSubject.asObservable();

  apiUrl: string = "http://localhost:3000/api"

  constructor(
    private http: HttpClient
  ) {}

  toggleProfileIsSave(value: boolean) {
    this.profileIsSaveSubject.next(value);
  }

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

  updateUser(userId: string, updatedData): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, updatedData, httpOptions);
  }

  toggleFollow(userId: string, targetId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/follow`,{userId,targetId},httpOptions);
  }

  toggleSave(userId: string, blogId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/save`, {userId,blogId},httpOptions);
  }

  toggleLike(userId: string, blogId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/like`,{userId,blogId},httpOptions);
  }

  getFollowings(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/followings/${userId}`,httpOptions);
  }

  getFollowers(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/followers/${userId}`, httpOptions);
  }

  getSavedBlogs(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/save/${userId}`,httpOptions);
  }

  getMyBlogs(userId: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/users/myBlogs/${userId}`,httpOptions);
  }

  getLikedBlogs(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/like/${userId}`,httpOptions);
  }

  getLabelById(labelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/label/${labelId}`,httpOptions);
  }

  getBlogsByLabelId(labelId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/label/${labelId}`,httpOptions);
  }
}
