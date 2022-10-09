import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { User } from './user.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL = 'http://localhost:3000';

export interface AuthResponseData {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>({} as User);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router:Router, private cookieService: CookieService) { }

  googleAuth() {
    let data = JSON.parse(this.cookieService.get('auth'));
    let email = data.user.email;
    let username = data.user.username;
    let id = data.user._id;
    let token = data.token;
    this.handleAuthentication(email, id, username, token);
  }

  register(email:string, username:string, password: string) {
    return this.http.post<AuthResponseData>(this.getUrl()+"/users/register",
      {
        username: username,
        email: email,
        password: password
      }).pipe(catchError(this.handleError), tap((res) => {
        this.handleAuthentication(res.user.email,
          res.user._id,
          res.user.username,
          res.token);
      }));
  }

  login(email:string, password: string) {
    return this.http.post<AuthResponseData>(this.getUrl()+"/users/login",
      {
        email: email,
        password: password
      }).pipe(catchError(this.handleError),tap((res) => {
        this.handleAuthentication(res.user.email,
          res.user._id,
          res.user.username,
          res.token);
      }));
  }

  logout() {
    this.user.next({} as User);
    this.router.navigate(['/']);
    localStorage.removeItem('Data');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      username: string;
      _id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('Data')!);
    
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData._id, userData.username, userData._token, userData._tokenExpirationDate);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();      
      this.autoLogout(expirationDuration);
    }

  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      console.log(expirationDuration);
      
       this.logout();
     }, expirationDuration);
     
   }
  private handleAuthentication(email: string, id: string, username: string, token: string) {
    const decoded_token = jwtDecode<JwtPayload>(token);
 
    const expirationTime = decoded_token.exp;
    const expirationDate = new Date(expirationTime! * 1000);
    
      const user = new User(email,
        id,
        username,
        token,
        expirationDate);
    this.user.next(user);
    localStorage.setItem('Data', JSON.stringify(user));
    
    //this.autoLogout(expirationTime! * 1000);

  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'Email is invalid':
          errorMessage = 'This email already exists!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'The email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = "Password not correct!";
          break;
      }
      return throwError
      (errorMessage);
  }

  private getUrl(){
    return `${BASE_URL}`;
  }
}
