import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { TimeDataService } from '../shared/services/time-data.service';

import { Task } from './task.interface';

import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

fdescribe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
 
  beforeEach(async () => {
    const TASKS = [{
      "name": "Task1",
      "done": 4,
      "estimated": 4,
      "completed": false,
    }];
    const tasksServiceSpy = jasmine.createSpyObj<TasksService>(['getAllTasks', 'tasksChanged', 'taskSelected']);
    const timeDataServiceSpy = jasmine.createSpyObj<TimeDataService>(['estimatedTime']);
    const emitter = new EventEmitter();
    tasksServiceSpy.taskSelected = emitter;
    emitter.emit(1);

    const subject = new Subject<number>();
    timeDataServiceSpy.estimatedTime = subject;
    emitter.emit(0);

    tasksServiceSpy.getAllTasks.and.returnValue(of(TASKS));

    await TestBed.configureTestingModule({
      providers: [TasksComponent,
        {
          provide: TasksService, useValue: tasksServiceSpy,
        },
      { provide: TimeDataService, useValue: timeDataServiceSpy }]
    })
    .compileComponents();

    component = TestBed.inject(TasksComponent);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
