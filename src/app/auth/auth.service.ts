import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import AuthResponseData from './authResponse.model';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private autoLogoutTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

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

  autoLogin() {
    const userString = localStorage.getItem('userData');
    if (!userString) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationdate: string;
    } = JSON.parse(userString);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationdate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        loadedUser.tokenExpirationdate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }
  }

  autoLogout(expirationDuration: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
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
    this.autoLogout(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(newUser));
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
