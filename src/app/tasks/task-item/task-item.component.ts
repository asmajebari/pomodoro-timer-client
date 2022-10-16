import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { TimerService } from 'src/app/timer/timer.service';
import { Task } from '../task.interface';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit, OnDestroy {
  @Input() task: Task = {} as Task;
  @Input() index: number = 0;
  subscription: Subscription = {} as Subscription;
  editMode = false;
  isSelected = false;
  isCompleted = false;
  constructor(private tasksService: TasksService, private timerService: TimerService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //check if task was previously selected before tasks were after an update
    if (this.tasksService.getSelectedTask() === this.index) {
      this.isSelected = true;
    }
    //check if the task selected corresponds to this exact task
    this.tasksService.taskSelected
      .subscribe(index => {
        if (index != this.index) {
          this.isSelected = false;
        }
      });
    this.isCompleted = this.task.completed;
    //increment done pomodoros after pomodoro timer is off
    this.subscription = this.timerService.timerDone.subscribe(() => {
      if (this.isSelected) {
        this.task.done++;
        this.updateTask();
      }
    });
  }


  //when a task is selected, it sends the id to the service to emit it to all other task-item components
  onSelect() {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.tasksService.onSelectedTask(this.index);
    } else {
      this.tasksService.onSelectedTask(-1);
   }
  }
  //when the complete button is clicked
  onTicked(event: any) {
    this.isCompleted = !this.isCompleted;
    this.task.completed = this.isCompleted;
    this.updateTask();
    event.stopPropagation();
  }

  updateTask() {
    let update = {
      name: this.task.name,
      completed: this.isCompleted,
      done: this.task.done,
      estimated: this.task.estimated
    };
    this.tasksService.updateTask(this.task._id!, { ...update}  ).pipe(
      tap(()=> this.tasksService.tasksChanged.next(true)))
    .subscribe();
  }

  editTask() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

}
