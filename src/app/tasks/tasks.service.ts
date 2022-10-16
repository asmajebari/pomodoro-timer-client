import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from './task.interface';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  model = "tasks"

  constructor(private http: HttpClient) { }
  private selectedtask: number = -1;
  @Output() taskSelected: EventEmitter<number> = new EventEmitter();
  @Output() tasksChanged: Subject<boolean> = new Subject();
 
  //save selected task id to not lose it after refreshing tasks

  getSelectedTask() {
    return this.selectedtask;
  }

  onSelectedTask(index: number) {
    this.taskSelected.emit(index);
    this.selectedtask=index;
  }

  getAllTasks() {
    return this.http.get<Task[]>(this.getUrl());
  }
  
  addTask(task:Task) {
    return this.http.post<Task>(this.getUrl(), task);
  }

  updateTask(id: string, task: Task) {
    return this.http.patch<Task>(this.getUrlWithID(id), task);
  }

  deleteTask(id: string) {
    return this.http.delete(this.getUrlWithID(id));
  }

  deleteCompletedTasks() {
    return this.http.delete(this.getUrl());
  }

  
  private getUrl(){
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlWithID(id: string) {
    return `${this.getUrl()}/${id}`;
  }

}
