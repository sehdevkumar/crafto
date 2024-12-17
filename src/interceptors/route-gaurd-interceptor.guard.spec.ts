import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routeGaurdInterceptorGuard } from './route-gaurd-interceptor.guard';

describe('routeGaurdInterceptorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routeGaurdInterceptorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
