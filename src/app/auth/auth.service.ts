import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    const bodyPayload = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(bodyPayload);

    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSN2M3globfo7ViBbfAfWzbG9bOoSyBmY',
      bodyPayload
    );
  }

  login(email: string, password: string) {
    const bodyPayload = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    console.log(bodyPayload);
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSN2M3globfo7ViBbfAfWzbG9bOoSyBmY',
       bodyPayload
    );
  }
}
