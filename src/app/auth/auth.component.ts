import { Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  authForm: FormGroup;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.isLoading = true;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    setTimeout(() => {
      if (this.isLoginMode) {
        this.authService.login(email, password).subscribe({
          next: (responseData) => {
            console.log(responseData);
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        this.authService.signup(email, password).subscribe({
          next: (responseData) => {
            console.log(responseData);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
      this.authForm.reset();
      this.isLoading = false;
    }, 1000);
  }
}
