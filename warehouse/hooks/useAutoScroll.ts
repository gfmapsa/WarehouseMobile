import { useState } from "react";
import { WarehouseSearchProps } from "../components/WarehouseLayout";
import { SearchService } from "../models/AutocompleteSearch/SearchService";
import { Model, ModelUbicationEnum } from "../models/Model";
import { ProductSearch } from "../models/ProductSearch";

export type SearchOption = "model" | "product";

const searcher = new SearchService();

export default function useAutoScroll(
  { cells, itemsRef, onSelect }: WarehouseSearchProps,
  option: SearchOption
) {
  const [value, setValue] = useState<string | undefined>();

  function handleSelect(selected: Model | ProductSearch | null) {
    if (!selected || selected.ubication !== ModelUbicationEnum.Deposito) return;

    const { cell, id } = searcher.search(selected, cells, option);

    setValue(id);

    if (cell && onSelect) {
      onSelect(cell.id.toString());
    }
  }

  return { handleSelect, value, setValue };
}
