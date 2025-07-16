import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPostJobsComponent } from './client-post-jobs.component';

describe('ClientPostJobsComponent', () => {
  let component: ClientPostJobsComponent;
  let fixture: ComponentFixture<ClientPostJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPostJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPostJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
