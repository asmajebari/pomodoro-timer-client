import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CookieService } from 'ngx-cookie-service';


function countdownConfigFactory(): CountdownConfig {
  return { format: `mm:ss` };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimerComponent,
    TasksComponent,
    TaskItemComponent,
    TaskEditComponent,
    ResetpasswordComponent,
    MainComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CountdownModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [CookieService, { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
