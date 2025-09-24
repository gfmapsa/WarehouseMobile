import { ModelScan } from "../dtos/warehouse";
import { AddModelData } from "../hooks/useAddModel";

export interface IModelsRepository {
  getPartNumbers(): Promise<string[]>;
  addModel(model: AddModelData): Promise<void>;
  getModel(mda: string): Promise<ModelScan>;
  getSubgroups(mda: string): Promise<string[]>;
}
