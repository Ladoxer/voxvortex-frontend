import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type':'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl: string = environments.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  adminLogin(user:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/admin`, user, httpOptions);
  }

  getUsers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/users`, httpOptions);
  }

  blockUser(id: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/users/block/${id}`, httpOptions);
  }
  
  unBlockUser(id: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/users/unblock/${id}`, httpOptions);
  }

  getAllLabels(): Observable<any>{
    return this.http.get(`${this.apiUrl}/label`,httpOptions);
  }

  createLabel(newLabel): Observable<any>{
    return this.http.post(`${this.apiUrl}/label`,newLabel,httpOptions);
  }

  updateLabel(labelId: string,updatedLabel): Observable<any>{
    return this.http.put(`${this.apiUrl}/label/${labelId}`,updatedLabel,httpOptions);
  }

  deleteLabel(labelId: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/label/${labelId}`,httpOptions);
  }

  // ..... Plan methods......
  getAllPlans(): Observable<any>{
    return this.http.get(`${this.apiUrl}/plan`,httpOptions);
  }

  createPlan(planDetails: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/plan`,planDetails, httpOptions);
  }

  deletePlan(planId: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/plan/${planId}`,httpOptions);
  }
}
