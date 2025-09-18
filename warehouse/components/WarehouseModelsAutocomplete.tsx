import Autocomplete from "@/shared/components/input/Autocomplete";
import useAutoScroll from "../hooks/useAutoScroll";
import useSearchModel from "../hooks/useSearchModel";
import { WarehouseSearchProps } from "./WarehouseLayout";
import WarehouseSearchOption from "./WarehouseSearchOption";

export default function WarehouseModelsAutocomplete({
  cells,
  itemsRef,
  onSelect,
}: WarehouseSearchProps) {
  const { filteredModels, handleSearch, isLoading } = useSearchModel(cells);
  const { handleSelect, value, setValue } = useAutoScroll(
    { cells, itemsRef, onSelect },
    "model"
  );

  return (
    <Autocomplete
      label="Maqueta"
      data={filteredModels}
      value={value ?? ""}
      setValue={setValue}
      onSearch={handleSearch}
      onSelect={handleSelect}
      isLoading={isLoading}
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
