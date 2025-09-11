import Autocomplete from "@/shared/components/input/Autocomplete";
import React, { useState } from "react";
import useSearchModel from "../hooks/useSearchModel";
import { WarehouseSectionProps } from "./WarehouseLayout";
import WarehouseSearchOption from "./WarehouseSearchOption";

export default function WarehouseModelsAutocomplete({
  cells,
  itemsRef,
}: WarehouseSectionProps) {
  const { filteredModels, handleSearch, isLoading } = useSearchModel(cells);
  //const { handleChange } = useAnimateCell(cells, "model", itemsRef);

  const [value, setValue] = useState("");

  return (
    <Autocomplete
      label="Maqueta"
      data={filteredModels}
      value={value}
      setValue={setValue}
      onSearch={handleSearch}
      onSelect={() => {}}
      loading={isLoading}
      getLabel={(item) => item.mda}
      renderOption={(item) => {
        const modelCell = cells.find((cell) =>
          cell.models.find((model) => model.mda === item.mda)
        );

        return (
          <WarehouseSearchOption
            key={item.mda}
            title={item.mda}
            cell={modelCell}
            ubication={item.ubication}
          />
        );
      }}
    />
  );
}
