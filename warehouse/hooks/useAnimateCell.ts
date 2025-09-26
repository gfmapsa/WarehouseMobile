import { Colors } from "@/shared/constants/colors";
import { RefObject } from "react";
import { Model, ModelUbicationEnum } from "../models/Model";
import { ProductSearch } from "../models/ProductSearch";
import { WarehouseCell } from "../models/WarehouseCell";

export default function useAnimateCell(
  cells: WarehouseCell[],
  option: "model" | "product",
  itemsRef: RefObject<{
    [key: string]: HTMLLIElement | null;
  }>
) {
  function handleChange(_: unknown, value: Model | ProductSearch | null) {
    if (!value || value.ubication !== ModelUbicationEnum.Deposito) return;

    let cell: WarehouseCell | undefined;
    if (option === "model") {
      const val = value as Model;
      cell = cells.find((cell) =>
        cell.models.find((model) => model.mda === val.mda)
      );
    } else {
      const val = value as ProductSearch;
      cell = cells.find((cell) =>
        cell.models.find((model) =>
          model.products.find((product) => `${product} ${model.mda}` === val.id)
        )
      );
    }

    if (!cell) return;

    const cellElement = itemsRef.current[cell?.id];

    cellElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    cellElement?.animate(
      [
        { scale: 1, backgroundColor: "white" },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1.2, backgroundColor: Colors.successVariant },
        { scale: 1, backgroundColor: "white" },
      ],
      {
        duration: 3000,
        easing: "ease-out",
      }
    );
  }

  return { handleChange };
}
