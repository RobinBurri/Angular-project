import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;
  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
   }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    console.log(`Email: ${email}, Password: ${password}`); 
    // TODO: send to server to authenticate user (email, password);
    // check if user isLoginMode or signupMode
    this.authForm.reset();
  }

}
