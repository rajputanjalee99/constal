import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentDbHeaderComponent } from './talent-db-header.component';

describe('TalentDbHeaderComponent', () => {
  let component: TalentDbHeaderComponent;
  let fixture: ComponentFixture<TalentDbHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentDbHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentDbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
