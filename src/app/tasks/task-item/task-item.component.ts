import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task = new Task("", false, 0, "");
  @Input() index: number = 0;
  editMode = false;
  isSelected = false;
  isCompleted = false;
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.taskSelected
      .subscribe(index => {
        if (index != this.index) {
          this.isSelected = false;
        }
      });
  }


  onSelect() {
    
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.tasksService.onSelectedTask(this.index);
    } else {
      this.tasksService.onSelectedTask(-1);
   }
  }

  onTicked(event: any) {
    this.isCompleted = !this.isCompleted;
    this.task.completed = this.isCompleted;
    event.stopPropagation();
  }

  editTask() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

}
