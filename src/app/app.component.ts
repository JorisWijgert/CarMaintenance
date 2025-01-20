import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceJob } from './models/maintenance-job';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'CarMaintenance';
  public maintenanceJobs: MaintenanceJob[] = [];
  public scheduleMaintenanceJobForm: FormGroup;

  constructor(public carService: CarService) {
    this.scheduleMaintenanceJobForm = new FormGroup({
      maintenanceJob: new FormControl(null),
    });
  }

  public ngOnInit(): void {
    this.carService.maintenanceJobs.subscribe((jobs) => {
      this.maintenanceJobs = jobs;
    });
  }
}
