import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

// const httpFileOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'multipart/form-data',
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  titleSubject = new BehaviorSubject<string>('');
  title$: Observable<string> = this.titleSubject.asObservable();

  imageSubject = new BehaviorSubject<any>('');
  image$: Observable<any> = this.imageSubject.asObservable();

  imageDataSubject = new BehaviorSubject<any>('');
  imageData$: Observable<any> = this.imageDataSubject.asObservable();

  htmlSubject = new BehaviorSubject<any>('');
  html$: Observable<any> = this.htmlSubject.asObservable();

  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:3000/api';

  updateContent(title: string, image: any, html: any, formDataImage: any) {
    this.titleSubject.next(title);
    this.imageSubject.next(image);
    this.htmlSubject.next(html);
    this.imageDataSubject.next(formDataImage);
    console.log(formDataImage);
  }

  getAllLabels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/label`, httpOptions);
  }

  createBlog(newBlog: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/blog`, newBlog, { headers });
  }

  getAllBlogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog`,httpOptions);
  }

  getBlogById(blogId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/${blogId}`,httpOptions);
  }

  addComment(blogId: string, newComment): Observable<any> {
    return this.http.post(`${this.apiUrl}/blog/comment/${blogId}`,newComment,httpOptions);
  }

  getComments(blogId: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/blog/comment/${blogId}`,httpOptions);
  }
}
