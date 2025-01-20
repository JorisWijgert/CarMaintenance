import { Brand } from './brand';
import { CarModel } from './car-model';
import { MaintenanceJob } from './maintenance-job';
import { SparePart } from './spare-part';

export class MockObjects {
  public static brands: Brand[] = [
    {
      id: 0,
      name: 'Ford',
    },
    {
      id: 1,
      name: 'Bosch',
    },
    {
      id: 2,
      name: 'Volkswagen',
    },
  ];

  public static carModels: CarModel[] = [
    {
      id: 0,
      modelName: 'Focus',
      brand: this.brands[0],
      year: 2008,
    },
    {
      id: 1,
      modelName: 'Mondeo',
      brand: this.brands[0],
      year: 2009,
    },
  ];

  public static spareParts: SparePart[] = [
    {
      id: 0,
      partName: 'Ford Focus engine',
      cost: 150,
      brand: this.brands[0],
      suitableCarModels: [this.carModels[0]],
    },
    {
      id: 1,
      partName: 'Bosch windscreen wipers',
      cost: 20,
      brand: this.brands[1],
    },
    {
      id: 2,
      partName: 'Ford brake pedal',
      cost: 50,
      brand: this.brands[0],
      suitableCarModels: [this.carModels[0], this.carModels[1]],
    },
  ];

  public static maintenanceJobs: MaintenanceJob[] = [
    {
      id: 0,
      jobTitle: 'General Ford maintenance',
      jobDescription:
        'This will perform the general maintenance on a Ford car, to keep it in its best condition',
      serviceHours: 3,
      spareParts: [this.spareParts[0], this.spareParts[2]],
    },
    {
      id: 1,
      jobTitle: 'Replace oil',
      jobDescription: 'This will replace the oil in any car',
      serviceHours: 1,
    },
  ];
}
