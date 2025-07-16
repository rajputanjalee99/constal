import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUserEmailComponent } from './signup-user-email.component';

describe('SignupUserEmailComponent', () => {
  let component: SignupUserEmailComponent;
  let fixture: ComponentFixture<SignupUserEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupUserEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupUserEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
