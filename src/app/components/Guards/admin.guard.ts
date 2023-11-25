import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminToken = localStorage.getItem('adminsession');
    if(adminToken) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn:'root'
})
export class AdminGuardlet implements CanActivate {

  constructor(private router: Router) {}
  canActivate(): boolean {
    const adminToken = localStorage.getItem('adminsession');
    if(!adminToken){
      return true;
    }else{
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
  }
}
