//import useAnimateCell from "@/hooks/useAnimateCell";
import Autocomplete from "@/shared/components/input/Autocomplete";
import React, { useState } from "react";
import useSearchProduct from "../hooks/useSearchProduct";
import { WarehouseSectionProps } from "./WarehouseLayout";
import WarehouseSearchOption from "./WarehouseSearchOption";

export default function WarehouseProductsAutocomplete({
  cells,
  itemsRef,
}: WarehouseSectionProps) {
  const { filteredProducts, handleSearch, isLoading } = useSearchProduct(cells);
  //const { handleChange } = useAnimateCell(cells, "product", itemsRef);

  const [value, setValue] = useState("");

  return (
    <Autocomplete
      label="Pieza"
      data={filteredProducts}
      value={value}
      setValue={setValue}
      onSearch={handleSearch}
      onSelect={() => {}}
      loading={isLoading}
      getLabel={(item) => item.cod}
      renderOption={(item) => {
        const productCell = cells.find((cell) =>
          cell.models.find((model) =>
            model.products.find(
              (product) => `${product} ${model.mda}` === item.id
            )
          )
        );

        return (
          <WarehouseSearchOption
            key={item.id}
            title={item.cod}
            cell={productCell}
            ubication={item.ubication}
          />
        );
      }}
    />
  );
}
