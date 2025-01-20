import { SparePart } from './spare-part';

export class MaintenanceJob {
  constructor(
    public id: number,
    public jobTitle: string,
    public jobDescription: string,
    public serviceHours: number,
    public spareParts?: SparePart[]
  ) {}
}
