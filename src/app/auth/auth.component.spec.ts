import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj<AuthService>(['googleAuth', 'register', 'login'])
    await TestBed.configureTestingModule({
      providers: [AuthComponent,
      {provide: AuthService, useValue: authServiceSpy }]
    })
    .compileComponents();
    component = TestBed.inject(AuthComponent);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
