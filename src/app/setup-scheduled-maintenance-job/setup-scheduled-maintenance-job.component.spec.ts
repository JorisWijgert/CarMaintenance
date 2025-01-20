import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupScheduledMaintenanceJobComponent } from './setup-scheduled-maintenance-job.component';

describe('SetupScheduledMaintenanceJobComponent', () => {
  let component: SetupScheduledMaintenanceJobComponent;
  let fixture: ComponentFixture<SetupScheduledMaintenanceJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupScheduledMaintenanceJobComponent]
    });
    fixture = TestBed.createComponent(SetupScheduledMaintenanceJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
