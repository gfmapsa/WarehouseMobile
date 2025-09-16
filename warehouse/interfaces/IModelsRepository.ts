// import { AddModelData } from "@/hooks/useAddModel";
import { ModelScan } from "../dtos/warehouse";

export interface IModelsRepository {
  getPartNumbers(): Promise<string[]>;
  //addModel(model: AddModelData): Promise<void>;
  getModel(mda: string): Promise<ModelScan>;
}
