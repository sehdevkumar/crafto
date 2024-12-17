import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { POST_QUOTE_PATH, UPLOAD_PATH } from '../../constants/env';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';
@Component({
  selector: 'app-quote-upload',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './quote-upload.component.html',
  styleUrl: './quote-upload.component.scss'
})
export class QuoteUploadComponent {
  httpClient = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  isPosting = signal<boolean>(false)
  dialog = inject(MatDialog);


  quoteForm = new FormGroup({
    quote: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required])
  });


  getErrorMessage(controlErrors: any) {
    if (controlErrors?.required) {
      return 'This field is required';
    }
    return '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.quoteForm.get('file')?.setValue(file);
  }

  onSubmit() {
    this.isPosting.set(true);
    if (this.quoteForm.invalid) {
      console.log(this.quoteForm.value);
      return;
    }

    const payload = {
      text: this.quoteForm.get('quote')?.value,
      mediaUrl: null
    }

    this.onUpladingFile().subscribe((res) => {
      payload.mediaUrl = res[0]?.url
      this.httpClient.post(POST_QUOTE_PATH, payload, { headers: { 'Authorization': `${this.authService.getToken()}` } }).pipe(catchError(async (err) => this.dialog.open(DialogBoxComponent, { data: null, disableClose: false, width: '400px', height: 'auto', panelClass: ['dialog'], }))).subscribe((res) => {
        this.isPosting.set(false);
        this.router.navigate(['/quotes'])
      })
    })




  }

  onUpladingFile(): Observable<any> {
    const formData = new FormData();
    formData.append('file', this.quoteForm.get('file')?.value as unknown as File);
    return this.httpClient.post(UPLOAD_PATH, formData).pipe(
      map((res) => {
        console.log('File uploaded successfully', res);
        return res;
      }),
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
    );
  }

}
