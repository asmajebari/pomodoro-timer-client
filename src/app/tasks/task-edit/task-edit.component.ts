import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Task } from '../task.interface';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Output() cancel: EventEmitter<Boolean> = new EventEmitter();
  @Input() editMode = false;
  @Input() task: Task = {} as Task;
  estimatedPomodoros: number = 0;
  taskForm: FormGroup = {} as FormGroup;
  
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.task.estimated) {      
      this.estimatedPomodoros = this.task.estimated;
    } else {
      this.estimatedPomodoros = 1;
    }
  }

  private initForm() {
    let taskName = "";
    let done = 0;
    let estimated = 0;

    if (this.editMode) {
      taskName = this.task.name;
      done = this.task.done;
      estimated = this.task.estimated;
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'done': new FormControl(done, Validators.required),
      'estimated': new FormControl(estimated, Validators.required),
    })

  }

  onCancelEdit() {
    this.cancel.emit(true);
  }

  onSubmit() {
    if (this.editMode) {
      this.tasksService.updateTask(this.task.id, { ...this.taskForm.value}).pipe(
        tap(()=> this.tasksService.tasksChanged.next(true)))
      .subscribe();
    } else {
      this.tasksService.addTask({...this.taskForm.value, completed:false}).pipe(
        tap(()=> this.tasksService.tasksChanged.next(true)))
      .subscribe();
    }
    this.cancel.emit(true);
  }

  onDelete() {
    this.tasksService.deleteTask(this.task.id).pipe(
      tap(()=> this.tasksService.tasksChanged.next(true)))
    .subscribe();
    this.cancel.emit(true);
  }

  increment() {
    this.estimatedPomodoros++;
  }

  decrement() {
    if (this.estimatedPomodoros > 0) {
      this.estimatedPomodoros--;
    }
  }


}
