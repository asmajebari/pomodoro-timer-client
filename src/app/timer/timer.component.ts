import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent = {} as CountdownComponent;
  
  timerOn = false;
  pomodoro = true;
  shortBreak = false;
  longBreak = false;
  pomoTimer = 25;
  shortTimer = 1;
  longTimer = 25;
  message = "";
  counter = 0;
  percentage = '0';
  percentageComplete = 0;
  longBreakInt = 4;
  pomodoroConfig: CountdownConfig = { demand: true, notify:0};
  shortConfig: CountdownConfig = { demand: true, notify:0 };
  longConfig: CountdownConfig = { demand: true, notify:0 };
  
  constructor() { }

  ngOnInit(): void {
    this.onPomodoro();
  }

  onSwitch() {
    this.timerOn = !this.timerOn;
    if (this.timerOn) {
      this.countdown.begin();
    } else {
      this.countdown.pause();
    }
  }

  onPomodoro() {
    this.percentage = '0';
    let timer = this.pomoTimer * 60;
    this.pomodoro = true;
    this.shortBreak = false;
    this.longBreak = false;
    this.pomodoroConfig.leftTime = timer;
    this.timerOn = false;
    this.message ="Time to focus!"
  }

  onShortBreak() {
    this.percentage = '0';
    let timer = this.shortTimer * 60;
    this.pomodoro = false;
    this.shortBreak = true;
    this.longBreak = false;
    this.shortConfig.leftTime = timer;
    this.timerOn = false;
    this.message ="Time for a short break!"
  }

  onLongBreak() {
    this.percentage = '0';
    let timer = this.longTimer * 60;
    this.pomodoro = false;
    this.shortBreak = false;
    this.longBreak = true;
    this.longConfig.leftTime = timer;
    this.timerOn = false;
    this.message ="Time for a long break!"
  }

  notificationCalc(time: number) {
    return time - 5 * 60;
  }

  percentageCompleteCalc(initial: number, left: number) {
    initial = initial * 60000
  
    return Math.round(((initial-left)/initial)*100);
  }
 
  handleShortEvent(e: CountdownEvent) {
    this.percentage = (this.percentageCompleteCalc(this.shortTimer, e.left)).toString();
    if (e.left === 0) {
      this.onPomodoro();
    }
  }

  handleLongEvent(e: CountdownEvent) {
    this.percentage = (this.percentageCompleteCalc(this.shortTimer, e.left)).toString();
    if (e.left === 0) {
      this.onPomodoro();
    }
  }

  handlePomoEvent(e: CountdownEvent) {
    console.log(this.percentage);
    
    //this.percentageComplete = this.percentageComplete+0.5;
    //this.percentage = this.percentageComplete.toString();
    this.percentage = (this.percentageCompleteCalc(this.pomoTimer, e.left)).toString();
    if (e.left === 0) {
      this.counter++;
      if (this.counter % (this.longBreakInt)) {
        this.onShortBreak();
      } else {
        this.onLongBreak();
      }
    }
   
  }
}
