import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import AuthResponseData from './authResponse.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSN2M3globfo7ViBbfAfWzbG9bOoSyBmY',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentification(resData);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSN2M3globfo7ViBbfAfWzbG9bOoSyBmY',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentification(resData);
        })
      );
  }

  private handleAuthentification(resData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000
    );
    const newUser = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    this.user.next(newUser);
  }

  private handleError(errorRes: any) {
    console.log(errorRes);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError(() => new Error('Email already exists'));
      case 'INVALID_EMAIL':
        return throwError(() => new Error('Invalid Email'));
      case 'INVALID_LOGIN_CREDENTIALS':
        return throwError(() => new Error('Email or Password invalid'));
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        return throwError(() => new Error('Too many attempts'));
      default:
        return throwError(() => new Error('Something went wrong'));
    }
  }
}
