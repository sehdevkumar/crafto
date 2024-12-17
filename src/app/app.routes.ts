import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'quotes',
        loadComponent: () => import('./quotes/quotes.component').then(m => m.QuotesComponent)
    },
    {
        path: 'quote-upload',
        loadComponent: () => import('./quote-upload/quote-upload.component').then(m => m.QuoteUploadComponent)
    },
    {
        path:"**",
        loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }

];
