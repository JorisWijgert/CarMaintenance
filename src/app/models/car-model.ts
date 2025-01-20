import { Brand } from './brand';

export class CarModel {
  constructor(
    public id: number,
    public modelName: string,
    public year: number,
    public brand: Brand
  ) {}
}
