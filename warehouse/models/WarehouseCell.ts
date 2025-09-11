import { Model } from "./Model";

export enum WarehouseSectionEnum {
  Estantes = 1,
  Lateral = 2,
}

export class WarehouseCell {
  id: number;
  section: WarehouseSectionEnum;
  models: Model[];
  row: number;
  column: number;

  constructor(
    id: number,
    section: WarehouseSectionEnum,
    models: Model[],
    row: number,
    column: number
  ) {
    this.id = id;
    this.section = section;
    this.models = models;
    this.row = row;
    this.column = column;
  }
}
