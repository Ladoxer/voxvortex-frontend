import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { UserService } from 'src/app/services/user-service.service';

export const premiumGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId = localStorage.getItem('userData');

  return userService.getUser(userId).pipe(
    tap(user => {
      if (!user || !user.is_premium) {
        router.navigate(['/upgrade']); // Redirect to upgrade page if not premium
      }
    }),
    map(user => !!user && user.is_premium) // Map to boolean based on premium status
  );
};

export const premiumGuardlet: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId = localStorage.getItem('userData');

  return userService.getUser(userId).pipe(
    tap(user => {
      if (user && user.is_premium) {
        router.navigate(['/']); // Redirect to home page if not premium
      }
    }),
    map(user => true) // Map to boolean based on premium status
  );
};
