import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupTalentComponent } from './signup-talent.component';

describe('SignupTalentComponent', () => {
  let component: SignupTalentComponent;
  let fixture: ComponentFixture<SignupTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
