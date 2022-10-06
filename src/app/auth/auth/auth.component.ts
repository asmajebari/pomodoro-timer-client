import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if (this.router.url.replace('/auth/', '')==='login'){
      this.isLoginMode = true;
    } else
    if(this.router.url.replace('/auth/', '')==='register')
    {
      this.isLoginMode = false;
    }
    
  }

  onGoogleAuth() {
    this.authService.googleLogin();
  }


}
