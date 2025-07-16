import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSectorsComponent } from './choose-sectors.component';

describe('ChooseSectorsComponent', () => {
  let component: ChooseSectorsComponent;
  let fixture: ComponentFixture<ChooseSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
