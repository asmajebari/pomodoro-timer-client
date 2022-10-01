import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from './task.interface';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  taskIndex: number = 0;
  editMode = true;
  subscription: Subscription = {} as Subscription;
  selectedTaskName: string = 'Choose a task to work on!';
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadTasks();
    this.subscription = this.tasksService.tasksChanged.subscribe(() => {
      this.loadTasks();
    })
    this.tasksService.taskSelected.subscribe((index) => {
      if (index >= 0) {
        this.selectedTaskName = this.tasks[index].name;
      } else {
        this.selectedTaskName = 'Choose a task to work on!';
      }
    });
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  selectedTask(index: number) {
    this.taskIndex = index;
  }

  onAddTask() {
    this.editMode = false;
    
  }

  CancelEdit() {
    this.editMode = true;
  }

}
