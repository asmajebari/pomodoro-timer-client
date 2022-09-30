import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskIndex: number = 0;
  editMode = true;
  selectedTaskName: string = 'Choose a task to work on!';
  tasks: Task[] = [new Task("Test1", false, 4), new Task("Test2", false, 2), new Task("Test3", true, 3)];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.taskSelected.subscribe((index) => {
      if (index >= 0) {
        this.selectedTaskName = this.tasks[index].name;
      } else {
        this.selectedTaskName = 'Choose a task to work on!';
      }
    });
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
