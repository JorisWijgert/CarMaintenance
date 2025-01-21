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
  /**
   * get the car brands
   */
  public get brands(): Observable<Brand[]> {
    return of(MockObjects.brands);
  }

  /**
   * get the car models
   */
  public get carModels(): Observable<CarModel[]> {
    return of(MockObjects.carModels);
  }

  /**
   * update the sparepart prices and get the maintenance jobs with the updated sparepart prices
   */
  public get maintenanceJobs(): Observable<MaintenanceJob[]> {
    return this.updateSparePartPrices().pipe(
      mergeMap(() => {
        return of(MockObjects.maintenanceJobs);
      })
    );
  }

  /**
   * update the sparepart prices and get the updated spareparts
   */
  public get spareParts(): Observable<SparePart[]> {
    return this.updateSparePartPrices().pipe(
      mergeMap(() => {
        return of(MockObjects.spareParts);
      })
    );
  }

  /**
   * update the sparepart prices with random prices, as a mock for an external service
   * @returns void
   */
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
