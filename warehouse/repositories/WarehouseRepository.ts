import { supabase } from "@/lib/supabaseClient";
import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { getErrorMessage } from "@/shared/utils/functions";
import {
    MODEL_MDA_COLUMN,
    MODEL_UBICATION_COLUMN,
    MODEL_WAREHOUSE_ID,
    MODELS_TABLE,
    PRODUCT_X_MODEL_TABLE,
    WAREHOUSE_CELL_TABLE,
} from "../constants/backend";
import {
    IWarehouseRepository,
    WarehouseResponse,
} from "../interfaces/IWarehouseRepository";
import { Model, ModelUbicationEnum } from "../models/Model";
import { ProductSearch } from "../models/ProductSearch";
import { WarehouseCell, WarehouseSectionEnum } from "../models/WarehouseCell";

type DbProduct = {
  product: string;
  mda: {
    mda: string;
    ubication: number;
  };
};

export class WarehouseRepository implements IWarehouseRepository {
  async getWarehouse(): Promise<WarehouseResponse> {
    try {
      const { data, error } = await supabase.from(WAREHOUSE_CELL_TABLE).select(`
        id,
        warehouse_section,
        row,
        column,
        models:model (
          mda,
          description,
          modules,
          products:productxmodel (
            product
          )
        )
      `);

      if (error) throw new Error(BACKEND_ERROR_MESSAGE);

      const cells = data.map((cell) => {
        const models = cell.models.map((cellModel) => {
          const products = cellModel.products.map(
            (prod) => prod.product as string
          );

          return new Model(
            cellModel.mda,
            ModelUbicationEnum.Deposito,
            products,
            cellModel.description,
            cellModel.modules
          );
        });

        const section = cell.warehouse_section as WarehouseSectionEnum;

        return new WarehouseCell(
          cell.id,
          section,
          models,
          cell.row,
          cell.column
        );
      });

      const standCells = cells.filter(
        (cell) => cell.section === WarehouseSectionEnum.Estantes
      );

      const lateralCells = cells.filter(
        (cell) => cell.section === WarehouseSectionEnum.Lateral
      );

      const response: WarehouseResponse = {
        standCells,
        lateralCells,
        cells,
      };

      return response;
    } catch {
      throw new Error(BACKEND_ERROR_MESSAGE);
    }
  }

  async getModelsOutliers(searchTerm: string): Promise<Model[]> {
    try {
      const { data, error } = await supabase
        .from(MODELS_TABLE)
        .select("*")
        .ilike(MODEL_MDA_COLUMN, `%${searchTerm}%`)
        .or(
          `${MODEL_UBICATION_COLUMN}.neq.${MODEL_WAREHOUSE_ID}, ${MODEL_UBICATION_COLUMN}.is.null`
        );

      if (error) throw new Error(BACKEND_ERROR_MESSAGE);

      return data.map(
        (model) =>
          new Model(
            model.mda,
            ModelUbicationEnum[
              model.ubication as keyof typeof ModelUbicationEnum
            ],
            [],
            model.description,
            undefined
          )
      );
    } catch {
      throw new Error(BACKEND_ERROR_MESSAGE);
    }
  }

  async getProductsOutliers(searchTerm: string): Promise<ProductSearch[]> {
    try {
      const { data, error } = await supabase
        .from(PRODUCT_X_MODEL_TABLE)
        .select("product, mda!inner(mda, ubication)")
        .ilike("product", `%${searchTerm}%`);

      if (error) throw new Error(BACKEND_ERROR_MESSAGE);

      const typedData = data as unknown as DbProduct[];

      return typedData
        .filter((row) => row.mda.ubication !== MODEL_WAREHOUSE_ID)
        .map((row) => {
          return new ProductSearch(
            `${row.product} ${row.mda.mda}`,
            row.product,
            ModelUbicationEnum[
              row.mda.ubication as unknown as keyof typeof ModelUbicationEnum
            ]
          );
        });
    } catch {
      throw new Error(BACKEND_ERROR_MESSAGE);
    }
  }

  async registerModel(mda: string, ubication: string): Promise<void> {
    try {
      const { error, data } = await supabase
        .from(MODELS_TABLE)
        .update({ ubication: MODEL_WAREHOUSE_ID, warehouse_cell: ubication })
        .eq(MODEL_MDA_COLUMN, mda)
        .select("*");

      if (error) {
        if (error.message.includes("Failed to fetch")) {
          throw new Error(
            "Error de conexión. Por favor, intente de nuevo más tarde"
          );
        }
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      if (!data || data.length === 0) {
        throw new Error(`El código MDA: ${mda} no se encuentra registrado`);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }

  async removeModel(mda: string): Promise<void> {
    try {
      const { error, data } = await supabase
        .from(MODELS_TABLE)
        .update({ ubication: null, warehouse_cell: null })
        .eq(MODEL_MDA_COLUMN, mda)
        .select("*");

      if (error) {
        if (error.message.includes("Failed to fetch")) {
          throw new Error(
            "Error de conexión. Por favor, intente de nuevo más tarde"
          );
        }
        throw new Error(BACKEND_ERROR_MESSAGE);
      }

      if (!data || data.length === 0) {
        throw new Error(`El código MDA: ${mda} no se encuentra registrado`);
      }
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }
}
