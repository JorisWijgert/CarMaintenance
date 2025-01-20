import { Car } from './car';
import { Timeslot } from './timeslot';

export class ScheduledMaintenanceJob {
  constructor(public timeslot: Timeslot, public cars: Car[]) {}
}
