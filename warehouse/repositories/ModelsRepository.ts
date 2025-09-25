import { supabase } from "@/lib/supabaseClient";
import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { getErrorMessage } from "@/shared/utils/functions";
import {
  MODEL_MDA_COLUMN,
  MODEL_MODULES_COLUMN,
  MODEL_WAREHOUSE_CELL_COLUMN,
  MODELS_TABLE,
  PRODUCT_PRODUCT_COLUMN,
  PRODUCT_X_MODEL_TABLE,
  PRODUCTS_TABLE,
  SUBGROUP_PRINCIPAL_MDA_COLUMN,
  SUBGROUP_SUBGROUP_MDA_COLUMM,
  SUBGROUPS_TABLE,
} from "../constants/backend";
import { ModelScan } from "../dtos/warehouse";
import { AddModelData } from "../hooks/useAddModel";
import { IModelsRepository } from "../interfaces/IModelsRepository";

export class ModelsRepository implements IModelsRepository {
  async getModel(mda: string): Promise<ModelScan> {
    try {
      if (!mda) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      const { data: existing, error: findError } = await supabase
        .from(MODELS_TABLE)
        .select(
          `${MODEL_MDA_COLUMN}, ${MODEL_MODULES_COLUMN}, ${MODEL_WAREHOUSE_CELL_COLUMN}`
        )
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
        cell: existing.warehouse_cell,
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

  async addModel(model: AddModelData): Promise<void> {
    try {
      const { mda, partNumbers } = model;

      if (!mda.toUpperCase().startsWith("MDA")) {
        throw new Error("Ingrese un código válido por favor.");
      }

      const { data: existingModel, error: existingError } = await supabase
        .from(MODELS_TABLE)
        .select(MODEL_MDA_COLUMN)
        .eq(MODEL_MDA_COLUMN, mda)
        .maybeSingle();

      if (existingError) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      if (existingModel) {
        throw new Error(`El modelo con código ${mda} ya existe.`);
      }

      const productsString = partNumbers.join("/");

      const { data: modelData, error: modelError } = await supabase
        .from(MODELS_TABLE)
        .insert([
          { mda, description: `MAQUETA DE ARMADO PN ${productsString}` },
        ])
        .select(MODEL_MDA_COLUMN)
        .single();

      if (modelError || !modelData) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      const { data: products, error: productsError } = await supabase
        .from(PRODUCTS_TABLE)
        .select(PRODUCT_PRODUCT_COLUMN)
        .in(PRODUCT_PRODUCT_COLUMN, partNumbers);

      if (productsError || !products?.length) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      const relations = products.map((p) => ({
        mda,
        product: p[PRODUCT_PRODUCT_COLUMN],
      }));

      const { error: relError } = await supabase
        .from(PRODUCT_X_MODEL_TABLE)
        .insert(relations);

      if (relError) {
        throw new Error(BACKEND_ERROR_MESSAGE);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }

  async getSubgroups(mda: string): Promise<string[]> {
    if (!mda.toUpperCase().startsWith("MDA")) {
      throw new Error("Ingrese un código válido por favor.");
    }

    const { data, error } = await supabase
      .from(SUBGROUPS_TABLE)
      .select(SUBGROUP_SUBGROUP_MDA_COLUMM)
      .eq(SUBGROUP_PRINCIPAL_MDA_COLUMN, mda);

    if (error) throw new Error(BACKEND_ERROR_MESSAGE);

    const mdas = data.map((subgroup) => subgroup.subgroup_mda as string);

    return mdas;
  }

  async addProduct(code: string): Promise<void> {
    const { error } = await supabase
      .from(PRODUCTS_TABLE)
      .insert([{ cod: code.toUpperCase() }]);

    if (error) {
      if (error.code === "23505") {
        throw new Error(`El producto con código ${code} ya existe.`);
      }

      throw new Error(BACKEND_ERROR_MESSAGE);
    }
  }
}
