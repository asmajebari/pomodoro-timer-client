import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  googleAuthURL = "http://localhost:3000/auth/google"
  isLoginMode = true;
  link = '';
  error: string = '';
  constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    if (this.router.url.replace('/auth/', '') === 'login'){
      this.isLoginMode = true;
      this.link = "register";
    } else
    if(this.router.url.replace('/auth/', '') === 'register')
    {
      this.isLoginMode = false;
      this.link = "login";
    } else {
      if (this.router.url.replace('/auth/', '') === 'google') {
        this.googleLogin();
      }
    }
  }

  googleLogin() {
    this.authService.googleAuth();
    this.router.navigate(['/']);
  }

  onSubmit(form: NgForm) {
    let observable: Observable<AuthResponseData>;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    if (!this.isLoginMode) {
      const username = form.value.username;
      observable = this.authService.register(email, username, password);
    }

    else {
      observable = this.authService.login(email, password);
    }

    observable.subscribe(res => {
      this.router.navigate(['/']);
    }, errorMessage => {
      this.error = errorMessage;
    }
    );
  }
}
