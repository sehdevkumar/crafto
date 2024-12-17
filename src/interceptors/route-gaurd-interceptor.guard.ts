import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

export const routeGaurdInterceptorGuard: CanActivateFn = (route, state) => {
   
  const as = inject(AuthService);
  const router = inject(Router);
  if (as.isToekenExpiredOrRemoved()) {
    as.onLogout();
    router.navigate(['login']);
    return false;
  }

  return true;
};
