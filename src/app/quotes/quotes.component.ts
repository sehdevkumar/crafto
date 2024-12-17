import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent implements OnInit {
   
  as = inject(AuthService)
  router = inject(Router)

  
  ngOnInit(): void {
  
  }


}
