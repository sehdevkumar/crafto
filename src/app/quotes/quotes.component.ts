import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QUOTES_PATH } from '../../constants/env';
import { QuoteApiResponse } from '../../types/api-response-typings';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [MatPaginatorModule, CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent implements OnInit {
  
  as = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);

  quotes = signal<QuoteApiResponse[]>([]);
  limit: number = 10; // Number of quotes per page
  offset: number = 0; // Starting point for fetching quotes

  ngOnInit(): void {
    this.fetchQuotes();
  }

  fetchQuotes(): void {

    this.http.get(QUOTES_PATH + `?limit=${this.limit}&offset=${this.offset}`, {
      headers: {
        'Authorization': `${this.as.getToken()}`
      }
    }).subscribe((res: any) => {
      this.quotes.set(res?.data as QuoteApiResponse[]);
    });
  }

  onPageChange(event: any): void {
    this.offset = event.pageIndex * this.limit; // Calculate new offset
    this.limit = event.pageSize;
    this.fetchQuotes(); // Fetch quotes for the new page
  }

  refreshQuotes(): void {
    this.offset = 0;
    this.limit = 10;
    this.fetchQuotes();
  }
}