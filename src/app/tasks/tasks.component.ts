import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { createPopper } from '@popperjs/core';
import { Observable, Subscription, tap } from 'rxjs';
import { TimeDataService } from '../shared/services/time-data.service';
import { Task } from './task.interface';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnDestroy {

  totalEstimated = 0;
  totalDone = 0;
  estimatedTime = 0;
  finishTime = '';
  taskIndex: number = 0;
  editMode = true;
  subscription: Subscription = {} as Subscription;
  selectedTaskName: string = 'Choose a task to work on!';
  tasks: Task[] = [];

  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: ElementRef =
    {} as ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: ElementRef = {} as ElementRef;

  constructor(
    private tasksService: TasksService,
    private timeDataService: TimeDataService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadTasks();
    this.subscription = this.tasksService.tasksChanged.subscribe(() => {
      this.loadTasks();
    });
    this.tasksService.taskSelected.subscribe((index) => {
      if (index >= 0) {
        this.selectedTaskName = this.tasks[index].name;
      } else {
        this.selectedTaskName = 'Choose a task to work on!';
      }
    });
    this.subscription = this.timeDataService.estimatedTime.subscribe((time) => {
      this.estimatedTime = time;
      this.calculateFinishTime();
    });
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.calculatePomodoros();
      this.calculateFinishTime();
    });
  }

  selectedTask(index: number) {
    this.taskIndex = index;
  }

  onAddTask() {
    this.editMode = false;
  }

  onDeleteAllTasks() {

    const tasksIdsArray = this.tasks.map((task) => task._id);

    tasksIdsArray.forEach((id) =>
      this.tasksService
        .deleteTask(id!)
        .pipe(tap(() => this.tasksService.tasksChanged.next(true)))
        .subscribe()
    );

    this.dropdownPopoverShow = false;
  }

  onClearDone() {
    this.totalDone = 0;
    this.dropdownPopoverShow = false;
    this.emitPomodoros();
  }

  onClearFinished() {
    this.tasksService.deleteCompletedTasks()
      .subscribe();
    this.tasksService.tasksChanged.next(true);
      this.dropdownPopoverShow = false;
  }

  CancelEdit() {
    this.editMode = true;
  }

  calculatePomodoros() {
    this.totalDone = 0;
    this.totalEstimated = 0;
    for (let task of this.tasks) {
      this.totalDone = this.totalDone + task.done;
      this.totalEstimated = this.totalEstimated + task.estimated;
    }
    this.emitPomodoros();
  }

  emitPomodoros() {
    let totalObject = { estimated: this.totalEstimated, done: this.totalDone };
    this.timeDataService.estimatedPomodoros.next(totalObject);
  }

  addZero(i: any) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  calculateFinishTime() {
    let start = new Date();
    let finish = new Date();
    let estimatedTime = this.estimatedTime * 60000; //estimated time: calculated in timer and sent to tasks
    let finishedTime = start.getTime() + estimatedTime;
    finish.setTime(finishedTime);
    let finishHour = this.addZero(finish.getHours());
    let finishMinutes = this.addZero(finish.getMinutes());
    if (finishMinutes < 10) {
      finishMinutes = finishMinutes;
    }
    this.finishTime = finishHour.toString() + ':' + finishMinutes.toString();
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-end',
      }
    );
  }
  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}
