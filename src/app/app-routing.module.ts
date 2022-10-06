import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';

import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {path: 'auth' , redirectTo: "auth/login"},
  {
    path: 'auth', children: [
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent },
      {path:'resetpassword', component: ResetpasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
