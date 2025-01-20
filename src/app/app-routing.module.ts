import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupScheduledMaintenanceJobComponent } from './setup-scheduled-maintenance-job/setup-scheduled-maintenance-job.component';

const routes: Routes = [{
  path: '**', component: SetupScheduledMaintenanceJobComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
