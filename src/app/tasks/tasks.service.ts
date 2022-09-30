import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  @Output() taskSelected: EventEmitter<any> = new EventEmitter();

  onSelectedTask(index: number) {
    this.taskSelected.emit(index);
  }
}
