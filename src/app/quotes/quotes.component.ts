import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QUOTES_PATH } from '../../constants/env';
import { QuoteApiResponse } from '../../types/api-response-typings';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [MatPaginatorModule,CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent implements OnInit {
  

  as = inject(AuthService)
  router = inject(Router)
  http = inject(HttpClient)

  quotes = signal<QuoteApiResponse[]>([])

  
  ngOnInit(): void {
     
    this.http.get(QUOTES_PATH,{
      headers: {
        'Authorization': `${this.as.getToken()}`
      }
    }).subscribe((res:any) => {
      this.quotes.set(res?.data as QuoteApiResponse[])
    });
  }


}
