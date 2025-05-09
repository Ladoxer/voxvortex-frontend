import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environments } from 'src/environments/environment';

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

  apiUrl: string = environments.apiUrl;

  updateContent(title: string, image: any, html: any, formDataImage: any) {
    this.titleSubject.next(title);
    this.imageSubject.next(image);
    this.htmlSubject.next(html);
    this.imageDataSubject.next(formDataImage);
    // console.log(formDataImage);
  }

  getAllLabels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/label`, httpOptions);
  }

  createBlog(newBlog: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/blog`, newBlog, { headers });
  }

  // getAllBlogs(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/blog`,httpOptions);
  // }
  getAllBlogs(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog?limit=${limit}&offset=${offset}`,httpOptions);
  }

  // getFollowingBlogs(userId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/blog/following/${userId}`,httpOptions);
  // }
  getFollowingBlogs(userId: string, limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/following/${userId}?limit=${limit}&offset=${offset}`,httpOptions);
  }

  getBlogById(blogId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/blog/${blogId}`,httpOptions);
  }

  addComment(blogId: string, newComment): Observable<any> {
    return this.http.post(`${this.apiUrl}/blog/comment/${blogId}`,newComment,httpOptions);
  }

  getComments(blogId: string, page: number = 1, limit: number = 10 ): Observable<any>{
    return this.http.get(`${this.apiUrl}/blog/comment/${blogId}`,httpOptions);
  }
}
