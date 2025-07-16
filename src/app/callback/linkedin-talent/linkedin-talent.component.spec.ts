import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinTalentComponent } from './linkedin-talent.component';

describe('LinkedinTalentComponent', () => {
  let component: LinkedinTalentComponent;
  let fixture: ComponentFixture<LinkedinTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedinTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
