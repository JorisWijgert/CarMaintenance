import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MaintenanceJob } from './models/maintenance-job';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    DecimalPipe
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
  public selectedDate: Date = new Date();
  public markupWeekend = 100;
  public costOfScheduledMaintenanceJobWithoutTax = 0;
  public costOfScheduledMaintenanceJob = 0;
  public readonly taxPercentage = 21;
  public readonly hourRate = 60;

  private readonly markupIfWeekend = 150;

  constructor(public carService: CarService) {
    this.scheduleMaintenanceJobForm = new FormGroup({
      maintenanceJob: new FormControl(null),
    });

    this.dateTimeForm = new FormGroup({
      date: new FormControl(Date.now()),
      time: new FormControl(Date.now()),
    });
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

  public calculate() {
    if (!this.selectedMaintenanceJob) {
      return;
    }

    this.markupWeekend = 100;
    if(this.selectedDate.getDay() === 6 || this.selectedDate.getDay() === 0) {
      this.markupWeekend = this.markupIfWeekend;
    }
    let sum = 0;

    if (this.selectedMaintenanceJob.spareParts && this.selectedMaintenanceJob.spareParts.length > 0) {
      this.selectedMaintenanceJob.spareParts.forEach((part) => {
        sum += part.cost;
      })
    }

    sum += this.selectedMaintenanceJob?.serviceHours * this.hourRate;

    sum = (sum/100) * this.markupWeekend;

    this.costOfScheduledMaintenanceJobWithoutTax = sum;

    sum = (sum/100) * (this.taxPercentage + 100);

    this.costOfScheduledMaintenanceJob = sum;
  }
}
