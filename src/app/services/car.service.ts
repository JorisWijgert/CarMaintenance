import { map, mergeMap, Observable, of } from 'rxjs';
import { Brand } from '../models/brand';
import { MockObjects } from '../models/mock-objects';
import { CarModel } from '../models/car-model';
import { MaintenanceJob } from '../models/maintenance-job';
import { SparePart } from '../models/spare-part';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  public get brands(): Observable<Brand[]> {
    return of(MockObjects.brands);
  }

  public get carModels(): Observable<CarModel[]> {
    return of(MockObjects.carModels);
  }

  public get maintenanceJobs(): Observable<MaintenanceJob[]> {
    return this.updateSparePartPrices().pipe(
      mergeMap(() => {
        return of(MockObjects.maintenanceJobs);
      })
    );
  }

  public get spareParts(): Observable<SparePart[]> {
    return of(MockObjects.spareParts);
  }

  public updateSparePartPrices(): Observable<void> {
    return of(MockObjects.spareParts).pipe(
      map((parts) => {
        parts.forEach(
          (part) => (part.cost = Math.floor(Math.random() * (250 - 40) + 40))
        );
      })
    );
  }
}
