import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeDataService {

  @Output() estimatedPomodoros: Subject<{ estimated: number, done:number }> = new Subject();
  @Output() estimatedTime: Subject<number> = new Subject();
  constructor() { }

  
}
