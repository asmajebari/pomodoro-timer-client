import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  @Output() timerDone: Subject<boolean> = new Subject();

  constructor() { }
}
