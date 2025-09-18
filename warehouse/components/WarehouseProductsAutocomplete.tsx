//import useAnimateCell from "@/hooks/useAnimateCell";
import Autocomplete from "@/shared/components/input/Autocomplete";
import useAutoScroll from "../hooks/useAutoScroll";
import useSearchProduct from "../hooks/useSearchProduct";
import { WarehouseSearchProps } from "./WarehouseLayout";
import WarehouseSearchOption from "./WarehouseSearchOption";

export default function WarehouseProductsAutocomplete({
  cells,
  itemsRef,
  onSelect,
}: WarehouseSearchProps) {
  const { filteredProducts, handleSearch, isLoading } = useSearchProduct(cells);
  const { handleSelect, value, setValue } = useAutoScroll(
    { cells, itemsRef, onSelect },
    "product"
  );

  return (
    <Autocomplete
      label="Pieza"
      data={filteredProducts}
      value={value ?? ""}
      setValue={setValue}
      onSearch={handleSearch}
      onSelect={handleSelect}
      isLoading={isLoading}
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
