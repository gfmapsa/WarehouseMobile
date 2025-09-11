import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GET_PRODUCT_OUTLIERS_KEY } from "../constants/backend";
import { ProductSearch } from "../models/ProductSearch";
import { WarehouseCell } from "../models/WarehouseCell";
import useWarehouseRepository from "./useWarehouseRepository";

export default function useSearchProduct(cells: WarehouseCell[]) {
  const productsInCells = cells.flatMap((cell) =>
    cell.models.flatMap((model) =>
      model.products?.flatMap(
        (product) =>
          new ProductSearch(`${product} ${model.mda}`, product, model.ubication)
      )
    )
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProductCells = productsInCells?.filter((product) =>
    product?.cod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleSearch(value: string) {
    setSearchTerm(value);
  }

  const { warehouseRepository } = useWarehouseRepository();

  const { refetch, data, ...query } = useQuery({
    queryKey: [GET_PRODUCT_OUTLIERS_KEY, searchTerm],
    queryFn: async () => warehouseRepository.getProductsOutliers(searchTerm),
    enabled: false,
  });

  const hasToSearch = filteredProductCells.length < 4;

  useEffect(() => {
    if (hasToSearch) {
      refetch();
    }
  }, [searchTerm, hasToSearch, refetch]);

  const filteredProducts = (
    !hasToSearch
      ? filteredProductCells
      : [...filteredProductCells, ...(data ?? [])]
  )?.slice(0, 4);

  return {
    filteredProducts,
    handleSearch,
    ...query,
  };
}
