import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TimerComponent } from './timer/timer.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskItemComponent } from './tasks/task-item/task-item.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth/auth.component';


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
    CountdownModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [{ provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }],
  bootstrap: [AppComponent]
})
export class AppModule { }
