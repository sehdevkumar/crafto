import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const routeGaurdInterceptorGuard: CanActivateFn = (route, state) => {
   
  const as = inject(AuthService);
  if (as.isToekenExpiredOrRemoved()) {
    return false;
  }

  return true;
};
