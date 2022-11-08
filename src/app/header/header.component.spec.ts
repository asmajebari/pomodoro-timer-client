import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj<AuthService>(['updateUser', 'logout', 'deleteUser'])
    await TestBed.configureTestingModule({
      providers: [HeaderComponent,
      {provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();
    component = TestBed.inject(HeaderComponent);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
