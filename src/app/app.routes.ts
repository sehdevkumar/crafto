import { Routes } from '@angular/router';
import { routeGaurdInterceptorGuard } from '../interceptors/route-gaurd-interceptor.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'quotes',
        canActivate: [routeGaurdInterceptorGuard],
        loadComponent: () => import('./quotes/quotes.component').then(m => m.QuotesComponent)
    },
    {
        path: 'quote-upload',
        canActivate: [routeGaurdInterceptorGuard],
        loadComponent: () => import('./quote-upload/quote-upload.component').then(m => m.QuoteUploadComponent)
    },
     
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path:"**",
        loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }

];
