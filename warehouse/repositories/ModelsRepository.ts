import { supabase } from "@/lib/supabaseClient";
import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { getErrorMessage } from "@/shared/utils/functions";
import {
    MODEL_MDA_COLUMN,
    MODEL_MODULES_COLUMN,
    MODELS_TABLE,
    PRODUCT_PRODUCT_COLUMN,
    PRODUCTS_TABLE,
} from "../constants/backend";
import { ModelScan } from "../dtos/warehouse";
import { IModelsRepository } from "../interfaces/IModelsRepository";

export class ModelsRepository implements IModelsRepository {
  async getModel(mda: string): Promise<ModelScan> {
    try {
      if (!mda) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      const { data: existing, error: findError } = await supabase
        .from(MODELS_TABLE)
        .select(`${MODEL_MDA_COLUMN}, ${MODEL_MODULES_COLUMN}`)
        .eq(MODEL_MDA_COLUMN, mda)
        .maybeSingle();

      if (findError) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      if (!existing) {
        throw new Error(`El código MDA: ${mda} no se encuentra registrado`);
      }

      const response: ModelScan = {
        mda: existing.mda,
        modules: existing.modules,
      };

      return response;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }

  async getPartNumbers(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from(PRODUCTS_TABLE)
        .select(PRODUCT_PRODUCT_COLUMN);

      if (error) throw new Error(BACKEND_ERROR_MESSAGE);

      const products = data.map((product) => product.cod as string);

      return products;
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }
}
