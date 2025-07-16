import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinClientComponent } from './linkedin-client.component';

describe('LinkedinClientComponent', () => {
  let component: LinkedinClientComponent;
  let fixture: ComponentFixture<LinkedinClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkedinClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
