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
import { SparePart } from './models/spare-part';
import { forkJoin } from 'rxjs';

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
  public selectedMaintenanceJob?: MaintenanceJob;
  public selectedDate: Date = new Date();
  public markupWeekend = 100;
  public costOfScheduledMaintenanceJobWithoutTax = 0;
  public costOfScheduledMaintenanceJob = 0;

  public readonly taxPercentage = 21;
  public readonly hourRate = 60;

  private readonly markupIfWeekend = 150;

  /**
   * Sets up the formGroup and the car service
   * @param carService is a service that communicates with a source
   */
  constructor(public carService: CarService) {
    this.scheduleMaintenanceJobForm = new FormGroup({
      maintenanceJob: new FormControl(null),
    });
  }

  /**
   * Retrieves the maintenance jobs from the carService, to display in the dropdown
   */
  public ngOnInit(): void {
    this.carService.maintenanceJobs.subscribe((jobs) => {
      this.maintenanceJobs = jobs;
    });
  }

  /**
   * When a job is selected in the dropdown, the selected job will change, so it can display the details
   */
  public jobChange(): void {
    const formValue = this.scheduleMaintenanceJobForm.value.maintenanceJob;
    this.selectedMaintenanceJob = this.maintenanceJobs.find(
      (job) => job.id === formValue
    );
  }

  /**
   * Calculates the cost of executing the maintenance job on the selected day and time
   * @returns void
   */
  public calculate(): void {
    // early exit when no job is selected
    if (!this.selectedMaintenanceJob) {
      return;
    }

    let sum = 0;

    // determine if a markup for the weekend is applicable
    this.markupWeekend = 100;
    if(this.selectedDate.getDay() === 6 || this.selectedDate.getDay() === 0) {
      this.markupWeekend = this.markupIfWeekend;
    }

    // add the cost of each spare part (if present) and add it to the sum
    if (this.selectedMaintenanceJob.spareParts && this.selectedMaintenanceJob.spareParts.length > 0) {
      this.selectedMaintenanceJob.spareParts.forEach((part) => {
        sum += part.cost;
      })
    }

    // add the servicehours (times the hour rate) to the sum
    sum += this.selectedMaintenanceJob?.serviceHours * this.hourRate;

    // apply the weekend markup
    sum = (sum/100) * this.markupWeekend;

    // calculate the VAT
    this.costOfScheduledMaintenanceJobWithoutTax = sum;
    sum = (sum/100) * (this.taxPercentage + 100);
    this.costOfScheduledMaintenanceJob = sum;
  }
}
