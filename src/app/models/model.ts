import { SparePart } from "./spare-part";

export class Model {
  constructor(public brand: string, public name: string, public spareParts: SparePart[]) {}
}
