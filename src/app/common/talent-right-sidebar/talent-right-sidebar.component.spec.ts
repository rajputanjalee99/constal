import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentRightSidebarComponent } from './talent-right-sidebar.component';

describe('TalentRightSidebarComponent', () => {
  let component: TalentRightSidebarComponent;
  let fixture: ComponentFixture<TalentRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentRightSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
