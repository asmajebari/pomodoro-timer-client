import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { TimerService } from 'src/app/timer/timer.service';
import { TasksService } from '../tasks.service';

import { TaskItemComponent } from './task-item.component';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;

  beforeEach(async () => {
    const tasksServiceSpy = jasmine.createSpyObj<TasksService>(['updateTask', 'onSelectedTask', 'getSelectedTask', 'tasksChanged', 'taskSelected']);
    const timerServiceSpy = jasmine.createSpyObj<TimerService>(['timerDone']);
    const emitter = new EventEmitter();
    tasksServiceSpy.taskSelected = emitter;
    emitter.emit(1);

    const subject = new Subject<boolean>();
    timerServiceSpy.timerDone = subject;
    emitter.emit(true);

    await TestBed.configureTestingModule({
      providers: [TaskItemComponent,
        {
          provide: TasksService, useValue: tasksServiceSpy,
        },
      { provide: TimerService, useValue: timerServiceSpy }]
    })
    .compileComponents();

    component = TestBed.inject(TaskItemComponent);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
