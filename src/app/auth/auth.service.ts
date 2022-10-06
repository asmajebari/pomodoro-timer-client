import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http:HttpClient) { }
  googleLogin() {
    return this.http.get(this.getUrl() + '/auth/google/callback').subscribe(() => {
      console.log('here');
      
    });
  }

  private getUrl(){
    return 'http://localhost:3000';
  }
}
