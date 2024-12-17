import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumbersOnlyDirective } from '../../directives/NumbersOnlyDirective';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule,NumbersOnlyDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<any>;
  fb = inject(FormBuilder);

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      otp: ['', [Validators.required, Validators.maxLength(4), Validators.max(4)]],
    })
  }


  onSubmit() {
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
