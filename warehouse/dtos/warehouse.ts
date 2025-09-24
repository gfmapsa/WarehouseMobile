import { WarehouseCell } from "../models/WarehouseCell";

export type WarehouseResponse = {
  standCells: WarehouseCell[];
  lateralCells: WarehouseCell[];
  cells: WarehouseCell[];
};

export type ModelScan = {
  mda: string;
  modules: number;
  cell: number | null;
};
