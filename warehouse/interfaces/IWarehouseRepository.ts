import { Model } from "../models/Model";
import { ProductSearch } from "../models/ProductSearch";
import { WarehouseCell } from "../models/WarehouseCell";

export type WarehouseResponse = {
  standCells: WarehouseCell[];
  lateralCells: WarehouseCell[];
  cells: WarehouseCell[];
};

export type WarehouseContainerResponse = {
  cells: WarehouseCell[]
}

export interface IWarehouseRepository {
  getWarehouse(): Promise<WarehouseResponse>;
  getContainer(): Promise<WarehouseContainerResponse>
  getModelsOutliers(searchTerm: string): Promise<Model[]>;
  getProductsOutliers(searchTerm: string): Promise<ProductSearch[]>;
  registerModel(mda: string, ubication: string): Promise<void>;
  removeModel(mda: string): Promise<void>;
}
