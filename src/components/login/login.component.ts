import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumbersOnlyDirective } from '../../directives/NumbersOnlyDirective';
import { HttpClient } from '@angular/common/http';
import { LOGIN_PATH } from '../../constants/env';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, NumbersOnlyDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  as = inject(AuthService);
  dialog = inject(MatDialog)
  router = inject(Router)
  ngOnInit(): void {

    if(!this.as.isToekenExpiredOrRemoved()) {
      this.router.navigate(['/'])
      return
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      otp: ['', [Validators.required]],
    })
  }


  onSubmit() {

    if (this.loginForm.invalid) {
      console.log(this.loginForm.value);
      return;

    }

    const paylad = {
      username: this.loginForm.value.username,
      otp: this.loginForm.value.otp
    }

    this.http.post(LOGIN_PATH, paylad).pipe(
      catchError((err) => {
        this.dialog.open(DialogBoxComponent, {
          data: null,
          disableClose: false,
          width: '400px',
          height: 'auto',
          panelClass: ['dialog'],
        });
        return err;
      })
    ).subscribe((res: any) => {
      
      this.as.onAfterLogin(res.token);
      this.router.navigate(['/quotes']);
    });

  }
  getErrorMessage(controlErrors: any) {
    if (controlErrors?.required) {
      return 'This field is required';
    } else if (controlErrors?.maxlength) {
      return `Maximum length is ${controlErrors.maxlength.requiredLength}`;
    } else if (controlErrors?.pattern) {
      return 'OTP must be numeric';
    }
    return '';
  }

}
