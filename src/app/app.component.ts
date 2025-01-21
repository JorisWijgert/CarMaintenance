import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceJob } from './models/maintenance-job';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public title = 'CarMaintenance';
  public maintenanceJobs: MaintenanceJob[] = [];
  public scheduleMaintenanceJobForm: FormGroup;
  public dateTimeForm: FormGroup;
  public selectedMaintenanceJob?: MaintenanceJob;

  constructor(public carService: CarService) {
    this.scheduleMaintenanceJobForm = new FormGroup({
      maintenanceJob: new FormControl(null),
    });

    this.dateTimeForm = new FormGroup({
      date: new FormControl(null),
      time: new FormControl(null),
    })
  }

  public ngOnInit(): void {
    this.carService.maintenanceJobs.subscribe((jobs) => {
      this.maintenanceJobs = jobs;
    });
  }

  public jobChange() {
    const formValue = this.scheduleMaintenanceJobForm.value.maintenanceJob;
    this.selectedMaintenanceJob = this.maintenanceJobs.find(
      (job) => job.id === formValue
    );
  }
}
