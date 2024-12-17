import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NumbersOnlyDirective } from '../../directives/NumbersOnlyDirective';
import { HttpClient } from '@angular/common/http';
import { LOGIN_PATH } from '../../constants/env';

@Component({
  selector: 'app-register',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, NumbersOnlyDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup<any>;
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      otp: ['', [Validators.required]],
    })
  }


  onSubmit() {

    if (this.registerForm.invalid) {
      console.log(this.registerForm.value);
      return;

    }

    const paylad = {
      username: this.registerForm.value.username,
      otp: this.registerForm.value.otp
    }

    this.http.post(LOGIN_PATH, paylad).subscribe((res) => {
      console.log(res);
    });

    console.log(this.registerForm.value);
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
