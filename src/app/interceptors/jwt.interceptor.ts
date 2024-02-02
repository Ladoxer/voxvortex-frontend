import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has('Bypass-Interceptor')){
      request.headers.append('Access-Control-Allow-Origin','http://localhost:4200');
      return next.handle(request);
    }

    console.log('request',request.url);

    const urlSegments = request.url.split('/');
    if(urlSegments[4] === 'auth'){
      return next.handle(request);
    }

    if(urlSegments[4] === 'users') {
      if((request.method === 'GET' && urlSegments[5] === undefined) || urlSegments[5] === 'block' || urlSegments[5] === 'unblock'){
        console.log('admin token');
        
        request = this.addAdminToken(request);
      }else{
        console.log(urlSegments[4],urlSegments[5]);
        
        console.log('user token');
        
        request = this.addUserToken(request);
      }
    }else{
      request = this.addUserToken(request);
    }

    return next.handle(request);
  }

  private addAdminToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const adminToken = localStorage.getItem('adminsession');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${adminToken}`
      }
    })
  }

  private addUserToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    // Add user JWT token to headers
    const userToken = localStorage.getItem('session');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken}`
      }
    });
  }
  
}

