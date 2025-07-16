import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentBudgetComponent } from './talent-budget.component';

describe('TalentBudgetComponent', () => {
  let component: TalentBudgetComponent;
  let fixture: ComponentFixture<TalentBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
