import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLeftSidebarComponent } from './client-left-sidebar.component';

describe('ClientLeftSidebarComponent', () => {
  let component: ClientLeftSidebarComponent;
  let fixture: ComponentFixture<ClientLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLeftSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
