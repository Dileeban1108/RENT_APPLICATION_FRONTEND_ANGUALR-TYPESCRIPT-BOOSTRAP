import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService]
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Full Response:', response); // Log the full response
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken); // Save the refresh token

            const decodedToken = this.decodeToken(response.token);
            if (decodedToken && decodedToken.id) {
              localStorage.setItem('userId', decodedToken.id); // Store user ID
              console.log('User ID:', decodedToken.id);
            } else {
              console.warn('User ID not found in token');
            }

            console.log('Access Token:', response.token);
            console.log('Refresh Token:', response.refreshToken || 'Refresh Token not found');
            this.router.navigate(['/vehicles']);
          } else {
            this.message = 'Invalid email or password';
          }
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      );
    }
  }

  decodeToken(token: string): any {
    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      this.message = 'Network error: Please check your connection.';
    } else if (error.status >= 400 && error.status < 500) {
      // A bad request or unauthorized error occurred.
      this.message = 'Login failed: Invalid credentials.';
    } else {
      // A server-side error occurred.
      this.message = 'Server error: Please try again later.';
    }
    console.error('Login error:', error.message);
  }
}
