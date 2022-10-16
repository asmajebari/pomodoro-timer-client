import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { Subscription, tap } from 'rxjs';
import { TimeDataService } from '../shared/services/time-data.service';
import { TasksService } from '../tasks/tasks.service';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent = {} as CountdownComponent;
  estimatedPomodoros = 0;
  donePomodoros = 0;
  timerOn = false;
  pomodoro = true;
  shortBreak = false;
  longBreak = false;
  pomoTimer = 25;
  shortTimer = 5;
  longTimer = 15;
  message = "";
  counter = 0;
  percentage = '0';
  longBreakInt = 4;
  subscription: Subscription = {} as Subscription;
  pomodoroConfig: CountdownConfig = { demand: true, notify:0};
  shortConfig: CountdownConfig = { demand: true, notify:0 };
  longConfig: CountdownConfig = { demand: true, notify:0 };
  
  constructor(private timerService: TimerService, private timeDataService: TimeDataService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.onPomodoro();
    this.subscription = this.timeDataService.estimatedPomodoros.pipe(tap((pomodoros)=> {
      this.estimatedPomodoros = pomodoros.estimated;
      this.donePomodoros = pomodoros.done;
      this.calculateEstimatedTime(0);
    })).subscribe();
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
    this.message = "Time to focus!"
    this.calculateEstimatedTime(0);
  }

  onShortBreak() {
 
    
    this.percentage = '0';
    let timer = this.shortTimer * 60;
    this.pomodoro = false;
    this.shortBreak = true;
    this.longBreak = false;
    this.shortConfig.leftTime = timer;
    this.timerOn = false;
    this.message = "Time for a short break!";
    this.calculateEstimatedTime(this.shortTimer);
  }

  onLongBreak() {
    this.percentage = '0';
    let timer = this.longTimer * 60;
    this.pomodoro = false;
    this.shortBreak = false;
    this.longBreak = true;
    this.longConfig.leftTime = timer;
    this.timerOn = false;
    this.message = "Time for a long break!";
    this.calculateEstimatedTime(this.longTimer);
  }

  notificationCalc(time: number) {
    return time - 5 * 60;
  }

  percentageCompleteCalc(initial: number, left: number) {
    initial = initial * 60000;
    return ((initial-left)/initial*100);
  }
 
  handleShortEvent(e: CountdownEvent) {
    this.percentage = (this.percentageCompleteCalc(this.shortTimer, e.left)).toString();
    if (e.left === 0) {
      this.onPomodoro();
    }
  }

  handleLongEvent(e: CountdownEvent) {
    this.percentage = (this.percentageCompleteCalc(this.longTimer, e.left)).toString();
    if (e.left === 0) {
      this.onPomodoro();
    }
  }

  handlePomoEvent(e: CountdownEvent) {
    this.percentage = (this.percentageCompleteCalc(this.pomoTimer, e.left)).toString();
    if (e.left === 0) {
      this.counter++;
      this.timerService.timerDone.next(true);
      if (this.counter % (this.longBreakInt)) {
        this.onShortBreak();
      } else {
        this.onLongBreak();
      }
    }
   
  } 

  calculateEstimatedTime(startingPoint: number) { 
    let timeEstimated = 0;
    if (this.estimatedPomodoros != 0) {
      let breaks = this.estimatedPomodoros - this.donePomodoros - 1;
      let longBreaks = Math.floor(breaks / this.longBreakInt);
      let shortBreaks = breaks - longBreaks;
    

        timeEstimated = this.pomoTimer * (breaks + 1)
        + longBreaks * this.longTimer
        + shortBreaks * this.shortTimer
        + startingPoint;
    }
    //console.log(timeEstimated);
    
    this.timeDataService.estimatedTime.next(timeEstimated);
  }
}
