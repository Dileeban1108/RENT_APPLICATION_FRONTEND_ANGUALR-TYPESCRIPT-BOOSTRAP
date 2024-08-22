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
          if (response.token) {
            this.router.navigate(['/rent-page']);
          } else {
            this.message = 'Invalid email or password';
          }
        },
        (error) => {
          this.message = 'Login error: ' + error.message;
        }
      );
    }
  }
}
