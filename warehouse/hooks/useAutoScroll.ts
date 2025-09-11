import { useState } from "react";
import { WarehouseSearchProps } from "../components/WarehouseLayout";
import { Model, ModelUbicationEnum } from "../models/Model";
import { ProductSearch } from "../models/ProductSearch";
import { WarehouseCell } from "../models/WarehouseCell";

export default function useAutoScroll(
  { cells, itemsRef, onSelect }: WarehouseSearchProps,
  option: "model" | "product"
) {
  const [value, setValue] = useState<string | undefined>();

  function handleSelect(selected: Model | ProductSearch | null) {
    console.log("que onda pa");
    
    if (!selected || selected.ubication !== ModelUbicationEnum.Deposito) return;

    let cell: WarehouseCell | undefined;
    if (option === "model") {
      const val = selected as Model;
      cell = cells.find((cell) =>
        cell.models.find((model) => model.mda === val.mda)
      );
      setValue(val.mda);
    } else {
      const val = selected as ProductSearch;
      cell = cells.find((cell) =>
        cell.models.find((model) =>
          model.products.find((product) => `${product} ${model.mda}` === val.id)
        )
      );
      setValue(val.cod);
    }

    if (cell && onSelect) {
      onSelect(cell.id.toString());
    }
  }

  return { handleSelect, value, setValue };
}
