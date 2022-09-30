import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Output() cancel: EventEmitter<Boolean> = new EventEmitter();
  @Input() editMode = false;
  @Input() task: Task = new Task("", false, 0, "");
  estimatedPomodoros: number = 0;
  taskForm: FormGroup = {} as FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.estimatedPomodoros = this.task.estimated;
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
    this.task = this.taskForm.value;
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
