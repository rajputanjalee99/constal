import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDisciplineComponent } from './choose-discipline.component';

describe('ChooseDisciplineComponent', () => {
  let component: ChooseDisciplineComponent;
  let fixture: ComponentFixture<ChooseDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
