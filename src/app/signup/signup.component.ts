import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [UserService]
})
export class SignupComponent {
  signupForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const hashedPassword = await bcrypt.hash(this.signupForm.get('password')?.value, 10);
  
      const user = {
        ...this.signupForm.value,
        password: hashedPassword,
        confirmPassword: hashedPassword
      };
  
      console.log('Payload:', user); // Log payload to verify structure
  
      this.userService.register(user).subscribe(
        response => {
          this.message = 'User registered successfully';
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        (error: HttpErrorResponse) => {
          console.error('Registration error:', error);
          this.message = `Registration error: ${error.error.message || error.message}`;
        }
      );
    } else {
      this.message = 'Please correct the errors in the form.';
    }
  }
  
}
