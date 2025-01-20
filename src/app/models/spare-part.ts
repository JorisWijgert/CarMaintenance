import { Brand } from './brand';
import { CarModel } from './car-model';

export class SparePart {
  constructor(
    public id: number,
    public partName: string,
    public cost: number,
    public brand?: Brand,
    public suitableCarModels?: CarModel[]
  ) {}
}
