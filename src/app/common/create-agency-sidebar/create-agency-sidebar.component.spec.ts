import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgencySidebarComponent } from './create-agency-sidebar.component';

describe('CreateAgencySidebarComponent', () => {
  let component: CreateAgencySidebarComponent;
  let fixture: ComponentFixture<CreateAgencySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAgencySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAgencySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
