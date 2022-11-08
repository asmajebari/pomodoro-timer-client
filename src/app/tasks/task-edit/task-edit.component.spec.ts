import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksService } from '../tasks.service';

import { TaskEditComponent } from './task-edit.component';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  
  beforeEach(async () => {
    const tasksServiceSpy = jasmine.createSpyObj<TasksService>(['updateTask', 'addTask', 'deleteTask'])
    await TestBed.configureTestingModule({
      providers: [TaskEditComponent,
      {provide: TasksService, useValue: tasksServiceSpy}]
    })
    .compileComponents();

    component = TestBed.inject(TaskEditComponent);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
