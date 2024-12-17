import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  as = inject(AuthService)
  

  isLoggedIn() {
    return !this.as.isToekenExpiredOrRemoved()
  }


  onLogout() {
    this.as.onLogout()
  }
}
