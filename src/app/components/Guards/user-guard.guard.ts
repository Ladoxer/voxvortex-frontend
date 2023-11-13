import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class userGuard {
  
  constructor(public router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = localStorage.getItem('session');

    if(token){
      this.router.navigate(['/']);
      return false;
    }else{
      return true;
    }
  }
  
};

@Injectable({
  providedIn: 'root'
})
export class UserGuardlet {

  constructor(public router: Router) {
  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('session');
    
    if(token===null){      
      this.router.navigate(['/login']);
      return false;
    }else{
      return true;
    }
  }
}
