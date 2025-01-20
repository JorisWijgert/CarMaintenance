import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetupScheduledMaintenanceJobComponent } from './setup-scheduled-maintenance-job/setup-scheduled-maintenance-job.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupScheduledMaintenanceJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
